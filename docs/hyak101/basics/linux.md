---
id: linux
title: Basic Linux Commands
---

:::note

This documentation is under construction.

:::

In this section, we will review more commands to get you comfortable do basic things on HYAK. The next section borrows exercises from [**Software Carpentry's Unix Shell Lesson on Working with Files and Directories.**](https://swcarpentry.github.io/shell-novice/03-create.html), which goes into more detail about these commands. 

## Your Working Directory

We have discussed storage on HYAK a bit in this tutorial, but it is important to emphasize here, that you should avoid storing data, scripts, and software in your Home directory where you will quickly run out of storage due to its 10GB quota. For this reason, it is important to understand your other storage options on HYAK, which are as follows: 

1. If you are part of a lab group who contributed resources to HYAK (slices) then you have storage under their directory in `/mmfs1/gscratch/labname`. Where the word `labname` is replaced by the name of your lab group on HYAK. Check with your PI or labmates to find out what that directory is called. 
2. If you are a student and you have applied to be part of the Research Computing Club (RCC), you have have storage under `/mmfs1/gscratch/stf/`. The RCC has set storage quotas for users there. Please inquire with the RCC about `stf` storage quotas.
3. If you don't fall into any of these categories, we have temporary community storage under `/gscratch/scrubbed/`; however, directories and files here will be automatically deleted if not used after 21 days. Please review our documentation about `/gscratch/scrubbed/` [**HERE**](https://hyak.uw.edu/docs/storage/gscratch#scrubbed). 

For this tutorial, we will make a working directory under `/gscratch/scrubbed/` and perform the exercises there. You can do the same, or perform the following command in another storage area you have access to (i.e., a lab group directory or under `stf`).

### `mkdir`

#### "make directory" or `mkdir` to make am empty directory you can work in. 

First navigate to `/gscratch/scrubbed/` or the location you have selected for your working directory. 

```bash
cd /gscratch/scrubbed/

pwd 
/mmfs1/gscratch/scrubbed/
```

Then make your working directory with the following, but replacing the word `UWNetID` with your UW Net ID.

```bash
mkdir UWNetID
```

Change directory to enter your new directory.

```bash
cd UWNetID
```
### `wget`

#### "web get" or `wget` to download data from a webpage. 

Now we are going to download some data from the Software Carpentry github repository for the next exercises. 

```bash
wget https://swcarpentry.github.io/shell-novice/data/shell-lesson-data.zip

# list your working directory to show the zipped version of the lesson directory
ls
shell-lesson-data.zip

# unzip the lesson directory 
unzip shell-lesson-data.zip

# list your working directory to show the unzipped version of the lesson directory
ls
shell-lesson-data

# change directory to go into shell-lesson-data/exercise-data/writing/
cd shell-lesson-data/exercise-data/writing/

# print your working directory to understand where you are
pwd

# list the writing directory 
ls 
haiku.txt  LittleWomen.txt
```

### `../`

#### Another way to move around the directories on the filesystem is to move backwards one directory at a time with `../`. 

```bash
# print working directory
pwd
/mmfs1/gscratch/scrubbed/UWNetID/shell-lesson-data/exercise-data/writing

cd ../

# print working directory again
pwd
/mmfs1/gscratch/scrubbed/UWNetID/shell-lesson-data/exercise-data/

#go backward 2 directories
cd ../../

# print working directory again
pwd
/mmfs1/gscratch/scrubbed/UWNetID/
```

Let's go back to `shell-lesson-data/exercise-data/writing` and practice making a directory again. 

```bash
cd shell-lesson-data/exercise-data/writing

# make a directory called thesis
mkdir thesis
```

Note that `mkdir` is not limited to creating single directories one at a time. The `-p` option allows `mkdir` to create a directory with nested subdirectories in a single operation:

```bash
# make a directory called project with subdirectories data and results
# make these one directory "above" where we are now 
mkdir -p ../project/data ../project/results

# 
```



DRAFT 
 For example, if you wanted to execute a command on a dataset, you would have to execute that command from the directory where the dataset is located on `klone`, which for this tutorial may be in `/sw/hyak101/basics/`. To successfully execute the command you will either have to be inside of the directory where the data is (with `cd`) or reference the dataset using its enitre absolute path, for example, with `/sw/hyak101/basics/dataset.csv`. 