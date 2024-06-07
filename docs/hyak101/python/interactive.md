---
id: interactive
title: Interactive Mode
---

## Using Conda and Slurm
### Interactive jobs

All the difficult work is behind us. If we want to use our container interactively, we'll
just use all the shortcuts we created.

#### 1. Start an interactive job on the login node
```shell terminal=true
$ ssh klone-login
[UWNetID@klone-login01 ~]$ salloc --account=uwit --partition=ckpt \
--cpus-per-task=1 --mem=16G \
//highlight-next-line
--job-name=klone-container
salloc: Pending job allocation 1234567
salloc: job 1234567 queued and waiting for resources
salloc: job 1234567 has been allocated resources
salloc: Granted job allocation 1234567
salloc: Waiting for resource configuration
salloc: Nodes n3120 are ready for job
[UWNetID@n3120 ~]$
```
First, we'll request an interactive job in the checkpoint partition, with a single CPU and 16GB of memory.
The most important part, if you're going to connect directly to the node, is that you need to name the job with
`--job-name=klone-container` so that our node-finding script works properly.

#### 2. Get into our container
```shell terminal=true
[UWNetID@n3120 ~]$ ~/launch-container.sh
Apptainer>
```
We automated this step, too. Now we're in our container, attached to a read-write overlay filesystem.

#### 3. Run Conda and Slurm commands
```shell terminal=true
Apptainer> conda
usage: conda [-h] [-V] command ...
# Truncated the remainder of the conda output

Apptainer> squeue -u $USER
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           1234567      ckpt klone-co  uwnetid  R      10:00      1 n3120
Apptainer>
```

And that's all there is to it. Before we move on to non-interactive jobs, here's the background
on Slurm compatibility:

:::info What's required for Slurm?
Running Slurm in any container requires the following:
1. The same version of Slurm running on the node (which we installed from the Hyak repository).
1. The same user ID and group ID for the Slurm user as on the node (which we copied during the container build).
1. Three bind-mounts to node filesystems, all of which are included in the compute node's default Apptainer configuration:
   - `/var/run/munge`
   - `/var/run/slurm`
   - `/var/spool/slurmd`
:::
### Non-interactive jobs

Running non-interactive jobs is a little more complex, since we'll need to pass a script to our container.
Let's say you've written a bit of code that uses one of the conda environments in your overlay: we'll call
it `~/do-some-research.py`. We'll start by writing a Bash script to get into the conda environment & run the script:

```bash title="~/start-research.sh"
#!/bin/bash
. ~/.bashrc
conda activate ResearchEnvironment
python3 ~/do-some-research.py
```

Don't forget to make this script executable:
```shell terminal=true
[UWNetID@klone-login01 ~]$ chmod +x ~/start-research.sh
```

Now we'll make an SBATCH script, where we pass this script to our container:

```bash title="~/research.job"
#!/bin/bash
#SBATCH --job-name=research
#SBATCH --cpus-per-task=8
#SBATCH --mem=64GB
//highlight-start
#SBATCH --account=uwit
#SBATCH --partition=compute
//highlight-end
#SBATCH --time=8:00:00

~/launch-container-ro.sh ~/start-research.sh
```

This will start a job named 'research' with 8 CPUs, 64GB of RAM, and a time limit
of 8 hours. Don't forget to change the account or parition.
This tells our container (with our conda overlay in read-only) to run
the `~/start-research.sh` wrapper for our `~/do-some-research.py` Python script.
All that's left is to submit the job with `sbatch ~/research.job` and wait for the results.