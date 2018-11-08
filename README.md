# Comparison of compute price per hour

Making apples to apples comparisons between different cloud providers is very
difficult, because each one offers instances with varying vCPUs, RAM, SSD space
and HDD space.

As an attempt to provide a clearer price comparison between compute service
prices, I've used the [multiple linear
regression](https://en.wikipedia.org/wiki/Linear_regression) to
"[normalise](https://en.wikipedia.org/wiki/Normalization_(statistics))" the
pricing of on-demand, general purpose compute instances across different cloud
providers.

In essence, **If every cloud provider offered the same size compute instances,
how expensive would they be?**

## The dataset

I'll be taking the price tables of:

* Google Cloud - [Predefined machine types](https://cloud.google.com/compute/pricing#predefined_machine_types)
* AWS - [On demand instances](https://aws.amazon.com/ec2/pricing/on-demand/)
* Azure - [Linux virtual machines](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

and converting them into the instance sizes offered by [Catalyst
Cloud](https://catalystcloud.nz/pricing/price-list/). You can find the datasets
and their sources
[here](https://nbviewer.jupyter.org/github/catalyst-cloud/cloud-price-comparison/blob/master/cloud_price_comparison.ipynb).
We won't be taking into account term or volume discounts.

## The Python

I've used the [scikit-learn](http://scikit-learn.org/stable/) library's
[multiple linear
regression](http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html)
to achieve the desired normalisation, and [Pandas](http://pandas.pydata.org/)
for managing the data.

You can see my working on an IPython notebook
[here](https://nbviewer.jupyter.org/github/catalyst-cloud/cloud-price-comparison/blob/master/cloud_price_comparison.ipynb).

## Deploying this graph

Included with this repo is a python script that makes it easier to display the
results of this graph. It is mostly only intended for administrators of the
[Catalyst Cloud website](https://catalystcloud.nz/), in order to provide
up-to-date data on the [price comparison
page](https://catalystcloud.nz/pricing/price-comparison/).

The Python script converts the Jupyter notebook to regular Python, runs that
code, converts the CSV outputs into an HTML graph, and optionally deploys that
graph to an OpenStack bucket.

A Dockerfile is also included to make it easier to manage the awkward
dependencies required to convert a Jupyter notebook into usable python.

To build the docker image, run:

```
cd catalystcloud-price-comparison
docker build -t price-comparison .
```

To run the docker container, run:

```
docker run -it --rm -v <PATH TO YOUR OPEN_RC FILE DIRECTORY>:/home/open_rc_files price-comparison
```

To run the deploy script within the docker container, [source the relevant
open_rc
file](https://docs.catalystcloud.nz/sdks-and-toolkits/cli/configure.html#source-an-openstack-rc-file),
then run:

```
cd /home
python deploy_graph.py --help
```

This will provide you with the scripts documentation. As an example, to deploy
the standard graph to the container named `price-comparison`, run:

```
python deploy_graph.py --fresh-data --deploy price-comparison site
```

