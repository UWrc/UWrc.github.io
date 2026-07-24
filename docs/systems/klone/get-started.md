---
title: Get Started on Klone
---

Klone is the 3rd generation Hyak HPC cluster. This page covers the essential information you need to start using Klone, including login nodes, resource policies, and how to check your available resources.

## Prerequisites

Before getting started on Klone, make sure you've completed the common onboarding steps:

1. [**Join a Group**](/docs/getting-started/join-group) — Get added to a Hyak group account
2. [**Create Your Account**](/docs/getting-started/account-creation) — Set up your UW research computing account
3. [**Activate Your Account**](/docs/getting-started/account-activation) — Complete account activation
4. [**SSH Login**](/docs/getting-started/ssh-login) — Connect to the cluster via SSH

---

## Login Nodes

When you first SSH into `klone`, you land on one of the two login nodes (e.g., `klone-login01`). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy-duty computing.

:::warning
You should **never** use login nodes for heavy computing. Automated mechanisms exist to monitor and enforce violations.
:::

## Arbiter

The tool used to notify users of login node violations is **Arbiter2**. You will receive an email for each offending process. Arbiter dynamically limits resource consumption on login nodes to keep them in stable working order and ensure fair usage as a community resource.

For more information, see: [Gardner, Migacz, and Haymore. "Arbiter: Dynamically Limiting Resource Consumption on Login Nodes." *Proceedings of the Practice and Experience in Advanced Research Computing on Rise of the Machines (learning)*. 2019.](https://doi.org/10.1145/3332186.3333043)

## Accounts and Partitions

Every user is part of an **account** and thus has access to certain **partitions**. Your account is usually related to a lab or research group that you belong to. For example, you may be part of a lab group that has contributed resources to Hyak, affording you priority usage of those resources organized into one or more partitions. Alternatively, you may be a student user who is part of the [**Research Computing Club**](https://depts.washington.edu/uwrcc/) (account `stf`).

:::tip Pro Tip - Get an STF account
If you are a **student** who is paying the student technology fee (STF), you are eligible for an `stf` account which will increase your access and user experience on Hyak because there are designated resources for students. [**Click here to find out how to get an STF account**](https://depts.washington.edu/uwrcc/hyak_access/). NOTE: The Hyak Team doesn't manage the `stf` account group.
:::

### Partition Overview

The table below outlines the types of compute resources available for each partition. Use this table to determine the maximum single-node job size for each node type.

:::important
For example, 40 CPUs and just under 192 GB of RAM is the maximum job size for a single compute node. Larger jobs submitted to the compute partition will be spread over multiple nodes. To ensure all 40 CPUs are requested from a single node, include the `--nodes=1` directive.
:::

| Partition        | CPU Cores per Node  | Memory per Node  | GPUs per Node    | Memory per GPU      |
|------------------|---------------------|------------------|------------------|---------------------|
| compute          | 40                  | 192 GB           | 0                | -                   |
| compute-bigmem   | 40                  | 384 GB           | 0                | -                   |
| compute-hugemem  | 40                  | 750 GB           | 0                | -                   |
| compute-ultramem | 52                  | 1536 GB          | 0                | -                   |
| cpu-g2           | 192                 | 1536 GB          | 0                | -                   |
| cpu-g2-mem2x     | 192                 | 3072 GB          | 0                | -                   |
| gpu-2080ti       | 40                  | 384 GB           | 8                | 11 GB               |
| gpu-rtx6k        | 40                  | 384 GB           | 8                | 48 GB               |
| gpu-p100         | 56                  | 1024 GB          | 4                | 16 GB               |
| gpu-titan        | 40                  | 384 GB           | 4                | 24 GB               |
| gpu-a100         | 52                  | 1024 GB          | 8                | 40 GB               |
| gpu-a40          | 52                  | 1024 GB          | 8                | 48 GB               |
| gpu-l40          | 128                 | 1536 GB          | 8                | 48 GB               |
| gpu-l40s         | 128                 | 1536 GB          | 8                | 48 GB               |
| gpu-h200         | 128                 | 2304 GB          | 8                | 141 GB              |

## What Resources Do You Have? — `hyakalloc`

The `hyakalloc` command allows users to see which accounts and partitions they are a part of and the current utilization of these resources. Resource limits are directly proportional to what was contributed by that group. By default, the output of `hyakalloc` might look something like this:

```js
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

Users can use several optional arguments with the `hyakalloc` command:

```js
hyakalloc --help
```
```js
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

## Next Steps

- [**Scheduling Jobs on Klone**](/docs/systems/klone/scheduling-jobs) — Learn how to submit interactive and batch jobs
- [**Storage on Klone**](/docs/systems/klone/storage) — Understand the filesystem and storage quotas
- [**GPUs on Klone**](/docs/systems/klone/gpus) — Get started with GPU computing
