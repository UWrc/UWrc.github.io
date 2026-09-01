---
title: Scheduling & Monitoring Jobs
---

Tillicum uses the **Slurm workload manager** for scheduling and running jobs. While Slurm is also used on Klone, there are some important differences in how access, priorities, partitions, and usage charges work.

## Key Differences from Klone

- **Tillicum** uses a **usage-based model**. Users choose a [**partition**](#tillicum-partitions) for GPU resource type and a [**QoS (Quality of Service)**](#tillicum-qos) for scheduling policy.
- **No checkpoint partition** exists on Tillicum.
- **Klone** uses a **condo model**. Research groups have dedicated **accounts** and **partitions** tied to the resources they purchased. This makes partition choice complex, and we provide `hyakalloc` to help users determine access. Klone also provides the *checkpoint partitions* (i.e., `ckpt`, `ckpt-g2`, and `ckpt-all`) for accessing idle resources outside priority accounts.
  - On Tillicum, use `squeue`, `sinfo`, and `hyakusage` to monitor your jobs, cluster traffic, and usage costs. [**Learn more below**](#monitoring-jobs-and-resource-availability).

:::important Tillicum Usage Rates
***GPU Hour*** = Elapsed Time x ***N*** GPU Units

**Usage Rate: $0.90/GPU Hour** - Billing is monthly and handled as a subscription in UWIT's ITBill system.

Every scheduled job on Tillicum is subject to the usage rate and requires at least 1 GPU unit. For jobs on the `gpu-h200` partition, 1 GPU unit is 1 full H200 GPU with 141 GB GPU memory.

For full-GPU H200 jobs:
* Jobs are bound by a **maximum of ~200 GB system RAM and 8 CPUs per GPU**
* ***If more system RAM or more CPUs are required, additional GPUs must be added***
:::

---

## Choose Partition and QoS

Tillicum jobs use both a partition and a QoS:

| Setting | Slurm option | Default | Controls |
| ------- | ------------ | ------- | -------- |
| **Partition** | `--partition`, `-p` | `gpu-h200` | GPU resource shape and partition billing multiplier |
| **QoS** | `--qos`, `-q` | `normal` | Scheduling policy, priority, and QoS billing multiplier |

We recommend explicitly setting both `--partition` and `--qos` in your interactive commands and batch scripts.

### Tillicum Partitions

| Partition | GPU Resource | Partition Multiplier | Best For |
| --------- | ------------ | -------------------- | -------- |
| `gpu-h200` | Full NVIDIA H200 GPU | `1.0` | Large models, multi-GPU training, full-GPU memory workloads |
| `gpu-h200-mig` | H200 MIG GPU slice; 1 physical H200 GPU is divided into 7 MIG GPUs | `0.143` | Smaller models, inference, notebooks, debugging, jobs that do not need a full H200 GPU |

:::caution MIG (NVIDIA Multi-Instance GPU) Communication
The `gpu-h200-mig` partition is **not a drop-in replacement for full-GPU multi-GPU jobs**. Direct GPU-to-GPU communication such as NVLink and CUDA IPC is unavailable between MIG instances on different physical GPUs. Communication libraries such as NCCL or NVSHMEM may instead rely on other available communication paths, including transfers through host memory.

Workloads that depend on high-performance GPU peer-to-peer communication, such as NVLink, should use the gpu-h200 partition.
:::

### Tillicum QoS

Tillicum jobs are submitted under a "Quality-of-Service" or **QoS**, which defines limits like wall time, GPU count, and concurrent jobs.
* All Tillicum gpu-h200 compute nodes have **8 GPUs (141 GB each)** and these are provisioned with 200 GB system RAM per GPU and 8 CPUs per GPU. gpu-h200-mig compute nodes have 56 MIG instances and these are provisioned with 30 GB system RAM and 1 CPU per GPU unit.
* You must request at least 1 GPU unit. *CPU-only jobs are not allowed.*
* QoS walltime limits apply to both `gpu-h200` and `gpu-h200-mig`.
* GPU count and concurrent GPU limits are currently defined for full-GPU jobs on `gpu-h200`.

***We will constantly evaluate QoS limits based on user feedback.***

| QoS             | Max Time   | Max GPUs per Job | Max Jobs Per User | Concurrent GPU Limit | Notes                           |
| --------------- | ---------- | ---------------- | ----------------- | -------------------- | ------------------------------- |
| **normal**      | 24 hours   | 16               | NA                | 48 GPUs              | Standard production work        |
| **debug**       | 1 hour     | 1                | 1                 | 1 job                | Quick testing and setup         |
| **interactive** | 8 hours    | 2                | 2                 | 2 jobs               | Real-time work or debugging     |
| **long**        | 7 days     | 16               | NA                | QoS cannot exceed 96 GPUs* | Long jobs        |
| **wide**        | 24 hours   | NA               | NA                | QoS cannot exceed 96 GPUs* | Distributed jobs          |
| **urgent**      | 3 days     | 64               | NA                | QoS cannot exceed 96 GPUs* | Working under a strict deadline  |

*These QoS levels use a shared GPU limit rather than per-user concurrent limits. Jobs running under these QoS levels collectively share a pool of GPUs, with a maximum of 96 GPUs in use at any time across all users.*

:::caution Urgent QoS info & pricing

Urgent QoS is intended for time-sensitive research activities that require elevated scheduling
priority to meet a specific deadline, such as:
* Publication deadlines
* Conference deadlines
* Grant proposal deadlines
* Other documented time-sensitive research needs

Urgent QoS approvals are time-limited, with a maximum approval period of two weeks.

Urgent QoS is designed to **reduce queue wait times by increasing scheduling priority**. Jobs submitted through Urgent QoS will receive elevated priority relative to standard jobs but *will not cancel or preempt jobs that are already running*. As a result, some queue wait time may still occur, though it is expected to be substantially shorter than without the elevated priority.

Urgent QoS requests will be evaluated individually based on demonstrated need, requested timeline, and fairness considerations. Access may be limited to ensure equitable access for the broader research community.

**Urgent QoS is offered as a premium service tier.** For jobs submitted to the Urgent QoS:

> ***Billable GPU Hours*** = **2** x (Elapsed Time x *N* GPU Units x Partition Multiplier)

:::

### Access to Special QoS's (Long, Wide, and Urgent)

Access to the Long, Wide, and Urgent QoS is not enabled by default. Users must request access and provide a justification for their workload by submitting the [**Tillicum Special QoS Access Request Form**](https://uwconnect.uw.edu/it?id=sc_cat_item&sys_id=94dd9f17976dc3100a7637b6f053af91).

**General Access Policies:**
* Access requests are evaluated on a case-by-case basis.
* Access is granted to an individual user, not a Slurm account.
* Long QoS and Wide QoS approvals are time-limited, with a maximum approval period of six months.
* Urgent QoS approvals are time-limited, with a maximum approval period of two weeks.
* Continued access may require reapplication and reevaluation.
* Approval of a request does not guarantee immediate resource availability.

---

## Running Jobs

There are two main ways to run work on Tillicum:

| Job Type            | Command  | Best For                     | Runs On                                         |
| ------------------- | -------- | ---------------------------- | ----------------------------------------------- |
| **Interactive Job** | `salloc` | Exploratory or hands-on work | A compute node you connect to directly          |
| **Batch Job**       | `sbatch` | Long or unattended jobs      | Runs automatically when resources are available |

### Interactive job with `salloc`

Run a single-GPU debug test job on a full H200 GPU with the maximum allowable resources for the QoS:

```bash
salloc --partition=gpu-h200 --qos=debug --gres=gpu:1 --cpus-per-task=8 --mem=200G --time=00:30:00
```

Run a normal QoS job with 2 full H200 GPUs:

```bash
salloc --partition=gpu-h200 --qos=normal --gres=gpu:2 --cpus-per-task=16 --mem=400G --time=04:00:00
```

Run a debug job on 1 H200 MIG GPU for a maximum time of 30 minutes:

```bash
salloc --partition=gpu-h200-mig --qos=debug --gres=gpu:1 --time=00:30:00
```

*Note*: If you don't specify `--partition` and `--qos`, the job will default to **`gpu-h200`** and **`normal`**.

:::warning
It is required to specify the number of GPUs you are requesting. Jobs without GPUs are not permitted on Tillicum. Commands to request jobs that do not specify the GPUs will result in the following error:

```bash
salloc --cpus-per-task=1 --mem=4G --time=01:00:00
```

```text
salloc: error: Req GPUs: 0
salloc: error: ERROR: Jobs must request at least 1 GPU, use -G <num> or --gpus <num> or --gres=gpu:<num>.
salloc: error: Job submit/allocate failed: Unspecified error
```
:::

### Batch job with `sbatch`

Example full-GPU `job.slurm` script:

```js title="job.slurm" terminal=true
#!/bin/bash
#SBATCH --job-name=myjob
#SBATCH --partition=gpu-h200
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

Example MIG `job.slurm` script:

```js title="mig-job.slurm" terminal=true
#!/bin/bash
#SBATCH --job-name=my-mig-job
#SBATCH --partition=gpu-h200-mig
#SBATCH --qos=normal
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=2
#SBATCH --mem=30G
#SBATCH --time=04:00:00
#SBATCH --output=slurm-%j.out

module load conda
conda activate my_env
python my_script.py
```

---

## Monitoring Jobs and Resource Availability

Your best tool for monitoring the progress of your jobs is the `squeue` command which will show you all jobs running or requested on the cluster. A quick look at `squeue` output will allow you to estimate cluster traffic.

```text
$ squeue
     JOBID      QOS ACCOUNT      NAME     USER ST       TIME  TIME_LEFT NODES   TRES_PER_NODE NODELIST(REASON)
    141091   normal   acct1      job8    user1 PD       0:00    8:00:00     1             N/A (Priority)
    140983   normal   acct2      job7    user1 PD       0:00 1-00:00:00     1             N/A (Dependency)
    141071   normal   acct1      job6    user1 PD       0:00    4:00:00     1      gres/gpu:1 (Resources)
    140491   normal   acct1      job5    user1 PD       0:00 1-00:00:00     1      gres/gpu:1 (Dependency)
    140986   normal   acct3      job4    user4  R    3:01:40   20:58:20     2             N/A g[009-010]
    140942 interact   acct3      job3    user3  R    3:54:47    4:05:13     1             N/A g004
    141087   normal   acct1      job2    user2  R      15:30    3:44:30     1 gres/gpu:h200:1 g002
  141070_6   normal   acct1      job1    user1  R    1:44:48      15:12     1      gres/gpu:1 g012
```

Column descriptions:
- **JOBID:** A unique number assigned to your job. Use JobID to reference your job in other commands and include it when reaching out to help@uw.edu for assistance.
- **QOS:** The scheduling policy applied to the job (e.g., `normal`, `interactive`).
- **ST:** Job status: `PD` (Pending), `R` (Running), `CG` (Completing), `CD` (Completed).
- **TIME:** Runtime duration.
- **TIME_LEFT:** Time left for the job to execute (=TimeLimit-TimeUsed).
- **TRES_PER_NODE:** Trackable resources per node requested by the job.
- **NODELIST(REASON):** Node(s) assigned to the job or reason for pending (e.g., "Resources" or "Priority")

:::tip `TRES_PER_NODE` Output
`TRES_PER_NODE` may display different values depending on the resource request option used:
- `N/A`: requested with `-G` or `--gpus`
- `gres/gpu:1`: requested with `--gres=gpu:1`
- `gres/gpu:h200:1`: requested with `--gres=gpu:h200:1`
:::

`squeue` with the `-u` flag and your NetID will show you the jobs you have submitted.

```bash
squeue -u $USER
```

If your job is in State "PD" for pending under the "ST" column, you can look at the "REASON" column to determine why your job is being held. Common reasons include:

- `ReqNodeNotAvail`: Your job overlaps with a maintenance reservation. Run `scontrol show res` to view any reservations in place.
- `QOSResourceLimit`: Your job exceeds your individual resource limit but will run when additional resources are available (i.e., your other jobs finish).

For more information, see Slurm's [**guide to job reasons.**](https://slurm.schedmd.com/squeue.html#SECTION_JOB-REASON-CODES).

`sinfo` can also be helpful for checking node availability and GPU usage across the cluster. The following command provides a useful summary of node state, CPU usage, memory, and GPUs currently allocated by Slurm:

```text
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

## Budgeting and Resource Utilization

To help guide your work, our Slurm job submit script will show you an estimate of how much your job will cost when using Slurm to schedule a job.

```text
Billable GPU Hours = Elapsed Hours x Requested GPU Units x QoS Multiplier x Partition Multiplier
```

Urgent QoS stacks with the partition multiplier. For example, an urgent job on `gpu-h200-mig` uses the urgent QoS multiplier and the `0.143` MIG partition multiplier. For example:

```bash
salloc --partition=gpu-h200 --qos=normal --gres=gpu:1 --time=2:00:00
```

```text
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

```bash
seff 231
```

Example output:

```text
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

---

## Monitoring Usage with `hyakusage`

Tillicum provides a convenient utility called `hyakusage` to help users track their usage and costs. `hyakusage` summarizes resource usage and associated costs across users, accounts, QOS levels, and partitions.

:::warning
Users are responsible for monitoring their own usage.
:::

### Budget Enforcement

Tillicum supports budget settings at both the **account** and **user** levels. Once a budget is configured, **budget enforcement is enabled by default**. If you are a PI and prefer to monitor usage only without enforcing automatic job submission termination when a budget is exceeded, please contact us at [**help@uw.edu**](mailto:help@uw.edu) and include "Tillicum" in the subject line.

Budgets are managed by the Tillicum administrators. To **add, update, or remove** a budget, please email [**help@uw.edu**](mailto:help@uw.edu) with "Tillicum" in the subject line with the approval from your PI.

### Default

Running `hyakusage` with no arguments prints a usage report for the **current billing cycle** for the **current user**, grouped by **account**. Additionally, a budget usage summary will also be included if the user- or account-level budget is defined.

**Key features:**
- Displays usage for all accounts you have access to.
- Shows total jobs and costs per account for current billing cycle at the top of each account.
- Shows usage and costs across QOS levels when filter is applied.
- Shows active credits (e.g., remaining demo credits) with corresponding expiration dates.
- Integrates user- and account-level budgets (if set) to show progress toward limits.

```bash
hyakusage
```

**Example output from Aug 28, 2026:**

```text
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are calculated by base rate x billable GPU hours,
      where billable GPU hours = raw GPU hours x QOS multiplier x partition multiplier.
  * Costs are rounded to nearest cent.

Usage Report for Account account1:
Current Billing Cycle TOTAL Usage: 26.23 GPU hours, $23.61
TOTAL Active Credits: $437.34
  * $347.34 expiring on 2027-02-25
  * $90.00 (no expiration)
╭────────────────────────────────────────────────────╮
│   Usage User Breakdown (2026-08-26 to 2026-08-28)  │
├────────────────────────┬────────────┬──────────────┤
│ USER                   │    JOBS    │  COST (USD)  │
├────────────────────────┼────────────┼──────────────┤
│ kcxie                  │         16 │        $3.69 │
╰────────────────────────┴────────────┴──────────────╯
╭──────────────────────────────────────────────────────────────────────────────╮
│                             Budget Usage Summary                             │
├──────────────┬─────────────────────┬────────┬─────────┬────────────┬─────────┤
│ USER         │  USED/BUDGET (USD)  │ USED % │   TYPE  │     END    │ ENFORCE │
├──────────────┼─────────────────────┼────────┼─────────┼────────────┼─────────┤
│ user1        │       3.69 / 500.00 │     1% │   total │       none │    true │
├──────────────┼─────────────────────┼────────┼─────────┼────────────┼─────────┤
│ account1     │     23.61 / 1000.00 │     1% │ monthly │ 2026-09-25 │   false │
╰──────────────┴─────────────────────┴────────┴─────────┴────────────┴─────────╯
```

### Options

The `hyakusage` program has a rich set of command line arguments for more complex queries.

```text
$ hyakusage --help
Print GPU hour usage and costs on Tillicum.

Usage: hyakusage [options]

Example: hyakusage -u all
  Show usage for all users in your accessible accounts in current billing cycle.

Options:
  -u, -user      comma-separated list of users or "all" for all users in your accessible accounts (default: current user)
  -s, -start     start date YYYY-MM-DD (default: start of current billing cycle)
  -e, -end       end date YYYY-MM-DD, inclusive (default: today)
  -a, -account   comma-separated list of accounts or "all" for all accessible accounts (default: all)
  -q, -qos       show QOS breakdown for comma-separated QOS values, or "all" for all QOS in selected accounts (default: no QOS breakdown)
  -p             print parsable CSV output for budget enforcement
  -h, -help      show this help message and exit

Notes:
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are rounded to nearest cent.
  * You can only see accounts you have access to.
```

### Examples

```bash
# To audit all users' resource usage from your group with QOS breakdown
hyakusage -u all -q all

# To view resource usage for a given time period
hyakusage -s 2025-10-15 -e 2025-10-25

# To filter by specific account and QOS
hyakusage -a account1 -q debug
```
