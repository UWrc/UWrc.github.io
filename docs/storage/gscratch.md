---
id: gscratch
title: Storage on HYAK
---

Storage mounted on either the 3rd generation HYAK cluster `klone` or the 2nd generation HYAK cluster `mox` is referred to as `gscratch` due to that being the mount point on the cluster (i.e., `/gscratch/somefolder/anotherfolder`) and a reminder to our researchers that anything here is "scratch" or **NOT BACKED UP**. Refer to the [**storage introduction page**](https://hyak.uw.edu/docs/storage/data) for details on how to manage your data life cycle and adhere to the 3-2-1 backup policy.

Every user has a [**Home directory**](#user-home-directory) by default, most users have a cluster account by virtue of being the member of a lab group with dedicated slices so you have access to [**lab dedicated storage**](#group-or-lab-directories), and there's also [**scrubbed**](#scrubbed) storage for temporary overflow use.

## Understanding Block and Inode Quotas

Storage quotas consist of two parts: (1) block and (2) inode. Block quotas corresponds to what most folks traditionally think of when you hear about storage capacity (e.g., 10GB, 1TB). Inode quotas are a limit on the number of files you can have. On local computers the inode limits are high enough for a single user that it's not a concept you have to deal with until you start to use a cluster with larger workflows for the first time. If you need additional block or inode quota, please refer to the storage section on the [pricing page](https://hyak.uw.edu/pricing).



:::info
Learn more about inodes [**here**](https://www.admin-magazine.com/HPC/Articles/What-Is-an-Inode).
:::


## Checking Utilization `hyakstorage`

The `hyakstorage` command is unique to KLONE and a tool to monitor your storage quota utilization in both your home and group (or lab) directories.

```shell-session terminal=true
$ hyakstorage --help
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
$
```

If you run `hyakstorage` without any arguments you'll receive the status of your home and all group (or lab) directories you have access to. The viewing options, `--show-group` and `--show-user`, will show a more detailed breakdown of storage use by group & users. By default, those detailed views will be sorted by disk usage (i.e. `--by-disk`), but you can also sort by files owned with `--by-files`.

:::note
The quotas reported by `hyakstorage` are updated once every hour, not immediately. Since quotas reported by `hyakstorage` are updated once an hour, if you receive an out of space error it might not appear that you are right away. Moreover, if you make efforts to clear storage, you might not see those efforts relected in the `hyakstorage` data for a little while.
:::

:::tip pro tip: Storage monitoring
To monitor storage changes in real-time, use the following command, which will show you how much storage is occupied by each item in the directory where the command is executed. IF you are cleaning up storage, this command will show new storage counts as changes are made. 
```bash
du -h --max-depth 1
```
:::

## User Home Directory

- ***10 GB, only yours, everyone has one.***

Each users' Home directory is located at the folder path `/mmfs1/home/UWnetID` on KLONE or `/usr/lusers/UWnetID` and `/gscratch/home/UWnetID` on MOX where `UWnetID` is your UW netID. You are placed here by default when you log into the cluster. 

:::note
Your Home directory quota is 10 GB or ~250,000 inodes.
:::

On `klone`, monitor your Home directory with `hyakstorage` as discussed above and shown below. You can check your home directory usage using the `hyakstorage` command without the `--home` flag but it will also display all the lab or group quotas you have access to. As you can see below from the `hyakstorage` output on KLONE, I am currently using 4GB out of a 10GB block quota and 4,764 inodes (i.e., files) out of a 256,000 inode quota.

```bash
hyakstorage --home
                           Usage report for /mmfs1/home/UWNetID
╭──────────────────────┬────────────────────────────────┬────────────────────────────────╮
│                      │ Disk Usage                     │ Files Usage                    │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Total:               │ 4GB / 10GB                     │ 4764 / 256000 files            │
│                      │ 40%                            │ 2%                             │
╰──────────────────────┴────────────────────────────────┴────────────────────────────────╯
```

To check your home directory quota on `mox`.

```
mmlsquota --block-size G gscratch:home
```

Ideally you only keep personal code bases or smaller data sets here. This quota can not be changed, if you need more data one of the other storage spots on `gscratch` (e.g., lab folder, scrubbed) are better suited.

:::tip PRO TRIP - FYI
Your Home directory is a directory under the HYAK file system that each user is given when their account is created. When you log into HYAK, your shell (your view) will be your Home directory. Meaning that when you use the command print working directory or `pwd` you will see the absolute path (i.e., address in the file system) of your Home directory: 

```bash
pwd
/mmfs1/home/UWNetID
```
Above, **UWNetID** in this case will be replaced with your **UWNetID**. For example, as the author of this documentation (username `finchkn`), when I use `pwd` after I login, I see: 
```bash
pwd
//highlight-next-line
/mmfs1/home/finchkn
```
There are many shortcuts to get to your home directory from anywhere on `klone`. 
```bash
# All of the following will take me to my Home Directory:
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

## Group or Lab Directories

- Shared lab storage at $10 / 1 TB [1M files] / month.
- NVMe flash tier on KLONE.

If you run the `groups` command you'll see what groups you are a member of. For example, one of my groups is `stf`, which means I'm a member of the "stf" group (i.e., the Research Computing Club). Whatever groups you are seeing here you can access your lab storage at `/gscratch/mylab/` where `mylab` is any group you're a member of. In this example that means I have access to the `/gscratch/stf/` and only members of the `stf` group have access to this folder. Please note, on MOX the group names have a hyak prefix. For example, `stf` will appear as `hyak-stf`.

Your lab gets 1 TB per slice that your group has contributed to `klone`, which includes HPC (CPU-only) and GPU slices.

:::note
Your lab quota can be increased for $10 / TB / month.
:::

Your lab storage quota can be increased (or decreased) in 1 TB granularity and adjusted on a month-to-month basis as your needs require. If you need additional block or inode quota, please refer to the pricing page: [HYAK Pricing](https://hyak.uw.edu/pricing)

:::important
Check group quotas and current use with the `hyakstorage` command.
:::

## Scrubbed

- Free to use but files auto-deleted beyond 21 days.
- Slower than `gscratch` lab directories.
- No snapshots.

If you need space but only temporarily (i.e., less than 3 weeks) then you can make use of the scrubbed folder. The scrubbed folder lives at `/gscratch/scrubbed/` and anything underneath this folder is a free-for-all space. You can create a directory for yourself and do whatever you need subject to system constraints but note there is a purge policy where any file not accessed for 21 days (i.e., 3 weeks) is automatically deleted. This is to provide a useful (and free) flexible storage capacity for any research group that needs it and can work within these policy restraints. However, we encourage users who need a more persistent storage location to purchase `gscratch`.

:::warning
AUTO-DELETE: Files not accessed for 3 weeks (i.e., 21 days) in scrubbed will automatically be deleted. Consider purchasing `gscratch` storage if you want a more persistent storage location.
:::

Starting with the `klone` cluster there are additional differentiating factors beyond the auto-delete policy, namely that all read and writes here will only stay on spinning disk. `gscratch` on `klone` has access to a tiering engine that auto writes to a performant NVMe flash tier so scrubbed will be slower than paid for `gscratch` on `klone`. On `mox` there is no additional performance distinction for scrubbed compared to `gscratch`.

Please note the scrubbed space permissions are completely open by default so use Linux group changes and modifications to restrict access as appropriate.

:::caution
PRIVACY: Writes to `scrubbed` are public by default, it is the responsibility of the individual researcher to lock down anything they wish to use in scrubbed.
:::
