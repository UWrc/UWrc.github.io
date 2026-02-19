---
id: arrays
title: Job Arrays
---

In this section, we will present a worked example using Slurm job arrays. This example will display how Slurm can be used for parallel computing or executing multiple jobs in parallel. Harnessing the power of parallel computing can decrease your total time preparing and submitting jobs by allowing you to execute a set of jobs in parallel. The script presented can be used as a template and adapted for your purposes.

Imagine you have a giant pile of letters that need to be put into envelopes. Each letter is already written, and each envelope is ready to be sealed. To speed things up, you gather a group of friends, and each person gets their own stack of letters and envelopes. Everyone can work independently, putting letters into envelopes without needing to talk to each other or wait for someone else to finish.

In HPC, an **"embarrassingly parallel" problem** is like this task. It's a big job that can be broken down into many small, separate tasks that don’t need to interact with each other. Each small task can be handled by a different computer (or processor), all working at the same time. This makes it really easy to speed up the cumulative task by just adding more computers to work on it in parallel.

### Array Jobs

It can be useful to run an array job when you want to run a command multiple times with different parameters or execute the same command on multiple files. This is a common technique for testing different configurations in a simulation. Array jobs are also useful in situations where you want to run the same analysis on different datasets. Let's run an array job with  `loop_array.slurm` located in the basics directory. [<ins>**Click here to return to the Set Up steps**</ins>](https://hyak.uw.edu/docs/hyak101/basics/jobs#set-up) in the previous section if you can't find this script.

```js
nano loop_array.slurm
```

This should look similar to `loop_job.slurm` but with the extra argument `#SBATCH --array=0-9`. This argument indicates that 10 jobs will be requested with this single script. The flag `#SBATCH -o log/%x_%A_%a.out`, again, will save the output file to the log directory. The directory will created if it does not exist already. The job name will replace `%x`, the job ID will replace `%A`, and **Slurm Array Task ID** (i.e., the individual job requested with the array job) will replace `%a` in the output file name. `%a` will be an integer 0-9 as specified with `#SBATCH --array=0-9`.

The main difference between `loop_array.slurm` and `loop_job.slurm` that we saw in the last section, is that here we are using bash scripting and variable syntax to set up the interval for `loop_script.sh` to count. Remember that `loop_script.sh` requires two arguments, a starting and ending integer and then simply counts from the start integer until the ending integer is met. With `loop_array.slurm` we are doing the same, except that our main command is changed so that the two arguments are now two variables `START` and `END`:

```js
time ./loop_script.sh ${START} ${END}
```

Before executing the command, we define the variables `START`, `END`, and a third variable `COUNT`:

```js
COUNT=5000000
START=$((${SLURM_ARRAY_TASK_ID}*${COUNT}))
END=$((${START}+${COUNT}-1))
```

In this case, `COUNT` is a constant used to help set up the number range that will be counted by the loop script. The `START` variable is prepared by multiplying a Slurm environment variable `SLURM_ARRAY_TASK_ID` by `COUNT`, and the `END` variable is defined as the `START` variable plus `COUNT` minus 1.

Each job in the array will have a different `SLURM_ARRAY_TASK_ID` set by `#SBATCH --array=0-9`. For the first job, `SLURM_ARRAY_TASK_ID` equals 0 and `COUNT` equals 5,000,000 so `START` equals 0 (i.e., 0 * 5000000). `END` for the first job is 4,999,999 or (0 + 5000000 - 1). For the second job, `SLURM_ARRAY_TASK_ID` equals 1 so `START` equals 5000000 and `END` equals 9,999,999. And so on. Thus, each job in `loop_array.slurm` executes `loop_script.sh` on a different, non-overlapping range of numbers. The table below shows the variables `SLURM_ARRAY_TASK_ID`, `START`, and `END` for each job in the array.

|   SLURM_ARRAY_TASK_ID      |      START      |   END|
| ------------- | :-----------: | -----: |
| 0 |   0    |  4,999,999 |
| 1 |   5,000,000    |    9,999,999 |
| 2 |   10,000,000    |    14,999,999 |
| 3 | 15,000,000 | 19,999,999 |
| 4 | 20,000,000 | 24,999,999 |
| 5 | 25,000,000 | 29,999,999 |
| 6 | 30,000,000 | 34,999,999 |
| 7 | 35,000,000 | 39,999,999 |
| 8 | 40,000,000 | 44,999,999 |
| 9 | 45,000,000 | 49,999,999 |

If necessary, exit the text reader with `Ctrl+x` and submit the script using `sbatch`:

```js
sbatch loop_array.slurm
```

Notice the jobs as they appear in your terminal showing `squeue`. [<ins>**Click here to return to the Pro Tip box with instructions to Monitor the Slurm Job Queue to set that view up again.**</ins>](https://hyak.uw.edu/docs/hyak101/basics/jobs#monitoring-the-slurm-job-queue)

Once the jobs have completed, check the output files in the log directory:

```js
cd log
ls
```

Your list of output files from `loop_array.slurm` should look like the following but with 123456789 replaced by the JobID assigned to your array job when it was submitted.

```js
loop_array_123456789_0.out  loop_array_123456789_1.out  loop_array_123456789_2.out
loop_array_123456789_3.out  loop_array_123456789_4.out  loop_array_123456789_5.out
loop_array_123456789_6.out  loop_array_123456789_7.out  loop_array_123456789_8.out
loop_array_123456789_9.out  loop_array_123456789_10.out
```

Each output file will contain information about the interval that was counted. For example,

```js title="loop_array_123456789_0.out"
Sequence complete! Iterations from 0 to 4,999,999.

real    0m5.617s
user    0m5.570s
sys     0m0.016s
```

This exercise demonstrates:

* The submission of an array job.
* The usage of Bash variables to set up arguments for commands.
* The usage of Slurm environment variable `SLURM_ARRAY_TASK_ID` as a identifier for each job in the array and a multiplier for defining variables.

Utilizing Slurm environment variables like `SLURM_ARRAY_TASK_ID` and Bash can help you generate job arrays for testing configurations and parameters for your research computing project. [<ins>**See Slurm documentation to explore more Slurm output environment variables.**</ins>](https://slurm.schedmd.com/sbatch.html#SECTION_OUTPUT-ENVIRONMENT-VARIABLES)

In the Advanced Slurm tutorial, we explore the usage of `SLURM_ARRAY_TASK_ID` to execute the same command on a file set, and we use Bash scripting to perform a parameter sweep.

We hope you will be able to adapt these methods to fit your needs and the needs of your research project. If you have any questions or suggestions for how to improve this tutorial, please email [<ins>**help@uw.edu**</ins>](mailto:help@uw.edu) with "Hyak Slurm Tutorial" in the subject line, and let us know what you think. Thank you!
