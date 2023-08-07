---
id: glossary
title: Glossary
---

<a name="checkpoint" /> <br /><br /><br />

[**Checkpoint partition**](#checkpoint): This represents idle resources across the cluster at any moment. All cluster users are eligible to submit jobs to this partition and they will run subject to availability. To provide some regular churn in pending checkpoint jobs, every hour all jobs running for >4 hours are re-queued (i.e., SIGTERM and re-submitted to the checkpoint partition queue). The jobs will continue in this manner until the job exits or the requested runtime is fulfilled.

<a name="gpu" /> <br /><br /><br />

[**GPU**](#gpu): Graphical Processing Unit or GPU are cards historically used for rendering video for computer screens. Over the past decade they have been repurposed for scientific workflows that rely on lots of matrix math since those operations are fundamentally the same as required to generate computer graphics. The vast majority of GPU workflows are for machine learning and artificial intelligence applications. However, there are many non-ML workflows as well.

<a name="hpc" /> <br /><br /><br />

[**HPC**](#hpc): High-Performance Computing or HPC is the integration of multiple servers (or nodes) together through a high-bandwidth and low-latency interconnect (sometimes called fabric). Traditional HPC scientific codes are typically programmed to take advantage of simultaneously running on several nodes and passing data between them over this fabric. However, in recent years most codes rely on the increasing number of CPU cores on a single node to scale instead (so called “embarrassingly parallel” jobs) as the programming overhead to make a code multi-node can be substantial.

<a name="node" /> <br /><br /><br />

[**Node**](#node): In the HPC world, a server is synonymous with a node. 1 server = 1 node so it is OK to use those two terms interchangeably.
- **HPC Node**: A standard compute node with no additional components and variable amounts of memory at time of procurement.
- **GPU Node**: A standard node with GPU cards added in at time of procurement. GPUs are typically used for ML workflows and in rarer cases for applications that have been specifically ported over to GPUs to speed up the runtime.

<a name="server" /> <br /><br /><br />

[**Server**](#server): The smallest physical unit of compute purchased. Typically only the HYAK engineering team will work in terms of servers. Servers can be thought of as desktop computer equivalents that are specialized to live in a data center environment in a rack mounted form factor. These are the smallest individual units of compute that the HYAK team will source from suppliers and vendors to build the cluster.

<a name="slice" /> <br /><br /><br />

[**Slice**](#slice): The smallest logical unit of compute purchased. Typically researchers, investigators, faculty, etc. will work in terms of slices. Slices are a HYAK-specific administrative term to represent a maximum amount of compute cores, memory, and maybe GPU(s) in a unit that are purchased on behalf of a researcher. This resource slice can be divided into as many jobs among as many users associated with that group as possible to the smallest schedulable resource (e.g., 1-compute core, 1MB of memory, 1-GPU).

<a name="slot" /> <br /><br /><br />

[**Slot**](#slot): 1 resource slice can fill 1 slot. This is a UW administration specific (at the level of HYAK sponsor) term for a unit of accounting. Sponsors will support a certain capacity for their investigators as maximum number of slots. Tier-1, tier-2, and self-sponsors support more than 200, 50, and 1 slot(s) for their investigators in aggregate, respectively. Self-sponsored slots are for individual faculty who don’t hold appointments in sponsoring entities (e.g., College of Engineering) yet are interested in being part of the cluster. For those slots that are not self-sponsored, the annual support expenses associated with slices that occupy those slots are borne by the sponsors and not the investigators. For self-sponsored slots, the slices that go into them are the obligation of the faculty whose slices those are each year.
