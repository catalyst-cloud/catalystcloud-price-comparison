# Comparison of cloud compute price per hour
How do cloud providers stack up?

Making apples to apples comparisons between different cloud providers is very difficult, because each one offers instances with varying vCPUs, RAM, SSD space and HDD space. To further obfuscate matters, slightly different billing systems, promises of arcane discounting, only providing pricing in USD, and inconsistent naming conventions are sprinkled throughout.

As an attempt to provide a clearer price comparison, I've used the [multiple linear regression](https://en.wikipedia.org/wiki/Linear_regression) to "[normalise](https://en.wikipedia.org/wiki/Normalization_(statistics))" the pricing of compute instances across different cloud providers.

In essence, **If every cloud provider offered the same size compute instances, how expensive would they be?**

## The dataset
I'll be taking the price tables of:

* Google Cloud - [Predefined machine types](https://cloud.google.com/compute/pricing#predefined_machine_types)
* AWS - [On demand instances](https://aws.amazon.com/ec2/pricing/on-demand/)
* Azure - [Linux virtual machines](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

and converting them into the instance sizes offered by [Catalyst Cloud](https://www.catalyst.net.nz/catalyst-cloud/prices). You can find the datasets and their sources [here](https://github.com/catalyst-cloud/catalystcloud-price-comparison/raw/master/dataset/Cloud%20price%20comparison.ods).

## The Python
I've used the [scikit-learn](http://scikit-learn.org/stable/) library's [multiple linear regression](http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) to achieve the desired normalisation, and [Pandas](http://pandas.pydata.org/) for managing the data.

You can see my working on an IPython notebook [here](https://nbviewer.jupyter.org/github/catalyst-cloud/cloud-price-comparison/blob/master/cloud_price_comparison.ipynb).

## The result
Here's the result, plotted using [Chart.js](http://www.chartjs.org/), and hosted on [Catalyst Cloud's object storage](http://docs.catalystcloud.io/object-storage.html#static-websites-hosted-in-object-storage).

<iframe src="https://object-storage.nz-por-1.catalystcloud.io/v1/AUTH_8ccc3286887e49cb9a40f023eba693b4/catalyst-cloud-price-comp/" width="815px" height="485px"></iframe>
