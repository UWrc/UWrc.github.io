---
id: start-here
title: Start Here
---

In a large, distributed environment such as an HPC cluster, a scheduler is required to request compute resources and dispatch user processes (called "jobs") on them. There are several available for HPC systems but the most common one is called **Simple Linux Utility for Resource Management** or "Slurm" for short [[Wikipedia](https://en.wikipedia.org/wiki/Slurm_Workload_Manager)]. The Hyak clusters use Slurm so any general documentation you can find on the internet is valid, including directly from the developer [[SchedMD](https://slurm.schedmd.com)]. While SchedMD documentation is the most authoritative, this section has some common examples you might find useful with sample arguments specific to the `klone` cluster of Hyak.

### Accounts
Every user is part of an account and thus has access to certain partitions. Your account is usually related to a lab or research group that you belong to; for example, you may be part of a lab group that has contributed resources to Hyak, affording you priority usage of those resources, which are organized into one or more partitions. Alternatively, you may be a student user who is part of the [**Research Computing Club**](https://depts.washington.edu/uwrcc/), or account `stf`, meaning that you have priority access on the `stf` account, which allows you to use several partitions. 

:::tip Pro Tip - Get an STF account
If you are a **student** who is paying the student technology fee (STF), you are eligible for an `stf` account which will increase your access and user experience on Hyak because there are designated resources for students. [**Click here to find out how to get an STF account**](https://depts.washington.edu/uwrcc/hyak_access/). NOTE: The Hyak Team doesn't manage the `stf` account group.
:::

### Partitions
The account(s) you are a part of determine the priority access you have to certian partitions. All users can use Hyak resources when they are idle by scheduling jobs on the `ckpt`, `ckpt-g2`, or `ckpt-all` parititions ([**Click here to learn about more about `ckpt` jobs.**](https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition)). 

### What Resources Do You Have?
The `hyakalloc` command allows users to see which accounts and partitions they are a part of and the current utilization of these resources. Resource limits are directly proportional to what was contributed by that group. By default, the output of `hyakalloc` might look something like this:

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
Note that `hyakalloc` shows all the idle resources on the checkpoint (`ckpt`) partition you have access to. For a demo account, the output to `hyakalloc` should look something like this: 
```bash        
╭─────────┬───────────┬──────┬────────────────────────────────╮
│ Account │ Partition │ CPUs │  Memory │ GPUs    │       │    │  
├─────────┼───────────┼──────┼────────────────────────────────┤
│    demo │   pending │    0 │  0G     │    0    │ TOTAL │    │
│         │           │    0 │  0G     │    0    │ USED  │    │
│         │           │    0 │  0G     │    0    │ FREE  │    │
╰─────────┴───────────┴──────┴────────────────────────────────╯
```

Users can use several optional arguments with the `hyakalloc` command to execute specific actions. A list of all optional arguments will print to your screen with the `hyakalloc --help` command:
```bash
hyakalloc --help
```
```bash
usage: hyakalloc [-h] [-a | -c | -C CC | -u USER | -g GROUP] [-p PARTITION]

Queries Hyak allocation for users or groups.

optional arguments:
  -h, --help            show this help message and exit
  -a, --all             (Optional) Query all accounts & partitions.
  -c, --ckpt            (Optional) Query available resources in checkpoint.
  -C CC, --cc CC        (Optional) Query a specific Checkpoint Collective (cc).
  -u USER, --user USER  (Optional) Query a specific user.
  -g GROUP, --group GROUP
                        (Optional) Query a specific group (Hyak Account).
  -p PARTITION, --partition PARTITION
                        (Optional) Filter by partition name.
```
The `sinfo` command allows users to view information about all partitions on Hyak. Similarly to `hyakalloc`, the `sinfo` command supports a variety of optional arguments, allowing for more complex commands. For example, `sinfo -s` will summarize the default output of `sinfo` by printing out a more concise and readable list of partitions and their corresponding host names.
```bash
sinfo -s
```
```bash
PARTITION        AVAIL  TIMELIMIT   NODES(A/I/O/T) NODELIST
compute-bigmem      up   infinite        26/1/1/28 n[3008-3011,3064,3066,3132-3133,3190,3244-3247,3252-3255,3353-3355,3400-3407]
ckpt                up   infinite    444/50/16/510 g[3001-3007,3010-3017,3020-3027,3030-3037,3040-3047,3050-3057,3060-3067,3070-3077,3080-3087],n[3000-3431],z[3001-3002,3005-3009]
ckpt-all            up   infinite    488/69/16/573 g[3001-3007,3010-3017,3020-3027,3030-3037,3040-3047,3050-3057,3060-3067,3070-3077,3080-3087,3090-3122],n[3000-3461],z[3001-3002,3005-3009]
ckpt-g2             up   infinite       44/19/0/63 g[3090-3122],n[3432-3461]
compute*            up   infinite     320/45/9/374 n[3012-3015,3024-3063,3068-3131,3134-3189,3191-3239,3248-3251,3256-3299,3304-3352,3356-3363,3368-3399,3408-3431]
cpu-g2              up   infinite       10/16/0/26 n[3432-3438,3440,3442,3444,3446-3461]
cpu-g2-mem2x        up   infinite          2/2/0/4 n[3439,3441,3443,3445]
gpu-2080ti          up   infinite         7/3/3/13 g[3001-3007,3014-3017,3027],z3001
gpu-a100            up   infinite          8/0/0/8 g[3080-3087]
gpu-a40             up   infinite        32/0/0/32 g[3040-3047,3050-3057,3060-3067,3070-3077]
gpu-l40             up   infinite        15/0/0/15 g[3090-3099,3115-3119]
gpu-l40s            up   infinite        17/1/0/18 g[3100-3114,3120-3122]
gpu-p100            up   infinite          2/0/0/2 z[3005-3006]
gpu-rtx6k           up   infinite        19/0/0/19 g[3010-3013,3020-3026,3030-3037]
gpu-titan           up   infinite          1/0/0/1 z3002
compute-hugemem     up   infinite        26/1/3/30 n[3000-3007,3016-3023,3065,3067,3240-3243,3300-3303,3364-3367]
compute-ultramem    up   infinite          3/0/0/3 z[3007-3009]
```
**Use `sinfo --help` for a detailed list of optional arguments.**

The following sections will walk through how to request and schedule jobs using Slurms `salloc` and `sbatch` commands. As you go, keep using the `hyakalloc` command to remember which accounts and partitions you can access because this determines the resource types you can request.
