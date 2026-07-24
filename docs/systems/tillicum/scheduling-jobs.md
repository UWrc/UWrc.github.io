---
title: Scheduling & Monitoring Jobs
---

Tillicum uses the **Slurm workload manager** for scheduling and running jobs. While Slurm is also used on Klone, there are some important differences in how access and priorities work.  

## Key Differences from Klone  

- **Tillicum** uses a **usage-based model**. All users have the same priority, and access is controlled through [**QoS (Quality of Service)**](#tillicum-qos) rather than partitions.  
- **No checkpoint partition** exists on Tillicum.  
- **Simpler access** – you don't need to determine partitions; just select the appropriate [**QoS**](#tillicum-qos).  
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
| **normal**      | 24 hours   | 16               | NA                | 48 GPUs              | Standard production work        |
| **debug**       | 1 hour     | 1                | 1                 | 1 job                | Quick testing and setup         |
| **interactive** | 8 hours    | 2                | 2                 | 2 jobs               | Real-time work or debugging     |
| **long**        | 7 days     | 16               | NA                | QoS cannot exceed 96 GPUs* | Long jobs        |
| **wide**        | 24 hours   | NA               | NA                | QoS cannot exceed 96 GPUs* | Distributed jobs          |
| **urgent**      | 3 days     | 64               | NA                | QoS cannot exceed 96 GPUs* | Working under a strict deadline  |

**These QoS levels use a shared GPU limit rather than per-user concurrent limits. Jobs running under Long and Wide collectively share a pool of GPUs, with a maximum of 96 GPUs in use at any time across all users.*


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

****Urgent QoS is offered as a premium service tier.**** For jobs submitted to the Urgetn QoS:

> ***Billable GPU Hours*** = **2**(*GPU Hour*) = Elapsed Time x *N* GPUs 

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
salloc --qos=debug --gres=gpu:1 --cpus-per-task=8 --mem=200G --time=00:30:00
```

Run a normal QoS job with 2 GPUs:

```js
salloc --qos=normal --gres=gpu:2 --cpus-per-task=16 --mem=400G --time=04:00:00
```
*Note*: If you don't specify `--qos`, the job will default to **`normal`**.

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

Your best tool for monitoring the progress of your jobs is the `squeue` command which will show you all jobs running or requested on the cluster. A quick look at `squeue` output will allows you to estimate cluster traffic. 

```js
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
- **QOS:** The resource pool or QoS (e.g., `normal`, `interactive`).
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

```js
squeue -u $USER
```

If your job is in State "PD" for pending under the "ST" column, you can look at the "REASON" column to determine why you job is being held. Common reasons include:

- `ReqNodeNotAvail`: Your job overlaps with a maintenance reservation. Run `scontrol show res` to view any reservations in place.
- `QOSResourceLimit`: Your job exceeds your individual resource limit but will run when additional resources are available (i.e., your other jobs finish).

For more information, see Slurm's [**guide to job reasons.**](https://slurm.schedmd.com/squeue.html#SECTION_JOB-REASON-CODES).

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

## Budgeting and Resource Utilization

To help guide your work, our Slurm job submit script will show you an estimate of how much your job will cost when using Slurm to schedule a job. For example, 

```js
salloc --qos=normal --gres=gpu:1 --time=2:00:00
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

---

## Monitoring Usage with `hyakusage`

Tillicum provides a convenient utility called `hyakusage` to help users track their usage and costs. `hyakusage` summarizes resource usage and associated costs across users, accounts, and QOS levels.

:::warning
Users are responsible for monitoring their own usage.
:::

### Budget Enforcement

Tillicum supports budget settings at both the **account** and **user** levels. Once a budget is configured, **budget enforcement is enabled by default**. If you are a PI and prefer to monitor usage only without enforcing automatic job submission termination when a budget is exceeded, please contact us at [**help@uw.edu**](mailto:help@uw.edu) and include "Tillicum" in the subject line.

Budgets are managed by the Tillicum administrators. To **add, update, or remove** a budget, please email [**help@uw.edu**](mailto:help@uw.edu) with "Tillicum" in the subject line with the approval from your PI.

### Default

Running `hyakusage` with no arguments prints a usage report for the **current billing cycle** for the **current user**, grouped by **account** and **QOS**. Additionally, a budget usage summary will also be included if the user- or account-level budget is defined.

```js
hyakusage
```

**Key features:**
- Displays usage for all accounts you have access to.
- Shows total GPU-hours and costs per account for current billing cycle at the top of each account.
- Shows active credits (e.g., remaining demo credits) with corresonding expiration dates.
- Integrates user- and account-level budgets (if set) to show progress toward limits.

**Example output from January 2, 2026:**

```js
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are calculated by base rate ($ 0.9/h) x billable GPU hours,
      where billable GPU hours = raw GPU hours x QOS multiplier.
  * Costs are rounded to nearest cent.

Usage Report for Account account1:
Current Billing Cycle TOTAL Usage: 26.23 GPU hours, $23.61
TOTAL Active Credits: $437.34
  * $347.34 expiring on 2026-02-25
  * $90.00 (no expiration)
╭───────────────────────────────────────────────────────╮
│    Usage User Breakdown (2025-12-26 to 2026-01-02)    │
├────────────────────────┬─────────────────┬────────────┤
│ USER                   │ GPU HOURS (HRS) │    JOBS    │
├────────────────────────┼─────────────────┼────────────┤
│ user1                  │            3.69 │         16 │
╰────────────────────────┴─────────────────┴────────────╯
╭───────────────────────────────────────────────────────╮
│     Usage QOS Breakdown (2025-12-26 to 2026-01-02)    │
├────────────────────────┬─────────────────┬────────────┤
│ QOS       (MULTIPLIER) │ GPU HOURS (HRS) │ COST (USD) │
├────────────────────────┼─────────────────┼────────────┤
│ interactive    (x 1.0) │            3.44 │      $3.09 │
│ normal         (x 1.0) │            0.26 │      $0.23 │
├────────────────────────┼─────────────────┼────────────┤
│ TOTAL (selected users) │            3.69 │      $3.33 │
╰────────────────────────┴─────────────────┴────────────╯
╭─────────────────────────────────────────────────────────────────╮
│                       Budget Usage Summary                      │
├──────────────┬─────────────────────┬────────┬─────────┬─────────┤
│ USER         │  USED/BUDGET (USD)  │ USED % │   TYPE  │ ENFORCE │
├──────────────┼─────────────────────┼────────┼─────────┼─────────┤
│ user1        │       3.69 / 500.00 │     1% │   total │    true │
├──────────────┼─────────────────────┼────────┼─────────┼─────────┤
│ account1     │     23.61 / 1000.00 │     2% │ monthly │   false │
╰──────────────┴─────────────────────┴────────┴─────────┴─────────╯
```

### Options

The `hyakusage` program has a rich set of command line arguments for more complex queries.

```js
$ hyakusage --help
Print GPU hour usage and costs on Tillicum.

Usage: hyakusage [options]

Example: hyakusage -u all
  Show usage for all users in your accessible accounts in current billing cycle.

Optional arguments:
  -u, -user      Comma-separated list of users or "all" for all users in your accessible accounts (default: current user)
  -s, -start     Start date YYYY-MM-DD (default: start of current billing cycle)
  -e, -end       End date YYYY-MM-DD inclusive (default: today)
  -a, -account   Comma-separated list of accounts  or "all" for all accessible accounts (default: all)
  -q, -qos       Comma-separated list of QOS  or "all" for all QOS in your accessible accounts (default: all)
  -h, -help      Show this help message and exit

Notes:
  * Billing cycle starts on the 26th of each month.
  * Usage is counted by job END date.
  * Costs are rounded to nearest cent.
  * You can only see accounts you have access to.
```

### Examples

```js
# To audit all users' resource usage from your group
hyakusage -u all

# To view resource usage for a given time period
hyakusage -s 2025-10-15 -e 2025-10-25

# To filter by specific account and QOS
hyakusage -a account1 -q debug
```
