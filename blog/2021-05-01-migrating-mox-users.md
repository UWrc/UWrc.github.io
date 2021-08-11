---
slug: mox-to-klone
title: Migrating from MOX to KLONE
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [mox, klone, hyak, hpc, supercomputer, launch, features]
---

If you were previously a proficient MOX user and now find yourself on KLONE, what's new / different? This is a high-level summary, please consult the documentation [[link](/docs)] for more details.

:::note
Updated **August 10, 2021** to include additional information specific for GPU users.
:::

### Login

* Logging in was previously to `mox.hyak.uw.edu` now it's `klone.hyak.uw.edu`.
* As a reminder login nodes are only to connect to the cluster, navigate the cluster file system, and submit jobs. This applies to both KLONE and MOX. Do not compile codes on the login node or run any programs that require significant compute (get a session with SLURM).

### Data Transfer

* Only use the login node to transfer data on KLONE. On MOX you'd have used a build node or could have used the login node if it wasn't very computationally heavy.

### Storage

* The path to lab storage is still `/gscratch/mylab` on both KLONE and MOX. You'll need to copy over the data from MOX to KLONE you want to continue using.
* Home directories are still 10GB per user, same on both clusters.
* Scrubbed exists on KLONE just as it did on MOX at `/gscratch/scrubbed` this is a free-for-all space on both clusters where files are automatically deleted after 21 days. 
* Some new benefits of the KLONE storage compared to MOX:
  * **There are snapshots for gscratch!** ~~Look inside the `/gscratch/mylab/.snapshots` folder for a copy of your lab folder once an hour, every hour, for 24 hours. This is not a backup copy nor a replacement for version management (e.g., `git`) but useful for retrieving recent versions or something accidentally deleted.~~ This is currently disabled.
  * **More storage!** Previously you received 500GB or 0.5TB of gscratch quota per node (or pair of GPUs) contributed to MOX. Now on KLONE we've doubled your associated storage quota! For example, 2 nodes on MOX would mean 1TB of gscratch but 2 nodes on KLONE now means 2TB of gscratch. If you had an 8 x GPU node on MOX you would have received 2TB of gscratch but an 8 x GPU node on KLONE now means 4TB of gscratch.
  * **It's faster!** We've had reports of performance that's averaging a 30% speed up all else being equal, nothing you need to do aside from use KLONE instead of MOX.
  * **It's faster than fast!** While KLONE storage is faster than MOX storage overall, gscratch on KLONE is further turbo charged with a NVMe flash based tier. NVMe flash is among the fastest storage mediums you can get and further differentiating benefit if you use gscratch vs scrubbed on KLONE.

### Compute

1. When submitting a SLURM job, whether interactive (i.e., `srun`) or batch (i.e., `sbatch`) you'll want to first decide which account to use. This is the group you're part of. You can run the command `groups` to see your affiliated accounts and run `hyakalloc` to see all the resources (e.g., compute cores, memory, GPUs) used and available associated with each affiliated account.
2. Then decide if you want to run this job to count under your resource allocation by submitting to the compute partition (i.e., `-p compute`) or if you want this job to use idle resources from other groups across the cluster using the checkpoint partition (i.e., `-p ckpt`).

* **Non-standard partitions.** Run `sinfo` to see the list of all possible partitions, this is only if your group contributed non-standard nodes (e.g., high memory, GPUs) and need to idenitify the appropriate partition names to get immediate use. Otherwise, you'd only be able to get them in a checkpoint capacity. For GPU users this is currently either the `gpu-2080ti` or the `gpu-rtx6k` partitions for 11GB and 24GB of GPU memory cards, respectively.
* **There is no build node on KLONE.** Get an interactive session (e.g., `srun`) under an existing account and partition combination you have access to. 
* **All nodes have internet now on KLONE.** Do all data transfers to and from KLONE on the KLONE login nodes, the login nodes on KLONE have dual 40 Gbps uplinks to the internet. While the compute nodes on KLONE have internet routing now, they are bottlenecked at 1 Gbps so not suitable for big data transfers. 

### Software

* Singularity containers work the same on both clusters, we encourage this when possible. Refer to our container documentation [[link](/docs/tools/containers)].
* Modules is updated to the latest versions of the most core parts that the HYAK team maintains (e.g., gcc, Intel, Matlab). Refresh yourself about modules [[link](/docs/tools/modules)].
* If neither Singularity nor existing modules works for you, you may have to re-compile your codes on KLONE. "contrib" modules works different now on KLONE vs MOX, please check out the details [[link](/docs/tools/modules#how-do-i-create-shared-lmod-modules-on-klone)].
