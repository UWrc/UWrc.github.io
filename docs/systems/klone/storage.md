---
title: Storage on Klone
---

:::warning
## Important Storage Reminder for Hyak Klone

***Hyak Klone does not provide backup, persistent storage, or archival storage. All data on Klone exists as a single copy*** and is therefore vulnerable to loss due to hardware failure, filesystem issues, facility damage, or natural disasters. Users are solely responsible for transferring important results to external systems (for example, [**Kopah S3**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083) or [**Lolo Archive**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084)) during the course of their project if persistent or long-term storage is required. ***Retaining long-term or archival data on Klone is against administrative guidance.***
::: 

Storage on Hyak Klone is physically separate from servers used for computation. It is best practice on every supercomputer that storage live on its own and is high-performance to handle the bandwidth I/O and read/write operations required by so many compute nodes attached to it. These are typically parallel file systems (e.g., GPFS, Lustre, BeeGFS).

On Klone the storage system (i.e., Gscratch or `/mmfs1/gscratch/`) is then mounted and accessible from every compute node of the cluster. Klone storage is referred to as `/gscratch` due to that being the mount point on the cluster (i.e., `/mmfs1/gscratch/path/directory` or `/gscratch/path/directory`) and a reminder to our researchers that anything here is **"scratch"** or **NOT BACKED UP**. Refer to the [**storage introduction page**](./data.md) for details on how to manage your data life cycle and adhere to the [**3-2-1 backup policy**](./data.md#best-practices-3-2-1-policy). Since `/gscratch/` is not backed up, it is not a solution for longterm storage and should only be used for active computing projects. UWIT Research Computing offers [**additional storage solutions**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035580) that may be use in combination with `/gscratch/` for longer term data storage. Namely: 

* [**Kopah S3 Object Storage**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083)
* [**Lolo Data Archive**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084) for persistent, geographically redundant storage. 
* Alternatively, UWIT can help you select from commercial storage options that include UW discounts. [**More information about Cloud Computing options**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036116). 

## Klone Storage Overview

On **Klone**, your primary storage locations live under `/mmfs1/`, which is a shared, high-performance filesystem accessible from all login and compute nodes.

**Key locations you will encounter include:**

* [**`/mmfs1/home/UWNetID/` — your Home directory**](#user-home-directory). 
:::warning
 Home directories on Klone and Tillicum have **limited quota** (10GB). Active research data, training datasets, and large outputs should be stored in project or scrubbed storage, not in $HOME.

Your **Home directory** is intended only for:
- Configuration files
- Small scripts
- Lightweight code
:::
* [**`/mmfs1/gscratch/group-name/` — Shared Group and Project Storage**](#group-or-lab-directories). Variable total capacity based on hardware holdings.
* [**`/mmfs1/gscratch/scrubbed/` - Scrubbed Storage**](#scrubbed-storage) or free community storage for temporary, high-capacity workloads. Data stored in scrubbed locations will be automatically removed after 21 days of inactivity, so it should only be used for intermediate or reproducible data. User limit of 10TB, but amount is not guarenteed and may not be available. 

![Diagrammatic representation of the Klone filesystem directory tree. The root directory appears at the top and contains several subdirectories. A truncated view highlights the mmfs1 directory and selected subdirectories within it, including home for user home directories, sw for shared software and scripts, and gscratch for project and lab group storage. Some directories are shown in blue to indicate they are also accessible via symbolic links from shorter top-level paths.](/img/docs/filesystem_klone.jpg 'Klone filesystem')

*Simplified view of the Klone filesystem hierarchy. The root directory (`/`) contains all subdirectories. This diagram highlights `/mmfs1` and commonly used paths within it, including user home directories (`/mmfs1/home`), shared software and scripts (`/mmfs1/sw`), project and lab group storage (`/mmfs1/gscratch`), and [**common datasets**](https://hyak.uw.edu/docs/resources/data-commons/requirements) (`/mmfs1/data`). Directories shown in blue indicate locations that are also available through symbolic links for convenience.*

:::important **NOTE: Symbolic Links on Klone**
On Klone, some commonly used directories have symbolic links (also called "symlinks") that provide shorter, easier-to-type paths.

For example, the following paths refer to the same location:
```bash
/mmfs1/gscratch
/gscratch
```
Symbolic links do not duplicate data. Instead, they act as pointers to the original directory. You can safely use either path when navigating the filesystem or writing job scripts.
***You may see multiple paths that appear different but resolve to the same location. This is expected behavior on Klone and is used to improve usability.***
:::



### User Home Directory

- ***10 GB, only yours, everyone has one.***

Each users' Home directory is located at the folder path `/mmfs1/home/UWnetID` on Klone where `UWnetID` is your UW netID. You are placed here by default when you log into the cluster. 

:::important
Your Home directory quota is 10 GB or ~250,000 inodes. If you exceed this limit, you will be prohibited from going much further with your computing until you clean up. 
:::

On Klone, monitor your Home directory with [**`hyakstorage`**](#checking-storage-utilization-with-hyakstorage) as shown below. 

```js
hyakstorage --home
                           Usage report for /mmfs1/home/UWNetID
╭──────────────────────┬────────────────────────────────┬────────────────────────────────╮
│                      │ Disk Usage                     │ Files Usage                    │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Total:               │ 4GB / 10GB                     │ 4764 / 256000 files            │
│                      │ 40%                            │ 2%                             │
╰──────────────────────┴────────────────────────────────┴────────────────────────────────╯
```

Ideally you only keep essential configuration files here. This quota can not be changed, if you need more data one of the other storage spots like [**`/gscratch`**](#group-or-lab-directories) or [**`/gscratch/scrubbed`**](#scrubbed-storage)(i.e., lab folder, scrubbed).

:::tip PRO TRIP - FYI

There are many shortcuts to get to your home directory from anywhere on Klone. All of the following will take you to your Home Directory:
```js
# the ~ symbol is a shorthand for the Home Directory
cd ~ 

# cd followed by nothing will take you to the home directory
cd

# $HOME is an environmental variable is synonymous with the absolute path of your Home Directory
cd $HOME

# print the variable $HOME to see what it assigned to in your shell
echo $HOME
```
:::

### Group or Lab Directories

- Shared lab storage.
- NVMe flash tier on Klone.

If you run the `groups` or `hyakalloc` command you'll see what groups you are a member of. Whatever groups you are seeing here you can access your lab storage at `/gscratch/mylab/` where `mylab` is any group you're a member of. 

For example, a member of the Research Computing Club would see `stf` and an account in their `hyakalloc` output, meaning they have storage under `/gscratch/stf`.

Your lab gets 1 TB per slice that your group has contributed to Klone, which includes HPC (CPU-only) and GPU slices.

:::tip
Check group quotas and current use with the [**`hyakstorage`**](#checking-storage-utilization-with-hyakstorage) command.
:::

### Scrubbed Storage

- Free to use but files auto-deleted beyond 21 days.
- 10TB individual quota, from a shared 100TB quota in total.
- Slower than `gscratch` lab directories.
- No snapshots.

All users should leverage Scrubbed storage. The Scrubbed folder lives at `/gscratch/scrubbed/` and anything underneath this folder is a free-for-all space. You can create a directory for yourself and do whatever you need subject to system constraints but note there is a purge policy where any file not accessed for 21 days (i.e., 3 weeks) is automatically deleted. This is to provide a useful (and free) flexible storage capacity for any research group that needs it and can work within these policy restraints. However, we encourage users who need a more persistent storage location to purchase `gscratch`.

:::warning Key considerations for Scrubbed
* **AUTO-DELETE:** Files not accessed for 3 weeks (i.e., 21 days) in Scrubbed will automatically be deleted. 
>Attempting to circumvent the auto-delete policy violates our usage policy and is against the spirit of Scrubbed as a community resource.
* **10TB INDIVIDUAL LIMIT**: The 10TB per-user limit is not guaranteed. Scrubbed is a shared space with 100TB total quota, and heavy use by a few users can affect accessibility for others. This is the main reason for the auto-delete policy.
* **PRIVACY:** Writes to Scrubbed are public by default, it is the responsibility of the individual researcher to lock down anything they wish to use in Scrubbed.
> Please note the Scrubbed permissions are ***completely open*** by default so use Linux group changes and modifications to restrict access as appropriate.
:::

## Checking Storage Utilization with `hyakstorage`

The `hyakstorage` is a Hyak user tool to monitor your storage quota utilization in both your home and group (or lab) directories.

```js
hyakstorage --help

usage: hyakstorage [-h] [-m] [-g] [-c] [-p] [-u] [-f | -d] [path or groupname]

optional arguments:
  -h, --help         show this help message and exit
  -f, --by-files     sort by file usage
  -d, --by-disk      sort by disk usage

selection options:
  -m, --home         print storage report for my home directory
  -g, --gscratch     print storage report for my gscratch directories
  -c, --contrib      print storage report for my contrib directories

view options:
  -p, --show-group   show usage by groups
  -u, --show-user    show usage by users

search option:
  path or groupname  show usage for this path or group
```

If you run `hyakstorage` without any arguments you'll receive the status of your home and all group (or lab) directories you have access to. The viewing options, `--show-group` and `--show-user`, will show a more detailed breakdown of storage use by group & users. By default, those detailed views will be sorted by disk usage (i.e. `--by-disk`), but you can also sort by files owned with `--by-files`.

:::important
The quotas reported by `hyakstorage` are updated ***once every hour, not immediately***. 

To monitor storage changes in real-time, use the following command, which will show you how much storage is occupied by each item in the directory where the command is executed. If you are cleaning up storage, this command will show results as changes are made. 
```js
du -h --max-depth 1
```
:::

## Data Lifecycle

Users leaving UW should plan to remove or secure their data to prevent the exposure of confidential information and to keep the system organized. Unsecured data may expose sensitive research findings while unused or leftover data may impact the system performance for other users. To prevent this from happening, you have the option to "will" your data to another user or to transfer the data to an external device. Listed below are various scenarios and recommended methods for removing and passing down data:

**1. Changing File Ownership To Your Principal Investigator**

 If you are working with a lab, the data produced during that work is the ultimate intellectual property of the Principal Investigator on the project. Before you leave, you should change ownership of the files or directories to the Principal Investigator or another person in the lab with the `chown` command:
```js
# For an entire directory
chown -R <new owner NetID> directory/

# For a singular file
chown <new owner NetID> file.txt
```
**2. Changing File Names**

For long term stability of your data in another's hands, it is better to change the directory name to be descriptive. Rather than changing the ownership of a file alone, if the directory is your UWNetID, it is recommended that the new owner moves the directory into a directory under their name or change the name of the directory to be descriptive (i.e., "MyName_Datafiles" or "ProjectName_Scripts") so that these files are not associated with a user that is no longer part of the system. In general, after a user's account is removed, directories named after their NetID can be difficult for others to recognize. To change file names, use the `mv` command for moving and renaming files.

```js
mv old_name new_name
```

**3. Data Transfer To External Devices**

If you are leaving UW and are working independently, you should make plans to remove your data by transferring it to an external device. Please refer to the [**data transfer**](./transfer.md) page for more information on transferring data between Hyak Klone and your local device. Once your data transfer has completed, delete the original files and directories from Hyak so that the storage can be reclaimed.  

**4. Reclaiming Data From a User That Has Left UW**

In the case that a lab member has left your group without transferring ownership of data, the principal investigator for the group or a designated member manager or group representative should contact the Hyak team to request an ownership change or a change of permissions by submitting the [**Research Computing Support Request Form**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3).

**5. Removing Unused Data**

If you are no longer using your data and do not anticipate needed it in the future, you should delete it using the `rm` command. 

***Using `rm` is irreversible and will permanently delete a file.***

```js
# To delete a directory and all of its contents
rm -r directory/
```

:::tip
### Understanding Block and Inode Quotas

Storage quotas consist of two parts: (1) block and (2) inode. Block quotas corresponds to what most folks traditionally think of when you hear about storage capacity (e.g., 10GB, 1TB). Inode quotas are a limit on the number of files you can have. On local computers the inode limits are high enough for a single user that it's not a concept you have to deal with until you start to use a cluster with larger workflows for the first time. 

Learn more about inodes [**here**](https://www.admin-magazine.com/HPC/Articles/What-Is-an-Inode).
:::
