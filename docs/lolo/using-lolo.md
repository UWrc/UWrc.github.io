---
id: lolo-usage
title: Lolo Usage
---

This guide provides step-by-step instructions for accessing, uploading, and managing data on the Lolo archival storage service. Lolo is designed for long-term storage of large research datasets that are not frequently accessed. For more information regarding costs, eligibility, and support for Lolo, please see the [<ins>**Lolo Information page**</ins>](https://hyak.uw.edu/docs/lolo/).

### Accessing Lolo
You can connect to the Lolo Archive filesystem via SSH. 
1. Set up [<ins>**SSH public key authentication**</ins>](https://hyak.uw.edu/docs/setup/intracluster-keys/) by adding your public key to your `authorized_keys` file. 
2. Connect to your Lolo archive with:
```bash
ssh <your netid>@lolo.uw.edu
```
3. Your data on Lolo will be stored under:
```bash
/archive/group-name
```
Where `group-name` is the name assigned to your group when your account was created.

:::note
Do not use your home directory to store research files. Your home directory is limited to 50MB and should only be used to store SSH keys, login scripts, and other basic account files. 
:::

### Uploading Data

Lolo performs best with large files. To optimize performance and comply with [<ins>**inode quotas**</ins>](https://hyak.uw.edu/docs/lolo/#storage-limits), combine smaller files into `.tar` or `.zip` archives before uploading:
```bash
tar cvf mydata.tar mydata/
```
To transfer the archive to Lolo, you can use `rsync -W` or `scp`:
```bash
scp mydata.tar <your_netid>@lolo.uw.edu:/archive/group-name/
```
Combine many small files into `.tar` or `.zip` archives to comply with [<ins>**inode quotas**</ins>](https://hyak.uw.edu/docs/lolo/#storage-limits) (1,000 files per TB) and avoid uploading single files larger than 10TB. Split files into smaller archives when necessary.
:::important
When transferring files with `rsync`, you **must** use the `-W` or `--whole-file` option:
```bash
rsync -av -W source/ <your netid>@lolo.uw.edu:/archive/group-name/
```
This option disables the `rsync` checksum algorithm. The checksum algorithm on Lolo will cause a tape recall of every file and significantly degrade transfer performance.
:::

### Retrieving Data
Use `scp` or `rsync -W` again to retrieve your archive from Lolo:
```bash
scp <your netid>@lolo.uw.edu:/archive/group-name/mydata.tar .
```
You can then extract it locally:
```bash
tar -xvf mydata.tar
```
Be sure you have enough local storage to accommodate the uncompressed files.

### Viewing Your Quota
To view your current Lolo quota and usage, log in to Lolo and view the `usage_report.txt` file located in your Lolo root directory. `usage_report.txt` will update every hour.
```bash
cat /archive/group-name/usage_report.txt
```
