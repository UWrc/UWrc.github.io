---
id: scheduling-jobs
title: Slurm
---

Tillicum uses the **Slurm workload manager** for scheduling and running jobs. While Slurm is also used on Klone, there are some important differences in how access and priorities work.  

## Key Differences from Klone  

- **Tillicum** uses a **usage-based model**. All users have the same priority, and access is controlled through **QOS (Quality of Service)** rather than partitions.  
- **No checkpoint partition** exists on Tillicum.  
- **Simpler access** – you don’t need to determine partitions; just select the appropriate QOS.  
- **Klone** uses a **condo model**. Research groups have dedicated **accounts** and **partitions** tied to the resources they purchased. This makes partition choice complex, and we provide `hyakalloc` to help users determine access. Klone also provides the *checkpoint partitions* (i.e., `ckpt`, `ckpt-g2`, and `ckpt-all`) for accessing idle resources outside priority accounts.  

---

## Tillicum QOS  

Jobs on Tillicum run under a **QOS** that defines limits like wall time, resource size, and per-user job limits. 

**All nodes on Tillicum have 8 GPUs each with 141 GB of RAM.**

| QOS   | Max Wall Time  | Max Resources                | Per-User Job Limit | Memory Availability            | Use Case                               |
|-------|---------------|------------------------------|--------------------|--------------------------------|-----------------------------------------|
| **normal** (default) | 12 hours      | Up to 16 GPUs or 2 nodes   | 3 jobs             | ~2 TB RAM per node, 141 GB per GPU | Standard research jobs, production runs |
| **debug**            | 2 hours       | 8 CPUs, 1 GPU, 200 GB System RAM  | 1 job              | 200 GB System RAM, 141 GB per GPU                     | Testing protocols, quick experiments    |

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

### Budgeting and Tillicum Usage

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

