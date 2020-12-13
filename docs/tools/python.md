---
id: python
title: Python
sidebar-label: Python
---

`mox` uses the [Slurm](https://slurm.schedmd.com/overview.html) job scheduler.  With `<net_id>` as your UW NetID, login with `ssh <net_id>@mox.hyak.edu` to gain access to the `mox` login node.  The login node is used only for login and job submission.  The computational work itself is done on a compute or build node.

## Interactive Nodes

There are two types of interactive nodes.  Compute nodes run computations but cannot connect to the internet.  Build nodes are compute nodes that can connect to the Internet to get files and install packages from outside the `mox` ecosystem.

### Obtaining Interactive Nodes

To get an interactive compute node with `<size>` GB of memory in your group partition called `<group_name>` for `<time>` hours, use:
```shell
srun -p <group_name> --time=<time> --mem=<size>G --pty /bin/bash
```
Common acceptable time formats include `hours:minutes:seconds`, `days-hours`, and `minutes`.

Example:
```shell-session terminal=true
[linj66@mox2 ~]$ srun -p stf --time=1:00:00 --mem=20G --pty /bin/bash
[linj66@n2148 ~]$ 
```

---

To get an interactive compute node with `<num_cores>` cores, use:
```shell
srun -p <group_name> -A <group_name> --nodes=1 \
--ntasks-per-node=<num_cores> --time=<time> \
--mem=<size>G --pty /bin/bash
```

---

To get multiple interactive compute nodes with `<num_nodes>` as the number of nodes and `<cores_per_node>` as the number of cores, use:
```shell
srun -p <group_name> -A <group_name> --nodes=<num_nodes> \
--ntasks-per-node=<cores_per_node> --time=<time> \
--mem=<size>G --pty /bin/bash
```
When this command runs, you will automatically enter into a session in one of the allocated nodes.  To view the names of all your allocated nodes, use `scontrol show hostnames`.

:::important
If you are using an interactive node to run a parallel application such as Python multiprocessing, MPI, OpenMP etc. then the number given for the `--ntasks-per-node` option must match the number of processes used by your application.
:::

---

If your group has an interactive node, use the option `-p <group_name>-int` like so: 
```shell
srun -p <group_name>-int -A <group_name> --time=<time> --mem=<size>G --pty /bin/bash
```

:::note
- `--pty /bin/bash` **must** be the last option given in above command
- If you do not obtain a build node with the specified `--mem` value, try smaller memory values
:::

For more details, read the [`srun` man page](https://slurm.schedmd.com/srun.html).

### Build Nodes

Build nodes are allocated from the `build` group partition.  To obtain a build node, execute `srun` with the option `-p build`.

### Specifying Memory Size

It is important to use the `--mem` option to specify the memory allocation; otherwise the Slurm scheduler limits the memory allocation to a default value which is usually quite low.

The value given to `--mem` should be smaller than the memory of the node as the operating system needs some.
- For 64GB nodes, use `--mem=58G`
- For 128GB nodes, use `--mem=120G`
- For 192GB nodes, use `--mem=185G`
- For 256GB nodes, use `--mem=248G`
- For 384GB nodes, use `--mem=374G`
- For 512GB nodes, use `--mem=500G`
- For 768GB nodes, use `--mem=752G`
- For the `knl` nodes, use `--mem=200G`

### Slurm Environment Variables

When a job scheduled by Slurm begins, it needs to about how it was scheduled, what its working directory is, who submitted the job, the number of nodes and cores allocated to it, etc.  This information is passed to Slurm via environment variables.  Additionally, these environment variables are also used as default values by programs like `mpirun`.  To view a node's Slurm environment variables, use `export | grep SLURM`.
A comprehensive list of the environment variables Slurm sets for each job can be found at the end of the [`sbatch` man page](https://slurm.schedmd.com/sbatch.html).

## Batch Jobs

### Single Node Batch Jobs

Below is a slurm script template.  Submit a batch job from the `mox` login node by calling `sbatch <script_name>.slurm`.
```shell title="<script_name>.slurm" terminal=true
!/bin/bash

# JOB NAME
SBATCH --job-name=<your_job_name>

# ALLOCATION DEFINITION
# The account and partition options should be the same
# except in a few cases (e.g. ckpt queue, genpool queue)
SBATCH --account=<group_name>
SBATCH --partition=<group_name>

# RESOURCES
SBATCH --nodes=<num_nodes>  # total number of nodes allocated
SBATCH --ntasks-per-node=<cores_per_node>  # cores per node

# WALL TIME
# Do not specify a wall time significantly more than your job needs
# Common acceptable time formats:
#    hours:minutes:seconds e.g. 3:00:00 for 3 hours
#    minutes
#    days-hours
SBATCH --time=<time>

# MEMORY PER NODE
# See above "Specifying Memory Size" for options
SBATCH --mem=<size>G  # e.g. --mem=100G for 100 GB of memory

# WORKING DIRECTORY ENTRYPOINT
# Specify the working directory for this job
SBATCH --chdir=/gscratch/<group_name>/<net_id>/path/to/dir

# Turn on email notifications
SBATCH --mail-type=ALL
SBATCH --mail-user=<your_email>

# Export all environment variables to the batch job session
SBATCH --export=all

# Run the commands to run your program here
# e.g. load modules, copy input.output files, run program, etc.
<commands_to_run_your_program>

```

### Multiple Node Batch Jobs

If your batch job is using multiple nodes, your program should also know how to use all the nodes (e.g. your program is an MPI program).

The value given for `--nodes` must be less than or equal to the total number of nodes owned by your group.

The value given for `--ntasks-per-node` should be either `28` for older `mox` nodes or `40` for newer nodes.  Do not increase these values.  You can decrease these values if your program is running out of memory on a node.

```shell
SBATCH --nodes=4

SBATCH --ntasks-per-node=28
# OR
SBATCH --ntasks-per-node=40
```

### Self-Limiting Your Number of Running Jobs

:::note
This feature is not enabled on the `ckpt` partition
:::

At times you may wish to self-limit the number of jobs that will be run simultaneously in order to leave nodes in your group's partition for other group members.  

To achieve this, you can add `SBATCH --qos=MaxJobs<n>` where `n` is a number between 1 and 10 to tell the job scheduler to allow only `n` jobs running with the option `--qos=MaxJobs<n>`.  

However, any other jobs without this option set are not limited and jobs with a different value of `n` are gated separately.

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

## FOR ADVANCED USERS ONLY: `salloc`

:::warning
Do not use `salloc` unless you have a specific reason.
:::

To get nodes for interactive use:
```shell
salloc -N <num_nodes> -p <group_name> -A <group_name> --time=<time> --mem=<size>G
```
When this command runs, you will have been allocated `num_nodes` nodes **but you will still be on the `mox` login node**.

Use `srun <command>` to run commands on all allocated nodes.

Use `scontrol show hostnames` to get the hostnames of your allocated nodes.  Once you have the hostnames, you can `ssh` to them using `ssh <hostname>` and then use them for your work (e.g. Apache Spark, Hadoop, etc.)

Example:
```shell-session terminal=true
[linj66@mox2 ~]$ salloc -N 2 -p stf -A stf --time=5 --mem=5G
salloc: Pending job allocation 2620960
salloc: job 2620960 queued and waiting for resources
salloc: job 2620960 has been allocated resources
salloc: Granted job allocation 2620960
salloc: Waiting for resource configuration
salloc: Nodes n[2148-2149] are ready for job
[linj66@mox2 ~]$ srun echo "test"
test
test
[linj66@mox2 ~]$ scontrol show hostnames
n2148
n2149
[linj66@mox2 ~]$ ssh n2148
Warning: Permanently added 'n2148,10.64.56.248' (ECDSA) to the list of known hosts.
[linj66@n2148 ~]$
```

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
