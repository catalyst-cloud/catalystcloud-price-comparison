# Python 3.5.2

import jinja2
import pandas as pd

# Initalise jinga env and template
env = jinja2.Environment(
    loader=jinja2.FileSystemLoader('templates')
)
graph_template = env.get_template('graph.js')

# Import cloud price data
df = pd.read_csv('predicted-dataset/predicted_catalyst_prices.csv', index_col=0)

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
