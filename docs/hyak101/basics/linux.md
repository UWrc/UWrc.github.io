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

# you can list the contents of the directory "above" where we are now
# without changing directory
ls ../
alkanes  animal-counts  creatures  project  writing

# -F option with ls puts a / after directories to differentiate them from other objects
ls -F
```
The `-R` option to the ls command will list all nested subdirectories within a directory. Let’s use `ls -FR` to recursively list the new directory hierarchy we just created in the project directory:

```bash 
ls -FR ../project
```

:::caution
Complicated names of files and directories can make your life painful when working on the command line. Here we provide a few useful tips for the names of your files and directories.

**Don’t use spaces.**
Spaces can make a name more meaningful, but since spaces are used to separate arguments on the command line it is better to avoid them in names of files and directories. You can use - or _ instead (e.g. `north-pacific-gyre/` rather than `north pacific gyre/`). To test this out, try typing `mkdir north pacific gyre` and see what directory (or directories!) are made when you check with `ls -F`.

**Don’t begin the name with - (dash).**
Commands treat names starting with - as options.

**Stick with letters, numbers, `.` (period or ‘full stop’), `-` (dash) and `_` (underscore).**
Many other characters have special meanings on the command line. We will learn about some of these during this lesson. There are special characters that can cause your command to not work as expected and can even result in data loss.

If you need to refer to names of files or directories that have spaces or other special characters, you should surround the name in single quotes ('').
:::

### Editing file on `klone`

#### use `nano` text editor on `klone`

To edit files on `klone` we need to go back to basic text editors. You will not have access to a word processer and formatting and syntax doesn't always translate from Microsoft Word or similar software to executable commands on `klone`. With the next command, we will create a file called `draft.txt` and open it in the text editor `nano`.

```bash
# first change directory to thesis
cd thesis

#creates and opens draft.txt
nano draft.txt
```
:::note
There are other text editors you could choose from. `vim` is a popular choice. In the opinion of the author, `nano` is more beginner friendly, so that is what we will use here. 
:::

Let's type a few lines of text. 

![](/img/docs/hyak101/basics/draft_nano.png 'nano')

Once we’re happy with our text, we can press `Ctrl`+`O` (press the `Ctrl` or `Control` key and, while holding it down, press the `O` key) to write our data to disk. We will be asked to provide a name for the file that will contain our text. Press Return to accept the suggested default of `draft.txt`.

Once our file is saved, we can use `Ctrl`+`X` to quit the editor and return to the shell. 

### `cat`

#### "concatenate" or `cat` a file to print its contents to the screen for review.

Let's view our work. 

```bash
# list the directory to see our new file there
ls
draft.txt

# now let's view the contents of draft with cat
cat draft.txt
It's not "publish or perish" any more,
it's "share and thrive".
```
 
:::note important concept: Paths and Access
In the last section we talked about your "location" or "places" in the `klone` filesystem. Many times on the command line, your location determines what you have access to. To demonstrate this important concenpt, consider the following example: 

There is a dataset of sequences from a mythical creatue called a Basilisk (from the Harry Potter Universe). The dataset is called `basilisk.dat`. If you wanted to execute anything on `basilisk.dat` you would not be able to unless you are inside of the directory where it is stored. Let's go find it and print its contents to the shell with `cat`.

If you have been following along and you are in the thesis directory, change directory to two directories "above" thesis (i.e., two directories closer to the root directory (`/`)) and enter a directory called `creatures/`

```bash
cd ../../creatures/
```

List the directory.

```bash
ls
basilisk.dat  minotaur.dat  unicorn.dat
```

`cat` the Basilisk data

```bash
cat basilisk.dat 
COMMON NAME: basilisk
CLASSIFICATION: basiliscus vulgaris
UPDATED: 1745-05-02
CCCCAACGAG
GAAACAGATC
ATTAGAAGAT
CTGTCGCGAA
CCGCACCTCT
### Truncated
```

To illustrate the concept of paths and access. Let's go back to `thesis` and try to do the same thing. Change directory to one directory "above" the `cretures`, then go into `writing` and finally `thesis`.

```bash
cd ../writing/thesis

cat basilisk.dat
cat: basilisk.dat: No such file or directory
```
We get an error because we can't access `basilisk.dat` from our location without more information. However, we can provide more complete information and view `basilisk.dat`

```bash
cat ../../creatures/basilisk.dat
COMMON NAME: basilisk
CLASSIFICATION: basiliscus vulgaris
UPDATED: 1745-05-02
CCCCAACGAG
GAAACAGATC
ATTAGAAGAT
CTGTCGCGAA
CCGCACCTCT
### Truncated
```
In this example, we have provided more information about the location of `basilisk.dat` ***relative*** to our location and are able to access it and execute the `cat` command upon it. This illustrates, using a relative path, or an address to that file relative to our own location. 

We can also use ***absolute*** paths to access a file from **ANY** location on the `klone` filesystem. This is a error-proof method of making sure you can execute commands on files no matter where on the filesystem the command is issued. Let's use an ***absolute*** path to see a file from elsewhere on the filesystem. I've a dataset called `animals.csv` under `/mmfs1/sw/hyak101/basics/data/`. Let's view it with `cat` from our current directory.

```bash
# first print your working directory to see your location
pwd

# now use the absolute path to animals.csv to cat it
cat /mmfs1/sw/hyak101/basics/data/animals.csv
```
To summarize, you either have to be inside of the directory where a file is to execute commands on it, provide a relative path to the item from your current directory, or provide an absolute path to the file. 
:::

In the next section, we'll review additional Linux commands that you might find helpful. 