# Python 2.7.15

import click
import subprocess
import os
import jinja2
import pandas as pd
import swiftclient
import sys
import hashlib
import time

# Converts the csv at csv_path into a
def csv_to_graph(csv_path):

    # Initalise jinga env and template
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader('templates')
    )
    graph_data_template = env.get_template('graph.js')
    graph_html_template = env.get_template('graph.html')

    # Import cloud price data
    df = pd.read_csv(csv_path, index_col=0)

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

    # Write the rendered template into a file for use.
    with open('display/js/graph.js', 'w') as graph_js:
        graph_js.write(data_filled_js)

    with open('display/graph.html', 'w') as graph_html:
        graph_html.write(data_filled_html)

    # The ./display directory now has an updated price comparison graph that can be
    # inserted as an iframe html tag.


@click.command()
@click.argument('bucket_name', type=click.STRING)
def deploy(bucket_name):
    """
    === Description ===

    Deploys a graph displaying the results of the `cloud_price_comparison.ipynb`
    notebook to the OpenStack bucket called BUCKET_NAME.

    === Before running ===

    Assure that you have:
    - An OpenStack openrc file has been sourced.
    - You have installed `requirements.txt`.
    """

    try:
        # Read configuration from environment variables (openstack.rc)
        auth_username = os.environ['OS_USERNAME']
        auth_password = os.environ['OS_PASSWORD']
        auth_url = os.environ['OS_AUTH_URL']
        project_name = os.environ['OS_PROJECT_NAME']
        region_name = os.environ['OS_REGION_NAME']
        options = {'tenant_name': project_name, 'region_name': region_name}

    except:
        click.echo(click.style("It appears you haven't sourced an RC file.", fg='red'))
        sys.exit()

    try:
        # Establish the connection with the object storage API
        conn = swiftclient.Connection(
                user = auth_username,
                key = auth_password,
                authurl = auth_url,
                insecure = False,
                auth_version = 3,
                os_options = options,
        )
    except:
        click.echo(click.style("Problem connecting to OpenStack.", fg='red'))
        sys.exit()

    # Variables
    notebook_path = 'cloud_price_comparison.ipynb'
    python_notebook_path = 'cloud_price_comparison.py'
    csv_path = 'predicted-dataset/predicted_catalyst_prices.csv'
    display_path = 'display'
    read_acl_string = ".r:*,.rlistings"

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
    csv_to_graph(csv_path)

    # Create container if it doesn't exist
    click.echo(click.style('Pushing static files to bucket: ' + bucket_name +'...', fg='green'))
    conn.put_container(bucket_name, headers={'X-Container-Read': read_acl_string})

    # Get objects in bucket
    objects = conn.get_container(bucket_name)[1]

    # Delete existing objects in bucket
    for item in objects:
        try:
            conn.delete_object(bucket_name, item['name'])
        except:
            continue

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

            conn.put_object(bucket_name, short_path, file.read())

    # Get a url to serve the graph from
    base_url = conn.get_auth()[0]
    full_url = '/'.join([base_url, bucket_name, 'graph.html'])

    click.echo(click.style('The graph can now be found at: ' + full_url, fg='green'))

if __name__ == '__main__':
    deploy()
