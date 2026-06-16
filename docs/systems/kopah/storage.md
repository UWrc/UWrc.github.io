---
title: Kopah Storage
---

This page covers all access methods for interacting with your data on Kopah, including graphical interfaces, command line tools, and programmatic usage.

## Graphical User Interface (GUI)

### Globus

As of Spring 2025, we're excited to announce that Globus has been added to Hyak `klone` and Kopah S3. Globus makes it easy to transfer large datasets reliably and securely between systems, whether across campus or around the world. With features like automated transfers, fault tolerance, and a simple web interface, it's a powerful tool for streamlining data movement in research workflows.

Globus public sharing is available with [**Kopah S3 storage**](https://uw.service-now.com/it?id=sc_entry&sys_id=f617c851935e565086a27b847aba1018&sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2), making it a dynamic compliment for your research storage portfolio if you anticipate requiring regular sharing and collaboration.

:::warning important: Globus Mapping Required
To use Globus with Kopah S3 storage, ***at least one username must be mapped to the storage account***. This mapping connects your Globus identity to the storage system and must be set up by our staff. Contact us to get started—it's a quick, one-time step.

**Request Globus mapping by emailing [**help@uw.edu**](mailto:help@uw.edu) with "Kopah + Globus" in the subject line.**

Kopah storage accounts can be requested using our [**Intake Form and Cost Calculator**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=cb93ee61973e92500a7637b6f053afe6). Kopah 1-month trial accounts are available - [**Try Kopah**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=38ce77fa875fd610e385333e3fbb358f).
:::

#### Set Up

Logging into Globus is straight forward:

* Go to [**globus.org**](https://www.globus.org/) and "LOG IN" with University of Washington. Sign in will include Duo 2-Factor Authentication. 
* Using the **File Manager - Collection Search** tab look for "UW Hyak Kopah".
* Once you click on the "UW Hyak Kopah" collection, be sure to Bookmark the collection so that it appears in the **Bookmarks** tab for future searches and operations as shown below. 

<img src="/img/docs/globus/0_find_collections.png" alt = "Image shows the two Hyak collections - Klone and Kopah - in the Bookmarks tab on Globus." /> 

* Once connected, you will see your KopahS3 buckets created while using your Kopah account. The three-lines menu can be revealed to show helpful features, expanding it shows the function descriptions. 

<img src="/img/docs/globus/1_kopah_buckets.png" alt = "Image shows the user's home directory by default and indicates the three-lines menu with helpful features." /> 

#### Transfer from Local 

Setting up **Globus Connect Personal** on your local computer lets you create a personal endpoint, making it easy to transfer files between your computer and other Globus collections—including our cluster—using a simple, secure interface.

* [**Install Globus Connect Personal**](https://www.globus.org/globus-connect-personal) for your operating system. 

:::important 
HTTPS uploads and downloads are limited to 10 GB per file. Files under 10 GB can be transferred by dragging and dropping or by using the upload/download buttons in Globus. For larger uploads, use Globus Connect Personal.
:::

:::tip Video tutorial available
[**Video guide**](https://www.youtube.com/watch?v=bpnVcAN99WY) from the Globus Team. 

*Note: the Endpoints Menu Tool appears to be deprecated and now "Endpoint" and "Collection" are synonymous. Your personal endpoint can be found by searching Collections.*
:::
* While configuring your Globus Connect Personal endpoint, be sure to select a unique name for your device (e.g., User-MacBook-Pro or Lab-Desktop), you will use this name again when you start transferring data. 
* Once you have Globus Connect Personal installed and configured, you can start transferring data between your personal device and Kopah S3. There are many ways to use Globus. Below, we provide some examples: 

Globus has a two-pane view option which can allow you to see two collections in the same window and perform transfers between them. With UW Hyak Kopah in one pane, click search in the other to select a different collection. 

<img src="/img/docs/globus/2_kopah_2pane.png" alt = "Image shows file manager two pane view where another collection can be viewed and used to perform transfers." /> 

Using the **File Manager - Collection Search** and the **Collections** tab find the personal endpoint you configured for yourself. 

<img src="/img/docs/globus/3_gcp_endpoint.png" alt = "Image shows collections tab where personal endpoint should be if configured correctly." /> 

Once your Globus Connect Personal collection is loaded on the second pane, you can navigate to the files you wish to transfer. Select files to transfer with the check box and press start. Once a transfer has started, a green box will show that your transfer request has been successfully submitted and you have the option to "View details." For small transfers, speeds are fast and results are complete quickly; you can "refresh list" on the receiving collection to see newly transferred files. Larger transfers can occur unsupervised and with minimal interruptions. Globus will send you an email when your transfer is completed. 

<img src="/img/docs/globus/4_kopah_transfer.png" alt = "Image shows how to select a file with the check box, start the transfer with the start button, and view transfer details as needed." />

Globus offers many options for transferring data, shown below. Options include scheduled and repeated transfers. 

<img src="/img/docs/globus/5_transfer_options.png" alt = "Image shows how to view and select transfer options." />

#### Transfer to and from Klone `/gscratch`

As above, you can set UW Hyak Klone as the second Collection with the two-pane view to request transfers between your Kopah S3 buckets and Hyak `klone`. Using the **File Manager - Collection Search** search for "UW Hyak Klone" and select it. Navigate to a destination on `klone` that you have permissions to view. Select the data to transfer with the checkbox. Click the Start button to request the transfer. Globus will send you an email when your transfer is completed. 

<img src="/img/docs/globus/6_klone_kopah.png" alt = "Image shows how transferring from klone to kopah would look." />

#### Group and Sharing

Group sharing in Globus lets you share data with collaborators by granting access to specific files or directories within a shared collection. You control who can view, download, and upload data to your Kopah buckets by managing group membership, all without needing to move or duplicate files.

* User the Groups tab and "Create new group" in the upper right corner of the **Groups** Tool. Customize you group and invite members of your lab to the group using their UWNetIDs. 

<img src="/img/docs/globus/7_finchlab.png" alt = "Image shows how to create a group in Globus." />

You will not be able to share anything with them until they have accepted the invitation, but after they are invited, you can share specific buckets with the entire group. 
<img src="/img/docs/globus/8_invite.png" alt = "Image shows how to invite others to the group." />

* Select a bucket to share. After that you will need to make it a guest collection. In the **Guest Collections** interface choose " + Add Guest Collection." This requires you to choose a display name for the collection. 
<img src="/img/docs/globus/9_share_bucket.png" alt = "Image shows how to select a bucket to share." />

:::warning 
In Globus, each bucket must be turned into its own collection to enable sharing. To simplify access and make group sharing more efficient, we recommend creating buckets at a higher organizational level—such as the project level—so that more content can be shared at once without needing multiple collections.
:::

* Once your collection is ready, you will set up sharing in the **Permissions** tab by selecting "+ Add Permissions - Share With."
<img src="/img/docs/globus/10_permissions.png" alt = "Image shows how to change permissions settings for sharing." />

* In the **Add Permissions - Shared With** interface, choose "Share With" group and use the "Select Group" button to share with your group. At this point, you can set up read only or read/write permissions. Setting up write permissions means that others can edit content in buckets and add new content. They can also delete content from buckets. This permission can be added later. **Using this same tool, you can share collections with specific users rather than with a group.** Click "Add Permission" to confirm settings. 
<img src="/img/docs/globus/11_set_access.png" alt = "Image shows how to set the group and read/write permissions for sharing." />

Globus is a great tools and we will continue to bring you tips and tricks for using it. 

Learn More: 
* Please explore Globus' extensive [**user documentation**](https://docs.globus.org/?_gl=1*s0ry7u*_ga*MTE2MzI4NzMxNi4xNzQyMzQxMTg3*_ga_7ZB89HGG0P*MTc0NDA3MjY1Ny4xNy4xLjE3NDQwNzI2NTcuMC4wLjA.) 
* Including [**video tutorials**](https://www.youtube.com/@GlobusOnline/featured). 
    * We found [**Introduction to Globus for Researchers and New Users**](https://www.youtube.com/watch?v=-j7Mp3FN1zo&list=PLLCSx-IFoBeu2F-HF-DMoc5_AUsvYft8c&index=2) informative. 

### Cyberduck

Cyberduck is an open-source client for managing and transferring files to various cloud storage services and protocols, including FTP, SFTP, and S3. It offers a simple, intuitive interface that allows users to easily upload, download, and organize their files. Cyberduck is available for both Windows and macOS, making it a versatile tool for seamless file management across different platforms.

To get started with Cyberduck, install the software from the [**developer's website**](https://cyberduck.io/download/) on your local computer.

Steps for connecting to Kopah:

1. For ease of use, a pre-configured connection profile for Kopah is available. [**Click this link to Download the profile**](/files/kopah.cyberduckprofile). After the file is finished downloading, change the filename to `kopah.cyberduckprofile`. You may decide to move this file from your Downloads directory and store it in a more permanent location. Once the file is in its final location, double-click it within a file explorer it will open in Cyberduck.


1. Open a new Cyberduck window and locate the **Open Connection** Icon.
![Image shows that the needed "Open Connection" button is located in the top taskbar in Cyberduck](/img/docs/kopah/cyberduck_open.png 'Open Connection')

2. You should see your profile to connect to **Kopah S3** showing in the drop-down box. Enter you Access Key and Secret Key, which can be found in your Home directory on `klone`. When you requested your account the Kopah team deposited your Kopah keys, in your Home directory. 

![Image shows to click on drop menu of page and to select the option SFTP(SSH File Transfer Protocol) which is shown as the third option](/img/docs/kopah/cyberduck_connect.png 'Configure Connection')

3. Once that is complete, Kopah S3 will appear on your Cyberduck bookmarks or server list. **Connect** by double clicking on the **Kopah S3** bookmark. 

![Cyberduck bookmarks or list of servers](/img/docs/kopah/cyberduck_bookmarks.png 'Cyberduck bookmarks or list of servers')

4. You can now interact with Kopah using the GUI! Buckets can be created by right clicking and selecting **New Folder...**. Objects can be added to bucket by ***dragging and dropping*** files and directories into the buckets. 

![Buckets](/img/docs/kopah/cyberduck_buckets.png 'Buckets')

In the example above there are two buckets, `bucket1` and `bucket2`, each with one file.

## Command Line Interface (CLI)

On this page we detail two options for interacting with data on Kopah via Command Line Interfaces (CLIs). s3cmd is a popular and widely used tool, while s5cmd is faster but less widely used.

:::tip New to Kopah?
Watch our [**Getting Started with Kopah**](https://www.youtube.com/watch?v=xFONnv8TJ4s) video for a quick overview of the service before diving into CLI tools.
:::

:::note
These tools aren't the only ones compatible with Kopah, however you will need to set them up to work with Ceph, Kopah's underlying storage protocol.
:::

### s3cmd

s3cmd is a free command line tool and client for uploading, retrieving and managing data in Kopah. It is best suited for power users who are familiar with command line programs. It is also ideal for batch scripts and if automated backup to Kopah is desired.

s3cmd is available for uploading data to Kopah from your local computer and with usage on `klone`.

#### Local s3cmd usage

To get started with s3cmd, install the software on your local computer. [**Click here to Download s3cmd from the developer's website.**](https://s3tools.org/s3cmd)

Create an s3cmd configuration file in your home directory. Call it `.s3cfg`. There are many ways to create this file.

##### For example, Mac and Linux users you can use the text editor `nano` in a Terminal window.

```js
cd ~
nano .s3cfg
## Use Ctrl + X to exit nano
```

##### Windows users could use Wordpad or another text editor application.

`.s3cfg` should contain the following details:

```js title=".s3cfg"
[default]
host_base = s3.kopah.uw.edu
host_bucket = s3.kopah.uw.edu/%(bucket)
use_https = True
public_url_use_https = True
# Login credentials
access_key = <ACCESS_KEY>
secret_key = <SECRET_KEY>
```

Where the word `<ACCESS_KEY>` is replaced with your Kopah Access Key and the word `<SECRET_KEY>` is replaced with your Kopah Secret Key.

After that is complete. s3cmd can be used to access your Kopah storage data with a large suite of commands. The s3cmd help includes example commands for a variety of tasks.

```js 
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

#### s3cmd usage on `klone`

s3cmd is installed for all `klone` users. Users need only set up their s3cmd configuration file in their home directory as shown above.

```js
cd ~
nano .s3cfg
## Use Ctrl + X to exit nano
```
Prepare your `.s3cfg` file as shown above.

### S5cmd

[**s5cmd**](https://github.com/peak/s5cmd) is an open-source tool for transferring and managing data with S3-API compatible storage. It is less widely used than s3cmd, however data transfer is much quicker.

#### Setup

s5cmd is installed on `klone` login nodes by default. See the [**s5cmd GitHub**](https://github.com/peak/s5cmd) for local installation instructions.

s3cmd must be configured to interact with Kopah. To do so, set the following environment variables in your shell.

:::note
These commands should likely be added in your `~/.bashrc` file, so they are automatically run on each terminal session. The commands in your `~/.bashrc` file will automatically run on any new shell session, however you need to source it (`source ~/.bashrc`) to make the variables accessible in your current session.

You'll need to do this for any device you wish to use s5cmd on (e.g. local desktop and Hyak).
:::

```js
export AWS_ACCESS_KEY_ID='<Kopah ACCESS KEY>'     # replace with Kopah access key
export AWS_SECRET_ACCESS_KEY='<Kopah SECRET KEY>' # replace with Kopah secret key
export S3_ENDPOINT_URL='https://s3.kopah.uw.edu'
```

To test the setup, run `s5cmd ls` to list your existing buckets. If that succeeds, s5cmd is ready for use!

#### Usage

Run `s5cmd -h` for information on how to use s5cmd or see the [**developer examples**](https://github.com/peak/s5cmd).

## Programmatic Usage (Boto3)

As Kopah has a S3-compliant API, many tools developed for S3 will also work with Kopah. This section documents one such tool, the Python AWS SDK [**Boto3**](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html), but there are also [**AWS SDKs**](https://aws.amazon.com/developer/tools/) for many other languages and third party tools. Boto3 provides a programmatic interface for most, if not all, s3/s5cmd options on top of handling all of the behind the scenes to provide efficient network access so you don't have to.

:::note
While boto3 is a powerful tool, its not always the best one for the job. If you are working with commonly formatted data, such as csv files, it may be worth doing some searching to see if there are existing tools designed for that out there already before trying to reinvent the wheel
:::

### Installation

Boto3 is installed in the default python docker image, which you can pull with `apptainer pull docker://python`, so any image based on that will come with Boto3 out of the box. If you do need to install it there are instructions for both [**pip**](https://pypi.org/project/boto3/) and [**conda**](https://anaconda.org/conda-forge/boto3). Once Boto3 is installed there is no required setup, but it is strongly recommended to setup environment variables for your Kopah keys as outlined in the [**S5cmd setup**](#setup) to avoid hardcoding keys.

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
