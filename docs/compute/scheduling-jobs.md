---
id: scheduling-jobs
title: Scheduling Jobs
sidebar-label: Scheduling Jobs
---

`klone` uses the [Slurm](https://slurm.schedmd.com/overview.html) job scheduler. When you first ssh into `klone` you land on one of the two login nodes (e.g., `klone-login01`). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should never use login nodes for heavy computing and automated mechanisms exist to monitor and enforce violations. The tool used to notify users of violations is "arbiter2" and you will receive an email for each offending process [**(Gardner, Migacz, and Haymore 2019)**](https://hyak.uw.edu/docs/compute/scheduling-jobs#ref_arbiter).

To keep the login node in stable working order and ensure fair usage of the login node as a community resource, Hyak has a job scheduling software that will give you access to other nodes (i.e., different computers that are part of the `klone` cluster). The job scheduler software is called Slurm, and regular users of Hyak need to learn how to use Slurm to effectively and efficiently make use of Hyak as a resource for research computing.

:::tip Check out our tutorial Focused on Slurm
If you are new to Hyak and using the job scheduler, Slurm, you may find our Slurm tutorial helpful to walk you thorugh basic and advanced usage. [**Click here to jump to the tutorial.**](https://hyak.uw.edu/docs/hyak101/basics/syllabus_slurm)
This tutorial can also be followed in video form [**HERE**](https://www.youtube.com/watch?v=iYM7xpRhp8I).
:::

## Compute Resources

The Slurm scheduler has two high-level concepts you need to know, [**accounts**](https://hyak.uw.edu/docs/compute/start-here#accounts) and [**partitions**](https://hyak.uw.edu/docs/compute/start-here#partitions).

With the `hyakalloc` command [[**source code here**](/docs/compute/resource-monitoring#hyakalloc)] you can further see not only which accounts you are able to submit jobs to but also their current utilization. Resource limits are directly proportional to what was contributed by that group.

While you won't necessarily have access to them, it might be useful for you to see a list of Hyak's partitions. The `sinfo` commands contains information about the servers or nodes that compose Hyak, and the `sinfo -s` commands give you a summary for this information including the partitions and the hostnames that fall into each partition. 

```bash
sinfo -s
```
```bash
PARTITION        AVAIL  TIMELIMIT   NODES(A/I/O/T) NODELIST
compute-bigmem      up   infinite        28/0/0/28 n[3008-3011,3064,3066,3132-3133,3190,3244-3247,3252-3255,3353-3355,3400-3407]
ckpt                up   infinite   327/173/10/510 g[3001-3007,3010-3017,3020-3027,3030-3037,3040-3047,3050-3057,3060-3067,3070-3077,3080-3085],n[3000-3431],z[3001-3002,3005-3011]
ckpt-all            up   infinite   368/195/10/573 g[3001-3007,3010-3017,3020-3027,3030-3037,3040-3047,3050-3057,3060-3067,3070-3077,3080-3085,3090-3122],n[3000-3461],z[3001-3002,3005-3011]
ckpt-g2             up   infinite       41/22/0/63 g[3090-3122],n[3432-3461]
compute*            up   infinite    197/170/7/374 n[3012-3015,3024-3063,3068-3131,3134-3189,3191-3239,3248-3251,3256-3299,3304-3352,3356-3363,3368-3399,3408-3431]
cpu-g2              up   infinite        7/19/0/26 n[3432-3438,3440,3442,3444,3446-3461]
cpu-g2-mem2x        up   infinite          2/2/0/4 n[3439,3441,3443,3445]
gpu-2080ti          up   infinite        10/1/2/13 g[3001-3007,3014-3017,3027],z3001
gpu-a100            up   infinite          8/0/0/8 g[3080-3085],z[3010-3011]
gpu-a40             up   infinite        32/0/0/32 g[3040-3047,3050-3057,3060-3067,3070-3077]
gpu-l40             up   infinite        15/0/0/15 g[3090-3099,3115-3119]
gpu-l40s            up   infinite        17/1/0/18 g[3100-3114,3120-3122]
gpu-p100            up   infinite          2/0/0/2 z[3005-3006]
gpu-rtx6k           up   infinite        19/0/0/19 g[3010-3013,3020-3026,3030-3037]
gpu-titan           up   infinite          1/0/0/1 z3002
compute-hugemem     up   infinite        27/2/1/30 n[3000-3007,3016-3023,3065,3067,3240-3243,3300-3303,3364-3367]
compute-ultramem    up   infinite          3/0/0/3 z[3007-3009]
```

Each partition represents a class of node from the standard `compute` partition to those with high-memory or for different types of GPUs.

## Job Types

There are a few popular types of jobs you could submit:
* [**interactive**](#interactive-jobs) where you and test out your workflows live,
* [**batch**](#batch-jobs) which are unattended (you get an email when completed), and
* [**recurring**](#null) or "CRON-like" processes that happen on a regular basis.

### Slurm Arguments

These are the common and recommended arguments suggested at a minimum to get a job in any form.

:::important
If you are using an interactive node to run a parallel application such as Python multiprocessing, MPI, OpenMP, etc. then the number given for the `--ntasks-per-node` option must match the number of processes used by your application.
:::

| Arguments | Command Flags | Notes |
| - | - | - |
| Account | `-A` or `--account` | What lab are you part of? If you run the `groups` command you can see what groups (usually labs) you're a member of, these are associated with resource limits on the cluster. See the [**accounts**](#accounts) section for additional information. |
| Partition | `-p` or `--partition` | What resource partition are you interested in using? This could be anything you see when you run `sinfo -s` as each partition corresponds to a class of nodes (e.g., high memory, GPU). See the [**partitions**](#partitions) section for additional information. |
| Nodes | `-N` or `--nodes` | How many nodes are these resources spread across? In the overwhelming number of cases this is 1 (for a single node) but more sophisticated multi-node jobs could be run if your code supports it. |
| Cores | `-c` or `--cpus-per-task` | How many compute cores do you need? Not all codes can make use of multiple cores and if they do, the performance of the code is not always linear with the resources requested. If in doubt consider contacting the research computing team to assist in this optimization. |
| Memory | `--mem` | How much memory do you need for this job? This is in the format `size[units]` were size is a number and units are either `M`, `G`, or `T` for megabyte, gigabyte, and terabyte respectively. Megabyte is the default unit if none is provided. |
| Time | `-t` or `--time` | What's the maximum runtime for this job? Common acceptable time formats include `hours:minutes:seconds`, `days-hours`, and `minutes`. |

### Interactive Jobs (Single Node)

Resources for interactive jobs are attained either using `salloc`. To request a compute node from the Checkpoint all partition (`ckpt-all`) interactively consider the example below.

```shell
# Below replace the word account with an account name you belong to 
# Use hyakalloc to see your accounts and partitions
salloc -A account -p ckpt-all -N 1 -c 4 --mem=10G --time=2:30:00
```

In this case you are requesting a slice of the standard compute node class that your group `mylab` contributed to the cluster. You are asking for 4 compute cores with 10GB of memory for 2 hours and 30 minutes spread across 1 node (single machine). The `salloc` command will automatically create an interactive shell session on an allocated node.

### Interactive Jobs (Multi Node)

Building upon the previous section, if `-N` or `--nodes` is >1 when running `salloc` you are automatically placed into a shell of one of the allocated nodes. This shell is NOT part of a Slurm task. To view the names of the remainder of your allocated nodes use `scontrol show hostnames`. The `srun` command can be used to execute a command on all of the allocated nodes as shown in the example session below.

```shell-session terminal=true
[netID@klone1 ~]$ salloc -N 2 -p compute -A stf --time=5 --mem=5G
salloc: Pending job allocation 2620960
salloc: job 2620960 queued and waiting for resources
salloc: job 2620960 has been allocated resources
salloc: Granted job allocation 2620960
salloc: Waiting for resource configuration
salloc: Nodes n[3148-3149] are ready for job
[netID@n3148 ~]$ srun hostname
n3148
n3149
[netID@n3148 ~]$ scontrol show hostnames
n3148
n3149
```

### Interactive Node Partitions

If your group has an interactive node, use the option `-p <partition_name>-int` like below. If you are unsure if your group has an interactive node you can run `hyakalloc` and it will appear if you have one.

```shell
salloc -p <partition_name>-int -A <group_name> --time=<time> --mem=<size>G
```

:::note
- If you are not allocated a session with the specified `--mem` value, try smaller memory values
:::

For more details, read the [`salloc` man page](https://slurm.schedmd.com/salloc.html).

### Slurm Environment Variables

When a job scheduled by Slurm begins, it needs to about how it was scheduled, what its working directory is, who submitted the job, the number of nodes and cores allocated to it, etc.  This information is passed to Slurm via environment variables.  Additionally, these environment variables are also used as default values by programs like `mpirun`.  To view a node's Slurm environment variables, use `export | grep SLURM`.
A comprehensive list of the environment variables Slurm sets for each job can be found at the end of the [`sbatch` man page](https://slurm.schedmd.com/sbatch.html).

## Batch Jobs

### Single Node Batch Jobs

Below is a slurm script template.  Submit a batch job from the `klone` login node by calling `sbatch <script_name>.slurm`.
```shell title="<script_name>.slurm" terminal=true
#!/bin/bash

#SBATCH --job-name=<name>
#SBATCH --mail-type=<status>
#SBATCH --mail-user=<email>

#SBATCH --account=<lab>
#SBATCH --partition=<node_type>
#SBATCH --nodes=<num_nodes>
#SBATCH --ntasks-per-node=<cores_per_node>
#SBATCH --mem=<size[unit]>
#SBATCH --gpus=<type:quantity> 
#SBATCH --time=<time> # Max runtime in DD-HH:MM:SS format.

#SBATCH --chdir=<working directory>
#SBATCH --export=all
#SBATCH --output=<file> # where STDOUT goes
#SBATCH --error=<file> # where STDERR goes

# Modules to use (optional).
<e.g., module load apptainer>

# Your programs to run.
<my_programs>
```

### Multiple Node Batch Jobs

If your batch job is using multiple nodes, your program should also know how to use all the nodes (e.g. your program is an MPI program).

The value given for `--nodes` should be less than or equal to the total number of nodes owned by your group unless you are running in the `ckpt` partition.

The value given for `--ntasks-per-node` can be up to the number of CPUs your group has available, and CPUs exceeding the groups resources can be requested per job using the checkpoint partitions (`ckpt`, `ckpt-all`, or `ckpt-g2`). The `hyakalloc` command can be used to see the number of CPUs or GPUs that can be requested under your account/s. In the case you want to use an entire node, the number of CPUs or cores per node varies based on the hardware model, but some common partitions are the `compute` partition which have `40` cores and the `cpu-g2` and `cpu-g2-mem2x` partitions which have `192` cores. For example, the below would request 4 complete nodes from a `compute` partition.

```shell
SBATCH --nodes=4

SBATCH --ntasks-per-node=40
```

## Common Slurm Error Messages
- **`slurmstepd: error: Exceeded job memory limit`**: your program uses more memory than you allotted during node creation and it has run out of memory.  Get a node with more memory and try again.
- **`(ReqNodeNotAvail, UnavailableNodes:n[<node numbers list>]`**: your node will not expire (and might be running one of your jobs) before the next scheduled maintenance day.  Either get a node with a shorter `--time` duration or wait until after the maintenance has been completed.
- **`Unable to allocate resources: Invalid account or account/partition combination specified`**: you used `-p <group_name> -A <group_name>` and you do not belong to that group.

## Utility Commands 

With `<net_id>` as your UW NetID and `<group_name>` as your Hyak group partition name, and `<job_id>` as an individual job ID:
- [**`sinfo`**](https://slurm.schedmd.com/sinfo.html) is used to view information about `klone` nodes and partitions. Use `sinfo -p <group_name>` to view information about your group's partition or allocation. Use `sinfo -s` to see a list of all partitions.
- [**`squeue`**](https://slurm.schedmd.com/squeue.html) is used to view information about jobs located in the scheduling queue.  Use `squeue -p <group_name>` to view information about your group's nodes.  Use `squeue -u <net_id>` to view your jobs.
- [**`scancel`**](https://slurm.schedmd.com/scancel.html) is used to cancel jobs.  Use `scancel <job_id>` to cancel a job with the given job ID, or use `scancel -u <net_id>` to cancel all of your jobs.
- [**`sstat`**](https://slurm.schedmd.com/sstat.html) displays status information of a running job pertaining to CPU, Task, Node, Resident Set Size (RSS), and Virtual Memory (VM) statistics.  Read the [man page](https://slurm.schedmd.com/sstat.html) for a comprehensive list of format options.  
- [**`sacct`**](https://slurm.schedmd.com/sacct.html) displays information about completed jobs.  Read the [man page](https://slurm.schedmd.com/sacct.html) for a comprehensive list of format options.
- [**`sreport`**](https://slurm.schedmd.com/sreport.html) generates reports about job usage and cluster utilization from Slurm accounting (`sacct`) data.  For example, to get historical usage the group `<group_name>` in March 2020, use `sreport cluster UserUtilizationByAccount Start=2020-03-01 End=2020-03-31 Accounts=<group_name>`.

## Man Pages

All of these man pages can also be viewed on `klone` by running `man <command>`. Exit the `man` command with `q`.

- [**`sacct`**](https://slurm.schedmd.com/sacct.html)
- [**`salloc`**](https://slurm.schedmd.com/salloc.html)
- [**`sbatch`**](https://slurm.schedmd.com/sbatch.html)
- [**`scancel`**](https://slurm.schedmd.com/scancel.html)
- [**`scontrol`**](https://slurm.schedmd.com/scontrol.html)
- [**`sinfo`**](https://slurm.schedmd.com/sinfo.html)
- [**`squeue`**](https://slurm.schedmd.com/squeue.html)
- [**`sreport`**](https://slurm.schedmd.com/sreport.html)
- [**`srun`**](https://slurm.schedmd.com/srun.html)
- [**`sstat`**](https://slurm.schedmd.com/sstat.html)

## References

Gardner, Dylan, Robben Migacz, and Brian Haymore. "Arbiter: Dynamically Limiting Resource Consumption on Login Nodes." Proceedings of the Practice and Experience in Advanced Research Computing on Rise of the Machines (learning). 2019. 1-7. [DOI: [10.1145/3332186.3333043](https://doi.org/10.1145/3332186.3333043)] [Code: [Gitlab](https://gitlab.chpc.utah.edu/arbiter2/arbiter2)] <a name="ref_arbiter" />
