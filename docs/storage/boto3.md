---
id: boto3
title: Programmatic Usage
---

As KOPAH has a S3-compliant API, many tools developed for S3 will also work with KOPAH. This page has examples for one such tool, [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html), the AWS SDK for Python. By specifying our KOPAH information with Boto3, we can programmatically interact with our data.

:::note
Boto3 is one of many tools for the S3 API, you are not limited to it for interacting with KOPAH. However, you will need to configure any tool to interact with CEPH, KOPAH's underlying storage protocol.
:::

## Boto3

We'll provide information on how to connect to KOPAH using Boto3, as well as some basic usage examples. For more information on how to use Boto3 (with S3), please refer to their [public documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/service-resource/index.html).

In our examples, strings within angled braces (e.g. `<SOME VALUE>`) represent a value you'll need to replace in your code!

### Setting up Boto3 with KOPAH:

First, install the Boto3 package into your Python environment. Instructions for [pip](https://pypi.org/project/boto3/) and [Conda](https://anaconda.org/conda-forge/boto3) are linked. There is no need to configure AWS credentials.

Once installed, you can connect to KOPAH using Boto3 as such:

```python
import boto3

s3 = boto3.resource(
    's3',
    endpoint_url='https://s3.kopah.orci.washington.edu',
    aws_access_key_id='<KOPAH ACCESS KEY>',     # replace with your access key
    aws_secret_access_key='<KOPAH SECRET KEY>', # replace with your secret key
)

# now, interact with your data!
```

:::caution
It is bad practice to hardcode your secret keys directly into your code. Better options include:

1. Exporting your keys as environment variables, then loading them programmatically via `os.envion['MY_SECRET_KEY']`.
2. Writing your keys to a JSON file, then loading them into your script with `json.loads('KEY_FILE')`.
:::

:::note
You can also connect to KOPAH as a client instead of a resource, which is easier for certain operations such as deleting an object. To do so, replace `boto3.resource` with `boto3.client`. Documentation for S3 clients is available [here](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html)
:::


### Example Boto3 S3 Resource Usage:

See the [Boto3 S3 resource documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/service-resource/index.html) for more information!

#### List all buckets:

```python
# connect to KOPAH, s3 = boto3.resource...

for bucket in s3.buckets.all():
    print(bucket.name)
```

#### Upload a file:

```python
# connect to KOPAH, s3 = boto3.resource...

bucket = s3.Bucket('<BUCKET NAME>')
bucket.upload_file('<FILE NAME>', '<OBJECT KEY>')
```

#### Download an object:

```python
# connect to KOPAH, s3 = boto3.resource...

bucket = s3.Bucket('<BUCKET NAME>')
bucket.download_file('<OBJECT KEY>', '<PATH TO FILE>')
```

#### Load an object to memory:

```python
from io import BytesIO

# connect to KOPAH, s3 = boto3.resource...

bucket = s3.Bucket('<BUCKET NAME>')
data = BytesIO()
bucket.download_fileobj('<OBJECT KEY>', data)

# do something with the data, e.g. print(data.getvalue())
```

