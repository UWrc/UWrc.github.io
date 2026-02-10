---
id: data
title: Start Here
---


## What is storage for a supercomputer?

Storage on every Hyak cluster (e.g., Klone and Tillicum) is physically separate. It is best practice on every supercomputer that storage live as its own infrastructure to be high-performance and able to handle the bandwidth I/O and read/write operations required by so many compute nodes attached to it. These are typically parallel file systems (e.g., [<ins>**GPFS**</ins>](https://en.wikipedia.org/wiki/GPFS), [<ins>**Lustre**</ins>](https://en.wikipedia.org/wiki/Lustre_(file_system)), [<ins>**BeeGFS**</ins>](https://en.wikipedia.org/wiki/BeeGFS)).

Storage systems are mounted (i.e., accessible) from every compute node of the cluster. Each Hyak cluster (e.g., Klone and Tillicum) has its own separate parallel file system. The storage attached to each Hyak cluster has its own policies, hierarchy, etc. Please refer to their respective pages for more information:

* [<ins>**Storage on Klone**</ins>](./gscratch.md)
* [<ins>**Storage on Tillicum**</ins>](/docs/tillicum/storage.md)

:::warning
## Important Storage Reminder for Hyak Klone

***Hyak Klone does not provide backup, persistent storage, or archival storage. All data on Klone exists as a single copy*** and is therefore vulnerable to loss due to hardware failure, filesystem issues, facility damage, or natural disasters. Users are solely responsible for transferring important results to external systems (for example, [<ins>**Kopah S3**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083) or [<ins>**Lolo Archive**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084)) during the course of their project if persistent or long-term storage is required. ***Retaining long-term or archival data on Klone is against administrative guidance.***
::: 

While our storage systems have a track record of stability, it is important to note that **STORAGE IS NOT BACKED UP** by default on Hyak Klone, while backups are in place for dedicated project storage and home directories on Tillicum. It is the responsibility of the user that in the event of an incident you have a place and plan to restore their data. 

#### On campus storage options: 
* [<ins>**Kopah S3 Object Storage**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083)
* [<ins>**Lolo Data Archive**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084) for persistent, geographically redundant storage. 
* Alternatively, UWIT can help you select from commercial storage options that include UW discounts. [<ins>**More information about Cloud Computing options**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036116). 

## Best Practices: 3-2-1 Policy

Your data is precious, in some cases completely irreplaceable. The research computing team encourages the use of the widely accepted 3-2-1 backup strategy.

:::note
3-2-1 is a general IT best practice see the following references: [<ins>**Backblaze**</ins>](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/), [<ins>**Acronis**</ins>](https://www.acronis.com/en-us/articles/backup-rule/), and [<ins>**Networkworld**</ins>](https://www.networkworld.com/article/3527303/for-secure-data-backup-here-s-how-to-do-the-3-2-1-rule-right.html).
:::

The 3-2-1 backup policy suggests **3 copies** of your data on **2 different types of storage media** of which **1 copy is off-site**. If you use both Klone Gscratch (i.e., `/gscratch`) and Lolo then you are already adhering to this best practice: One copy resides in `/gscratch` on our parallel file system, and if you archive your data to Lolo, two additional copies are created (it does automatic duplication with one copy on UW-Seattle campus and another copy in eastern Washington). `/gscratch` consists of spinning disk hard drives as a storage medium while Lolo is a tape-based storage medium. Lolo does one of its automatic duplication copies to a  geographically remote data center in eastern Washington.

:::important
You have to copy your data to Lolo to be 3-2-1 compliant or to use your own archive solution, it does not happen automatically. [<ins>**See our Lolo documentation for more information**</ins>](/docs/lolo/lolo.md).
:::
