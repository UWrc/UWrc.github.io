---
id: nn_sweep
title: Parameter Sweep
---


### Leveling up your Slurm usage with scripting

To leverage the power of Slurm, scripting can enhance efficiency and streamline workflows. This is especially relevant in high-performance computing (HPC) environments, where running multiple jobs with varying parameters is a common task. In this section, we use another script to demonstrate how to iterate over both different input test sets of *Populus trichocarpa* trees as we have been and dropout proportions, a key hyperparameter in training neural networks.

:::note relevant vocabulary
**Dropout** is a regularization technique in machine learning that randomly ignores a subset of neurons during training, preventing overfitting and improving generalization. By systematically varying dropout proportions across training iterations, we can analyze the impact of different dropout values on model performance in a structured and automated manner.
:::

### Why use scripting for Slurm?

* **Automating Parameter Sweeps** - Parameter sweeps involve running a program multiple times with different input values, such as testing various dropout values in a machine learning model. Instead of manually submitting multiple jobs, scripting enables automatic submission and management of these jobs using Slurm’s job array feature.
* **Efficient Resource Utilization** - By structuring jobs efficiently, you can ensure optimal utilization of compute nodes, preventing unnecessary idle time, and reducing queue wait times.
* **Scalability and Reproducibility** - Well-structured Slurm scripts make protocols easy to reproduce and modify, facilitating collaboration and long-term research reproducibility.
* **Reducing Human Error** - Manual job submission increases the likelihood of mistakes in resource requests or file handling. Scripting helps automate these aspects, reducing errors, and improving workflow consistency.

### New Features in `locator_NN_dropouts.slurm`

This script builds on `locator_NN_array.slurm` by introducing dropout variation, enabling evaluation of different dropout values. Key differences:

* **Larger job array** `#SBATCH --array=0-14` - In this demonstration, we will run 15 jobs in parallel rather than just 5. As in the previous section, we will iterate over the same 5 subsets of individual *Populus trichocarpa* trees, but we will also apply **3 different dropout values** to each, leading to 15 total jobs.
* **Dropout rate parameter** `--dropout_prop` - Three dropout values (0.25, 0.5, 0.75) will be tested. Each test set is processed at each dropout rate.
* **Indexing logic** `FILEINDEX` and `DROPOUT` - We will divide `SLURM_ARRAY_TASK_ID` by 3 to determine which test set to use and utilize modulus (`%`) to cycle through dropout values.
* **Generalized variables for input and output paths** `INPUTMATRIX` and `OUTDIR` - Adding these variables avoids hardcoding file paths, making the script more adaptable.

Use `nano` text editor to review the script and make any necessary customizations to sbatch directives. If you intend to make further adjustments, review the following explanation of the variable for successful adaptation of the script for your project.

```bash
nano locator_NN_dropouts.slurm
# exit nano by holding Ctrl and pressing X; then save it by pushing Y
```

### Variables

Let's walk through the variables and their roles:

#### 1. Input Variables

| **Variable**   | **Purpose**                                  | **How It Works** |
|--------------|----------------------------------|----------------------------------|
| `FILE_LIST`      | Stores the list of test set files | Uses `ls -1 data/potr_m_pred*` to list files matching the pattern |
| `FILEINDEX`  | Determines which test set file to use for each job | `FILEINDEX=$((${SLURM_ARRAY_TASK_ID}/3))` ensures each test set is used 3 times |
| `FILE`       | The specific test set file for the current job | `FILE=${FILE_LIST[${FILEINDEX}]}` selects from `FILE_LIST` using `FILEINDEX` |
| `INPUTMATRIX`| Stores the genotype matrix file path | `INPUTMATRIX=($(echo data/potr_genotypes1000.txt))` |

#### 2. Dropout Handling

| **Variable**   | **Purpose**                               | **How It Works** |
|--------------|--------------------------------|----------------------------------|
| `DROPOUTS`   | Stores the list of dropout values (0.25, 0.5, 0.75) | `DROPOUTS=(0.25 0.5 0.75)` defines the possible values |
| `DROPOUT`    | Determines the dropout value for the current job | `DROPOUT=${DROPOUTS[${SLURM_ARRAY_TASK_ID}%3]}` cycles through the list |

:::tip Understanding the Modulus Operator in `DROPOUT=${DROPOUTS[${SLURM_ARRAY_TASK_ID}%3]}`
The modulus operator `%` calculates the remainder of a division. It helps us cycle through the dropout values (0.25, 0.5, 0.75) as the job array progresses.

How it works:

* `SLURM_ARRAY_TASK_ID` = 0 → 0 % 3 = 0 → Use `DROPOUTS`[0] = 0.25
* `SLURM_ARRAY_TASK_ID` = 1 → 1 % 3 = 1 → Use `DROPOUTS`[1] = 0.5
* `SLURM_ARRAY_TASK_ID` = 2 → 2 % 3 = 2 → Use `DROPOUTS`[2] = 0.75
* `SLURM_ARRAY_TASK_ID` = 3 → 3 % 3 = 0 → Back to `DROPOUTS`[0] = 0.25
* `SLURM_ARRAY_TASK_ID` = 4 → 4 % 3 = 1 → Back to `DROPOUTS`[1] = 0.5
* `SLURM_ARRAY_TASK_ID` = 5 → 5 % 3 = 2 → Back to `DROPOUTS`[2] = 0.75

