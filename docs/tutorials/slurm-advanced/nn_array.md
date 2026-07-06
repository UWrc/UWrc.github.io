---
title: Parallel Computing
---

:::note context
In machine learning, unless you use the same trained model repeatedly, there is some inherent randomness in the training process (e.g., random initialization of network weights) and across iterations of training a neural network, error estimates can fluctuate. for biological applications—such as predicting the origin of *Populus trichocarpa* trees—some origins may be easier to predict due to practical or biological reasons. For example, DNA quality may introduce uncertainty in prediction, or certain populations may be genetically more homogeneous than expected. Because of this uncertainty and randomness, we want to train the neural network on multiple test sets to get a better understanding of the distribution of origin prediction error.
:::

For this worked example, we have 5 test sets of *P. trichocarpa* trees, each with a different random draw of 10% of individuals where their true origin has been replaced with NA. The goal is to train the neural network on each test set independently and predict tree origins. Later, results can be combined to analyze prediction error across a broader range of trees. This case is an example of an "embarrassingly parallel" workload, where multiple models can be trained and tested independently in parallel. The Slurm job scheduler enables all these jobs to be submitted at once, drastically reducing total runtime compared to sequential execution.

### Array Jobs

The method for solving this embarrassingly parallel computing problem is very similar to what we have set up in the last section. We will use a Slurm batch script to submit an array of jobs to be executed in parallel by adding the `sbatch` directive `#SBATCH --array=`. In our case, `#SBATCH --array=0-4` which will execute 5 jobs, one for each test set. Let's take a look at the script before we test it out.

And use the text editor `nano` to edit it as needed. Remember to use `hyakalloc` to find which accounts and partitions are available to you. If you have a `compute` partition, replace `--partition=ckpt` with `--partition=compute` and your job will be scheduled faster because you will be requesting a job on resources you can use with priority access.

```js
nano locator_NN_array.slurm
# exit nano by holding Ctrl and pressing X; then save it by pushing Y
```

```js title="locator_NN_array.slurm"
#!/bin/bash

#SBATCH --job-name=locator_array
#SBATCH --partition=ckpt
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --mem=5G
#SBATCH --array=0-4
#SBATCH --time=10:00
#SBATCH -o log/%x_%A_%a.out


# Here we are saving the list of Populus trichocarpa test sets as a variable called FILE_LIST.
FILE_LIST=($(ls -1 data/potr_m_pred*))

# Next we are using the SLURM environment variable SLURM_ARRAY_TASK_ID, which is an index
# (0-4) or a set of consecutive numbers to get a file from FILE_LIST.
# For each job in the array, the variable FILE will be a single file from FILE_LIST.
FILE=${FILE_LIST[${SLURM_ARRAY_TASK_ID}]}

# This will print the file name to the log file output. Use echo commands during script development to
# verify variables are correctly defined.
echo $FILE

# command - we pass the variable FILE to the command for each job in the array
# we are also using the index variable SLURM_ARRAY_TASK_ID as a suffix to ensure that
# the results from each job are saved as separate files.
apptainer exec --cleanenv --bind /gscratch locator.sif python /locator/scripts/locator.py --matrix data/potr_genotypes1000.txt --sample_data ${FILE} --out out/array_potr_predictions${SLURM_ARRAY_TASK_ID}
#### Truncated for website view
```

The work of transforming this batch job into an array job is done by attaching the Slurm environment variable `SLURM_ARRAY_TASK_ID` to each test set. `SLURM_ARRAY_TASK_ID` is an index (0-4) being attached to each file in the `data/`  directory.

To start building what we need, we save the list of sample data input files or test sets as a variable called `FILE_LIST` the value of which can be viewed with the following command:

```js
ls -1 data/potr_m_pred*
```

```js
data/potr_m_pred0.txt
data/potr_m_pred1.txt
data/potr_m_pred2.txt
data/potr_m_pred3.txt
data/potr_m_pred4.txt
```

