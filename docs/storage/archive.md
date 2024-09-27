---
id: archive
title: Archive on Lolo
---

The storage attached to HYAK clusters is considered a transient place for "hot" data that you're actively computing against. Data stored here is **NOT BACKED UP**. Lolo is our archival storage option intended to provide our users with storage that is not immediately available but is affordable and has physical longevity as a storage medium. If you archive your data to Lolo, two additional copies are created: it does automatic duplication with one copy on UW-Seattle campus and another copy in eastern Washington.

:::tip

To optimize your space and minimize monthly charges, we recommend using file compression. File compression helps reduce file size and compressed files are easier to copy to remote servers like `lolo`. Below provide instructions for archiving your data on `lolo` with `tar` software utility file compression.

:::

## What is Lolo Tape?

Lolo is the UW's archive solution, it is an LTO-8 or "tape" based platform.

## How do I get Lolo capacity?

[Click here to be re-directed to the Lolo Storage Request Form](https://uw.service-now.com/sp?id=sc_cat_item&sys_id=d307c0cadb5e73c037ae9ec6db961963).

:::note

Lolo costs $3.45 / TB / month.

:::

## How to back up to `lolo`?

After your Lolo storage archive directory has been outfitted, you can begin transferring archived data to Lolo. Let's start by accessing your archive on `lolo` with `ssh`, your `UWNetID`, and the name of your archive directory. For this example, we will call our lolo archive directory, `mylolodir`.

```bash
//highlight-next-line
$ ssh UWNetID@lolo.uw.edu
[UWNetID@lolo-u1 ~]$ cd /archive/mylolodir
```

Next identify the directory of data that you wish to archive on Lolo, and navigate to the containing directory on your local computer or on `klone` via Terminal or Windows Powershell or PuTTy. For this example, we will call the directory we wish to archive, `mydata`.

```bash
$ ls
    mydata/
    otherfile.txt
    otherdir/
    ...
```
Next create a tar archive of `mydata` and transfer it directory to `mylolodir` with `ssh`.

```bash
$ tar cvf - mydata/ | ssh UWNetID@lolo.uw.edu "cat > /archive/mylolodir/mydata.tar"
//highlight-next-line
    Password:
    ...
```
Contents of `mydata` will start printing to the screen as they are transferred to the tar archive. This printing might obscure the Password prompt, **you will need to provide your password.** Compression and transfer times scale with file size. 

### Retrieve the archive from Lolo

Use server copy (`scp`) to transfer a copy of the archive from `lolo` to your workspace on your local computer or `klone`.

```bash
$ scp UWNetID@lolo.uw.edu:/archive/mylolodir/mydata.tar .
```

Extract the archive with the `tar` command on your local computer or `klone`. Be mindful that extracting the archive will require storage capacity matching its pre-compressed size. 

```bash
$ tar -xvf mydata.tar
```

## Google Drive

:::caution
Update: This is no longer "unlimited" and data caps are set to go into effect in 2022.
:::

The UW has a relationship with Google for cloud services (e.g., Gmail, Google Drive). Google Drive has a reputation for "unlimited" data storage. It's possible you can use this as one place to store your data but we leave it to the user to perform their own due diligence on the implications of this. Some labs at the UW make use of Google Drive in this manner so we thought we'd make note of it here but we provide no support for it.
