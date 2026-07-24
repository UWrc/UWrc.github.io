---
title: Lolo Storage
---

This guide provides step-by-step instructions for accessing, uploading, and managing data on the Lolo archival storage service. Lolo is designed for long-term storage of large research datasets that are not frequently accessed. For more information regarding costs, eligibility, and support for Lolo, please see the [**Lolo Service Information**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084).

### Accessing Lolo
You can connect to the Lolo Archive filesystem via SSH. This includes the `ssh`, `scp` and `sftp` or tools that use those protocols (including `rsync`, but please see the note below).
1. Connect to your Lolo archive with:
```js
ssh UWNetID@lolo.uw.edu
# Replace UWNetID above with your UW NetID
```
1. Your data on Lolo will be stored under:
```js
/archive/group-name
```
Where `group-name` is the name assigned to your group when your account was created.

:::note
Do not use your home directory to store research files. Your home directory is limited to 50MB and should only be used to store SSH keys, login scripts, and other basic account files. 
:::

### SSH Public Key Authentication
If you plan to set up SSH publickey authentication you will have to put a publickey in your per-user `authorized_keys` file in your home directory on Lolo. 

Ensure you have a SSH public and private keypair for your local computer or external device that is the source for your data transfer to Lolo. You may have set this up in the past. From the external device, search for `id_rsa` and `id_rsa.pub` the one ending in `.pub` is the public part of the key pair that you will share with `lolo` to decode the private key and log on securely from the external device. 

The public key should look something like the following: 
```js title="id_rsa.pub"
ssh-rsa AAAAB3NzaC1...SOME_STRING...FbFvEYcw== username@user-Device
```
Where it starts with ssh-rsa, contains some long and seemingly-random string, and ends with the username `@` the name of the external device (i.e., your local computer). 

**If you don't have `id_rsa` and `id_rsa.pub` on the external device**, generate a new keypair with the following command: 
```js
ssh-keygen -t rsa -b 4096
```

Copy the contents of `id_rsa.pub` and paste it into a file called `authorized_keys` on `lolo` in your Home Directory under the directory `.ssh`. 

:::caution important
Paste the contents of your `id_rsa.pub` into `~/.ssh/authorized_keys` on `lolo`.  
:::

If you don't have a file called `authorized_keys` on `lolo` in your Home Directory under the directory `.ssh`, make one with `nano` and paste your public key there.

```js
nano ~/.ssh/authorized_keys
# Exit nano with Ctrl + X and save the file.
```

### Uploading Data

Lolo performs best with large files. To optimize performance and comply with [**inode quotas**](https://hyak.uw.edu/docs/systems/lolo/overview#storage-limits), combine smaller files into `.tar` or `.zip` archives before uploading:
```js
tar cvf mydata.tar mydata/
```
To transfer the archive to Lolo, you can use `rsync -W` or `scp`:
```js
scp mydata.tar UWNetID@lolo.uw.edu:/archive/group-name/
# Replace UWNetID above with your UW NetID
```
Combine many small files into `.tar` or `.zip` archives to comply with [**inode quotas**](https://hyak.uw.edu/docs/systems/lolo/overview#storage-limits) (1,000 files per TB) and avoid uploading single files larger than 10TB. Split files into smaller archives when necessary.

It is possible to compress and transfer files to Lolo in one step: 
```js
tar cvf - mydata/ | ssh UWNetID@lolo.uw.edu "cat > /archive/mylolodir/mydata.tar"
```

:::warning
When transferring files with `rsync`, you **must** use the `-W` or `--whole-file` option:
```js
rsync -av -W source/ UWNetID@lolo.uw.edu:/archive/group-name/
```
This option disables the `rsync` checksum algorithm. The checksum algorithm on Lolo will cause a tape recall of every file and significantly degrade transfer performance.
:::

### Retrieving Data
Use `scp` or `rsync -W` again to retrieve your archive from Lolo:
```js
scp UWNetID@lolo.uw.edu:/archive/group-name/mydata.tar .
```
You can then extract it locally:
```js
tar -xvf mydata.tar
```
***Be sure you have enough local storage to accommodate the uncompressed files.***

### Viewing Your Quota
To view your current Lolo quota and usage, log in to Lolo and view the `usage_report.txt` file located in your Lolo root directory. `usage_report.txt` will update every hour.
```js
cat /archive/group-name/usage_report.txt
```

### Adding and Deleting User Access

To add or delete users from your Lolo group, follow the following steps: 
1. Proceed to the [**UW Groups Service**](https://groups.uw.edu).
1. Click the "Find my groups" link in the "Find groups" section.
1. In the search results section, there should be a link beginning with "u_uwlolo_" followed by the name of your group. The description of "Lolo Accounts - your group". Click the u_uwlolo_ link for your group.
1. It will bring up a description of your group. Click the "Membership" tab link.
1. Adding users: type the UW NetID(s) into the "Add members" text field and click the "Do it" button. Newly added user(s) should now appear in the "Membership" section. An error window will appear if the user(s) cannot be added.
1. Deleting users: Type the UW NetID(s) into the "Remove members" text field and click the "Do it" button. Deleted user(s) should disappear from the "Membership" section.
1. It can take up to an 30 minutes for changes to be reflected on the Lolo system.

If you need help removing data from your Lolo archives that you do not own (i.e., it is owned by a previous group member), please contact us by sending an e-mail to [**help@uw.edu**](help@uw.edu) with 'Lolo' as the first word in the subject and a brief description of your issue.

### Problems and Solutions

#### Permission Denied
If you receive a Permission Denied error when reading a file to which you have permission, this means the HSM software is having trouble reading your file from the primary tape copy and your file has to be restored from the secondary tape copy. An administrator has to perform this procedure, please contact us by sending an e-mail to [**help@uw.edu**](help@uw.edu) with 'Lolo' as the first word in the subject and a brief description of your issue.

#### Home Directory Quota
Your personal home directory on Lolo is meant to store ssh keys, login scripts, and other basic account files. It is a common error to accidentally copy data to your home directory instead of to your dedicated storage under /archive/group-name. To prevent system problems and outages due to this mistake we have implemented quotas on home directories. You cannot store more than 50MB of data in your home directory.
