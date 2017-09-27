# A Cloud Price Comparison
How do cloud providers stack up?

Making apples to apples comparisons between different cloud providers is very difficult, because each one offers instances with varying vCPUs, RAM, SSD space and HDD space. To further obfuscate matters, slightly different billing systems, promises of arcane discounting, only providing pricing in USD, and inconsistent naming conventions are sprinkled throughout.

As an attempt to provide a clearer price comparison, I've used the [random forest algorithm](https://en.wikipedia.org/wiki/Random_forest) to "[normalise](https://en.wikipedia.org/wiki/Normalization_(statistics)" the pricing of compute instances across different cloud providers.

In essence, **If every cloud provider offered the same size compute instances, how expensive would they be?**

## The dataset

## The Python

## The result

Here's the result, plotted using the lovely [Chart.js](http://www.chartjs.org/), and hosted on Catalyst Cloud's object storage.

<iframe src="https://object-storage.nz-por-1.catalystcloud.io/v1/AUTH_8ccc3286887e49cb9a40f023eba693b4/catalyst-cloud-price-comp/" width="" height=""></iframe>
