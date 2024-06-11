---
slug: conda-disk-storage
title: Disk Storage Management with Conda
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,storage,conda,config,quota,python,environments]
---

Hello HYAK Users, 

It has come to our attention that the default configuration of [Miniconda](https://hyak.uw.edu/docs/tools/python#miniconda3) and [conda environments](https://hyak.uw.edu/docs/tools/python#environments) in the user's home directory leads to hitting storage limitations and the dreaded error `Disk quota exceeded`. We thought we would take some time to guide users in configuring their conda environment directories and package caches to avoid this error and proceed with their research computing. 

![](/img/blog/disk-quota-exceeded.png 'Error Message')

:::warning warning post under contruction

We have been made aware that the solutions for disk storage presented here result in additional problems with conda environments, specifically with hardlinks to the install directory for Miniconda3 when envs_dirs and pkgs_dirs are configured to a different storage location. [**Please see this Issue for detailed information.**](https://github.com/conda/conda/issues/13923) we hope to have a better solution soon. 

:::


### Conda's config

Software is usually accompanied by a configuration file (aka "config file") or a text file used to store configuration data for software applications. It typically contains parameters and settings that dictate how the software behaves and interacts it's environment. Familiarity with config files allows for efficient troubleshooting, optimization, and adaptation of software to specific environments, like HYAK's shared HPC environment, enhancing overall usability and performance. Conda's config file `.condarc`, is customizable and lets you determine where packages and environments are stored by conda. 

### Understanding your Conda

First let's take a look at your conda settings. The `conda info` command provides information about the current conda installation and its configuration. 

:::note

The following assumes you have already installed Miniconda in your home directory or elsewhere such that `conda` is in your `$PATH`. [Install Miniconda instructions here.](https://hyak.uw.edu/docs/tools/python#miniconda3)

:::

```bash
$ conda info

     active environment : None
            shell level : 0
//highlight-next-line
       user config file : /mmfs1/home/UWNetID/.condarc
 populated config files : /mmfs1/home/UWNetID/.condarc

          conda version : 4.14.0
    conda-build version : not installed
         python version : 3.9.5.final.0
       virtual packages : __linux=4.18.0=0
                          __glibc=2.28=0
                          __unix=0=0
                          __archspec=1=x86_64
       base environment : /mmfs1/home/UWNetID/miniconda3  (writable)
      conda av data dir : /mmfs1/home/UWNetID/miniconda3/etc/conda
  conda av metadata url : None
           channel URLs : https://conda.anaconda.org/conda-forge/linux-64
                          . . .
//highlight-next-line
          package cache : /mmfs1/home/UWNetID/conda_pkgs
//highlight-next-line
       envs directories : /mmfs1/home/UWNetID/miniconda3/envs
               platform : linux-64
             user-agent : conda/4.14.0 requests/2.26.0 CPython/3.9.5 Linux/4.18.0-513.18.1.el8_9.x86_64 rocky/8.9 glibc/2.28
                UID:GID : 1209843:226269
             netrc file : None
           offline mode : False

```
**The paths shown above will show your username in place of `UWNetID`**.
Notice the highlighted lines above showing the absolute path to your config file in your home directory (e.g., `/mmfs1/home/UWNetID/.condarc`), the directory designated for your package cache (e.g., `/mmfs1/home/UWNetID/conda_pkgs`), and the directory/ies designated for your environments (e.g., `/mmfs1/home/UWNetID/miniconda3/envs`). Conda designates directories for your package cache and your environments by default, but under HYAK, your home directory has a 10G storage limit, which can quickly be maxed out by package tarballs and their contents. We can change the location for your package cache and your environments to avoid this. 

:::tip

when you `ls` your home directory `ls /mmfs1/home/UWNetID/` you might not see `.condarc` listed. It is there! To list all hidden files (files beginning with `.`) use `ls -a /mmfs1/home/UWNetID/`.

:::

### Configuring your package cache and envs directories

Edit the highlighted lines in `.condarc` to designate directories with higher storage quotas for our `envs_dirs` and `pkgs_dirs`. Use a hyak preloaded editor like `nano` or `vim` to edit `.condarc` in place. [More about `nano`](https://www.nano-editor.org/docs.php). [More about `vim`](https://www.vim.org/docs.php). Your `.condarc` will look like this:

```bash
$ nano ~/.condarc

channels:
  - conda-forge
  - bioconda
  - defaults
auto_activate_base: true
envs_dirs:
//highlight-next-line
  - /mmfs1/home/UWNetID/miniconda3/envs
pkgs_dirs:
//highlight-next-line
  - /mmfs1/home/UWNetID/conda_pkgs

```
In this exercise, we will assign our `envs_dirs` and `pkgs_dirs` directories to directories in `/gscratch/scrubbed/` where we have more storage, [although remember scrubbed storage is temporary](https://hyak.uw.edu/docs/storage/gscratch#scrubbed). Alternatively, your lab/research group might have another directory in `/gscratch/` that can be used. 

:::important

Remember to replace the word `UWNetID` in the paths below with YOUR username/UWNetID. 

:::

Here is what your edited .condarc should look like.

```bash
$ cat /mmfs1/home/UWNetID/.condarc

channels: 
  - conda-forge
  - bioconda
  - defaults
auto_activate_base: true
envs_dirs:
//highlight-next-line
  - /gscratch/scrubbed/UWNetID/envs
pkgs_dirs:
//highlight-next-line
  - /gscratch/scrubbed/UWNetID/conda_pkgs

```

:::warning
If you don't have a directory under your UWNetID in `/gscratch/scrubbed/`or whereever you intend to designate these directories **you will need to create them now for this to work.** Use the `mkdir` command, for example `mkdir /gscratch/scrubbed/UWNetID` and replace `UWNetID` with your username. Then create directories for your package cache and envs directory, for example, `mkdir /gscratch/scrubbed/UWNetID/conda_pkgs` and `mkdir /gscratch/scrubbed/UWNetID/envs`.
:::

After `.condarc` is edited, we can use `conda info` to see if our changes have been incorporated.

```bash
$ conda info |grep cache 
/gscratch/scrubbed/UWNetID/conda_pkgs
$ conda info |grep envs
/gscratch/scrubbed/UWNetID/envs
```

### Cleaning up disk storage

After you have reset the package cache and environment directories with your conda config file, you can delete the previous directories to free up storage. Before doing that, you can monitor how much storage was being occupied by each item in your home directory with the command `du -h --max-depth=1`. Remove directories previously used as cache and envs_dir recursively with `rm -r`. The following is an example of monitoring storage and removing directories. 

:::warning

`rm -r` is permanent. We cannot your recover directory. You were warned.

:::

```bash
$ du -h --max-depth=1 /mmfs1/home/UWNetID/
6.7G	./miniconda3/envs
4.0G	./conda_pkgs
. . .
$ rm -r /mmfs1/home/UWNetID/envs
$ du -h --max-depth=1 /mmfs1/home/UWNetID/
2.6G	./miniconda3/
4.0G	./conda_pkgs
. . .
```
:::note

The `hyakstorage` command is not simultaneously updated. Although you have cleaned up your home directory, `hyakstorage` might not yet show new storages estimates. `du -sh` will give you the most up to date information. 

:::

Storage can also be managed by cleaning up package cache periodically. Get rid of the large-storage tar archives after your conda packages have been installed with `conda clean --all`.

Lastly, regular maintenance of conda environments is crucial for keeping disk usage in check. Review you list of conda environments with `conda env list` and remove unused environments using the `conda remove --name ENV_NAME --all` command. Consider creating lightweight environments by installing only necessary packages to conserve disk space. For example, create an environment for each project (`project1_env`) rather than an environment for all projects combined (`myenv`). 

### Disk quota STILL exceeded

Be aware that many software packages are configured similarly to conda. Explore the documentation of your software to locate the configuration file and anticipate where storage limitations might become an issue. In some cases, you may need to edit or create a config file for the software to use. `pip` and `R` are two other common offenders ballooning the disk storage in your home directory. 

#### Configuring PIP

If you are installing with `pip`, you might have a pip cache in `~/.cache/pip`. Let's locate your the `pip` config file location under variant "global." **You might have to activate a previously built conda environment to do this**. For this exercise we will use an environment called `project1_env`. 

```bash
$ conda activate project1_env
(project1_env) $ pip config list -v
. . .
For variant 'user', will try loading '/mmfs1/home/UWNetID/.pip/pip.conf'
. . .
```
The message "will try loading" rather than listing the config file `pip.conf` means that a pip config file has not been created. We will create our config file and set our pip cache. Create a directory in your home directory (e.g.,`/mmfs1/home/UWNetID/.pip`) to hold your pip config file and create a file called `pip.conf` with the `touch` command. Remember to also create the new directory for your new pip cache if you haven't yet. 

```bash
$ mkdir /mmfs1/home/UWNetID/.pip/
$ touch /mmfs1/home/UWNetID/.pip/pip.conf
$ mkdir /gscratch/scrubbed/UWNetID/pip_cache
```

Open `pip.conf` with `nano` or `vim` and add the following lines to designate the location of your pip cache. 

```bash
[global]
//highlight-next-line
cache-dir=/gscratch/scrubbed/UWNetID/pip_cache
```

Check that your pip cache has been designated. 
```bash
(project1_env) $ pip config list
/mmfs1/home/UWNetID/.pip/pip.conf
(project1_env) $ pip cache dir
/gscratch/scrubbed/UWNetID/pip_cache
```

#### Configuring R

[**We previously covered this in our documentation.**](https://hyak.uw.edu/docs/tools/r#user-environment) Edit or create a config file called `.Renviron` in your home directory. Use `nano` or `vim` to designate the location of your R package libraries. The contents of the file should be something like the following example.

```bash
$ cat ~/.Renviron 
R_LIBS="/gscratch/scrubbed/UWNetID/R/"
```
The directory designated by `R_LIBS` will be where R installs your package libraries. 

### I'm still stuck

Please reach out to us by emailing help@uw.edu with "hyak" in the subject line to open a help ticket. 
