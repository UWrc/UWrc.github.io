---
id: python
title: Python
---

[pytorch-cuda11]: /img/docs/pytorch-cuda11.png 'Pytorch install instructions for pip with CUDA11'

Python is a scripting and general purpose programming language with a rich ecosystem of computational libraries. On HYAK it's mostly associated with Pytorch, Tensorflow, and other machine learning libraries but there are wider uses. 

Since HYAK is a shared platform and you do not have root or administrative access, you will need to control your environment and install packages in a deliberate way. We offer either virtual environments through [miniconda3](#miniconda3) or using [containers](#containers) (e.g., Singularity, Docker).

## Miniconda3

Miniconda3 is a leaner deployment of Python3 versus the more widely known Anaconda3 variant. While both are functionally equivalent, we encourage Miniconda3 vs Anaconda3 due to the reduced number of inodes (i.e., files) it creates.

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

We'll assume you're using miniconda3 environments here for this walk through. It's generalizable to any Python environment but we will use an install of Pytorch against CUDA11 as the example since it is one of the most popular Python libraries used on HYAK.

First create an environment, I put it in my scrubbed directory but you can put it anywhere (preferably your lab directory if you have one). We discourage using your home directory as you will likely hit your inode (i.e., file) limits. Please alter the path in the example below to suit your unique needs. Note `pytorch-cuda11` in the example below will be the environment name.

```bash
conda create -p /gscratch/scrubbed/npho/pytorch-cuda11 python=3.8 -y
```

You can see all the conda environments you have regardless of where they are stored.

```shell-session terminal=true
$ conda env list
# conda environments:
#
                         /gscratch/scrubbed/npho/pytorch-cuda11
base                  *  /usr/lusers/npho/miniconda3

$
```

To load the environment at this point one would run:

```bash
conda activate /gscratch/scrubbed/npho/pytorch-cuda11
```

Note you have to provide the full path. If you use the `--name` or `-n` option instead of the `--prefix` or `-p` option then by default your environments will be in the same place as your miniconda3 installation, likely your home directory if you used our instructions in the [previous section](#install). If you run only 1 environment and use only a few packages this should be fine, otherwise you'll want to use the scrubbed or your lab directories.

If you are going to use a non-miniconda3 path regularly then you may want to run a variant of the command below to indicate an additional path that conda should search for your environments.

```bash
conda config --append envs_dirs /gscratch/scrubbed/npho
```

You need to swap out my scrubbed directory with your lab folder. Now if you list all your conda environments again you should see a change.

```shell-session terminal=true
$ conda env list
# conda environments:
#
pytorch-cuda11           /gscratch/scrubbed/npho/pytorch-cuda11
base                  *  /usr/lusers/npho/miniconda3

$
```

Adding a new conda environment prefix path will allow your environments to be referred to by their names alone instead of the full path, although you could still use the full path to avoid any ambiguity.

Now (for me) loading my conda environment is a more concise command of:

```bash
conda activate pytorch-cuda11
```

However, while loading environments will be a shorter command, you will still see the full path in your terminal prompt and this may annoy some folks (it annoys me) so one work around below *in lieu* of what you just did.

:::caution
If you use the alternative method of making your environment references more concise below, then removing environments will be a 2 step process just as making each more concise will be a 2 step process.
:::

Instead of adding a path to the `envs_dirs` variable as demonstrated [above](#environments) you can create a symbolic link for each conda environment after you create it. Modify your link command below as appropriate.

```bash
ln -s /gscratch/scrubbed/npho/pytorch-cuda10 ~/miniconda3/envs/
```

In this two step process you will have to create the environment using the `--prefix` or `-p` arguments as well as symbolically link it to the `env` sub-folder where your miniconda3 is installed.

```shell-session terminal=true
$ conda env list 
# conda environments:
#
                         /gscratch/scrubbed/npho/pytorch-cuda11
base                  *  /usr/lusers/npho/miniconda3
pytorch-cuda11           /usr/lusers/npho/miniconda3/envs/pytorch-cuda11

$
```

The first and third environments above are the same and to remove both will be a two step process, first undoing the symbolic link or `conda env remove -n pytorch-cuda11` followed by removing the actual environment by its path reference with `conda env remove -p /gscratch/scrubbed/npho/pytorch-cuda11`.

However, I don't create / remove environments often so this extra step is nice in that I can (un)load my environments concisely and when it is loaded the screen of my terminal prompt isn't consumed. Your level of desire for command line vanity may vary :)

### pip install pytorch

If you've followed the full page up til this point you have a blank conda environment using python3.8 and have loaded it using a variant of the following command:

```bash
conda activate pytorch-cuda11
```

Pytorch has a great install guide [[www](https://pytorch.org/get-started/locally/)] and you can see below it provides what the commands are for whichever platform you are using and which install method you prefer. We're going with `pip` as it's the most widely known and it demonstrates how easy it is to use in a conda environment.

HYAK runs Linux and as of January 2021 CUDA11 is the version on all the GPUs.

![pytorch-cuda11]

To use the install instructions you see above in an easy copy-and-paste format see below **from within an activated conda environment**:

```bash
pip install torch==1.7.1+cu110 torchvision==0.8.2+cu110 torchaudio===0.7.2 -f https://download.pytorch.org/whl/torch_stable.html
```

As a reminder these packages are pulled from the internet so you will need a build node or similar to do this part of the install.

:::tip
The above `pip install` commands are equally valid for any other Python libraries.
:::

Pytorch doesn't need a GPU to run although for most machine learning projects it's indispensible. If you have an interactive session with a GPU (run `nvidia-smi` to confirm) you can verify it's all working with the following test from Pytorch [[www](https://pytorch.org/get-started/locally/#linux-verification)]:

```shell-session terminal=true
(pytorch-cuda11) $ python3                                                                               Python 3.8.5 (default, Sep  4 2020, 07:30:14)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.__version__
'1.7.1+cu110'
>>> torch.cuda.is_available()
True
>>> 
```

Now you have a computationally reproducible environment using Pytorch for machine learning. If you want to save this environment and share with others you can export the packages you've installed in it using the `conda env export` command and provide either the path or name prefixes. The resulting YAML file can be shared and used to create environments elsewhere that conda is installed.

### Python Library Repositories

There are multiple places to search for Python libraries. Whatever libraries you install are specific to whatever conda environment is loaded at the time of install.

1. Anaconda Cloud [[www](https://anaconda.org)]
2. Python Package Index (PyPI) [[www](https://pypi.org)]
3. Conda Forge [[www](https://conda-forge.org)]

## Containers

TODO
