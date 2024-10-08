---
id: kopah
title: Kopah Information
---

Starting in Fall 2024, we will be offering our self-hosted, on-premises S3-API compatible object storage called Kopah.

Kopah uses **buckets** as containers to store data, where each bucket can hold 100,000,000 **objects**, which are the actual files or data you store. Each object within a bucket is identified by a unique key, making it easy to organize and retrieve your data efficiently. Public links can be generated for Kopah objects so that users can share buckets and objects with collaborators.

## Accounts
Kopah storage accounts can be requested by sending an email to help@uw.edu with "Kopah" in the subject line. Opening a Kopah storage account required a valid UW Budget and Worktag.

## Access
You will need access key and secret key to access your Kopah account. When you open an account your keys are placed in your home directory on `klone` in a file called `kopah_groupname`, where the word "groupname" is associated Hyak group.

S3 endpoint for Kopah is https://s3.kopah.orci.washington.edu

Bucket endpoint format is https://s3.kopah.orci.washington.edu/BUCKET

Where the word "BUCKET" above is replaced with the name of your storage bucket.

## Usage Tools

Kopah is compatible with many S3-API client tools, which are numerous. Here we have included some examples of tools you might find useful for interacting with Kopah:

* [**Graphical User Interface tools**](https://hyak.uw.edu/docs/storage/gui): solutions under this option include Graphical User Interfaces (GUIs) that offer convenient upload options like drag-and-drop from your local computer to Kopah. 

* [**Command Line Interface tools**](https://hyak.uw.edu/docs/storage/cli): solutions under this option include Command Line Interfaces (CLIs) that can be used to upload files from your local computer to Kopah and can be used on Hyak's current generation cluster, `klone` to complete transfers prior to computing against the data.
