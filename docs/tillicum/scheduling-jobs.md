---
id: scheduling-jobs
title: Slurm
---

Tillicum uses the **Slurm workload manager** for scheduling and running jobs. While Slurm is also used on Klone, there are some important differences in how access and priorities work.  

## Key Differences from Klone  

- **Tillicum** uses a **usage-based model**. All users have the same priority, and access is controlled through [**QoS (Quality of Service)**](#tillicum-qos) rather than partitions.  
- **No checkpoint partition** exists on Tillicum.  
- **Simpler access** – you don’t need to determine partitions; just select the appropriate [**QoS**](#tillicum-qos).  
- **Klone** uses a **condo model**. Research groups have dedicated **accounts** and **partitions** tied to the resources they purchased. This makes partition choice complex, and we provide `hyakalloc` to help users determine access. Klone also provides the *checkpoint partitions* (i.e., `ckpt`, `ckpt-g2`, and `ckpt-all`) for accessing idle resources outside priority accounts.  
    - On Tillicum, use `squeue` and `sinfo` to monitor your jobs and cluster traffic. [**Learn more below**](#monitoring-jobs-and-resource-availability).

:::important Tillicum Usage Rates
***GPU Hour*** = Elapsed Time x ***N*** GPUs

**Usage Rate: $0.90/GPU Hour** - Billing is monthly and handled as a subscription in UWIT's ITBill system. 
Every scheduled job on Tillicum is subject to a the usage rate and requires at least 1 GPU (141GB RAM). 
* Jobs are bound by a **maximum of ~200GB system RAM and 8 CPUs**
* ***If more system RAM or more CPUs are required, additional GPUs must be added***
:::


---

## Tillicum QoS  

Tillicum jobs are submitted under a "Quality-of-Service" or **QoS**, which defines limits like wall time, GPU count, and concurrent jobs. 
* All Tillicum compute nodes have **8 GPUs (141 GB each)** and these are provisioned with 200 GB system RAM per GPU and 8 CPUs per GPU.
* You must request at least 1 GPU. *CPU-only jobs are not allowed.*

***We will constantly evaluate QoS limits based on user feedback.***

| QoS             | Max Time   | Max GPUs per Job | Max Jobs Per User | Concurrent GPU Limit | Notes                           |
| --------------- | ---------- | ---------------- | ----------------- | -------------------- | ------------------------------- |
| **normal**      | 24 hours   | 16               | NA                | 96 GPUs              | Standard production work        |
| **debug**       | 1 hour     | 1                | 1                 | 1 job                | Quick testing and setup      |
| **interactive** | 8 hours    | 2                | 2                 | 2 jobs               | Real-time work or debugging |
| **long**        | 7 days     | 16               | NA                |  QoS cannot exceed 96 GPUs*     | Long jobs           |
| **wide**        | 24 hours   | NA               | NA                | QoS cannot exceed 96 GPUs*  | Distributed jobs            |

**These QoS levels use a shared GPU limit rather than per-user concurrent limits. Jobs running under Long and Wide collectively share a pool of GPUs, with a maximum of 96 GPUs in use at any time across all users.*

### Access to Long and Wide QoS

Access to the Long and Wide QoS is not enabled by default. Users must request access and provide a justification for their workload by submitting the [**User Support Intake Form**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3) → Select **Tillicum**.

To help us evaluate your request, please include the following information:

**Long QoS (extended walltime)**
* Workload description: application(s) used, job type (single job, array, workflow), typical GPU/node count, and expected walltime per job
* Why extended runtime is required: e.g., model convergence, algorithmic constraints, I/O patterns, licensing limits, or external dependencies
* Checkpointing feasibility: whether checkpointing, job chaining, or restarts were evaluated and why they are not viable or would impact correctness/performance
* Scope and duration: how long you expect to need Long QoS access

**Wide QoS (large-scale jobs)**
* Workload description: application(s) used, job type (single job, array, workflow), typical and maximum GPU/node count
* Scaling evidence: how the workload scales beyond 2 nodes (e.g., benchmarks, prior runs, or literature)
* Parallelization method: e.g., MPI, distributed training, domain decomposition, workflow-level parallelism
* Scope and duration: how long you expect to need Wide QoS access

---

## Understanding Job Types

There are two main ways to run work on Tillicum:

| Job Type            | Command  | Best For                     | Runs On                                         |
| ------------------- | -------- | ---------------------------- | ----------------------------------------------- |
| **Interactive Job** | `salloc` | Exploratory or hands-on work | A compute node you connect to directly          |
| **Batch Job**       | `sbatch` | Long or unattended jobs      | Runs automatically when resources are available |

---

## Running Jobs  

### Interactive job with `salloc`  

Run a single-GPU debug test job with the maximum allowable resources for the QoS for maximum time of 30 minutes:  

```js
salloc --qos=debug --gpus=1 --cpus-per-task=8 --mem=200G --time=00:30:00
```

Run a normal QoS job with 2 GPUs:

```js
salloc --qos=normal --gpus=2 --cpus-per-task=16 --mem=400G --time=04:00:00
```
*Note*: If you don’t specify `--qos`, the job will default to **`normal`**.

:::warning
It is required to specify the number of GPUs you are requesting. Jobs without GPUs are not permitted on Tillicum. Commands to request jobs that do not specify the GPUs will result the following error: 

```js
salloc --qos=normal --cpus-per-task=1 --mem=4G --time=01:00:00
```

```js
salloc: error: Req GPUs: 0
salloc: error: ERROR: Jobs must request at least 1 GPU, use -G <num> or --gpus <num> or --gres=gpu:<num>.
salloc: error: Job submit/allocate failed: Unspecified error
```
:::

### Batch job with `sbatch`

Example `job.slurm` script:

```js title="job.slurm" terminal=true
#!/bin/bash
#SBATCH --job-name=myjob
#SBATCH --qos=normal
#SBATCH --gres=gpu:4
#SBATCH --cpus-per-task=32
#SBATCH --mem=800G
#SBATCH --time=08:00:00
#SBATCH --output=slurm-%j.out

module load conda
conda activate my_env
python my_script.py
```

---

## Monitoring Jobs and Resource Availability

Your best tool for monitoring the progress of your jobs is the `squeue` command which will show you all jobs running or requested on the cluster. A quick look at `squeue` output will allows you to estimate cluster traffic. `squeue` with the `-u` flag and your NetID will show you the jobs you have submitted. 

```js
squeue -u $USER
```

If your job are in State "PD" for pending under the "ST" column, you can look at the "REASON" column to determine why you jobs is being held. Common reasons include "ReqNodeNotAvail" meaning that your job overlaps with a maintenance reservation or "QOSResourceLimit" which indicates your job exceeds your individual resource limit but will run when additional resources are available (i.e., your other jobs finish). [**Guide to job reasons.**](https://slurm.schedmd.com/squeue.html#SECTION_JOB-REASON-CODES)

`sinfo` can also be helpful for checking node availability and GPU usage across the cluster. The following command provides a useful summary of node state, CPU usage, memory, and GPUs currently allocated by Slurm:

```js
$ sinfo -O nodehost,statecompact,cpusstate,freemem,gresused -S nodehost
HOSTNAMES   STATE       CPUS(A/I/O/T)  FREE_MEM    GRES_USED           
g001        mix         24/40/0/64     1943019     gpu:h200:3(IDX:0-1,3)  
g002        idle        0/64/0/64      2005920     gpu:h200:0(IDX:N/A) 
g003        alloc       64/0/0/64      1690496     gpu:h200:8(IDX:0-7) 
...
```
Column descriptions:
- **STATE:** mix for partially allocated node
- **CPUS(A/I/O/T):** Number of CPUs in the format Allocated / Idle / Other / Total
- **FREE_MEM:** free memory on the node in MB
- **GRES_USED:** GPUs currently allocated by Slurm
- **Example:** `gpu:h200:3(IDX:0-1,3)`
  - This node has 8 NVIDIA H200 GPUs, and 3 GPUs with indices 0,1,3 are currently allocated (i.e., in use).

---

## Budgeting and Tillicum Usage

To help guide your work, our Slurm job submit script will show you an estimate of how much your job will cost when using Slurm to schedule a job. For example, 

```js
salloc --qos=normal --gpus=1 --time=2:00:00
```

```js
salloc: GPUs: 1
salloc: CPUs: 1.0
salloc: MEM: 195.3125 GB
salloc: TIME: 2.00 hrs
salloc: *COST: $1.80 (Est.)
salloc: *NOTE: This is only an estimate based upon GPU hours requested.
salloc: *NOTE: You can still cancel this job at no charge (i.e., scancel <JOB_ID>).
salloc: Granted job allocation 73513
salloc: Waiting for resource configuration
salloc: Nodes g018 are ready for job
```

### Monitoring Job Efficiency with `seff`

Tillicum has the `seff` utility installed, which reports resource efficiency for your completed jobs.

Example usage:

```js
seff 231
```

Example output:

```js
Job ID: 231
Cluster: tillicum
User/Group: UWNetID/account
State: COMPLETED (exit code 0)
Nodes: 1
Cores per node: 32
CPU Utilized: 01:23:45
CPU Efficiency: 85.23% of 02:00:00 core-walltime
Memory Utilized: 150.00 GB
Memory Efficiency: 75.00% of 200.00 GB
```