This pattern repeats every three jobs, ensuring that each test file is run with all three dropout values.
:::

#### 3. Output Variables

| **Variable**   | **Purpose**                                 | **How It Works** |
|--------------|----------------------------------|----------------------------------|
| `OUTDIR`     | Stores the output directory path | `OUTDIR=($(echo out/))` generalizes output path |
| Output file format | Ensures unique results file names different dropout values and test sets | `${OUTDIR}dropout_sweep_${DROPOUT}_${FILEINDEX}` includes dropout rate and test set index |

### Command Breakdown

We are familiar with what locator is doing, but let's breakdown the code again since there are additional pieces to review. The script runs the following command for each job:

```bash
apptainer exec --cleanenv --bind /gscratch locator.sif \
    python /locator/scripts/locator.py \
    --matrix ${INPUTMATRIX} \
    --sample_data ${FILE} \
    --dropout_prop ${DROPOUT} \
    --out ${OUTDIR}dropout_sweep_${DROPOUT}_${FILEINDEX}
```

* `apptainer exec --cleanenv --bind /gscratch locator.sif python /locator/scripts/locator.py` - Runs the Python script inside an Apptainer container.
* `--matrix ${INPUTMATRIX} --sample_data ${FILE}` - Uses genotype matrix (`INPUTMATRIX`) and test set (`FILE`) as inputs.
* `--dropout_prop ${DROPOUT}` - Applies a dropout rate (DROPOUT).
* `--out ${OUTDIR}dropout_sweep_${DROPOUT}_${FILEINDEX}` - Saves results to out/dropout_sweep_\<dropout_value\>_\<file_index\>.

### Job array variable values

As this script is written, the following variables are constant for each job in the array:

* `FILE_LIST` = `ls -1 data/potr_m_pred*`
* `INPUTMATRIX` = `data/potr_genotypes1000.txt`
* `DROPOUTS` = `(0.25 0.5 0.75)`
* `OUTDIR` = `out/`

The following table shows the values of the variables that change for each job in the array using scripting:

| SLURM_ARRAY_TASK_ID | FILEINDEX | FILE                | DROPOUT | Output File Name                         | Log File Name                      |
|---------------------|----------|---------------------|--------|-----------------------------------------|-------------------------------------|
| 0                   | 0        | `data/potr_m_pred_0.txt`  | 0.25   | `out/dropout_sweep_0.25_0`               | `log/dropout_sweep_<jobID>_0.out`|
| 1                   | 0        | `data/potr_m_pred_0.txt`  | 0.5    | `out/dropout_sweep_0.5_0`                | `log/dropout_sweep_<jobID>_1.out`|
| 2                   | 0        | `data/potr_m_pred_0.txt`  | 0.75   | `out/dropout_sweep_0.75_0`               | `log/dropout_sweep_<jobID>_2.out`|
| 3                   | 1        | `data/potr_m_pred_1.txt`  | 0.25   | `out/dropout_sweep_0.25_1`               | `log/dropout_sweep_<jobID>_3.out`|
| 4                   | 1        | `data/potr_m_pred_1.txt`  | 0.5    | `out/dropout_sweep_0.5_1`                | `log/dropout_sweep_<jobID>_4.out`|
| 5                   | 1        | `data/potr_m_pred_1.txt`  | 0.75   | `out/dropout_sweep_0.75_1`               | `log/dropout_sweep_<jobID>_5.out`|
| 6                   | 2        | `data/potr_m_pred_2.txt`  | 0.25   | `out/dropout_sweep_0.25_2`               | `log/dropout_sweep_<jobID>_6.out`|
| 7                   | 2        | `data/potr_m_pred_2.txt`  | 0.5    | `out/dropout_sweep_0.5_2`                | `log/dropout_sweep_<jobID>_7.out`|
| 8                   | 2        | `data/potr_m_pred_2.txt`  | 0.75   | `out/dropout_sweep_0.75_2`               | `log/dropout_sweep_<jobID>_8.out`|
| 9                   | 3        | `data/potr_m_pred_3.txt`  | 0.25   | `out/dropout_sweep_0.25_3`               | `log/dropout_sweep_<jobID>_9.out`|
| 10                  | 3        | `data/potr_m_pred_3.txt`  | 0.5    | `out/dropout_sweep_0.5_3`                | `log/dropout_sweep_<jobID>_10.out`|
| 11                  | 3        | `data/potr_m_pred_3.txt`  | 0.75   | `out/dropout_sweep_0.75_3`               | `log/dropout_sweep_<jobID>_11.out`|
| 12                  | 4        | `data/potr_m_pred_4.txt`  | 0.25   | `out/dropout_sweep_0.25_4`               | `log/dropout_sweep_<jobID>_12.out`|
| 13                  | 4        | `data/potr_m_pred_4.txt`  | 0.5    | `out/dropout_sweep_0.5_4`                | `log/dropout_sweep_<jobID>_13.out`|
| 14                  | 4        | `data/potr_m_pred_4.txt`  | 0.75   | `out/dropout_sweep_0.75_4`               | `log/dropout_sweep_<jobID>_14.out`|

