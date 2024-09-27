---
id: data
title: Start Here
---

Storage for your data works a little bit different on a supercomputer compared to your desktop. A high-level introduction can be found [below](#what-is-storage-for-a-supercomputer). This page also covers [best practices](#3-2-1-policy) around how to handle your data, this is the 3-2-1 policy. Each Hyak cluster has its own storage, refer to the [klone](klone) or [mox](mox) storage page for more cluster-specific in-depth details.

## What is storage for a supercomputer?

Storage on every Hyak cluster is physically separate. It is best practice on every supercomputer that storage live as its own infrastructure to be high-performance and able to handle the bandwidth I/O and read/write operations required by so many compute nodes attached to it. These are typically parallel file systems (e.g., [GPFS](https://en.wikipedia.org/wiki/GPFS), [Lustre](https://en.wikipedia.org/wiki/Lustre_(file_system)), [BeeGFS](https://en.wikipedia.org/wiki/BeeGFS)).

Storage systems are mounted (i.e., accessible) from every compute node of the cluster. Each Hyak cluster (e.g., `klone`, `mox`) has its own separate parallel file system. The storage attached to each Hyak cluster has its own policies, hierachy, etc. Please refer to their respective pages for more information. 

:::warning
Cluster storage is not backed up!
:::

While our storage systems have a track record of stability, it is important to note that **STORAGE IS NOT BACKED UP** by default. It is the responsibility of the user that in the event of an incident you have a place and plan to restore their data. We provide a complementary [archive](archive) service that is appropriate for this and other solutions exist.

## 3-2-1 Policy

Your data is precious, in some cases completely irreplacable. The research computing team encourages the use of the widely accepted 3-2-1 backup strategy.

:::tip
3-2-1 is not a Hyak thing, it's a general IT best practice [[Backblaze](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/)] [[Acronis](https://www.acronis.com/en-us/articles/backup-rule/)] [[Networkworld](https://www.networkworld.com/article/3527303/for-secure-data-backup-here-s-how-to-do-the-3-2-1-rule-right.html)].
:::

The 3-2-1 backup policy suggests **3 copies** of your data on **2 different types of storage media** of which **1 copy is off-site**. If you use both `gscratch` and `LOLO` then you are already adhering to this best practice, which is why it was designed this way. One copy resides in `gscratch` on our parallel file system and if you archive your data to LOLO, two additional copies are created (it does automatic duplication with one copy on UW-Seattle campus and another copy in eastern Washington). `gscratch` consists of spinning disk hard drives as a storage medium while LOLO is a tape-based storage medium. `LOLO` does one of its automatic duplication copies to a  geographically remote data center in eastern Washington.

:::caution
You have to copy your data to LOLO to be 3-2-1 compliant or to use your own archive solution, it does not happen automatically.
:::
