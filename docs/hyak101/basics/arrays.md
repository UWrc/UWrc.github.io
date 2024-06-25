---
id: arrays
title: Job Arrays
---

:::note

This documentation is under construction.

:::

Imagine you have a giant pile of letters that need to be put into envelopes. Each letter is already written, and each envelope is ready to be sealed. To speed things up, you gather a group of friends, and each person gets their own stack of letters and envelopes. Everyone can work independently, putting letters into envelopes without needing to talk to each other or wait for someone else to finish.

In HPC, an **"embarrassingly parallel" problem** is like this task. It's a big job that can be broken down into many small, separate tasks that don’t need to interact with each other. Each small task can be handled by a different computer (or processor), all working at the same time. This makes it really easy to speed up the overall job by just adding more computers to work on it in parallel. 

In this section of the tutorial, we have an embarassingly parallel problem. We want to train the locator neural network on multiple test sets to get a more complete understanding of the distribution of error for predicting the origin of our *Populus trichocarpa* trees. We have multiple independent tasks that can be executed as separate processes simultaneously. 

:::note Background
In machine learning, there is some inherent randomness (e.g., random starting point when beginning to for the network) and across iterations of training a neural network, error estimates can fluctuate. Additionally, in the case of training a neural network on a biological system, like our *Populus trichocarpa* trees, the origin of some trees might be easier to predict of practical and biological reasons. For example, the DNA quality could be a practical reason that the tree origin is uncertain, or a biological reason for uncertainty could be that trees from a large region of the species distribution may be homogeneous genetically. Because of this uncertainty and randomness, we want to train the neural network on multiple test sets to get a better understanding of the distribution of origin prediction error. 
:::

For this worked example, we have 5 test sets of *Populus trichocarpa* trees, each with a different random draw of 10% of individuals where their true origin has been replaced with NA. We want to train the neural network with each test set, so that later we can combine results and calculate prediction error from a broader diversity of *P. trichocarpa* trees. 

### Array Jobs

The method for solving this embarassingly parallel computing problem is very similar to what we have set up in the last section. We will use a SLURM batch script to submit an array of jobs to be executed in parallel by adding the `sbatch` directive `#SBATCH --array=`. In our case, `#SBATCH --array=0-4` which will execute 5 jobs, one for each test_set. Let's take a look at the script before we test it out. 

Use `cat` to view the script.

```bash 
cat locator_NN_array.slurm
```
And use the text editor `nano` to edit it as needed. Remember to use `hyakalloc` to find which accounts and partitions are available to you. If you have a `compute` parition, replace `--parition=ckpt` with `--partition=compute` and your job will be scheduled faster because you will be requesting a job on resources you can use with priority access.

```bash 
nano locator_NN_array.slurm
# exit nano by holding Ctrl and pressing X; then save it by pushing Y
```

```bash title="locator_NN_array.slurm"
#!/bin/bash

#SBATCH --job-name=locator_array
#SBATCH --partition=ckpt
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --mem=10G
#SBATCH --array=0-4
#SBATCH --time=3:00:00
#SBATCH -o %x_%A_%a.out

#### Truncated for website view

# here we are saving the list of populus trichocarpa test sets as a variable called FILES
FILES=($(ls -1 data/potr_m_pred*))

# next we assign an array index to each test set and saving each into a variable called FILE
# the SLURM environment variable SLURM_ARRAY_TASK_ID is the index (0-4)
FILE=${FILES[${SLURM_ARRAY_TASK_ID}]}

# command - we pass the variable FILE to the command for each job in the array
# we are also using the index variable SLURM_ARRAY_TASK_ID as a suffix the results from each job
apptainer exec --cleanenv --bind /gscratch locator.sif python /locator/scripts/locator.py --matrix potr_genotypes.txt --sample_data ${FILE} --out locator_out/array_potr_predictions_${SLURM_ARRAY_TASK_ID}

#### Truncated for website view
```

