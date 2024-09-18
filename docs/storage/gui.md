---
id: gui
title: GUI Usage
---

On this page we will provide options to interact with your data on KOPAH via Graphical User Interfaces (GUIs).

## Cyberduck 

Cyberduck is an open-source client for managing and transferring files to various cloud storage services and protocols, including FTP, SFTP, and S3. It offers a simple, intuitive interface that allows users to easily upload, download, and organize their files. Cyberduck is available for both Windows and macOS, making it a versatile tool for seamless file management across different platforms.

To get started with Cyberduck, install the software on your local computer. [**Click here to Download Cyberduck from the developer's website.**](https://cyberduck.io/download/)

For ease of use, a pre-configured connection profile for KOPAH is available. Download the [profile](/files/kopah.cyberduckprofile) and open it in Cyberduck to load it. Saving the file with a `.cyberduckprofile` extension and double-clicking it within a file explorer should open it.

Once setup, connect to KOPAH:

1. Open a new Cyberduck window and locate the **Open Connection** Icon. 
![](/img/docs/kopah/cyberduck_open.png 'Open Connection')

2. Select **KOPAH S3** from the drop-down box.

![](/img/docs/kopah/cyberduck_connect.png 'Configure Connection')

3. Enter you Access Key and Secret Key, which can be found in your home directory on `klone`.

4. Click **Connect**.

You can now interact with KOPAH using the GUI! Buckets can be created by right clicking and selecting **New Folder...**.

![](/img/docs/kopah/cyberduck_buckets.png 'Buckets')

In the example above there are two buckets, `bucket1` and `bucket2`, each with one file. 
