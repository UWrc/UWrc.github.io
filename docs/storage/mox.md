---
id: mox
title: Storage on MOX
---

`mox` is the 2nd generation Hyak cluster. Storage mounted on `mox` is sometimes referred to as `gscratch` due to that being the mount point on the cluster (i.e., `/gscratch/somefolder/anotherfolder`) and a reminder to our researchers that anything here is "scratch" or **NOT BACKED UP**. Refer to the [storage introduction page](data) for details on how to manage your data life cycle.

Every user has a [home directory](#user-home-directory) by default, most users have a `mox` account by virtue of being the member of some lab with dedicated nodes so you have access to [lab dedicated storage](#group-or-lab-directories), and there's also [scrubbed](#scrubbed) storage for temporary overflow use.

## User Home Directory

Each users' home directory is located at the folder path `/gscratch/home/netID` where `netID` is your UW netID. You are placed here by default when you log into `mox`. You can always refer to it using the usual Linux shortcuts of `$HOME` or `~`.

:::note
Your home directory quota is 10 GB or 250,000 files.
:::

You can check your live home directory usage using the following command.

```
mmlsquota --block-size G gscratch:home
````

Ideally you only keep personal code bases or smaller data sets here. This quota can not be changed, if you need more data one of the other storage spots on `gscratch` are better suited.

## Group or Lab Directories

If you run the `groups` command on `mox` you'll see what groups you are a member of. For example, one of my groups is `hyak-stf`, which means I'm a member of the "stf" group (i.e., the Research Computing Club). Whatever groups you are seeing here you can access your lab storage at `/gscratch/mylab/` where `mylab` is any group you're a member of. In this example that means I have access to the `/gscratch/stf/` and only members of the `hyak-stf` group have access to this folder.

Your lab gets 500 GB per node that your group has contributed to `mox` (or 2 TB per node in the case of a GPU node).

:::tip
Your lab quota can be increased for $10 / TB / month.
:::

Your lab storage quota can be increased (or decreased) in 1 TB granularity and adjusted on a month-to-month basis as your needs require. If you hit file limits, <a href="help@uw.edu">email us</a> and we can increase those limits for no additional cost.

:::important
Check group quotas and current use by looking at the `/gscratch/mylab/usage_report.txt` file.
:::

## Scrubbed

If you need space but only temporarily (i.e., less than 1 month) then you can make use of the scrubbed folder. The scrubbed folder lives at `/gscratch/scrubbed/` and anything underneath this folder is a free-for-all space. You can create a folder for yourself and do whatever you need. Please note it's completely open 

:::caution
Auto-delete: 
:::



:::caution
Privacy: 
:::


