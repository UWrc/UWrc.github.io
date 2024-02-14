---
id: python
title: Python
---

[pytorch-cuda11]: /img/docs/pytorch-cuda11.png 'Pytorch install instructions for pip with CUDA11'

Python is a scripting and general purpose programming language with a rich ecosystem of computational libraries. On HYAK it's mostly associated with Pytorch, Tensorflow, and other machine learning libraries but there are wider uses. 

Since HYAK is a shared platform and you do not have root or administrative access, you will need to control your environment and install packages in a deliberate way. We offer either virtual environments through [miniconda3](#miniconda3) or using [containers](#containers) (e.g., Apptainer, Docker).

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
bash Miniconda3-latest-Linux-x86_64.sh -p $HOME/miniconda3
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

## Containers (miniconda3)

This section expands upon a Stackexchange reply [[www](https://stackoverflow.com/questions/54678805/containerize-a-conda-environment-in-a-singularity-container)] with a walk through specific for the KLONE cluster.

While miniconda3 is an improvement over anaconda for lean deployment, a more advanced approach is to package your entire conda environment within a (Singularity) container. As with the beauty of containers, we can use a miniconda3 container provided by continuum.io [[www](https://hub.docker.com/r/continuumio/miniconda3)] to bootstrap our environment then feed it our `environment.yml` file that specifies which Python libraries and versions to install.

### Example

First we'll need to have a Singularity definition file that defines how to build our container and a corresponding YAML file that describes our environment. There is a sample `compute.def` and `compute.yml` file at the following Github gist [[www](https://gist.github.com/npho/6de7dbcb59dcee47036e510659733089)]. Note the definition file can be generalized for any `YAML` environment you have. The `compute.yml` environment is a proof-of-concept with random packages that you may or may not care for, you should customize this with libraries tailored to your needs. With these files staged in a folder, we'll do a walk through on how to build your container below.

Get an interactive session.

```bash
salloc -A uwit -p compute --time=1:00:00 -n 4 --mem=10G
```

Load singularity.

```bash
module load singularity
```

### Build

Build your container, I set the output container to land on the compute node's local SSD drive (presented as `/tmp`) and copy it over to my current directory afterwards. 

```bash
singularity build --fakeroot /tmp/compute.sif ./compute.def
```

Please note in the `%files` section of the definition file I set `compute.yml environment.yml` which means on the cluster in the current directory we save our conda environment definition YAML file as `compute.yml` but Singularity will copy that into the container we're building and have future reference (internally) as `environment.yml`.

Consider reviewing the Singularity definitions reference page [[www](https://sylabs.io/guides/latest/user-guide/definition_files.html)] for additional options.

:::caution
The build may take a few minutes depending on how big your environment is. Don't forget to copy the container from `/tmp` to your location of choice on `/gscratch`. 
:::

### Run

Ideally you could now run `singularity shell compute.sif` and get interactive mode with your container. If you do this the `conda init` isn't sourced so you will have to run `source /opt/conda/etc/profile.d/conda.sh` manually if you want the environment to appear in parentheses. Functionally there is no difference if you don't do this, it's mostly for appearances sake at the terminal prompt. If you run `singularity exec compute.sif bash` then it will do that for you automatically and save you a `source` command.

```shell-session terminal=true
[22:22:58] npho@g3020:singularity $ singularity shell --bind /gscratch compute.sif                             
Singularity> source /opt/conda/etc/profile.d/conda.sh
Singularity> conda activate compute
(compute) Singularity> 
```

In this case (to further confuse the reader) we called our environment as defined by the `compute.yml` file "compute" as well. That is what is being passed as a command line argument to `conda activate`.

:::tip
When running Singularity whether as `shell` or `exec` if you need access to your lab data you will want to additionally pass along the `--bind /gscratch` flag to ensure that this is accessible from within the container.
:::

## Containers (cuda-pytorch)

This section builds upon the previous section with a walk through on building a container with a miniconda environment [[www](#containers-miniconda3)]. The major changes are using a CUDA base image from NVIDIA's ngc portal [[www](https://ngc.nvidia.com/catalog/containers/nvidia:cuda/tags)] and specifying a PyTorch install.

### Example

For this walk through please refer to the accompanying Github gist [[www](https://gist.github.com/npho/57dda32c28f5e0ab6df4948188484c95)]. Same as before, the Singularity definition file describes how to build the container and the YAML file describes how to build a miniconda3 environment.

By default we suggest you use `cuda:11.4.2-base-ubuntu20.04` since it's currently the latest CUDA toolkit version, uses the bare minimal image (i.e., `base`), and is build upon Ubuntu that is more common among desktop setups (and more likely to be familiar for researchers). When building your container there are more comprehensive (and larger) images (e.g., `cuda:11.4.2-devel-ubuntu20.04`) with additional developer packages built in.

Get an interactive session with a GPU.

```bash
salloc -A uwit -p gpu-rtx6k --time=1:00:00 -n 4 --mem=20G --gpus=1
```

Load singularity.

```bash
module load singularity
```

### Build

Build the container and save it to the local node SSD. As a reminder be sure to copy it over to `/gscratch` upon completion.

```bash
singularity build --fakeroot /tmp/cuda-pytorch.sif ./cuda-pytorch.def
```

### Run

Now you can run the container. Be sure to add the `--nv` flag to specify to Singularity to pass through GPUs, refer to the documentation for more information [[www](https://sylabs.io/guides/latest/user-guide/gpu.html)].

```shell-session terminal=true
[0:26:08] npho@g3024:singularity $ singularity shell --nv --bind /gscratch cuda-pytorch.sif
Singularity> source /opt/conda/etc/profile.d/conda.sh
Singularity> nvidia-smi
Tue Sep 28 00:27:00 2021       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 470.57.02    Driver Version: 470.57.02    CUDA Version: 11.4     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Quadro RTX 6000     Off  | 00000000:24:00.0 Off |                  Off |
| 28%   37C    P0    56W / 260W |      0MiB / 24220MiB |      4%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
Singularity> conda activate cuda-pytorch
(cuda-pytorch) Singularity>
```

Alternatively you can call the Python interpreter directly.

```shell-session terminal=true
[0:27:46] npho@g3024:singularity $ singularity exec --nv --bind /gscratch cuda-pytorch.sif python
Python 3.9.5 (default, Jun  4 2021, 12:28:51)
[GCC 7.5.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
>>> torch.cuda.device_count()
1
>>> 
```
