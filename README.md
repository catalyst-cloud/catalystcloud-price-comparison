# Comparison compute price per hour

Making apples to apples comparisons between different cloud providers is very difficult, because each one offers instances with varying vCPUs, RAM, SSD space and HDD space. To further obfuscate matters, slightly different billing systems, promises of arcane discounting, only providing pricing in USD, and inconsistent naming conventions are sprinkled throughout.

As an attempt to provide a clearer price comparison between compute service prices, I've used the [multiple linear regression](https://en.wikipedia.org/wiki/Linear_regression) to "[normalise](https://en.wikipedia.org/wiki/Normalization_(statistics))" the pricing of compute instances across different cloud providers.

In essence, **If every cloud provider offered the same size compute instances, how expensive would they be?**

## The dataset
I'll be taking the price tables of:

* Google Cloud - [Predefined machine types](https://cloud.google.com/compute/pricing#predefined_machine_types)
* AWS - [On demand instances](https://aws.amazon.com/ec2/pricing/on-demand/)
* Azure - [Linux virtual machines](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

and converting them into the instance sizes offered by [Catalyst Cloud](https://www.catalyst.net.nz/catalyst-cloud/prices). You can find the datasets and their sources [here](https://github.com/catalyst-cloud/catalystcloud-price-comparison/raw/master/compute/dataset/Cloud%20price%20comparison.ods). We won't be taking into account term or volume discounts.

## The Python
I've used the [scikit-learn](http://scikit-learn.org/stable/) library's [multiple linear regression](http://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html) to achieve the desired normalisation, and [Pandas](http://pandas.pydata.org/) for managing the data.

You can see my working on an IPython notebook [here](https://nbviewer.jupyter.org/github/catalyst-cloud/cloud-price-comparison/blob/master/compute/cloud_price_comparison.ipynb).

## The result


<iframe src="https://object-storage.nz-por-1.catalystcloud.io/v1/AUTH_8ccc3286887e49cb9a40f023eba693b4/catalyst-cloud-price-comp/" width="815px" height="485px"></iframe>

# Comparison object storage price per hour

This is an easier comparison to make, because there is minimal product differentiation available to cloud providers. We'll be comparing [cloud object storage](https://en.wikipedia.org/wiki/Object_storage) options where your data is replicated across multiple regions, just like [Catalyst Cloud does](http://catalyst.net.nz/catalyst-cloud/iaas/object-storage).

## The dataset
I'll be taking the prices of:

* Catalyst Cloud - [Object storage](http://catalyst.net.nz/catalyst-cloud/iaas/object-storage)
* Google Cloud - [Multi-Regional Storage](https://cloud.google.com/storage/pricing#storage-pricing)
* AWS - [Amazon S3](https://aws.amazon.com/s3/pricing/)
* Azure - [Hot, RA GRS, Blob storage](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/)

You can find the scraped datasets and their sources here. We won't be taking into account term or volume discounts.

## The result
Here's the result, plotted using [Chart.js](http://www.chartjs.org/). (Refresh if you can't see it)

<iframe src="https://object-storage.nz-por-1.catalystcloud.io/v1/AUTH_8ccc3286887e49cb9a40f023eba693b4/catalyst-cloud-price-comp-storage/" width="815px" height="485px"></iframe>


## The result
