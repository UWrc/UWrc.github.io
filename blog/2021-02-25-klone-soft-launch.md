---
slug: klone
title: klone Soft Launch
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, launch, features]
---

[pytorch-cuda10]: /img/blog/pytorch-cuda10.png 'Pytorch install instructions for pip with CUDA10'

### February 25, 2021

The UW research computing team celebrates the soft launch of project `klone`, the 3rd generation Hyak supercomputer. Welcome to those researchers invited to participate in the early access program 🥳 🎉

:::caution
There will be weekly maintenance days on Tuesday during the soft launch period after which we will move back to our regular cadence of monthly maintenance windows.
:::

The user documentation [[link](/docs/)] has been updated to reflect the changes and new features of `klone` but this will be an ongoing process.

#### Compute
- Soft launch with 1,920 compute cores over 48 nodes:
  - 28 x `mem1` nodes (192GB of memory each) in the `compute` partition,
  - 4 x `mem2` nodes (384GB of memory each) in the `compute-bigmem` partition,
  - 16 x `mem3` nodes (768GB of memory each) in the `compute-hugemem` partition.
- `build` nodes no longer exist on klone as they did on mox. All instances have the potential to be interactive and all have internet routing by default (even non-interactive jobs).

#### Storage
- `gscratch` on klone is 1.4PB total capacity with a **new** 500TB NVMe flash tier. Data tiering happens automagically, if you use a file frequently it will be moved to the faster storage.
- Storage quota is still charged back at the same rate ($10 / TB / month). Researchers receive 1TB per node purchased and contributed to klone.

#### Data
- `gscratch` is **not backed up** that is the responsibility of the researcher (e.g., LOLO, the cloud, external hard drive). Feel free to <a href="mailto:help@uw.edu?subject=hyak archive">email</a> us if you have any questions.
- While all nodes have internet access now, transfer data using the login nodes. Login nodes have full 2 x 40 Gbps bandwidth. If you transfer using a compute node interactive session you are limited to 1 x 1 Gbps connection.

#### Software
- modules works the same as it did on mox. This is an improved implementation called LMOD on klone compared to environment modules on mox.
- We provide the basic compilers (e.g., GNU, Intel) as modules.
- The Hyak team is encouraging a container first world (i.e., use Singularity).

### March 3, 2021

The updated total is **3,840 cores** and **96 nodes** on klone.

#### Compute
- Compute has doubled by adding another rack to klone, an additional 1,920 compute cores over 48 nodes: 
  - 44 x `mem1` nodes (192GB of memory each) in the `compute` partition,
  - 2 x `mem2` nodes (384GB of memory each) in the `compute-bigmem` partition,
  - 2 x `mem3` nodes (768GB of memory each) in the `compute-hugemem` partition.

#### Software
- We created a module for `cmake`.

### March 5, 2021

#### Storage
- Implemented `usage_report.txt` files in the base folder of `/gscratch/yourlab/` that is updated once an hour to reflect both your block quota and inode capacity usage. This is similar to the `gscratch` experience on the MOX cluster.

#### Website
- We migrated our site from <a href="https://UWrc.github.io">`https://UWrc.github.io`</a> to its new home at <a href="https://hyak.uw.edu">`https://hyak.uw.edu`</a>.

### March 9, 2021

#### Storage
- Snapshots are here! We are piloting once an hour for 24 hours for every lab storage folder under `/gscratch/`. Check out the updated documentation [here](/docs/storage/gscratch#group-or-lab-directories) on how to access past snapshots.

#### Software
- We created more LMOD software modules: 
  - Matlab R2020b [[docs](/docs/tools/matlab)]
  - OpenMPI-4.1.0

### March 12, 2021

- LMOD software modules:
  - Intel has bundled their software suite (e.g., compiler, MPI) as oneCLI and we created this module (i.e., `module load intel/oneCLI`).
  - There is now a "contrib" framework for groups to store their shared codes separately from their `/gscratch/labname/` data. You can get 100GB of storage to compile codes at `/sw/contrib/labname-src/` and then put your LMOD module file in `/sw/contrib/modulefiles/labname/`. Your module would appear when anyone runs `module avail`. This is created upon request so if you'd like to opt-in your group please let us know.

### April 13, 2021

Things have been going steady the past week and changes are coming less frequently. We are now increasing time between maintenance periods on klone from weekly on Tuesdays to monthly and aligning it with the mox maintenance as the 2nd Tuesday of every month.

That wraps up our klone soft launch blog updates here, other updates will appear on our Hyak users mailing list. Don't forget to subscribe, instructions on [this page](/docs/account-activation) at the bottom.
