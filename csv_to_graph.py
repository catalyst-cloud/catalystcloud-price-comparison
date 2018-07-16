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

names_list = list(df['Name'])
names_list = ['"' + x + '"' for x in names_list]
names_list = ', '.join(names_list)

def get_price_string(label):
    prices = list(df[label])
    prices = [format(x, '.3f') for x in prices]
    prices = ', '.join(prices)
    return prices

catalyst_data = get_price_string('Catalyst price per hour, NZD (ex GST)')
google_data = get_price_string('Google price per hour, NZD (ex GST)')
aws_data = get_price_string('AWS price per hour, NZD (ex GST)')
azure_data = get_price_string('Azure price per hour, NZD (ex GST)')

data_filled_js = graph_template.render(
    labels=names_list,
    catalyst_data=catalyst_data,
    google_data=google_data,
    aws_data=aws_data,
    azure_data=azure_data
)

with open('display/js/graph.js', 'w') as graph_file:
    graph_file.write(data_filled_js)
