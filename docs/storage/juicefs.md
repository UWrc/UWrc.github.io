---
id: juicefs
title: Drop In Support
---

While it is always better to write any new programs using Kopah with tools designed for it, like boto3, sometimes that just isn't feasible. If you need to make an existing script backwards compatible with Kopah storage, [<ins>**juicefs**</ins>](https://juicefs.com/docs/community/getting-started/standalone) is a possible option. While juicefs can be a helpful tool, there are also a lot of time that you **shouldn't** use it since it also has a lot of limitations. The primary limitation is the fact that Kopah uses juicefs in whats called Standalone mode, which makes it difficult to access the same data across multiple nodes. That means if you workload requires multiple nodes (not just multiple processes since those can be ran on the same node) then juicefs likely isn't the tool for you.

## Installation

Juicefs isn't installed to nodes by default so you have to download the newest version to your current directory with

```bash
wget https://github.com/juicedata/juicefs/releases/download/v1.2.3/juicefs-1.2.3-linux-amd64.tar.gz -O - | tar xzvf -
```

or alternatively you can copy the Hyak binary to your current directory with `mv /sw/juicefs/juicefs .` (which is the currently up to date v1.2.3). Then just copy the binary to a directory of your choice thats on your PATH (readable with `echo $PATH`) and is visible from both klone and compute nodes. I would recommend `/home/$USER/.local/bin` since it fulfills all of those by default. You may have to make one or both directories before moving the binary with `mv juicefs ~/.local/bin/juicefs`. Finally ensure everything is working by running `juicefs -V`, which should print the version of your executable.

## Usage

It is strongly discouraged, and very inconvenient, to hard code your Kopah keys to any scripts or commands, so before continuing it is recommended to follow the [<ins>**s5cmd setup**</ins>](cli.md) instructions to create environment variables of your keys so that you can easily access them. Once you have your variables set up you can create a juicefs bucket with

```bash
juicefs format --storage s3 --bucket $S3_ENDPOINT_URL/<bucket_name> --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_KEY_ID sqlite3://<db_name>.db <db_name>
```

where \<bucket_name\> and \<db_name\> are the names of your s3 bucket and database file respectively, which can but don't have to be the same name (although its easiest if they are). There are other options for this command, which you can see with `juicefs format --help`, but by default it will create a sqlite database file in the current directory called \<db_name\>.db that is required to read the data in the bucket you created.

:::caution
If you lose the database file then the data in your bucket is essentially lost, so it is recommended to back it up somewhere off of Hyak.
:::

Now you can mount your juicefs bucket to the current node with

```bash
juicefs mount sqlite3://<db_name>.db <mount_point> -d
```

where \<mount_point\> is the path to the directory you want to mount to, and -d tells juicefs to run its service in the background so that it doesn't stay in your terminal (although for testing it may be helpful to remove the -d and see the status messages). Do note that is the database file isn't in your current directory you have to specify the full path with `sqlite3:///path/to/<db_name>.db`, with three leading slashes. Now that your bucket is mounted you can perform standard posix operations like `mv` or `rm` to any file in the directory and it will be automatically be applied to the bucket for you. Once you are done working with the data you can see currently running juicefs mounts with `ps ux | grep juicefs` and unmount them with

```bash
juicefs umount <mount_point>
```

noticing that it is `umount` and not **unmount**, and also being aware that simply closing your terminal won't unmount the bucket if you ran juicefs with the -d flag.

## Example Script

Quite possibly the best use case for juicefs is workloads where each job in an array runs on its own node and accesses its own data, in which case you can just mount the juicefs bucket to your old data directory and leave the rest of your script untouched. It should also be fairly easy to extend that to multiple jobs on a single node sharing data (but still each node has its own data) using either job steps with `srun` or by just only running the juicefs commands on every ith array job (the first one on each node). Below is an example slurm batch script using that method to write some example data to each node's unique juicefs bucket and then unmounting it.

```bash
#!/bin/bash

#SBATCH --job-name=juicefs
#SBATCH --partition=ckpt
#SBATCH --nodes=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=16G
#SBATCH --array=0-7

# Change directory to per node storage so different mounts don't conflict
cd /scr

# Remove this if you already have formatted buckets. If so you will likely need an array of bucket names to map task id to
juicefs format --storage s3 --bucket $S3_ENDPOINT_URL/<netid>-$SLURM_ARRAY_TASK_ID --access-key $AWS_ACCESS_KEY_ID --secret-key $AWS_SECRET_KEY_ID sqlite3://<db_name>.db <db_name>

# Mount new juicefs database in background at /scr/<netid>-$SLURM_ARRAY_TASK_ID. 
# If multiple tasks share the mount just wrap this in a if ($SLURM_ARRAY_TASK_ID % <num-tasks> == 0) where <num-tasks> is the number of tasks per node (not correct syntax)
# Could potentially also use srun to separate your script into job steps to ensure everything completes before unmounting your juicefs bucket
mkdir $USER-$SLURM_ARRAY_TASK_ID
juicefs mount sqlite3://<db_name>.db /scr/<netid>-$SLURM_ARRAY_TASK_ID -d

# Cd into mount and process data
cd /scr/$USER-$SLURM_ARRAY_TASK_ID
cp /sw/hyak101/example_data/r0-f0

# Cd out of and unmount juicefs database. If multiple tasks are sharing the mount on the node need to ensure only the last one unmounts somehow (shared incremented variable?)
cd ..
juicefs umount /scr/$USER-$SLURM_ARRAY_TASK_ID
rmdir /scr/$USER-$SLURM_ARRAY_TASK_ID
```
