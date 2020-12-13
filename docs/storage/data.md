---
id: data
title: Start Here
---

Storage for your data works a little bit different on a supercomputer compared to your desktop. A high-level introduction can be found [below](#what-is-storage-for-a-supercomputer). This page also covers [best practices](#3-2-1-policy) around how to handle your data, this is the 3-2-1 policy. Each HYAK cluster has its own storage, refer to the [klone](klone) or [mox](mox) storage page for more cluster-specific in-depth details.

## What is storage for a supercomputer?

Storage on every HYAK cluster is physically separate. It is best practice on every supercomputer that storage live as its own infrastructure to be high-performance and able to handle the bandwidth I/O and read/write operations required by so many compute nodes attached to it. These are typically parallel file systems (e.g., [GPFS](https://en.wikipedia.org/wiki/GPFS), [Lustre](https://en.wikipedia.org/wiki/Lustre_(file_system)), [BeeGFS](https://en.wikipedia.org/wiki/BeeGFS)).

Storage systems are mounted (i.e., accessible) from every compute node of the cluster. Each HYAK cluster (e.g., `klone`, `mox`) has its own separate parallel file system. The storage attached to each HYAK cluster has its own policies, hierachy, etc. Please refer to their respective pages for more information. 

:::warning
Cluster storage is not backed up!
:::

While our storage systems have a track record of stability, it is important to note that **STORAGE IS NOT BACKED UP** by default. It is the responsibility of the user that in the event of an incident you have a place and plan to restore their data. We provide a complementary [archive](archive) service that is appropriate for this and other solutions exist.

## 3-2-1 Policy

Your data is precious, in some cases completely irreplacable. However, we have a lot of 

:::tip

3-2-1 is not a HYAK thing, it's a general IT best practice.

:::
