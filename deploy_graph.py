# Python 2.7.15

import datetime
import click
import subprocess
import os
import jinja2
import pandas as pd
import openstack
import sys
import hashlib
import time
import shutil

# Connects to Catalyst Cloud
def connect_to_ccloud():
    try:
        conn = openstack.connect()
        return conn

    except:
        click.echo(click.style("Problem connecting to OpenStack.", fg='red'))
        sys.exit()

# Uploads the files to a bucket, and assures the bucket has all correct config.
# Returns the url the graph is displayed at.
def upload_to_bucket(bucket_name, connection, display_path, current_datetime):
    # Define variables
    read_acl_string = ".r:*,.rlistings"

    # Create container if it doesn't exist
    click.echo(click.style('Pushing static files to bucket: ' + bucket_name +'...', fg='green'))
    connection.object_store.create_container(bucket_name)

    # Set container read_ACL metadata to allow serving contents as static site
    connection.object_store.set_container_metadata(bucket_name, read_ACL=read_acl_string)

    # Get the paths of the files
    file_paths = []
    for root, directories, filenames in os.walk(display_path):
        for filename in filenames:
            rel_path = os.path.join(root,filename)
            file_paths.append(rel_path)

    # Put the files into the bucket
    for path in file_paths:
        short_path = '/'.join(path.split('/')[1:])

        with open(path, 'r') as file:

            connection.object_store.upload_object(container=bucket_name, name=short_path, data=file.read())

    # Get a url to serve the graph from
    base_url = connection.object_store.get_endpoint()
    full_url = '/'.join([base_url, bucket_name, current_datetime + '/graph.html'])
    return full_url

# Converts the csv at csv_path into an HTML graph
def csv_to_graph(csv_path, display_path, template_choice, current_datetime):

    template_dir = '/'.join(['templates', template_choice])

    # Initalise jinga env and template
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(template_dir)
    )
    graph_data_template = env.get_template('js/graph.js')
    graph_html_template = env.get_template('graph.html')

    # Import cloud price data
    df = pd.read_csv(csv_path, index_col=0)

    # Sort by mean price across providers
    rows_to_get_mean = df[[
        'Catalyst price per hour, NZD (ex GST)',
        'Google price per hour, NZD (ex GST)',
        'AWS price per hour, NZD (ex GST)',
        'Azure price per hour, NZD (ex GST)'
    ]]

    df['Mean price per hour'] = rows_to_get_mean.mean(1)

    df = df.sort_values(by=['Mean price per hour'])

    # Generate hash of CSV used to generate graph.
    source_data_hash = hashlib.md5(open(csv_path,'rb').read()).hexdigest()
    source_data_hash = source_data_hash[:10]

    # Generate current date as string
    timestamp_string = time.strftime("%d/%m/%Y", time.localtime())

    # Define a function that removes empty decimal places from numbers ('16.0' to
    # '16') to shorten the labels on the graph without losing any detail.
    def shorten_num(float):
        if float.is_integer():
            return str(int(float))
        else:
            return str(float)

    # Extract labels from the csv, and format them as a string we can insert into
    # the template.
    names_list = []
    name_string = "{cpu} vCPUs, {ram} GB RAM"
    for index, row in df.iterrows():

        short_cpu = shorten_num(row['vCPU'])
        short_ram = shorten_num(row['RAM, GB'])

        formatted_name_string = name_string.format(cpu=short_cpu, ram=short_ram)

        names_list.append(formatted_name_string)
    names_list = ['"' + x + '"' for x in names_list]
    names_list = ', '.join(names_list)

    # Define fucntion that extracts prices from the csv and formats them as a string
    # we can insert into the template.
    def get_price_string(label):
        prices = list(df[label])
        prices = [format(x, '.3f') for x in prices]
        prices = ', '.join(prices)
        return prices

    # Extract price data.
    catalyst_data = get_price_string('Catalyst price per hour, NZD (ex GST)')
    google_data = get_price_string('Google price per hour, NZD (ex GST)')
    aws_data = get_price_string('AWS price per hour, NZD (ex GST)')
    azure_data = get_price_string('Azure price per hour, NZD (ex GST)')

    # Render the template with the labels and price data.
    data_filled_js = graph_data_template.render(
        labels=names_list,
        catalyst_data=catalyst_data,
        google_data=google_data,
        aws_data=aws_data,
        azure_data=azure_data
    )

    data_filled_html = graph_html_template.render(
        timestamp=source_data_hash,
        hash=timestamp_string
    )

    display_dir = 'display/' + current_datetime

    # Create display directories if they don't already exist.
    if not os.path.exists(display_dir + '/js'):
        os.makedirs(display_dir + '/js')

    # Write the rendered template into a display file for use.
    with open(display_dir + '/js/graph.js', 'w') as graph_js:
        graph_js.write(data_filled_js)

    with open(display_dir + '/graph.html', 'w') as graph_html:
        graph_html.write(data_filled_html)

    shutil.copyfile(template_dir + '/' + 'js/chart.min.js', display_dir + '/js/chart.min.js')

    # The ./display directory now has an updated price comparison graph that can be
    # inserted as an iframe html tag.


@click.command()
@click.option('--fresh-data/--stale-data',
    default=True,
    help='Whether this script run the Jupyter notebook to collect up-to-date price data.'
    )
@click.option('--deploy',
    help='If included, will deploy the graph to the bucket specified by this option.',
    metavar='<bucket name>'
    )
@click.argument('template',
    type=click.STRING
    )
def deploy(fresh_data, deploy, template):
    """
    === Description ===

    Deploys a graph displaying the results of the `cloud_price_comparison.ipynb`
    notebook to the OpenStack bucket called BUCKET_NAME. The results will

    === Before running ===

    Assure that you have:
    - An OpenStack openrc file has been sourced.
    - You have installed `requirements.txt`.
    """

    print(fresh_data, deploy, template)

    if deploy is not None:
        # Establish the connection with Catalyst Cloud
        connection = connect_to_ccloud()

    # Variables
    notebook_path = 'cloud_price_comparison.ipynb'
    python_notebook_path = 'cloud_price_comparison.py'
    csv_path = 'predicted-dataset/predicted_catalyst_prices.csv'
    display_path = 'display'

    current_datetime = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M")

    # If fresh data is wanted...
    if fresh_data:
        click.echo(click.style('Converting notebook to python...', fg='green'))
        # Convert jupyter notebook to python
        subprocess.call(['jupyter', 'nbconvert', '--output=' + python_notebook_path, '--to', 'python', notebook_path])

        click.echo(click.style('Running python-ifed notebook to get data...', fg='green'))
        # Run the notebook to generate the data
        os.system('python {}'.format(python_notebook_path))

        click.echo(click.style('Cleanup...', fg='green'))
        # Delete the python script
        os.remove(python_notebook_path)

    click.echo(click.style('Converting data to HTML graph...', fg='green'))
    # Convert the csv data to an HTML graph
    csv_to_graph(csv_path, display_path, template, current_datetime)

    # If the html graph should be deployed...
    if deploy is not None:
        # Perform the upload process
        full_url = upload_to_bucket(deploy, connection, display_path, current_datetime)
        click.echo(click.style('The graph can now be found at: ' + full_url, fg='green'))

    else:
        full_path = os.path.abspath(display_path + '/' + current_datetime + '/graph.html')
        full_url = 'file://' + full_path
        click.echo(click.style('The graph can now be found at: ' + full_url, fg='green'))

if __name__ == '__main__':
    deploy()
