---
id: jobs
title: Scheduling Jobs
---

:::note

This documentation is under construction.

:::

As previously mentioned, when you first ssh into `klone` you land on one of the two login nodes (e.g., `klone-login01`). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should never use login nodes for heavy compute and automated mechanisms exist to monitor and enforce violations. The tool used to notify users of violations is "arbiter2" and you will receive an email for each offending process [**(Gardner, Migacz, and Haymore 2019)**](https://hyak.uw.edu/docs/compute/scheduling-jobs#ref_arbiter).

To keep the login node in stable working order and ensure fair usage of the login node as a community resource, HYAK has a job scheduling software that will give you access to other nodes (i.e., different computers that are part of the `klone` cluster). The job scheduler software is called SLURM, and regular users of HYAK need to learn how to use SLURM to effectively and efficiently make use of HYAK as a resource for research computing. 

:::note Relevant Vocabulary

**Account**: In the context of using SLURM, "account" refers to the groups you belong to, not your UWnetID. `hyakalloc` will display accounts you can submit jobs with (i.e., under the SLURM `sbatch` directive `--account`).

**Checkpoint partition**: Abbreviated `ckpt`, represents idle resources across the cluster at any moment. All cluster users are eligible to submit jobs to this partition and they will run subject to availability. To provide some regular churn in pending checkpoint jobs, jobs running for >4 hours (for HPC jobs) and >8 hours (for GPU jobs) are re-queued (i.e., re-submitted to the checkpoint partition queue). The jobs will continue in this manner until the job exits or the requested runtime is fulfilled. For more information see [**Using Idle Resources**](https://hyak.uw.edu/docs/compute/checkpoint).

**Idle Resource**: A cluster resource is "idle" when it currently has no running jobs. Requested idle resources are not guaranteed. 

**Interactive Session**: An interactive session on the cluster allows users to access a computing node in real time for tasks that require direct interaction, exploration, or debugging. Request an interactive job with the `salloc` command.

**Node**: In HPC, a server is synonymous with a node. 1 server = 1 node so it is OK to use those two terms interchangeably. You can also think of nodes as distinct but network-connected computers. 
* **HPC Node**: A standard compute node with no additional components and variable amounts of memory at time of procurement.
* **GPU Node**: A standard node with GPU cards added in at time of procurement. GPUs are typically used for ML workflows and in rarer cases for applications that have been specifically ported over to GPUs to speed up the runtime.

**Partition**: A partition is a logical subdivision of the HYAK cluster resources. Specifically, each partition represents a class of node. For example, the partitions on the cluster are `compute`, `ckpt`, `compute-bigmem`, and GPU nodes. `hyakalloc` will display paritions in addition to `ckpt` that you can submit jobs with (i.e., under the SLURM `sbatch` directive `--partition`).

**Queue**: A queue is a waiting area for jobs that have been submitted to the cluster but are not yet executing. The scheduler manages the order in which jobs are taken from the queue for execution. The SLURM queue can be monitored with the command `squeue` and `squeue -u UWNetID` replacing the word `UWNetID` with your UE Net ID will show your job that are waiting in the queue or are being executed. 

**Scheduler**: The scheduler is a component or software system responsible for managing and optimizing the allocation of computing resources and tasks within a distributed computing environment. It orchestrates the execution of jobs, tasks, or processes across available resources such as CPUs, memory, and storage.

**SLURM**: The job scheduler used on HYAK. SLURM stands for **S**imple **L**inux **U**tility (for) **R**esource **M**anagement. See "Scheduler" on this page to learn what a scheduler is. See [**SLURM documentation**](https://slurm.schedmd.com/man_index.html) for detailed help using the job scheduler.
:::

### Accounts and Partitions

The first stop on understanding job scheduling is to understand that every user is part of an account and certain partitions. Your account is usually related to a user group that you belong to; for example, you may be part of a lab group that has contributed resources to HYAK, affording you priority usage of those resources, which are organized into one or more partitions. Alternatively, you may be a student user who is part of the [**Research Computing Club**](https://depts.washington.edu/uwrcc/getting-started-2/getting-started/), or account `stf`, meaning that you have priority access on the `stf` account and partitions. Additionally, all users can use HYAK resources when they are idle by scheduling jobs on the `ckpt` paritition ([**Click here to learn about more about `ckpt` jobs.**](https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition)). 

Let's start by checking which accounts and partitions you have access to with the `hyakalloc` command. 

```bash
hyakalloc
```
The result will look different for each user. Yours ***might*** looks something like this:  

```bash
      Account resources available to user: UWNetID       
╭─────────┬──────────────┬──────┬────────┬──────┬───────╮
│ Account │    Partition │ CPUs │ Memory │ GPUs │       │
├─────────┼──────────────┼──────┼────────┼──────┼───────┤
│ account │      compute │  120 │   509G │    0 │ TOTAL │
│         │              │    0 │     0G │    0 │ USED  │
│         │              │  120 │   509G │    0 │ FREE  │
├─────────┼──────────────┼──────┼────────┼──────┼───────┤
│ account │    gpu-rtx6k │   10 │    81G │    2 │ TOTAL │
│         │              │    0 │     0G │    0 │ USED  │
│         │              │   10 │    81G │    2 │ FREE  │
╰─────────┴──────────────┴──────┴────────┴──────┴───────╯
 Checkpoint Resources  
╭───────┬──────┬──────╮
│       │ CPUs │ GPUs │
├───────┼──────┼──────┤
│ Idle: │ 1138 │  242 │
╰───────┴──────┴──────╯
```
This exmaple output for a user from the fictional Account called "account" shows access to a compute parition and a gpu-rtx6k parition. The displayed partitions could include compute partitions, larger memory partitions, and GPUs. The table also shows which resources under the account are being used when the `hyakalloc` command was executed (all resources free at the moment). The bottom table shows how many CPUs and GPUs are idle under the `ckpt` partition. 

Remember you can always return to the `hyakalloc` results when preparing your command to request a job. 

### Set Up

For the following exercises, the working directory will be in scrubbed:
```bash
cd /gscratch/scrubbed/
```
If you have not already, make a directory with your UW NetID with `mkdir` and go into it:
```bash
mkdir UWNetID
cd UWNetID
```
This will be your working directory for this section. Note that files and directories will be deleted after 14 days if they are not used.

If you are a student in a lab group who contributed resources to HYAK, you have an alternative storage option you may use under:
```bash
cd /mmfs1/gscratch/labname
```
If you are a student part of the Reseach Computing Club, you may use:
```bash
cd /mmfs1/gscratch/stf/
```
Fore more information regarding HYAK storage click [**HERE**](https://hyak.uw.edu/docs/storage/gscratch).



To start, copy the necessary tutorial materials to your working directory by adding a `.` after the command. Because we are copying an entire directory, make sure to use `-r` to recursively copy:
```bash
cp -r /sw/hyak101/basics .
```
Ensure all materials were copied into your working directory:
```bash
cd basics
ls
```
```bash
data
locator.sif
locator_NN_job.slurm
locator_NN_array.slurm
locator_NN_dropouts.slurm
loop_array.slurm
loop_job.slurm
loop_script.sh
```
:::tip Pro Tip
In the following section, it is often useful to have two terminal windows open. One for editing scipts and one for submitting and monitoring jobs. Open up a new terminal and use `ssh` to login to Hyak. On this window, monitor jobs using `squeue -u UWNetID`.

:::


### Interactive Jobs

An interactive session on the cluster allows users to access a computing node in real time for tasks that require direct interaction, exploration, or debugging. Request an interactive job with the `salloc` command. If you have a quick job or you are preparing software to use later, an interactive session is the best choice. Let's start an interactive job on the `ckpt` partition. We will specify that we want a single CPU with the flag `--cpus-per-task=1`, 10G of RAM with `--mem=10G`, and a maximum time of 2 hours with `--time=2:00:00`. The job will automatically end after 2 hours if we don't end it before 2 hours has elapsed. 

```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=10G --time=2:00:00
```
The output will look something like this:

```bash
salloc: Pending job allocation 18981043
salloc: job 18981043 queued and waiting for resources
salloc: job 18981043 has been allocated resources
salloc: Granted job allocation 18981043
salloc: Nodes n3424 are ready for job
```
Finally, your shell prompt will show that you are no longer on the login node, or look something like this: 
```bash
[UWNetID@n3424 ~]$
```
Except that the word `UWNetID` will be replaced with your Net ID and `n3424` will be replaced with the node SLURM assigned to your interactive job. Finally, the `~` will be replaced with the name of your current directory (your location on the filesystem). 

:::tip Pro tip : Requesting a GPU job
You can also request an interactive session on a GPU. To view information about the current status of nodes in a partition, use the command `sinfo`. The beginning of the output may look something like this:

```bash
PARTITION        AVAIL  TIMELIMIT  NODES  STATE NODELIST
compute-bigmem      up   infinite      1   idle n3255
```
Some common node states you may see are idle, alloc, and mixed. An idle state indicates that it is ready to accept new jobs. An alloc state indicates that the node is already fully allocated to one or more jobs and cannot accept any more jobs until the allocated job(s) finish. A node is in a mixed state when it has allocated and idle resources.

Use the following command to get a list of the GPUs used in the checkpoint partition along with CPU states and the amount of free memory on a given node:
```bash
sinfo -p ckpt -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
 ```
 The start of the output will look something like this: 
 ```bash
 HOSTNAMES           CPUS(A/I/O/T)       FREE_MEM            GRES_USED
g3001               26/14/0/40          365755              gpu:2080ti:8(IDX:0-7)
 ```
Now, find an available GPU and request an interactive session on it with the `salloc` command. Replace the account name, gpus-per-node, memory, and time with the desired parameters:
```bash
salloc -A accountname -p ckpt --gpus-per-node=a40:1 --mem=10G --time=1:00:00 
``` 
Note that after `--gpus-per-node`, you must input the GPU model and the number of GPUs you want to allocate. After requesting a GPU job, you can check to see if the GPU is active using the `nvidia-smi` command:
```bash
nvidia-smi
```

#### Note that you may need to get started with Apptainer to use this command. For more information on getting started with Apptainer, click [**HERE**](https://hyak.uw.edu/docs/tools/containers/).

The output will be two tables. The first table shows information such as the temperature (degrees Celsius), performance state (ranging from P0-P12, where P0 is the maximum performance state) and how much memory is used for all available GPUs. The second table provides information on all the processes using GPUs.

To continuously update the output every 5 seconds, use the flag `--loop = 5`:
```bash
nvidia-smi --loop=5
```
:::

### Simple Script as a Command Stand-in

TODO - section about loop_script.sh - note that this part should work equivalently if a cpu or gpu job is used (in the case that they only have a GPU partition or they followed the directions in the Requesting a GPU job pro tip above).

### Batch Jobs

TODO - section about loop_job.slurm

:::tip Pro tip - multithreading
TODO 
:::
