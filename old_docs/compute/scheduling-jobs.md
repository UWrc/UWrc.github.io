---
id: scheduling-jobs
title: Scheduling Jobs
sidebar-label: Scheduling Jobs
---

`KLONE` uses the [SLURM](https://slurm.schedmd.com/overview.html) job scheduler. When you first ssh into KLONE (e.g., `klone.hyak.uw.edu`) you land on one of the two login nodes (i.e., `klone1`, `klone2`). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should not use login nodes for heavy compute and automated mechanisms exist to monitor and enforce violations. The tool used is "arbiter2" and you will receive an email for each offending process [(Gardner, Migacz, and Haymore 2019)](#ref_arbiter).

## Compute Resources

The SLURM scheduler has two high-level concepts you need to know, [accounts](#accounts) and [partitions](#partitions).
### Accounts

With the `hyakalloc` command [[src](/docs/compute/resource-monitoring#hyakalloc)] you can further see not only which accounts you are able to submit jobs to but also their current utilization. Resource limits are directly proportional to what was contributed by that group.

### Partitions

If you run `sinfo` you can see all the partitions available. Each partition represents a class of node from the standard `compute` partition to those with high-memory or for different types of GPUs.

## Job Types

There are a few popular types of jobs you could submit:
* [interactive](#interactive-jobs) where you and test out your workflows live,
* [batch](#batch-jobs) which are unattended (you get an email when completed), and
* [recurring](#null) or "CRON-like" processes that happen on a regular basis.

### SLURM Arguments

These are the common and recommended arguments suggested at a minimum to get a job in any form.

:::important
If you are using an interactive node to run a parallel application such as Python multiprocessing, MPI, OpenMP, etc. then the number given for the `--ntasks-per-node` option must match the number of processes used by your application.
:::

| Arguments | Command Flags | Notes |
| - | - | - |
| Account | `-A` or `--account` | What lab are you part of? If you run the `groups` command you can see what groups (usually labs) you're a member of, these are associated with resource limits on the cluster. See the [accounts](#accounts) section for additional information. |
| Partition | `-p` or `--partition` | What resource partition are you interested in using? This could be anything you see when you run `sinfo` as each partition corresponds to a class of nodes (e.g., high memory, GPU). See the [partitions](#partitions) section for additional information. |
| Nodes | `-N` or `--nodes` | How many nodes are these resources spread across? In the overwhelming number of cases this is 1 (for a single node) but more sophisticated multi-node jobs could be run if your code supports it. |
| Cores | `-c` or `--cpus-per-task` | How many compute cores do you need? Not all codes can make use of multiple cores and if they do, the performance of the code is not always linear with the resources requested. If in doubt consider contacting the research computing team to assist in this optimization. |
| Memory | `--mem` | How much memory do you need for this job? This is in the format `size[units]` were size is a number and units are either `M`, `G`, or `T` for megabyte, gigabyte, and terabyte respectively. Megabyte is the default unit if none is provided. |
| Time | `-t` or `--time` | What's the maximum runtime for this job? Common acceptable time formats include `hours:minutes:seconds`, `days-hours`, and `minutes`. |

### Interactive Jobs (Single Node)

Resources for interactive jobs are attained either using `salloc`. To get resources on a compute node interactively consider the example below.

```shell
salloc -A mylab -p compute -N 1 -c 4 --mem=10G --time=2:30:00
```

In this case you are requesting a slice of the standard compute node class that your group `mylab` contributed to the cluster. You are asking for 4 compute cores with 10GB of memory for 2 hours and 30 minutes spread across 1 node (single machine). The `salloc` command will automatically create an interactive shell session on an allocated node.

### Interactive Jobs (Multi Node)

Building upon the previous section, if `-N` or `--nodes` is >1 when running `salloc` you are automatically placed into a shell of one of the allocated nodes. This shell is NOT part of a SLURM task. To view the names of the remainder of your allocated nodes use `scontrol show hostnames`. The `srun` command can be used to execute a command on all of the allocated nodes as shown in the example session below.

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

Below is a slurm script template.  Submit a batch job from the `mox` login node by calling `sbatch <script_name>.slurm`.
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

The value given for `--ntasks-per-node` should be either `28` for older `mox` nodes or `40` for newer `klone` nodes if you wish to maximize use of an entire node.

```shell
SBATCH --nodes=4

SBATCH --ntasks-per-node=28
# OR
SBATCH --ntasks-per-node=40
```

## Common Slurm Error Messages
- **`slurmstepd: error: Exceeded job memory limit`**: your program uses more memory than you allotted during node creation and it has run out of memory.  Get a node with more memory and try again.
- **`(ReqNodeNotAvail, UnavailableNodes:n[<node numbers list>]`**: your node will not expire (and might be running one of your jobs) before the next scheduled maintenance day.  Either get a node with a shorter `--time` duration or wait until after the maintenance has been completed.
- **`Unable to allocate resources: Invalid account or account/partition combination specified`**: you used `-p <group_name> -A <group_name>` and you do not belong to that group.

## Utility Commands 

With `<net_id>` as your UW NetID and `<group_name>` as your Hyak group partition name, and `<job_id>` as an individual job ID:
- [`sinfo`](https://slurm.schedmd.com/sinfo.html) is used to view information about `mox` nodes and partitions.  Use `sinfo -p <group_name>` to view information about your group's partition or allocation.
- [`squeue`](https://slurm.schedmd.com/squeue.html) is used to view information about jobs located in the scheduling queue.  Use `squeue -p <group_name>` to view information about your group's nodes.  Use `squeue -u <net_id>` to view your jobs.
- [`scancel`](https://slurm.schedmd.com/scancel.html) is used to cancel jobs.  Use `scancel <job_id>` to cancel a job with the given job ID, or use `scancel -u <net_id>` to cancel all of your jobs.
- [`sstat`](https://slurm.schedmd.com/sstat.html) displays status information of a running job pertaining to CPU, Task, Node, Resident Set Size (RSS), and Virtual Memory (VM) statistics.  Read the [man page](https://slurm.schedmd.com/sstat.html) for a comprehensive list of format options.  
- [`sacct`](https://slurm.schedmd.com/sacct.html) displays information about completed jobs.  Read the [man page](https://slurm.schedmd.com/sacct.html) for a comprehensive list of format options.
- [`sreport`](https://slurm.schedmd.com/sreport.html) generates reports about job usage and cluster utilization from Slurm accounting (`sacct`) data.  For example, to get historical usage the group `<group_name>` in March 2020, use `sreport cluster UserUtilizationByAccount Start=2020-03-01 End=2020-03-31 Accounts=<group_name>`.

## Man Pages

All of these man pages can also be viewed on `mox` by running `man <command>`. 

- [`sacct`](https://slurm.schedmd.com/sacct.html)
- [`salloc`](https://slurm.schedmd.com/salloc.html)
- [`sbatch`](https://slurm.schedmd.com/sbatch.html)
- [`scancel`](https://slurm.schedmd.com/scancel.html)
- [`scontrol`](https://slurm.schedmd.com/scontrol.html)
- [`sinfo`](https://slurm.schedmd.com/sinfo.html)
- [`squeue`](https://slurm.schedmd.com/squeue.html)
- [`sreport`](https://slurm.schedmd.com/sreport.html)
- [`srun`](https://slurm.schedmd.com/srun.html)
- [`sstat`](https://slurm.schedmd.com/sstat.html)

## References

1. Gardner, Dylan, Robben Migacz, and Brian Haymore. "Arbiter: Dynamically Limiting Resource Consumption on Login Nodes." Proceedings of the Practice and Experience in Advanced Research Computing on Rise of the Machines (learning). 2019. 1-7. [DOI: [10.1145/3332186.3333043](https://doi.org/10.1145/3332186.3333043)] [Code: [Gitlab](https://gitlab.chpc.utah.edu/arbiter2/arbiter2)] <a name="ref_arbiter" />
2. 
