---
title: Archive on Lolo
---

The storage attached to Hyak clusters is considered a transient place for "hot" data that you're actively computing against. Data stored here is **NOT BACKED UP**. Lolo is our archival storage option intended to provide our users with storage that is not immediately available but is affordable and has physical longevity as a storage medium. If you archive your data to Lolo, two additional copies are created: it does automatic duplication with one copy on UW-Seattle campus and another copy in eastern Washington.

:::tip

To optimize your space and minimize monthly charges, we recommend using file compression. File compression helps reduce file size and compressed files are easier to copy to remote servers like `lolo`. Below provide instructions for archiving your data on `lolo` with `tar` software utility file compression.

:::

## What is Lolo Tape?

Lolo is the UW's archive solution, it is an LTO-8 or "tape" based platform.

## How do I get Lolo capacity?

[**Click here to be re-directed to the Lolo Storage Request Form**](https://uw.service-now.com/sp?id=sc_cat_item&sys_id=d307c0cadb5e73c037ae9ec6db961963).

[**Click here to access the Lolo service catalog**](https://uw.service-now.com/it?id=sc_entry&sys_id=77750042db1e73c037ae9ec6db961994&sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2).

:::note

Lolo costs $3.45 / TB / month.

Lolo supports up to 1,000 files per TB of data stored.

:::

## How to back up to `lolo`?

After your Lolo storage archive directory has been outfitted, you can begin transferring archived data to Lolo. Let's start by accessing your archive on `lolo` with `ssh`, your `UWNetID`, and the name of your archive directory. For this example, we will call our lolo archive directory, `mylolodir`.

```js
//highlight-next-line
$ ssh UWNetID@lolo.uw.edu
[UWNetID@lolo-u1 ~]$ cd /archive/mylolodir
```

Next identify the directory of data that you wish to archive on Lolo, and navigate to the containing directory on your local computer or on `klone` via Terminal or Windows Powershell or PuTTy. For this example, we will call the directory we wish to archive, `mydata`.

```js
$ ls
    mydata/
    otherfile.txt
    otherdir/
    ...
```
Next create a tar archive of `mydata` and transfer it directory to `mylolodir` with `ssh`.

```js
$ tar cvf - mydata/ | ssh UWNetID@lolo.uw.edu "cat > /archive/mylolodir/mydata.tar"
//highlight-next-line
    Password:
    ...
```
Contents of `mydata` will start printing to the screen as they are transferred to the tar archive. This printing might obscure the Password prompt, **you will need to provide your password.** Compression and transfer times scale with file size. 

### Retrieve the archive from Lolo

Use server copy (`scp`) to transfer a copy of the archive from `lolo` to your workspace on your local computer or `klone`.

```js
$ scp UWNetID@lolo.uw.edu:/archive/mylolodir/mydata.tar .
```

Extract the archive with the `tar` command on your local computer or `klone`. Be mindful that extracting the archive will require storage capacity matching its pre-compressed size. 

```js
$ tar -xvf mydata.tar
```

:::tip tips for efficient use of Lolo

**Small files:**
Lolo performs best with large files. Storing large numbers of small files is inefficient for tape-based systems and can make data retrieval slow or difficult. For this reason, we strongly encourage you to combine collections of small files into .tar or .zip files before transferring them to Lolo. To enforce this, inode quotas are in place which limit the number of files that you can store. 

**Large Files:**
Though we encourage you to bundle data sets into large archives, very large (10TB+) file sizes may cause issues. If you have a very large data set, please split the archive into smaller files. 

If a large number of small files are uploaded by mistake, or if you need help splitting large files, please contact [**help@uw.edu**](mailto:help@uw.edu) for assistance.

:::

## Google Drive

:::caution
Update: This is no longer "unlimited" and data caps are set to go into effect in 2022.
:::

The UW has a relationship with Google for cloud services (e.g., Gmail, Google Drive). Google Drive has a reputation for "unlimited" data storage. It's possible you can use this as one place to store your data but we leave it to the user to perform their own due diligence on the implications of this. Some labs at the UW make use of Google Drive in this manner so we thought we'd make note of it here but we provide no support for it.