### Submit the script

Submit the script to Slurm with `sbatch`.

```bash
sbatch locator_NN_dropouts.slurm
```

```bash
# the following is an example result
sbatch: No account specified, defaulting to: account
Submitted batch job 12345678
# Slurm will assign a JobID when the job was submitted
# it will likely be an 8-digit number, but not 12345678
```

And use `squeue` with `watch` and your UW NetID to monitor the progress of the jobs in real time. You should see all 14 jobs appear in the queue.

```bash
watch squeue -u UWNetID
```

List the `log/` directory with the `-ltr` flag to see the log files from this tutorial in the order they were generated with the most recent at the bottom.
As you can see, since they were all submitted to run in parallel, they do not finish in index order. Job 9 finished first in this example.

```bash
ls -ltr log/
```

```bash
total 2944
-rw-r--r-- 1 UwNetID all 106480 Feb 22 16:34 locator_job_12345678.out
-rw-r--r-- 1 UwNetID all 102610 Feb 22 17:35 locator_array_12345678_4.out
-rw-r--r-- 1 UwNetID all 105432 Feb 22 17:35 locator_array_12345678_3.out
-rw-r--r-- 1 UwNetID all  88930 Feb 22 17:35 locator_array_12345678_1.out
-rw-r--r-- 1 UwNetID all 148436 Feb 22 17:35 locator_array_12345678_0.out
-rw-r--r-- 1 UwNetID all 151298 Feb 22 17:36 locator_array_12345678_2.out
  //highlight-next-line
-rw-r--r-- 1 UwNetID all  96132 Feb 23 12:10 dropout_sweep_12345678_9.out
-rw-r--r-- 1 UwNetID all  88070 Feb 23 12:10 dropout_sweep_12345678_6.out
-rw-r--r-- 1 UwNetID all  93373 Feb 23 12:10 dropout_sweep_12345678_8.out
-rw-r--r-- 1 UwNetID all 116711 Feb 23 12:10 dropout_sweep_12345678_10.out
-rw-r--r-- 1 UwNetID all 100077 Feb 23 12:10 dropout_sweep_12345678_5.out
-rw-r--r-- 1 UwNetID all 106358 Feb 23 12:10 dropout_sweep_12345678_4.out
-rw-r--r-- 1 UwNetID all 107491 Feb 23 12:10 dropout_sweep_12345678_1.out
-rw-r--r-- 1 UwNetID all 112362 Feb 23 12:10 dropout_sweep_12345678_2.out
-rw-r--r-- 1 UwNetID all 116769 Feb 23 12:10 dropout_sweep_12345678_3.out
-rw-r--r-- 1 UwNetID all 127419 Feb 23 12:10 dropout_sweep_12345678_13.out
-rw-r--r-- 1 UwNetID all 127367 Feb 23 12:10 dropout_sweep_12345678_14.out
-rw-r--r-- 1 UwNetID all  83225 Feb 23 12:10 dropout_sweep_12345678_0.out
-rw-r--r-- 1 UwNetID all 127283 Feb 23 12:10 dropout_sweep_12345678_7.out
-rw-r--r-- 1 UwNetID all 100342 Feb 23 12:10 dropout_sweep_12345678_12.out
-rw-r--r-- 1 UwNetID all 130560 Feb 23 12:10 dropout_sweep_12345678_11.out
```

The log files in `log/` contain the standard output (stdout) from running Locator NN. Use the `head -3` command to see the first three lines of the output, and confirm the variables from the table above show the correct variables as defined in the script.

```bash
head -3 log/dropout_sweep_12345678_0.out
```

```bash
The file index for this array job is: 0
The test set being used for this array job is: data/potr_m_pred0.txt
The dropout proportion being tested during this job is: 0.25
```

These first 3 lines of the log were generated by printing `FILEINDEX`, `FILE`, and `DROPOUT` for the job will the following commands:

```bash
echo "The file index for this array job is:" $FILEINDEX
echo "The test set being used for this array job is:" $FILE
echo "The dropout proportion being tested during this job is:" $DROPOUT
```

Including `echo` commands in your scripts is a good method of confirming the correct behavior of your script before executing it.

The files in `out/` are the results from the analysis. The next step would be to combine the results, calculate the prediction error for each tree, and compare performance for each dropout rate. However, this is beyond the scope of this tutorial.

We hope you will be able to adapt these methods to fit your needs and the needs of your research project. If you have any questions or suggestions for how to improve this tutorial, please email **\<help@uw.edu\>** with "Hyak Advanced Slurm Tutorial" in the subject line, and let us know what you think. Thank you!
