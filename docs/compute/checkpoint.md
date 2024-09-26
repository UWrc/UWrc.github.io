---
id: checkpoint
title: Using Idle Resources
---
### Hyak's Condo Model
The Hyak clusters operate on a condo model, the details of which are here: https://hyak.uw.edu/pricing

The **first** component of this model is on-demand access to the resources your group has contributed. When you request resources from a partition, for example, with:

```bash
salloc --partition compute
# the above will default to the first account you were added to 
# add --account followed by your lab/group name to specify the account
```

You will be limited by the amount of resources your lab has contributed to that partition (in this example, `compute`). In other words, if your group has contributed 40 CPUs to the `compute` partition, your group will be able to allocate up to 40 CPUs (per group cumulative, not per user) at any given time.

To see which groups and partitions you belong to, use the `hyakalloc` command on `klone`.

### The Checkpoint Partition
The **second** component of our condo model—and one of the major advantages of contributing to the cluster—is the "checkpoint" partition, `ckpt`. When you request resources from `ckpt`, for example, with:

```bash
salloc --partition ckpt
```

:::tip What is an "Idle" resource?
When we say a resource is "currently idle," that only means no running jobs are using it at this moment. "Idle" does **not** imply that you are guaranteed to receive a resource if you request it! Our job scheduler, Slurm, may already have a plan for that resource (by the lab who contributed it, or even by another checkpoint user). In other words, "currently idle" doesn't mean "idle in 5 minutes from now".
:::

You can request resources from the entire cluster's idle resources (including GPUs, regardless of whether your lab has contributed any). You can view currently idle resources, both for your lab's partition and for the whole cluster, using our `hyakalloc` command ([**further documentation here**](https://hyak.uw.edu/docs/compute/resource-monitoring#hyakalloc)).

#### New `g2` Nodes

Following our June 2024 maintenance, we have a new class of nodes being deployed on `klone` which we are calling `g2` because they are the second generation of nodes. CPU `g2` nodes feature AMD EPYC 9000-series 'Genoa' processors, and new GPU nodes featuring either NVIDIA L40 or L40S GPUs. For this reason, you might be interested in running your jobs on `g2` node specifically, and using the `ckpt-g2` partition, for example, with: 

```bash
salloc --partition ckpt-g2
```

If you don't have a node-preference for your jobs, we have created a partition `ckpt-all` which will send your job to be scheduled on either `g1` or `g2`. Note: `ckpt-all` has the ability to schedule jobs on a larger number of resources. For all intents and purposes, the following commands schedule jobs on idle resources: 

```bash
# Schedule jobs on g1 nodes only.
salloc --partition ckpt
# Schedule jobs on g2 nodes only. 
salloc --partition ckpt-g2
# Schedule jobs on either g1 or 2 nodes. 
salloc --partition ckpt-all
```

:::important G1 vs G2 Nodes
The new `g2` nodes will likely run faster than the previous generation of nodes. However, there are fewer `g2` nodes than g1. For this reason, if all users start sending jobs to `ckpt-g2` wait times for jobs could be longer in the `g2` queue for `ckpt-g2` users. (wait times will not affect `g2` resource owners who will have priority for scheduling on `g2` resources)

The new `g2` nodes have a different architecture, which might offer additional optimizations. However, this could lead to differences in compilation, and if uniformity is important to you, you should consider sticking with either `ckpt` or `ckpt-g2` rather than `ckpt-all`.

Please see [**this blog post**](https://hyak.uw.edu/blog/g1-vs-g2) for additional discussion about `g1` and `g2` node specifications and usage considerations.
:::

### Checkpoint Limitations

Jobs submitted to checkpoint are limited in the following ways:

1. **Non-GPU checkpoint jobs** will be stopped & requeued every 4-5 hours. **GPU checkpoint jobs** will be stopped & requeued every 8-9 hours.
2. All checkpoint jobs can be stopped & requeued at any time—*without notice*—if a resource contributor requests their resource (this is the mechanism which provides on-demand access to contributed resources). This mechanism is called **pre-emption**.
3. Interactive jobs on checkpoint (requested with `salloc`) are held to the same limitations listed above. 

Jobs submitted to this partition should be designed to:

1. Save their progress at regular intervals, or "checkpoints."
2. Once resumed, start their work from the last saved "checkpoint."

:::info
[**DMTCP**](/docs/tools/dmtcp) is a recommended tool for checkpointing many types of jobs on HYAK without modifying application code. See our [**documentation**](/docs/tools/dmtcp) for more information.
:::

:::tip What about the `--time` directive?
When developing your `sbatch` script, you should set a maximum runtime for your job with the `sbatch` directive `--time`. Users should always set `--time=` to the maximum expected runtime of the job with some extra margin for error. Your checkpoint jobs will requeue as many times as required either by the checkpoint time limit for non-GPU (4-5 hours) or GPU jobs (8-9 hours) or pre-emption until the *maximum* runtime has elapsed as directed by `--time`.
:::
