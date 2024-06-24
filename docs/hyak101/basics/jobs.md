---
id: jobs
title: Scheduling Jobs
---

:::note

This documentation is under construction.

:::

As previously mentioned, when you first ssh into `klone` you land on one of the two login nodes (e.g., `klone-login01`). Login nodes are shared amongst all users to transfer data, navigate the file system, and request resource slices to perform heavy duty computing. You should never use login nodes for heavy compute and automated mechanisms exist to monitor and enforce violations. The tool used to notify users of violations is "arbiter2" and you will receive an email for each offending process [**(Gardner, Migacz, and Haymore 2019)**](https://hyak.uw.edu/docs/compute/scheduling-jobs#ref_arbiter).

To keep the login node in stable working order and ensure fair usage of the login node as a community resource, HYAK has a job scheduling software that will give you access to other nodes (i.e., different computers that are part of the `klone` cluster). The job scheduler software is called SLURM, and regular users of HYAK need to learn how to use SLURM to effectively and efficiently make use of HYAK as a resource for research computing. 

:::note Relevant Vocabulary

**Account**: In the context of using SLURM, "account" refers to the groups you belong to, not your UWnetID. `hyakalloc` will display accounts you can submit jobs with (i.e., under the SLURM `sbatch` directive `--account`).

**Checkpoint partition**: Abbreviated `ckpt`, represents idle resources across the cluster at any moment. All cluster users are eligible to submit jobs to this partition and they will run subject to availability. To provide some regular churn in pending checkpoint jobs, jobs running for >4 hours (for HPC jobs) and >8 hours (for GPU jobs) are re-queued (i.e., re-submitted to the checkpoint partition queue). The jobs will continue in this manner until the job exits or the requested runtime is fulfilled. For more information see [**Using Idle Resources**](https://hyak.uw.edu/docs/compute/checkpoint).

**Idle Resource**: A cluster resource is "idle" when it currently has no running jobs. Requested idle resources are not guaranteed. 

**Interactive Session**: An interactive session on the cluster allows users to access a computing node in real time for tasks that require direct interaction, exploration, or debugging. Request an interactive job with the `salloc` command.

**Node**: In HPC, a server is synonymous with a node. 1 server = 1 node so it is OK to use those two terms interchangeably. You can also think of nodes as distinct but network-connected computers. 
* **HPC Node**: A standard compute node with no additional components and variable amounts of memory at time of procurement.
* **GPU Node**: A standard node with GPU cards added in at time of procurement. GPUs are typically used for ML workflows and in rarer cases for applications that have been specifically ported over to GPUs to speed up the runtime.

**Partition**: A partition is a logical subdivision of the HYAK cluster resources. Specifically, each partition represents a class of node. For example, the partitions on the cluster are `compute`, `ckpt`, `compute-bigmem`, and GPU nodes. `hyakalloc` will display paritions in addition to `ckpt` that you can submit jobs with (i.e., under the SLURM `sbatch` directive `--partition`).

**Queue**: A queue is a waiting area for jobs that have been submitted to the cluster but are not yet executing. The scheduler manages the order in which jobs are taken from the queue for execution. The SLURM queue can be monitored with the command `squeue` and `squeue -u UWNetID` replacing the word `UWNetID` with your UE Net ID will show your job that are waiting in the queue or are being executed. 

**Scheduler**: The scheduler is a component or software system responsible for managing and optimizing the allocation of computing resources and tasks within a distributed computing environment. It orchestrates the execution of jobs, tasks, or processes across available resources such as CPUs, memory, and storage.

**SLURM**: The job scheduler used on HYAK. SLURM stands for **S**imple **L**inux **U**tility (for) **R**esource **M**anagement. See "Scheduler" on this page to learn what a scheduler is. See [**SLURM documentation**](https://slurm.schedmd.com/man_index.html) for detailed help using the job scheduler.
:::

### Accounts and Partitions

The first stop on understanding job scheduling is to understand that every user is part of an account and certain partitions. Your account is usually related to a user group that you belong to; for example, you may be part of a lab group that has contributed resources to HYAK, affording you priority usage of those resources, which are organized into one or more partitions. Alternatively, you may be a student user who is part of the [**Research Computing Club**](https://depts.washington.edu/uwrcc/getting-started-2/getting-started/), or account `stf`, meaning that you have priority access on the `stf` account and partitions. Additionally, all users can use HYAK resources when they are idle by scheduling jobs on the `ckpt` paritition ([**Click here to learn about more about `ckpt` jobs.**](https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition)). 

Let's start by checking which accounts and partitions you have access to with the `hyakalloc` command. 

```bash
hyakalloc
```
The result will look different for each user. Yours ***might*** looks something like this:  

```bash
      Account resources available to user: UWNetID       
╭─────────┬──────────────┬──────┬────────┬──────┬───────╮
│ Account │    Partition │ CPUs │ Memory │ GPUs │       │
├─────────┼──────────────┼──────┼────────┼──────┼───────┤
│ account │      compute │  120 │   509G │    0 │ TOTAL │
│         │              │    0 │     0G │    0 │ USED  │
│         │              │  120 │   509G │    0 │ FREE  │
├─────────┼──────────────┼──────┼────────┼──────┼───────┤
│ account │    gpu-rtx6k │   10 │    81G │    2 │ TOTAL │
│         │              │    0 │     0G │    0 │ USED  │
│         │              │   10 │    81G │    2 │ FREE  │
╰─────────┴──────────────┴──────┴────────┴──────┴───────╯
 Checkpoint Resources  
╭───────┬──────┬──────╮
│       │ CPUs │ GPUs │
├───────┼──────┼──────┤
│ Idle: │ 1138 │  242 │
╰───────┴──────┴──────╯
```
This exmaple output for a user from the fictional Account called "account" shows access to a compute parition and a gpu-rtx6k parition. The displayed partitions could include compute partitions, larger memory partitions, and GPUs. The table also shows which resources under the account are being used when the `hyakalloc` command was executed (all resources free at the moment). The bottom table shows how many CPUs and GPUs are idle under the `ckpt` partition. 

Remember you can always return to the `hyakalloc` results when preparing your command to request a job. 

### Interactive Jobs

An interactive session on the cluster allows users to access a computing node in real time for tasks that require direct interaction, exploration, or debugging. Request an interactive job with the `salloc` command. If you have a quick job or you are preparing software to use later, an interactive session is the best choice. Let's start an interactive job on the `ckpt` partition. We will specify that we want a single CPU with the flag `--cpus-per-task=1`, 50G of RAM with `--mem=50G`, and a maximum time of 2 hours with `--time=2:00:00`. The job will automatically end after 2 hours if we don't end it before 2 hours has elapsed. 

```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=50G --time=2:00:00
```
The output will look something like this:

```bash
salloc: Pending job allocation 18981043
salloc: job 18981043 queued and waiting for resources
salloc: job 18981043 has been allocated resources
salloc: Granted job allocation 18981043
salloc: Nodes n3424 are ready for job
```
Finally, your shell prompt will show that you are no longer on the login node, or look something like this: 
```bash
[UWNetID@n3424 ~]$
```
Except that the word `UWNetID` will be replaced with your Net ID and `n3424` will be replaced with the node SLURM assigned to your interactive job. Finally, the `~` will be replaced with the name of your current directory (your location on the filesystem). 

#### Using Locator in interactive mode

Now that we have a job open on a compute node, we can work interactively in the container and test out our code. If the container allows it (most do), you can open a shell within the container and access the software that is installed there, run software-specific commands, and test and debug your code before submitting jobs to run in the background. This can also be a recommended method to run a shorter job that doesn't need to be submitted to complete in the background. 

Before we do that, we will need a directory where our locator results will be stored. I'm going to call my locator results directory, `locator_out`.

```bash
mkdir locator_out
```

Copy the container to your current directory if you haven't already. 
```bash
cp /mmfs1/sw/hyak101/basics/locator.sif .
# The "." is short hand for "here" meaning to make a copy in your current directory.
```

Next open a shell inside the locator container, `locator.sif` with the following command.

```bash
apptainer shell --cleanenv --bind /gscratch/ locator.sif
```

Let's break this command down into its parts to understand it:

* `apptainer shell` - Apptainer is the container program on Hyak and with `shell` we are asking apptainer to open a shell within the container.
* `--cleanenv` - Containers have their own environment variables that must be set for the software they container to work properly. However, sometimes the environment variables from the host are too similar to those of the container, which can cause conflicts. The `--cleanenv` flag instructs the container to ignore environment variables from the host. 
* `--bind /gscratch/` - The `--bind` flag mounts a file system to the container. The locator container and many containers do not include your data. Mounting the filesystem `/gscratch` means that the container can access datafiles that only exist outside of the container. 
* `locator.sif` - The last part of the full command is to pass the name of the locator container to apptainer.

You will know that you are inside of the container when your shell prompt starts looks like the following: 

```bash
Apptainer>
```

Let's explore within the container by listing the root directory `/`

```bash
ls /
bin  boot  dev	environment  etc  gscratch  home  lib  lib64  locator  media  mmfs1  mnt  opt  proc  root  run	sbin  scr  singularity	srv  sys  tmp  usr  var
```
Notice that we have all the directories we saw when we listed the root directory of `klone`, but now we have a directory `/locator/`, which contains the files associated with the [**Locator GitHub Repository**](https://github.com/kr-colab/locator.git). 

```bash
ls /locator/
LICENSE.txt  README.md	data  locator_py  out  req.txt	scripts  setup.py
```
Specifically the `/locator/scripts/` subdirectory contains a file called `locator.py`, which is the python script used to run locator nueral network. 

```bash
ls /locator/scripts/
install_R_packages.R  locator.py  locator_phased.py  plot_locator.R  vcf_to_zarr.py
```

Additionally, we have a version of python within the container and we can activate python as follows:

```bash
python
Python 3.8.13 (default, Mar 29 2022, 14:56:46) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
```

**Use `exit()` or hold the `Ctrl` key and press the `d` key to exit python. **

Next, we can run locator with the *Populus trichocarpa* dataset. Copy the data to your current directory if you haven't already.

```bash
cp /mmfs1/sw/hyak101/basics/data/potr_* .
```
First let's take a look at the data.

```bash
wc -l potr_genotypes.txt 
# The genotypes matrix has 425 lines
# one row per individual tree plus a header

head potr_genotypes.txt
"BELA.18.1"	1	0	0	0	0	0	0	0	0	2	0	0	2	0	1	0	0	0	0	NA	0	1	1	0	0	0
### Truncated for website view
# The genotypes matrix is composed of 0s, 1s, 2s, or NA
# The matrix has over 32,000 columns of genetic data

wc -l potr_m_pred1.txt
# The sample data list has 425 lines
# one row per individual tree plus a header

head potr_m_pred1.txt
"sampleID"	"x"	"y"
"BELA.18.3"	-126.166667	52.416667
"BLCG.28.1"	-125.183333	49.833333
"BULG.11.4"	-126.8	54.45
"CEDA.10.4"	-128.916667	54.95
"CHKD.19.3"	-127.2	51.766667
"CHWH.27.5"	NA	NA
"CNYH.28.5"	-125.066667	49.666667
"DENA.17.4"	-126.616667	52.766667
"DENC.17.4"	NA	NA
# The sample data contains the sample ID
# longitude (x) and latitude (y) coordinates
# each row is the origin of an individual tree
```
10% of the tree origins in sample data were randomly replaced with NA. These trees will serve as the test set. Locator will train the neural network based on the genotypes of 90% of the trees of known origin, validate the neural network on 10% of the trees of known origin, and then predict the origins of the trees in the test set, providing a set of longitudes and latitudes that can be compared with the true origins of the test set trees. 

Let's test the code by running locator on one test set `potr_m_pred1.txt`

```bash
python /locator/scripts/locator.py --matrix potr_genotypes.txt --sample_data potr_m_pred1.txt --out locator_out/potr_predictions1
# Be patient, this operation should take up to 10 minutes. 
```
Let's break this command down into its parts to understand it:

* `python /locator/scripts/locator.py` - starts python and executes the `locator.py` python script
* `--matrix potr_genotypes.txt` - `--matrix` is the arguement that indicates the provided file `potr_genotypes.txt` is the genotype matrix.
* `--sample_data potr_m_pred1.txt` - `--sample_data` is the arguement that indicates the provided file  `potr_m_pred1.txt` is the sample data.
* `--out locator_out/potr_predictions1` - `--out` is the arguement that indicates that results should be saved into the `locator_out/` directory and that the files should have the prefix `potr_predictions1`.

You'll know it is working when it starts providing some messages. The first messages are errors that can be ignored, unless we plan to use a GPU. There will be a few more errors because tensorflow could use a GPU. We won't use a GPU, so we can ignore the errors. The following indicated a successful start of a locator run: 

```bash
loaded (33070, 424, 2) genotypes

filtering SNPs
running on 32530 genotypes after filtering

### Truncated for website view
To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
Epoch 1/5000
11/11 [==============================] - ETA: 0s - loss: 1.3765
Epoch 1: val_loss improved from inf to 0.70498, saving model to locator_out/potr_predictions1_weights.hdf5
11/11 [==============================] - 2s 85ms/step - loss: 1.3765 - val_loss: 0.7050 - lr: 0.0010
Epoch 2/5000
11/11 [==============================] - ETA: 0s - loss: 0.8562
Epoch 2: val_loss improved from 0.70498 to 0.66874, saving model to locator_out/potr_predictions1_weights.hdf5
11/11 [==============================] - 1s 64ms/step - loss: 0.8562 - val_loss: 0.6687 - lr: 0.0010
Epoch 3/5000
11/11 [==============================] - ETA: 0s - loss: 0.6853
Epoch 3: val_loss improved from 0.66874 to 0.63751, saving model to locator_out/potr_predictions1_weights.hdf5

predicting locations...
R2(x)=0.9933693838332506
R2(y)=0.9944865271086664
mean validation error 0.23313851423673718
median validation error 0.20346116447588203

run time 4.914605208237966 minutes
```

Congratulations, you just trained a neural network based on genotypes of *Populus trichocarpa* trees sampled across and you have predicted origins for a test set of *Populus trichocarpa* trees based on their DNA alone. Let's look at your results. 

```bash
ls locator_out/
potr_predictions1_fitplot.pdf  potr_predictions1_history.txt  potr_predictions1_params.json  potr_predictions1_predlocs.txt

head locator_out/potr_predictions1_predlocs.txt
x,y,sampleID
-134.91964819211591,58.435803669001785,ALSC.1.4
-122.8459170387414,45.644072664997694,CARS.29.3
-128.12848901483463,54.95290102466758,CDRE.10.3
-127.26174811400172,51.72250932734256,CHKD.19.1
-121.6691954064578,49.14120451469648,CHWH.27.5
-125.04810237947252,49.641106599108824,CNYH.28.4
-126.72995371793931,52.81267201275188,DENB.17.1
-126.78770090586458,52.82414669580753,DENC.17.4
-126.79467698648334,52.83947566564575,DEND.17.4
```

See the [**Locator publication**](https://elifesciences.org/articles/54507) (Battey et al. 2020) and [**Locator GitHub Repository**](https://github.com/kr-colab/locator.git) for full explanation of the output files. 

### Batch Jobs

Next we are going to execute the EXACT same code, but as a batch jobs and with the second test set `potr_m_pred2.txt`. Batch jobs are ideal for operations that take a longer time to run. These jobs are submitted to the job scheduler SLURM to execute and run in the background until completed. 

We made a SLURM batch script for this tutorial. You can use this script as a template for submitting a single job to SLURM and replace the main command with your command/s. 

First copy the template to your current directory if you haven't already. 

```bash
cp /mmfs1/sw/hyak101/basics/locator_NN_* .
```

If you have been following along, the following script should work without error (except errors that have to do with GPU usage and can be ignored). However, you will want to read the comments in the script carefully to edit the script to fit your needs for a different task.

Use `cat` to view the script.

```bash 
cat locator_NN_job.slurm
```
And use the text editor `nano` to edit it as needed.

```bash 
nano locator_NN_job.slurm
# exit nano by holding Ctrl and pressing X; then save it by pushing Y
```

```bash title="locator_NN_job.slurm"
#!/bin/bash

#SBATCH --job-name=locator_job
#SBATCH --partition=ckpt
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --mem=50G
#SBATCH --time=1:00:00
#SBATCH -o %x_%j.out

#### Truncated for website view

#command:
apptainer exec --cleanenv --bind /gscratch locator.sif python /locator/scripts/locator.py --matrix potr_genotypes.txt --sample_data potr_m_pred2.txt --out locator_out/potr_predictions2

#### Truncated for website view
```

The lines in the script beginning with `#SBATCH` are sbatch directives, or flags passed to sbatch which give instructions about the job we are requesting. This script requests a single node, single task job with 50G of RAM for a maximum time of 1 hour. See [**SLURM sbatch documentation**](https://slurm.schedmd.com/sbatch.html) for the full list of options. Remember to use `hyakalloc` to find which accounts and partitions are available to you. If you have a `compute` parition, replace `--parition=ckpt` with `--partition=compute` and your job will be scheduled faster because you will be requesting a job on resources you can use with priority access. 

Once you have edited the script to fit your needs, you can submit it with `sbatch`.

```bash
sbatch locator_NN_job.slurm
# the following is an example result
sbatch: No account specified, defaulting to: account
Submitted batch job 12345678
# SLURM will assign a JobID when the job was submmitted
# it will likely be an 8-digit number, but not 12345678
```

:::tip Pro Tip
Monitor the job with `squeue` and your `UWNetID` like the following example:

```bash
//highlight-next-line
squeue -u UWNetID
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678   ckpt locator  UWNetID  R       3:15      1 n3088
```
:::

Slurm will save a file called `locator_job_12345678.out` where the number is replaced with the JobID SLURM assigned to your job. The output that would normally be printed to the screen while locator is running (which we save when we ran locator interactively) will be saved to this file. View this file with `cat`

```bash
cat locator_job_12345678.out
```
Or follow the messages in real time with the `tail` command and the flag `--follow`

```bash
tail --follow locator_job_12345678.out
# Use Ctrl + C to exit the tail command
```

Congratulations, you just trained a neural network based on genotypes of *Populus trichocarpa* trees sampled across and you have predicted origins for a second test set of *Populus trichocarpa* trees based on their DNA alone. But this time you did it with a batch up. Let's look at your results. 

```bash
ls locator_out/
potr_predictions1_fitplot.pdf  potr_predictions1_params.json   potr_predictions2_fitplot.pdf  potr_predictions2_params.json
potr_predictions1_history.txt  potr_predictions1_predlocs.txt  potr_predictions2_history.txt  potr_predictions2_predlocs.txt

head locator_out/potr_predictions2_predlocs.txt
x,y,sampleID
-126.6824556618361,52.28918750153857,BELC.18.1
-126.832089065367,52.31092787450795,BELC.18.5
-123.01705302953444,46.47589331561,CARS.29.2
-127.29940751539401,51.750880602889794,CHKD.19.5
-121.72059406365925,49.29831855856583,CHWH.27.5
-121.80840511339338,49.19749305063466,CHWK.27.2
-125.10795643505986,49.613891258205996,CNYH.28.5
-126.81512181108964,52.73697246518585,DENA.17.2
-123.04024738823856,44.4420668151814,HALS.30.4
```

That SLURM job completed completely in the background, meaning that we could have submitted the job, ended our connection to `klone` by logging out, and returned later to view the progress or results. You can instruct SLURM to send messages about jobs completing by adding the following sbatch directives to your SLURM script and replacing the work `UWNetID` with your UW Net ID: 

```bash
#SBATCH --mail-type=ALL
#SBATCH --mail-user=UWNetID@uw.edu
```

In the nest section, we will use a SLURM batch script to submit multiple jobs as an array to be executed in the background in parallel. 
