---
id: python
title: Python
---

Python is a scripting and general purpose programming language with a rich ecosystem of computational libraries. On HYAK it's mostly associated with Pytorch, Tensorflow, and other machine learning libraries but there are wider uses. 

Since HYAK is a shared platform and you do not have root or administrative access, you will need to control your environment and install packages in a deliberate way. We offer either virtual environments through [miniconda3](#miniconda3) or using [containers](#containers) (e.g., Singularity, Docker).

## Miniconda3

Miniconda3 is a more compact deployment of Python3 versus the more widely known Anaconda3 variant. While both are functionally equivalent, we encourage Miniconda3 vs Anaconda3 due to the reduced number of inodes (i.e., files) it creates.

We provide a summarized version below to get started but more elaborate instructions directly from anaconda [[www](https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html)].

### Install

Download the latest miniconda3 version.

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

Install miniconda3 to your home directory. If you use large or multiple virtual environments you'll be better off specifying a lab directory or elsewhere due to the (inode and capacity) limits of home directories.

```bash
bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3
```

### Configure

You'll need to initialize your shell. For most people (i.e., unless you actively changed it) should be using the cluster default of `bash`. If use `zsh`, `fish`, or any other terminal then you'll need to swap out your terminal as appropriate.

```bash
conda init bash
```

**Optional**: your terminal prompt will show `(base)` to indicate miniconda3 is active but it takes up a lot of screen real estate so I like to hide it until I'm actively using Python. The next command keeps miniconda3 deactivated until you call it.

```bash
conda config --set auto_activate_base false
```

If you skip running the above command then miniconda3 will always be active.

:::note
If you do use the command above then you will need to run `conda activate` before each use and you can unload it with `conda deactivate`.
:::

### Environments

asdf 

```shell-session terminal=true
asdf
```

asdf

## Containers

TODO
