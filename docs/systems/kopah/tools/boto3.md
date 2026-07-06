---
title: Programmatic Usage
---

As Kopah has a S3-compliant API, many tools developed for S3 will also work with Kopah. This page documents one such tool, the Python AWS SDK [**Boto3**](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html), but there are also [**AWS SDKs**](https://aws.amazon.com/developer/tools/) for many other languages and third party tools. Boto3 provides a programmatic interface for most, if not all, [**s3/s5cmd**](cli.md) options on top of handling all of the behind the scenes to provide efficient network access so you don't have to.

:::note
While boto3 is a powerful tool, its not always the best one for the job. If you are working with commonly formatted data, such as csv files, it may be worth doing some searching to see if there are existing tools designed for that out there already before trying to reinvent the wheel
:::

## Installation

Boto3 is installed in the default python docker image, which you can pull with `apptainer pull docker://python`, so any image based on that will come with Boto3 out of the box. If you do need to install it there are instructions for both [**pip**](https://pypi.org/project/boto3/) and [**conda**](https://anaconda.org/conda-forge/boto3). Once Boto3 is installed there is no required setup, but it is strongly recommended to setup environment variables for your Kopah keys as outlined in the [**S5cmd setup**](cli.md) to avoid hardcoding keys.

## Usage

### Boilerplate

Since there isn't any setup with Boto3, that does mean there is some required boilerplate instead. Here is a boilerplate that you can use to create a client object pointing to Kopah. Note [**client**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/session.html#boto3.session.Session.client) can be replaced with [**resource**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/core/resources.html) depending on your workload.

```python
import boto3
import os

s3 = boto3.client('s3', endpoint_url=os.environ['S3_ENDPOINT_URL'], 
                  aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], 
                  aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
                )
```

### Transfer Files

You can [**download or upload**](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html) a file with a file path using `s3.download_file('<bucket_name>', '<obj_name>', '<file_path')` and `s3.upload_file('<file_path', '<bucket_name>', '<obj_name>')`, where s3 is an initialized boto3.client(). Alternatively you can use `s3.download_fileobj()` and `s3.upload_fileobj()` to instead work with file objects (like those returned by open()) instead of direct file paths.

### Modifying Buckets

You can [**create**](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-creating-buckets.html) or [**delete**](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3/client/delete_bucket.html) buckets with `s3.create_bucket(Bucket='<bucket_name>')` and `s3.delete_bucket(Bucket='<bucket_name>'`. It is also possible to change bucket access permissions and properties, for example making it publicly readable with a url, as detailed in the [**Boto3 docs**](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3.html). For all of these commands replace `<bucket_name>` with the actual name of the Kopah S3 bucket you want to create/delete/modify.

### Streaming a File

One of the most powerful functionalities of Boto3 is being able to stream a large file with just small chunks, which reduces latency and memory usage. Below is an example that uses the "streaming body" of an object to iterate over small chunks of the object.

```python
import boto3
import os

# Boilerplate code to create s3 client object
s3 = boto3.client('s3',
                  endpoint_url=os.environ['S3_ENDPOINT_URL'],
                  aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                  aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
                )

# Get the "streaming body" of the s3 object you want to process
response = s3.get_object(Bucket='<bucket_name>', Key='<obj_name>') 
object_data = response['Body']

# Create an iterator object that streams the file 1024 bytes at a time. Can replace with any chunk size or with iter_lines() to instead stream line by line
for chunk in object_data.iter_chunks(chunk_size=1024):
    # Process the chunk of data as needed 
    # Example: print the chunk 
    print(chunk)

# Close the object streaming body
object_data.close()
```

### Running Scripts

You can run a Boto3 python script directly from the terminal or within a slurm job with `apptainer exec --bind /path/to/script.py /path/ro/python-container.sif python3 /path/to/script.py`, ensuring that both the script and the container are accessible on all nodes you want to run this on (your home directory or gscratch should work). Note you may need to mark your script as executable with `chmod +x /path/to/script.py`
