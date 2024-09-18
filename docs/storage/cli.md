---
id: cli
title: CLI Usage
---

On this page we detail two options data on KOPAH via Command Line Interfaces (CLIs). s3cmd is a popular and widely used tool, while s5cmd is faster but less widely used.

note:::
These tools aren't the only ones compatible with KOPAH, however you will need to set them up to work with Ceph, KOPAH's underlying storage protocol.
:::

## s3cmd

s3cmd is a free command line tool and client for uploading, retrieving and managing data in KOPAH. It is best suited for power users who are familiar with command line programs. It is also ideal for batch scripts and if automated backup to KOPAH is desired.

s3cmd is available for uploading data to KOPAH from your local computer and with usage on `klone`.

### Local s3cmd usage

To get started with s3cmd, install the software on your local computer. [**Click here to Download s3cmd from the developer's website.**](https://s3tools.org/s3cmd)

Create an s3cmd configuration file in your home directory. Call it `.s3cfg`. There are many ways to create this file.

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
public_url_use_https = True
# Login credentials
access_key = <ACCESS_KEY>
secret_key = <SECRET_KEY>
```

Where the word `<ACCESS_KEY>` is replaced with your KOPAH Access Key and the word `<SECRET_KEY>` is replaced with your KOPAH Secret Key.

After that is complete. s3cmd can be used to access your KOPAH storage data with a large suite of commands. The s3cmd help includes example commands for a variety of tasks.

```bash 
s3cmd --help
```

The following are a small collection of the many commands available with s3cmd.

| command | action|
|---------|-------|
|`s3cmd mb s3://BUCKET`|make bucket|
|`s3cmd ls [s3://BUCKET[/PREFIX]]`|List objects or buckets|
|`s3cmd la`|List all object in all buckets|
|`s3cmd put FILE [FILE...] s3://BUCKET[/PREFIX]`|Put a file into the bucket|
|`s3cmd put --acl-public FILE [FILE...] s3://BUCKET[/PREFIX]`|Put a file into a bucket and make it public|
|`s3cmd get s3://BUCKET/OBJECT LOCAL_FILE`|Get a file from the bucket|
|`s3cmd setacl --acl-private s3://BUCKET/OBJECT`|Make an object in the bucket private.|

:::caution
Buckets and objects shouldn't be public unless necessary, set them private whenever possible!
:::

### s3cmd usage on `klone`

s3cmd is installed for all `klone` users. Users need only set up their s3cmd configuration file in their home directory as shown above.

```bash
cd ~
nano .s3cfg
## Use Ctrl + X to exit nano
```
Prepare your `.s3cfg` file as shown above.

## S5cmd

[**s5cmd**](https://github.com/peak/s5cmd) is an open-source tool for transferring and managing data with S3-API compatible storage. It is less widely used than s3cmd, however data transfer is much quicker.

### Setup

s5cmd is pre-installed on KLONE. To install locally, view the [**developer's instructions**](https://github.com/peak/s5cmd#installation).

s3cmd must be configured to interact with KOPAH. To do so, set the following environment variables in your shell.

:::note
These commands should likely be added in your `~/.bashrc` file, so they are automatically run on each terminal session. The commands in your `~/.bashrc` file will automatically run on any new shell session, however you need to source it (`source ~/.bashrc`) to make the variables accessible in your current session.
:::

```bash
export AWS_ACCESS_KEY_ID='<KOPAH ACCESS KEY>'     # replace with KOPAH access key
export AWS_SECRET_ACCESS_KEY='<KOPAH SECRET KEY>' # replace with KOPAH secret key
export S3_ENDPOINT_URL='https://s3.kopah.orci.washington.edu'
```

To test the setup, run `s5cmd ls` to list your existing buckets. If that succeeds, s5cmd is ready for use!

### Usage

Run `s5cmd -h` for information on how to use s5cmd or see the [**developer examples**](https://github.com/peak/s5cmd).
