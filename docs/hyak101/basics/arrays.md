---
id: arrays
title: Job Arrays
---

:::note

This documentation is under construction.

:::

Imagine you have a giant pile of letters that need to be put into envelopes. Each letter is already written, and each envelope is ready to be sealed. To speed things up, you gather a group of friends, and each person gets their own stack of letters and envelopes. Everyone can work independently, putting letters into envelopes without needing to talk to each other or wait for someone else to finish.

In HPC, an **"embarrassingly parallel" problem** is like this task. It's a big job that can be broken down into many small, separate tasks that don’t need to interact with each other. Each small task can be handled by a different computer (or processor), all working at the same time. This makes it really easy to speed up the overall job by just adding more computers to work on it in parallel. 


### Array Jobs
It can be useful to run an array job when you want to run a command multiple times with different parameters. This is a common technique for testing different configurations in a simulation. Array jobs are also useful in situations where you want to run the same analysis on different datasets. Let's run the array job `loop_array.slurm` located in the basics directory.

```bash
nano loop_array.slurm
```
This should took similar to `loop_job.slurm` but with the extra tag `#SBATCH --array=0-9`. This tag indicates that 10 jobs will be sent out. The tag `#SBATCH -o log/%x_%A_%a.out` will save the output file to the log directory. The directory will created if it does not exist already. The job name will replace %x, the job ID will replace %A, and the number of jobs inside the array will replace %a in the output file name.

The script starts by defining the variables COUNT, START, and END:
```bash
COUNT=5000000
START=$((${SLURM_ARRAY_TASK_ID}*${COUNT}))
END=$((${START}+${COUNT}-1))
```
Notice how START uses `SLURM_ARRAY_TASK_ID`. Each job in the array has a unique task ID starting from 0 to the number of jobs minus 1. In this example, the slurm array task ID ranges from 0-9. So, for the first job, the ID will be 0, meaning the starting value will also be 0 and the ending value will be 4999999. COUNT, START, and END will be passed on to the following command for each job in the array:
```bash
time ./loop_script.sh ${START} ${END}
```
Exit the text reader (ctrl+x) and submit the script using `sbatch`:
```bash
sbatch loop_array.slurm
```
Once the jobs have completed, check the output files in the log directory:
```bash
cd log
ls
cat loop_array_JOBID_JOBNUMBER.out
```

