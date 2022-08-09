---
slug: terminology-reset
title: Terminology Reset
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [hyak, hpc, supercomputer, node, slice]
---

:::note
There is no operational change, this is an administrative clarification of HYAK specific terminology.
:::

The HYAK community has grown substantially over the past year, including the administrative teams that work with us to support the service. Some terms (e.g., nodes, servers) have been loosely used in communication, but have specific meanings for different backend teams. Beginning today, we are harmonizing all the terms to alleviate any confusion between the different teams supporting HYAK and our end users. This is only a clarification of language: **there is no change to how HYAK operates**.

At the physical layer we have **nodes** or **servers**: the smallest individual physical units of the HPC cluster. These are what we, the HYAK engineering team, purchase from our vendor partners. Historically, a physical **node** or **server** was what a lab would purchase to join the cluster. However, since HYAK’s inception, resource density has increased to such an extent–servers with hundreds of CPU cores, hundreds of gigabytes of RAM, multiple graphics cards, etc.–it no longer made sense to require labs to purchase an entire physical node.

Once we crossed a certain threshold, we began to offer labs an amount of computing resources–a specific number of CPU cores, amount of RAM, number of GPUs, etc.–rather than discrete servers, but we kept the **node** nomenclature. For a while, when labs purchased a **node**, it no longer meant they were purchasing a server, even though those words are identical in many computing contexts. From today forward, we are restoring those terms to their original meanings for HYAK: **one node is one physical server**.

When labs join HYAK, they will not purchase a physical node, they will purchase a **slice**. A **slice** represents an amount of on-demand compute capacity–CPUs, RAM, GPUs, etc. Again, this is only a terminology clarification: HYAK has operated this way for a while. One of the benefits of this model is that **slices**–representing resources, not specific, physical pieces of hardware–make resource scheduling considerably easier for our cluster's scheduling software, Slurm. This efficiency is returned to the entire community both as depth of the checkpoint partition’s resources, and as faster scheduling for non-checkpoint jobs. 

We've seen some users refer to this as "virtualization", and that is a misnomer. We want to emphasize that there is **no hardware virtualization** taking place here: your job will run on the bare-metal, physical resources you have requested from Slurm.

While this may seem like a minor change in language, it will greatly ease the coordination among many groups working behind the scenes to support the HYAK service. As always, we appreciate your understanding and patience as we continue to refine and improve the support provided.

**See also:**
* [Glossary of HYAK specific terms](/docs/glossary).
