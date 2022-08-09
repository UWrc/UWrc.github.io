---
slug: hyakstorage-update
title: Update on the hyakstorage command
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [hyak, hpc, supercomputer, storage, quota, hyakstorage]
---

We’ve made an update to our storage accounting tool, `hyakstorage`, and with this update we are also phasing out `usage_report.txt`. That text file contained minimally-parsed internal metrics of the storage cluster, and we found it caused as many questions as it answered. Moving forward, the `hyakstorage` tool will display only the four relevant pieces of information for each fileset you query: storage space used vs. the storage space limit, and current amount of files (inodes) vs. maximum number of files.

The default operation–running `hyakstorage` with no arguments–will show your home directory & the gscratch directories you have access to, and it will only show the fileset totals & your contributions.

You can also specify which filesets you want to view, in a few different ways: you can use the flag `--home` to show your home directory, `--gscratch` to show your gscratch directories, and `--contrib` to show your group’s contrib directories.
You can also specify an exact gscratch directory with the group name (e.g. `hyakstorage stf`), contrib directory (e.g. `hyakstorage stf-src`), or full path to a fileset (e.g. `hyakstorage /mmfs1/gscratch/stf`).

If you want more detailed metrics, you can use the flags `--show-user` or `--show-group` to break down the fileset totals by individual users or groups. Those detailed metrics can be sorted by space with `--by-disk` (the default) or by files with `--by-files`.

**See also:**
* [gscratch documentation](/docs/storage/gscratch).
* [hyakstorage documentation](/docs/storage/gscratch#checking-utilization-hyakstorage).
