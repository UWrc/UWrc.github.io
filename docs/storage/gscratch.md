---
id: gscratch
title: Storage on HYAK
---

Storage mounted on either the 3rd generation HYAK cluster `klone` or the 2nd generation HYAK cluster `mox` is referred to as `gscratch` due to that being the mount point on the cluster (i.e., `/gscratch/somefolder/anotherfolder`) and a reminder to our researchers that anything here is "scratch" or **NOT BACKED UP**. Refer to the [storage introduction page](data) for details on how to manage your data life cycle and adhere to the 3-2-1 backup policy.

Every user has a [home directory](#user-home-directory) by default, most users have a `mox` account by virtue of being the member of some lab with dedicated nodes so you have access to [lab dedicated storage](#group-or-lab-directories), and there's also [scrubbed](#scrubbed) storage for temporary overflow use.

## User Home Directory

Each users' home directory is located at the folder path `/mmfs1/home/netID` on KLONE and `/usr/lusers/netID` or `/gscratch/home/netID` on MOX where `netID` is your UW netID. You are placed here by default when you log into MOX. You can always refer to it using the usual Linux shortcuts of `$HOME` or `~`.

:::note
Your home directory quota is 10 GB or 250,000 files.
:::

You can check your live home directory usage using the following command.

```
mmlsquota --block-size G gscratch:home
````

Ideally you only keep personal code bases or smaller data sets here. This quota can not be changed, if you need more data one of the other storage spots on `gscratch` are better suited.

## Group or Lab Directories

If you run the `groups` command you'll see what groups you are a member of. For example, one of my groups is `stf`, which means I'm a member of the "stf" group (i.e., the Research Computing Club). Whatever groups you are seeing here you can access your lab storage at `/gscratch/mylab/` where `mylab` is any group you're a member of. In this example that means I have access to the `/gscratch/stf/` and only members of the `stf` group have access to this folder.

:::caution
On MOX the group names have a hyak prefix. For example, `stf` will appear as `hyak-stf`.
:::

Your lab gets 500 GB per node that your group has contributed to `mox` (or 2 TB per node in the case of a GPU node).

:::tip
Your lab quota can be increased for $10 / TB / month.
:::

Your lab storage quota can be increased (or decreased) in 1 TB granularity and adjusted on a month-to-month basis as your needs require. If you hit file (i.e., `inode`) limits, <a href="help@uw.edu?subject=hyak storage inode adjustment">email us</a> and we can increase those limits for no additional cost.

:::important
Check group quotas and current use by looking at the `/gscratch/mylab/usage_report.txt` file.
:::

## Scrubbed

If you need space but only temporarily (i.e., less than 1 month) then you can make use of the scrubbed folder. The scrubbed folder lives at `/gscratch/scrubbed/` and anything underneath this folder is a free-for-all space. You can create a folder for yourself and do whatever you need subject to system constraints but note there is a purge policy where any file not accessed for 21 days (i.e., 3 weeks) is automatically deleted. This is to provide a useful (and free) flex capacity for any research group that needs it and can work within these policy restraints. However, we encourage users who need a more persistent storage location to purchase `gscratch`.

:::caution
AUTO-DELETE: Files not accessed for 3 weeks (i.e., 21 days) in scrubbed will automatically be deleted. Consider purchasing `gscratch` storage if you want a more persistent storage location.
:::

Starting with the KLONE cluster there are additional differentiating factors beyond the auto-delete policy, namely that all read and writes here will only stay on spinning disk. `gscratch` on KLONE has access to a tiering engine that auto writes to a performant NVMe flash tier so scrubbed will be slower than paid for `gscratch` on KLONE. On MOX there is no additional performance distinction for scrubbed compared to `gscratch`.

Please note the scrubbed space is completely open so use Linux group changes and modifications to restrict access as appropriate.

:::caution
PRIVACY: Writes are public by default, it is the responsibility of the individual researcher to lock down anything they wish to use in scrubbed.
:::
