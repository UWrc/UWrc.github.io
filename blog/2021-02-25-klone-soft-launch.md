---
id: klone
title: Klone Soft Launch
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, launch, features]
---

[pytorch-cuda10]: /img/blog/pytorch-cuda10.png 'Pytorch install instructions for pip with CUDA10'

:::info
This page will be updated in the evening once every few days starting from soft launch on February 25, 2021 through the full launch to the UW community. Please check back regularly and scroll to the bottom (or click the latest date on the right) for the latest updates.
:::

### February 25, 2021

The UW research computing team celebrates the soft launch of project KLONE, the 3rd generation HYAK supercomputer. Welcome to those researchers invited to participate in the early access program 🥳 🎉

:::caution
There will be weekly maintenance days on Tuesday during the soft launch period after which we will move back to our regular cadence of monthly maintenance windows.
:::

The user documentation [[link](../docs/)] has been updated to reflect the changes and new features of KLONE but this will be an continuous process.

#### Compute
- Soft launch with 1,920 compute cores over 48 nodes:
  - 27 x `mem1` nodes (192GB of memory each) in the `compute` partition,
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
- The HYAK team is encouraging a container first world (i.e., use Singularity).

### February 28, 2021

Update expected in the evening.
