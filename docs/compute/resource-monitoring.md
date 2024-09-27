---
id: resource-monitoring
title: Resource Monitoring
sidebar-label: Resource Monitoring
---

The Hyak clusters make use of the Slurm scheduler to submit and run jobs. The scheduler provides a rich set of commands (e.g., `sacct`, `sinfo`) to query the state of the cluster but the extensive options can be daunting to navigate. We'll provide some useful example calls below in addition to some information about our custom resource monitoring program called `hyakalloc`.

## sacct

`sacct` displays accounting data for all jobs and job steps in the Slurm job accounting log or Slurm database.

### See all running jobs

The `-a` flag implies all users, you can switch it out with `-u netID` for specific users. You can also modify the output fields by adjusting the `-o` flag.

```
sacct -s running -a -X -o user,jobid,elapsed,alloccpus,reqmem,nnodes,account,partition,node,reqtres%30
```

### See all pending jobs

The `-a` flag implies all users, you can switch it out with `-u netID` for specific users. You can also modify the output fields by adjusting the `-o` flag.

```
sacct -s pending -a -X -o user,jobid,elapsed,alloccpus,reqmem,nnodes,account,partition,node,reqtres%30
```

## sinfo

`sinfo` allows you to view information about Slurm nodes and partitions.

### GPUs

Summary of all the GPUs on the cluster and their current state. You can adjust the output fields (i.e., `-O`) for resources of interest (e.g., `/tmp` space on a node).

```
sinfo -p ckpt -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
```

## hyakalloc

While you can use built-in Slurm commands query the resources used and what is available, the Hyak team has provided a useful utility called `hyakalloc`. This program will make those queries on your behalf and present it in a user friendly format.

### Default

If you run `hyakalloc` without any arguments it will display all the account and partition combinations you have access to, where you can submit jobs that will start right away and have no interruptions. 
* You can see the resource: your limits, what is currently in use, and what is available. 
* At the bottom you can also see the overall checkpoint (or `ckpt`) partition where you can access idle resources from other groups from across the cluster.
* The output concludes with a notice about when the next cluster maintenance is. This is important to remember when submitting jobs to specify a job runtime that will end before the next maintenance.

```shell terminal=true
$ hyakalloc   
       Account resources available to user: npho        
╭─────────┬─────────────┬──────┬────────┬──────┬───────╮
│ Account │   Partition │ CPUs │ Memory │ GPUs │       │
├─────────┼─────────────┼──────┼────────┼──────┼───────┤
│    uwit │     compute │ 1304 │  6071G │    0 │ TOTAL │
│         │             │    0 │     0G │    0 │ USED  │
│         │             │ 1304 │  6071G │    0 │ FREE  │
├─────────┼─────────────┼──────┼────────┼──────┼───────┤
│    uwit │      bigmem │   40 │   374G │    0 │ TOTAL │
│         │             │    0 │     0G │    0 │ USED  │
│         │             │   40 │   374G │    0 │ FREE  │
├─────────┼─────────────┼──────┼────────┼──────┼───────┤
│    uwit │   gpu-rtx6k │   70 │   652G │   14 │ TOTAL │
│         │             │    0 │     0G │    0 │ USED  │
│         │             │   70 │   652G │   14 │ FREE  │
├─────────┼─────────────┼──────┼────────┼──────┼───────┤
│    uwit │     hugemem │  280 │  5264G │    0 │ TOTAL │
│         │             │    0 │     0G │    0 │ USED  │
│         │             │  280 │  5264G │    0 │ FREE  │
├─────────┼─────────────┼──────┼────────┼──────┼───────┤
│    uwit │ interactive │   40 │   185G │    0 │ TOTAL │
│         │             │    0 │     0G │    0 │ USED  │
│         │             │   40 │   185G │    0 │ FREE  │
╰─────────┴─────────────┴──────┴────────┴──────┴───────╯
 Checkpoint Resources  
╭───────┬──────┬──────╮
│       │ CPUs │ GPUs │
├───────┼──────┼──────┤
│ Idle: │  160 │   24 │
╰───────┴──────┴──────╯
Notice: Klone will be down for maintenance starting at 09:00AM Tuesday, Oct 12.
 Subscribe to the hyak-users mailing list for more details.
$          
```

### Options

The `hyakalloc` program has a rich set of command line arguments for more complex queries. For example, perhaps you want to know what another user's resource access and limits are (i.e., `-u netID`). You may be interested in auditing what your group's limits are (i.e., `-g GROUP`). Some queries may be too verbose so you can filter down to specific partitions with the `-p` flag.

```shell terminal=true
$ hyakalloc -h    
usage: hyakalloc [-h] [-a | -c | -u USER | -g GROUP] [-p PARTITION]

Queries Hyak allocation for users or groups.

optional arguments:
  -h, --help            show this help message and exit
  -a, --all             (Optional) Query all accounts & partitions.
  -c, --ckpt            (Optional) Query available resources in checkpoint.
  -u USER, --user USER  (Optional) Query a specific user.
  -g GROUP, --group GROUP
                        (Optional) Query a specific group (Hyak Account).
  -p PARTITION, --partition PARTITION
                        (Optional) Filter by partition name.
$ 
```
