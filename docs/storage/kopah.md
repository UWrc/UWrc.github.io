---
id: kopah
title: Kopah Information
---

Starting in Fall 2024, we will be offering our self-hosted, on-premises S3-API compatible object storage called Kopah.

Kopah uses **buckets** as containers to store data, where each bucket can hold 100,000,000 **objects**, which are the actual files or data you store. Each object within a bucket is identified by a unique key, making it easy to organize and retrieve your data efficiently. Public links can be generated for Kopah objects so that users can share buckets and objects with collaborators.

## Accounts
Kopah storage accounts can be requested using our [**Intake Form and Cost Calculator**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=cb93ee61973e92500a7637b6f053afe6). Kopah 1-month trial accounts are available - [**Try Kopah**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=38ce77fa875fd610e385333e3fbb358f).

## Access
You will need access key and secret key to access your Kopah account. When you open an account your keys are placed in your home directory on `klone` in a file called `kopah_groupname`, where the word "groupname" is associated Hyak group.

S3 endpoint for Kopah is https://s3.kopah.uw.edu

Bucket endpoint format is https://s3.kopah.uw.edu/BUCKET

Where the word "BUCKET" above is replaced with the name of your storage bucket.

## Usage Tools

Kopah is compatible with many S3-API client tools, which are numerous. Here we have included some examples of tools you might find useful for interacting with Kopah:

* [**Graphical User Interface tools**](https://hyak.uw.edu/docs/storage/gui): solutions under this option include Graphical User Interfaces (GUIs) that offer convenient upload options like drag-and-drop from your local computer to Kopah. 
    * **NEW** - [**Globus endpoint for Kopah S3**](https://hyak.uw.edu/docs/storage/gui#globus). Transfer large datasets reliably and securely between systems, whether across campus or around the world. With features like automated transfers, fault tolerance, and a simple web interface, it’s a powerful tool for streamlining data movement in research workflows.

* [**Command Line Interface tools**](https://hyak.uw.edu/docs/storage/cli): solutions under this option include Command Line Interfaces (CLIs) that can be used to upload files from your local computer to Kopah and can be used on Hyak's current generation cluster, `klone` to complete transfers prior to computing against the data.

* [**Programmatic Usage**](https://hyak.uw.edu/docs/storage/boto3): solutions under this option include specialized Python libraries to build Kopah usage into your computing protocols.
