# Python 2.7.15

import click
import subprocess
import os
import jinja2
import pandas as pd

# Converts the csv at csv_path into a
def csv_to_graph(csv_path):

    # Initalise jinga env and template
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader('templates')
    )
    graph_template = env.get_template('graph.js')

    # Import cloud price data
    df = pd.read_csv(csv_path, index_col=0)

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
    data_filled_js = graph_template.render(
        labels=names_list,
        catalyst_data=catalyst_data,
        google_data=google_data,
        aws_data=aws_data,
        azure_data=azure_data
    )

    # Write the rendered template into a file for use.
    with open('display/js/graph.js', 'w') as graph_file:
        graph_file.write(data_filled_js)

    # The ./display directory now has an updated price comparison graph that can be
    # inserted as an iframe html tag.


@click.command()
@click.argument('bucket_name', type=click.STRING)
def deploy(bucket_name):
    """
    === Description ===

    Deploys a graph displaying the results of the
    `cloud_price_comparison.ipynb` notebook to the OpenStack bucket called
    BUCKET_NAME.

    === Before running ===

    Assure that an OpenStack openrc file has been sourced and python-swiftclient
    has been installed before running this script.
    """

    # Variables
    notebook_path = 'cloud_price_comparison.ipynb'
    python_notebook_path = 'cloud_price_comparison.py'
    csv_path = 'predicted-dataset/predicted_catalyst_prices.csv'
    display_path = 'display/'
    read_acl_string = ".r:*,.rlistings"

    click.echo(click.style('Converting notebook to python...', fg='green'))
    # Convert jupyter notebook to python
    subprocess.call(['jupyter', 'nbconvert', '--output='python_notebook_path, '--to', 'python', notebook_path])

    click.echo(click.style('Running python-ifed notebook to get data...', fg='green'))
    # Run the notebook to generate the data
    os.system('python {}'.format(python_notebook_path))

    click.echo(click.style('Cleanup...', fg='green'))
    # Delete the python script
    os.remove(python_notebook_path)

    click.echo(click.style('Converting data to HTML graph...', fg='green'))
    # Convert the csv data to an HTML graph
    csv_to_graph(csv_path)

    click.echo(click.style('Pushing static files to bucket: ' + bucket_name +'...', fg='green'))
    # Create container if it doesn't exist
    subprocess.call(['swift', 'post', bucket_name])

    # Give bucket correct Read ACL if not done already
    subprocess.call(['swift', 'post', '-r', read_acl_string, bucket_name])

    # Get objects in bucket
    raw_objects = subprocess.check_output(['swift', 'list', bucket_name])

    objects = []
    for name in raw_objects.split('\n'): objects.append(name)
    objects = objects[:-1]

    if len(objects) is not 0:
        # Delete existing objects in bucket
        subprocess.call(['swift', 'delete', bucket_name] + objects)

    # Upload all files in the display dir
    subprocess.call(['swift', 'upload', bucket_name, '.'], cwd=display_path)

    # Get the bucket's 'Account' value, to be used in the public url
    raw_bucket_data = subprocess.check_output(['swift', 'stat', bucket_name])
    bucket_data_lines = raw_bucket_data.split('\n')[:-1]

    account_auth = ''
    for line in bucket_data_lines:
        split_line = line.split(':')
        key = split_line[0].strip()
        value = split_line[1].strip()

        if key == 'Account':
            account_auth = value
            break

    # Print the graph's URL
    url = 'https://object-storage.nz-wlg-2.catalystcloud.io/v1/{auth}/{bucket}/graph.html'
    click.echo(click.style('The graph can now be found at:', fg='green'))
    click.echo(click.style('    ' + url.format(auth=account_auth, bucket=bucket_name), fg='green'))


if __name__ == '__main__':
    deploy()
