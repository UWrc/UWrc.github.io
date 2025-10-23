---
id: storage
title: Storage
---

On Tillicum, storage is **physically separate** from computation nodes. It’s mounted so every node in the cluster can access it under `/gpfs/`.

You’ll often hear Tillicum storage referred to as "GPFS", which stands for **General Parallel File System** — IBM’s high-performance, cluster-wide filesystem. It allows all compute nodes to read and write to the same shared data simultaneously with very high throughput.

So whenever you see a path like:

```bash
/gpfs/home/UWnetID
```
that means you’re accessing your home directory on the GPFS storage system, not a local disk on the login node.

 ---

## The Filesystem

![Diagrammatic representation of the Tillicum filesystem directory tree. The directory tree shows the root directory at the top which holds all subdirectories. The picture is a truncated view of the filesystem showing the root directory and a few directories within it, including GPFS and a few directories within GPFS/: home/ where the Home directories are, software/ where we keep software, datasets/ where common datasets are stored, scrubbed/ where users can utilize temporary storage, and projects/ where the lab groups their dedicated storage.](/img/docs/directory_graphic.jpg 'filesystem')
*Diagram - truncated view of the Tillicum filesystem. Above the directory `group/` is meant to represent any research group and the directory `dir/` is meant to represent any directory.*


As shown above, the Tillicum filesystem is organized under the root directory `/`. Within it, `/gpfs/` contains several key subdirectories:

* `home/` — individual user home directories for configuration and small files.
* `software/` — centrally managed shared applications and tools.
* `datasets/` — curated public or shared research datasets. We have a process by which groups can nominate datasets for storage under our [**<ins>Data Commons</ins>**](https://hyak.uw.edu/docs/data-commons/requirements).
* `scrubbed/` — temporary scratch space for active work, periodically cleaned.
* `projects/` — long-term storage for groups and project-specific data.


 ---

## User Storage
Every user on Tillicum has access to three key storage spaces mounted under `/gpfs/` where they can **write** *and* **read** files:

1. **Home directory** (`/gpfs/home/UWNetID`)— personal, backed-up storage
1. **Project/lab dedicated storage** (`/gpfs/projects/group-name`) — shared, backed-up storage for research groups
1. **Scrubbed storage** (`/gpfs/scrubbed/some-directory`) — large, temporary scratch space for active computation

Here’s a quick overview of Tillicum storage policies:
| Storage             | Size / Quota          | Backup          | Notes                                                                        |
| ------------------- | --------------------- | --------------- | ---------------------------------------------------------------------------- |
| Home Directory      | 10 GB per user        | Daily snapshots | Keep only configuration files here; use other spaces for data/code           |
| Project/Lab Storage | 1 TB per project/lab  | Daily snapshots | Request allocation via [**<ins>Tillicum intake form</ins>**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036077)                             |
| Scrubbed Storage    | Up to 100 TB per user | None            | Scratch space, purged after 60 days of inactivity; not for long-term storage |

***Tillicum is a new service. We will constantly evaluate these storage policies based on user feedback.***

Users are responsible for transferring results to external systems (e.g., [<ins>**Kopah S3**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083) or [<ins>**Lolo Archive**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084))

:::tip pro tip: Storage monitoring
To monitor and investigate storage usage, use the following command, which will show you how much storage is occupied by each subdirectory in the directory where the command is executed. If you are cleaning up storage, this command will show new storage counts as changes are made.
```js
du -h -d 1
```
:::

---

## Storage Snapshots
User home directories and project directories have daily snapshots taken at midnight local (Seattle) time. Only 7 daily snapshots are kept. The snapshots are kept under `/gpfs/.snapshots/` and are named by the date and time they were taken. Since these snapshots are named by the date and time, you will see different output when you review the snapshot directory.

```bash
$ ls -alh /gpfs/.snapshots
total 520K
dr-xr-xr-x  6 root root 8.0K Oct 20 17:00 .
drwxr-xr-x 17 root root 256K Oct 13 14:46 ..
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.18-00.00.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.19-00.00.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.20-00.00.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.21-00.00.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.21-22.41.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.22-00.00.07
drwxr-xr-x 17 root root 4.0K Oct 13 14:46 @GMT-2025.10.23-00.00.07
$
```

For example, if my netID is `npho` and I wanted to check the oldest snapshot available of my home directory that is `/gpfs/home/npho` then I would look in `/gpfs/.snapshots/@GMT-2025.10.18-00.00.07/home/npho/`. Within this snapshot directory I could copy out any previously deleted or modified files to my current home directory (or any other non-snapshot location) to recover.