The work of transforming this batch job into an array job is done by attaching the SLURM environment variable `SLURM_ARRAY_TASK_ID` to each test set. `SLURM_ARRAY_TASK_ID` is an index (0-4) being attached to each file in the `data/`  directory. The file list is saved as a variable `FILES` and then each file plus its `SLURM_ARRAY_TASK_ID` index is saved as a variable `FILE` which is passed as the input with the flag `--sample_data`. We aslso use the `SLURM_ARRAY_TASK_ID` index as a suffix for the results that will be saved in the `locator_out/` directory.

This single script is scheduling an array of 5 jobs, one for each test set (`${FILE}`). Each job in the array will run as one task on one node that has 10G of RAM. Each job in the array will produce an output file like locator_array_12345678_0.out using `%x` as shorthand of the job-name, `%A` as shorthand for the array-jobID that will be assigned by SLURM when the job is submitted, and `%a` for the index of the job within the array the array-jobID will replace 12345678 in locator_array_12345678_0.out and there will be 5 output files, one for each job locator_array_12345678_0-4.out. 

Once you have edited the script to fit your needs, you can submit it with `sbatch`.

```bash
sbatch locator_NN_array.slurm
# the following is an example result
sbatch: No account specified, defaulting to: account
Submitted batch job 12345678
# SLURM will assign a JobID when the job was submmitted
# it will likely be an 8-digit number, but not 12345678
```

And use `squeue` with `watch` to monitor the progress of the jobs in real time. 

```bash
watch squeue -u UWNetID
             JOBID PARTITION     NAME     USER ST	TIME  NODES NODELIST(REASON)
        12345678_0	ckpt locator_  UWNetID  R	0:07	  1 n3263
        12345678_1	ckpt locator_  UWNetID  R	0:07	  1 n3319
        12345678_2	ckpt locator_  UWNetID  R	0:07	  1 n3319
        12345678_3	ckpt locator_  UWNetID  R	0:07	  1 n3396
        12345678_4	ckpt locator_  UWNetID  R	0:07	  1 n3396
# use Ctrl + C to exit the watch command
```
The `watch` command executes the `squeue` command every 2 seconds, allowing you to watch the job in real time. List the currect directory to see the output files there.

```bash
ls
data/                           locator_array_12345678_4.out    locator_out/
locator_array_12345678_0.out    locator_array_12345678_5.out    locator.sif
locator_array_12345678_1.out    locator_job_12345678.out        shell-lesson-data/
locator_array_12345678_2.out    locator_NN_array.slurm
locator_array_12345678_3.out    locator_NN_job.slurm
```

Use `tail` to compare two of the output files to each other.

```bash
tail locator_array_12345678_0.out

11/11 [==============================] - ETA: 0s - loss: 0.0196
Epoch 316: val_loss did not improve from 0.15270
11/11 [==============================] - 1s 58ms/step - loss: 0.0196 - val_loss: 0.1538 - lr: 2.4414e-07
predicting locations...
R2(x)=0.9602027602199694
R2(y)=0.9934424100402416
mean validation error 0.4544098551826771
median validation error 0.3181686778302888

run time 3.9815464933713276 minutes

tail locator_array_12345678_1.out

11/11 [==============================] - ETA: 0s - loss: 0.0234
Epoch 293: val_loss did not improve from 0.09959
11/11 [==============================] - 1s 61ms/step - loss: 0.0234 - val_loss: 0.1028 - lr: 9.7656e-07
predicting locations...
R2(x)=0.9852468923779139
R2(y)=0.9940615432651215
mean validation error 0.2893548027087871
median validation error 0.18939671640277614

run time 3.3444977164268495 minutes
```
As you can see, test set 0 (`data/potr_m_pred0.txt`) took a slightly longer time to execute and the validation error mean and median differ between the runs. Results files `locator_out/array_potr_predictions_0_predlocs.txt` and `locator_out/array_potr_predictions_1_predlocs.txt` are distinct as well and contain predictions for the trees that whose origin were NA in the test set. The next step would be to combine the results and calculate the distnace between the true and predicted origin, but that data analysis is outside of the scope of this tutorial.

Congratulations, each job executed in parallel took around 4 minutes to complete, and if you would have executed these serially, it would have taken about 20 minutes. What will you do with all of your extra time? Go forth and parallelize your workflows. 