Each file in `FILE_LIST` is then attached to its index value with the variable `SLURM_ARRAY_TASK_ID` and saved as a new variable called `FILE`. In the command executed for each job, the variable `FILE` will be passed as the input with the flag `--sample_data`. In the command, we also use the `SLURM_ARRAY_TASK_ID` index as a suffix for the results that will be saved in the `out/` directory. The following table shows the values of the variables `SLURM_ARRAY_TASK_ID` and `FILE` as well as the name for the output file:

|   SLURM_ARRAY_TASK_ID      |      FILE      |   output file name|
| ------------- | :-----------: | -----: |
| 0 |   data/potr_m_pred0.txt    |  out/array_potr_predictions0 |
| 1 |   data/potr_m_pred1.txt    |    out/array_potr_predictions1 |
| 2 |   data/potr_m_pred2.txt    |    out/array_potr_predictions2 |
| 3 | data/potr_m_pred3.txt | out/array_potr_predictions3 |
| 4 | data/potr_m_pred4.txt | out/array_potr_predictions4 |

This single script will schedule an array of 5 jobs, one for each test set (`FILE`). **Each job in the array will run as one task on one node that has 5G of RAM.** Each job in the array will produce also produce a log file (e.g., `locator_array_12345678_0.out`) saved to the directory `log/` using `%x` as shorthand of the job-name, `%A` as shorthand for the array-jobID that will be assigned by Slurm when the job is submitted, and `%a` for the index of the job (`SLURM_ARRAY_TASK_ID`) within the array.  

Once you have edited the script to fit your needs, you can submit it with `sbatch`.

```js
sbatch locator_NN_array.slurm
# the following is an example result
sbatch: No account specified, defaulting to: account
Submitted batch job 12345678
# Slurm will assign a JobID when the job was submitted
# it will likely be an 8-digit number, but not 12345678
```

And use `squeue` with `watch` to monitor the progress of the jobs in real time.

```js
watch squeue -u UWNetID
             JOBID PARTITION     NAME     USER ST TIME  NODES NODELIST(REASON)
        12345678_0 ckpt locator_  UWNetID  R 0:07   1 n3263
        12345678_1 ckpt locator_  UWNetID  R 0:07   1 n3319
        12345678_2 ckpt locator_  UWNetID  R 0:07   1 n3319
        12345678_3 ckpt locator_  UWNetID  R 0:07   1 n3396
        12345678_4 ckpt locator_  UWNetID  R 0:07   1 n3396
# use Ctrl + C to exit the watch command
```

List the `log/` directory with the `-ltr` flag to see the log files from this tutorial in the order they were generated with the most recent at the bottom.

```js
ls -ltr log/
```

```js
total 1024
-rw-r--r-- 1 UwNetID all 106480 Feb 22 16:34 locator_job_12345678.out
  //highlight-next-line
-rw-r--r-- 1 UwNetID all 102610 Feb 22 17:35 locator_array_12345678_4.out
-rw-r--r-- 1 UwNetID all 105432 Feb 22 17:35 locator_array_12345678_3.out
-rw-r--r-- 1 UwNetID all  88930 Feb 22 17:35 locator_array_12345678_1.out
-rw-r--r-- 1 UwNetID all 148436 Feb 22 17:35 locator_array_12345678_0.out
-rw-r--r-- 1 UwNetID all 151298 Feb 22 17:36 locator_array_12345678_2.out
```

Since they were all submitted to run in parallel, they did not finish in index order. In this example, job 4 finished first.

As in the previous section, the log files in `log/` contain the standard output (stdout) from running Locator NN, and the files in `out/` are the results. The next step would be to combine the results and calculate the prediction error for each tree, but that data analysis is outside of the scope of this tutorial.

Each job executed in parallel took less than 2 minutes to complete. If you would have executed these serially, it would have taken about 10 minutes. What will you do with all of your extra time? Go forth and parallelize your workflows, but first, get ready to take this to the next level! In the next section, we will use scripting to iterate not only over input files but over neural network parameters as well.
