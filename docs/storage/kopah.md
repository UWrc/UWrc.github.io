---
id: kopah
title: What is KOPAH S3? 
---


Starting in Fall 2024, we will be offering our self-hosted, on-premises S3-compatible object storage called KOPAH. 

**S3 storage** is a user-friendly solution for securely storing and managing large amounts of data, whether for personal use or research computing. It works like an online storage locker where you can files of any size, accessible from anywhere with an internet connection. For researchers and those involved in data-driven studies, it provides a reliable and scalable platform to store, access, and analyze large datasets, supporting high-performance computing tasks and complex workflows. 

S3 uses **buckets** as containers to store data, where each bucket can hold an unlimited number of **objects**, which are the actual files or data you store. Each object within a bucket is identified by a unique key, making it easy to organize and retrieve your data efficiently. Public links can be generated for KOPAH objects so that users can share buckets and objects with collaborators. 

## KOPAH Accounts
KOPAH storage accounts can be requested by sending an email to help@uw.edu with "KOPAH" in the subject line. Opening a KOPAH storage account required a valid UW Budget and Worktag. 

## KOPAH Access
You will need access key and secret key to access your Kopah account. When you open an account your keys are placed in your home directory on `klone` in a file called `kopah_groupname`, where the word "groupname" is associated Hyak group.

S3 endpoint for KOPAH is https://s3.kopah.orci.washington.edu

Bucket endpoint format is https://s3.kopah.orci.washington.edu/BUCKET

Where the word "BUCKET" above is replaced with the name of your storage bucket. 

## KOPAH Usage Tools

KOPAH S3 is compatible with many S3 client tools, which are numerous. Here we have included some examples of tools you might find useful for interacting with KOPAH:

* [**Graphical User Interface tools for KOPAH**](https://hyak.uw.edu/docs/storage/gui): solutions under this option include Graphical User Interfaces (GUIs) that offer convenient upload options like drag-and-drop from your local computer to KOPAH S3. 

* [**Command Line Interface tools for KOPAH**](https://hyak.uw.edu/docs/storage/cli): solutions under this option include Command Line Interfaces (CLIs) that can be used to upload files from your local computer to KOPAH S3 and can be used on Hyak's current generation cluster, `klone` to complete transfers prior to computing against the data.


