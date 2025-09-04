---
id: storage
title: Storage
---

Tillicum provides high-speed, temporary storage designed for active computation. 

* All storage is scratch space (**NOT BACKED UP**)
* No persistent or archival storage is supported
* Data will be purged periodically and at project end
* Users are responsible for transferring results to external systems (e.g., [<ins>**Kopah S3**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083) or [<ins>**Lolo Archive**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084))

Storage on Tillicum is physically separate from servers used for computation. On `tillicum` the storage system (e.g., `/gpfs/`) is then mounted (i.e., accessible) from every compute node of the cluster. `tillicum` storage is referred to as `gpfs` due to that being the mount point on the cluster (i.e., `/gpfs/somefolder/anotherfolder`).  

Every user has a [<ins>**Home directory**</ins>](#user-home-directory) by default, [<ins>**project/lab dedicated storage**</ins>](#project-storage), and [<ins>**scrubbed**</ins>](#scrubbed) storage for temporary overflow use.

## User Home Directory

- ***10 GB, only yours, everyone has one.***

Each users' Home directory is located at the folder path `/gpfs/home/UWnetID` on `tillicum` where `UWnetID` is your UW netID. You originate here by default when you log into the cluster. 

**We recommend only keeping configuration files in your home directory and using other storage spaces for data, software, and code storage.**

:::tip pro tip: Storage monitoring
To monitor and investigate storage usage, use the following command, which will show you how much storage is occupied by each subdirectory in the directory where the command is executed. If you are cleaning up storage, this command will show new storage counts as changes are made. 
```js
du -h -d 1
```
:::

## Project Storage

When you request an allocation for your project or lab on Tillicum, we will ask to estimate how much storage you will require for the lifecycle of your project. After your project is complete, you will have 1 month to backup your data and results elsewhere. 

***More information coming soon.***

## Scrubbed

If you need space but only temporarily then you can make use of the scrubbed folder. The scrubbed folder is located under `/gpfs/scrubbed/` is intended to be a community storage space for active computing. Persistent or archival storage is not permitted. 

***More information about individual limits and the purge policy coming soon.*** 