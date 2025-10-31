---
id: scheduling-jobs
title: Slurm
---

Tillicum uses the **Slurm workload manager** for scheduling and running jobs. While Slurm is also used on Klone, there are some important differences in how access and priorities work.  

## Key Differences from Klone  

- **Tillicum** uses a **usage-based model**. All users have the same priority, and access is controlled through [<ins>**QOS (Quality of Service)**</ins>](#tillicum-qos) rather than partitions.  
- **No checkpoint partition** exists on Tillicum.  
- **Simpler access** – you don’t need to determine partitions; just select the appropriate [<ins>**QOS**</ins>](#tillicum-qos).  
- **Klone** uses a **condo model**. Research groups have dedicated **accounts** and **partitions** tied to the resources they purchased. This makes partition choice complex, and we provide `hyakalloc` to help users determine access. Klone also provides the *checkpoint partitions* (i.e., `ckpt`, `ckpt-g2`, and `ckpt-all`) for accessing idle resources outside priority accounts.  
    - On Tillicum, use `squeue` and `sinfo` to monitor your jobs and cluster traffic. [<ins>**Learn more below**</ins>](#monitoring-jobs-and-resource-availability).

:::important Tillicum Usage Rates
***GPU Hour*** = Elapsed Time x ***N*** GPUs

**Usage Rate: $0.90/GPU Hour** - Billing is monthly and handled as a subscription in UW-IT's ITBill system. 
Every scheduled job on Tillicum is subject to a the usage rate and requires at least 1 GPU (141GB RAM). 
* Jobs are bound by a **maximum of ~200GB system RAM and 8 CPUs**
* ***If more system RAM or more CPUs are required, additional GPUs must be added***
:::


---

## Tillicum QOS  

Tillicum jobs are submitted under a "Quality-of-Service" or **QOS**, which defines limits like wall time, GPU count, and concurrent jobs. 
* All Tillicum compute nodes have **8 GPUs (141 GB each)** and these are provisioned with 200 GB system RAM per GPU and 8 CPUs per GPU.
* You must request at least 1 GPU. *CPU-only jobs are not allowed.*

| QOS             | Max Time   | Max GPUs per Job | Concurrent GPU Limit | Notes                           |
| --------------- | ---------- | ---------------- | -------------------- | ------------------------------- |
| **normal**      | 24 hours   | 16               | 96 GPUs              | Standard production work        |
| **debug**       | 1 hour     | 1                | 1 job                | Quick testing and setup      |
| **interactive** | 8 hours    | 2                | 2 jobs               | For real-time work or debugging |
| **long**        | by request | details TBA       | details TBA           | For special long jobs           |
| **wide**        | by request | details TBA       | details TBA           | For distributed jobs            |

***We will constantly evaluate this policy based on user feedback.***

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

Run a single-GPU debug test job with the maximum allowable resources for the QOS for maximum time of 30 minutes:  

```js
salloc --qos=debug --gpus=1 --cpus-per-task=8 --mem=200G --time=00:30:00
```

Run a normal QOS job with 2 GPUs:

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

Your best tool for monitoring the progress of your jobs is the `squeue` command which will show you all jobs runnning or requested on the cluster. A quick look at `squeue` output will allows you to estimate cluster traffic. `squeue` with the `-u` flag and your NetID will show you the jobs you have submitted. 

```js
squeue -u $USER
```

If your job are in State "PD" for pending under the "ST" column, you can look at the "REASON" column to determine why you jobs is being held. Common reasons include "ReqNodeNotAvail" meaning that your job overlaps with a mainteance reservation or "QOSResourceLimit" which indicates your job exceeds your individual resource limit but will run when additional resources are available (i.e., your other jobs finish). [<ins>**Guide to job reasons.**</ins>](https://slurm.schedmd.com/squeue.html#SECTION_JOB-REASON-CODES)

`sinfo` can also be helpful for determining how many nodes are available. The following command provides a useful summary.

```js
sinfo -r
```


---

## Budgeting and Tillicum Usage

To help guide your work, our Slurm job submit script will show you an estimate of how much your job will cost when using Slurm to schedule a job. For example, 

```js
salloc --qos=normal --gpus=1 --time=2:00:00
```

```js
salloc: Req GPUs: 1
salloc: Req Time: 2.00 hrs
salloc: YOUR COST: $1.80 (Est.) 
salloc: NOTE: This is only an estimate based upon GPU hours requested. Billing is rounded DOWN to the nearest GPU hour on actual GPU hours consumed at a rate of $0.90 per 1 GPU per 1 hour. You can still cancel this job at no charge (i.e., scancel <JOB_ID>).
salloc: Granted job allocation 4809
salloc: Waiting for resource configuration
salloc: Nodes g020 are ready for job
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

