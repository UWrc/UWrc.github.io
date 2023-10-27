---
id: gscratch
title: Storage on HYAK
---

Storage mounted on either the 3rd generation HYAK cluster `klone` or the 2nd generation HYAK cluster `mox` is referred to as `gscratch` due to that being the mount point on the cluster (i.e., `/gscratch/somefolder/anotherfolder`) and a reminder to our researchers that anything here is "scratch" or **NOT BACKED UP**. Refer to the [storage introduction page](data) for details on how to manage your data life cycle and adhere to the 3-2-1 backup policy.

Every user has a [home directory](#user-home-directory) by default, most users have a cluster account by virtue of being the member of some lab with dedicated nodes so you have access to [lab dedicated storage](#group-or-lab-directories), and there's also [scrubbed](#scrubbed) storage for temporary overflow use.

## Understanding Block and Inode Quotas

Storage quotas consist of two parts: (1) block and (2) inode. Block quotas corresponds to what most folks traditionally think of when you hear about storage capacity (e.g., 10GB, 1TB). Inode quotas are a limit on the number of files you can have. On local computers the inode limits are high enough for a single user that it's not a concept you have to deal with until you start to use a cluster with larger workflows for the first time.

:::info
Learn more about inodes [here](https://www.admin-magazine.com/HPC/Articles/What-Is-an-Inode).
:::

We focus mostly on block quotas when assigning storage as the ratio of inode to block usage varies from lab-to-lab and workflow-to-workflow. So long as the researcher has taken every reasonable step and recommendation we have to optimize their usage of their given inodes, if it's within reason, we can accommodate further inode quota increases. Submit a ticket with details about your request.
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
The quotas reported by `hyakstorage` are updated once every hour.
:::

Since quotas reported by `hyakstorage` are updated once an hour, if you receive an out of space error it might not appear that you are right away.

## User Home Directory

- 10 GB, only yours, everyone has one.

Each users' home directory is located at the folder path `/mmfs1/home/netID` on KLONE or `/usr/lusers/netID` and `/gscratch/home/netID` on MOX where `netID` is your UW netID. You are placed here by default when you log into the cluster. You can always refer to it using the usual Linux shortcuts of `$HOME` or `~`.

:::note
Your home directory quota is 10 GB or ~250,000 inodes.
:::

To check your home directory quota on KLONE.

```
hyakstorage --home
```

To check your home directory quota on MOX.

```
mmlsquota --block-size G gscratch:home
```

You can check your home directory usage using the `hyakstorage` command without the `--home` flag but it will also display all the lab or group quotas you have access to. As you can see below from the `hyakstorage` output on KLONE, I am currently using 4GB out of a 10GB block quota and 4,764 inodes (i.e., files) out of a 256,000 inode quota.

```shell-session terminal=true
$ hyakstorage --home
                           Usage report for /mmfs1/home/mwanek
╭──────────────────────┬────────────────────────────────┬────────────────────────────────╮
│                      │ Disk Usage                     │ Files Usage                    │
├──────────────────────┼────────────────────────────────┼────────────────────────────────┤
│ Total:               │ 4GB / 10GB                     │ 4764 / 256000 files            │
│                      │ 40%                            │ 2%                             │
╰──────────────────────┴────────────────────────────────┴────────────────────────────────╯
````

Ideally you only keep personal code bases or smaller data sets here. This quota can not be changed, if you need more data one of the other storage spots on `gscratch` (e.g., lab folder, scrubbed) are better suited.

## Group or Lab Directories

- Shared lab storage at $10 / TB / month.
- NVMe flash tier on KLONE.

If you run the `groups` command you'll see what groups you are a member of. For example, one of my groups is `stf`, which means I'm a member of the "stf" group (i.e., the Research Computing Club). Whatever groups you are seeing here you can access your lab storage at `/gscratch/mylab/` where `mylab` is any group you're a member of. In this example that means I have access to the `/gscratch/stf/` and only members of the `stf` group have access to this folder. Please note, on MOX the group names have a hyak prefix. For example, `stf` will appear as `hyak-stf`.

Your lab gets 1 TB per node that your group has contributed to KLONE (or 4 TB per node in the case of a GPU node).

:::tip
Your lab quota can be increased for $10 / TB / month.
:::

Your lab storage quota can be increased (or decreased) in 1 TB granularity and adjusted on a month-to-month basis as your needs require. If you hit file (i.e., `inode`) limits, <a href="mailto:help@uw.edu?subject=hyak storage inode adjustment">email us</a> and we can increase those limits for no additional cost if your workflows warrant.

:::important
Check group quotas and current use with the `hyakstorage` command.
:::

## Scrubbed

- Free to use but files auto-deleted beyond 21 days.
- Slower than `gscratch` lab directories.
- No snapshots.

If you need space but only temporarily (i.e., less than 3 weeks) then you can make use of the scrubbed folder. The scrubbed folder lives at `/gscratch/scrubbed/` and anything underneath this folder is a free-for-all space. You can create a folder for yourself and do whatever you need subject to system constraints but note there is a purge policy where any file not accessed for 21 days (i.e., 3 weeks) is automatically deleted. This is to provide a useful (and free) flex capacity for any research group that needs it and can work within these policy restraints. However, we encourage users who need a more persistent storage location to purchase `gscratch`.

:::caution
AUTO-DELETE: Files not accessed for 3 weeks (i.e., 21 days) in scrubbed will automatically be deleted. Consider purchasing `gscratch` storage if you want a more persistent storage location.
:::

Starting with the KLONE cluster there are additional differentiating factors beyond the auto-delete policy, namely that all read and writes here will only stay on spinning disk. `gscratch` on KLONE has access to a tiering engine that auto writes to a performant NVMe flash tier so scrubbed will be slower than paid for `gscratch` on KLONE. On MOX there is no additional performance distinction for scrubbed compared to `gscratch`.

Please note the scrubbed space is completely open so use Linux group changes and modifications to restrict access as appropriate.

:::caution
PRIVACY: Writes are public by default, it is the responsibility of the individual researcher to lock down anything they wish to use in scrubbed.
:::
