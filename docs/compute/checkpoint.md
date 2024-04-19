---
id: checkpoint
title: Using Idle Resources
---
### Hyak's Condo Model
The Hyak clusters operate on a condo model, the details of which are here: https://hyak.uw.edu/pricing

The **first** component of this model is on-demand access to the resources your group has contributed. When you request resources from a partition, e.g. with:

```shell terminal=true
salloc --account labname --partition compute
```

You will be limited by the amount of resources your lab has contributed to that partition (in this example, `compute`).

In other words, if your group has contributed 40 CPUs to the `compute` partition, your group will only be able to allocate 40 CPUs at any given time.

### The Checkpoint Partition
The **second** component of our condo model—and one of the major advantages of contributing to the cluster—is the "checkpoint" partition, `ckpt`. When you request resources from `ckpt`, e.g. with:

```shell terminal=true
salloc --account labname --partition ckpt
```

You can request resources from the entire cluster's idle resources (including GPUs, regardless of whether your lab has contributed any). You can view currently idle resources, both for your lab's partition and for the whole cluster, using our `hyakalloc` command ([further documentation here](https://hyak.uw.edu/docs/compute/resource-monitoring#hyakalloc)).

:::tip What is an "Idle" resource?
When we say a resource is "currently idle," that only means no running jobs are using it at this moment. "Idle" does **not** imply that you are guaranteed to receive a resource if you request it! Our job scheduler, Slurm, may already have a plan for that resource (by the lab who contributed it, or even by another checkpoint user). In other words, "currently idle" doesn't mean "idle in 5 minutes from now".
:::

### Checkpoint Limitations

Jobs submitted to checkpoint are limited in the following ways:

1. **Non-GPU checkpoint jobs** will be stopped & requeued every 4-5 hours. **GPU checkpoint jobs** will be stopped & requeued every 8-9 hours.
2. All checkpoint jobs can be stopped & requeued at any time—*without notice*—if a resource contributor requests their resource (this is the mechanism which provides on-demand access to contributed resources). This mechanism is called **pre-emption**.
3. Interactive jobs on checkpoint (requested with `salloc`) are held to the same limitations listed above. 

Jobs submitted to this partition should be designed to:

1. Save their progress at regular intervals, or "checkpoints."
2. Once resumed, start their work from the last saved "checkpoint."

:::tip What about the `--time` directive?
When developing your `sbatch` script, you should set a maximum runtime for your job with the `sbatch` directive `--time`. Users should always set `--time=` to the maximum expected runtime of the job with some extra margin for error. Your checkpoint jobs will requeue as many times as required either by the checkpoint time limit for non-GPU (4-5 hours) or GPU jobs (8-9 hours) or pre-emption until the *maximum* runtime has elapsed as directed by `--time`.
:::