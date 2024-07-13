---
id: cli
title: S3 CLIs
---

On this page we will provide options to interact with your S3 data on KOPAH via Command Line Interfaces (CLIs).

## S3cmd

S3cmd is a free command line tool and client for uploading, retrieving and managing data in KOPAH S3. It is best suited for power users who are familiar with command line programs. It is also ideal for batch scripts and if automated backup to S3 is desired.

S3cmd is available for uploading data to KOPAH from your local computer and with usage on `klone`.

### Local S3cmd usage

To get started with S3cmd, install the software on your local computer. [**Click here to Download S3cmd from the developer's website.**](https://s3tools.org/s3cmd)

Create an S3cmd configuration file in your home directory. Call it `.s3cfg`. There are many ways to create this file. 

#### For example, Mac and Linux users you can use the text editor `nano` in a Terminal window.

```bash
cd ~
nano .s3cfg
## Use Ctrl + X to exit nano
```

#### Windows users could use Wordpad or another text editor application. 

`.s3cfg` should contain the following details: 

```bash title=".s3cfg"
[default]
host_base = s3.kopah.orci.washington.edu
host_bucket = s3.kopah.orci.washington.edu/%(bucket)
use_https = True
# Login credentials
access_key = <ACCESS_KEY>
secret_key = <SECRET_KEY>
```

Where the word `<ACCESS_KEY>` is replaced with your KOPAH Access Key and the word `<SECRET_KEY>` is replaced with your KOPAH Secret Key. 

After that is complete. S3cmd can be used to access your KOPAH S3 storage data with a large suite of commands. The S3cmd help includes example commands for a variety of tasks.

```bash 
s3cmd --help
```

The following are a small collection of the many commands available with S3cmd. 

| command | action|
|---------|-------|
|`s3cmd mb s3://BUCKET`|make bucket|
|`s3cmd ls [s3://BUCKET[/PREFIX]]`|List objects or buckets|
|`s3cmd la`|List all object in all buckets|
|`s3cmd put FILE [FILE...] s3://BUCKET[/PREFIX]`|Put a file into the bucket|
|`s3cmd put --acl-public FILE [FILE...] s3://BUCKET[/PREFIX]`|Put a file into a bucket and make it public|
|`s3cmd get s3://BUCKET/OBJECT LOCAL_FILE`|Get a file from the bucket|

### S3cmd usage on `klone`

S3cmd is installed for all `klone` users. Users need only set up their S3cmd configuration file in their home directory as shown above. 

```bash
cd ~
nano .s3cfg
## Use Ctrl + X to exit nano
```
Prepare your `.s3cfg` file as shown above. 

