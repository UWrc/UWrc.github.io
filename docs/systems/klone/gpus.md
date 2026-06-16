---
title: GPUs on Klone
---

GPUs offer significant performance enhancements for computationally intensive tasks. GPU cores are designed for parallel computing, making them a useful tool for training machine learning models, molecular dynamics simulations, and data mining. Unlike CPUs which excel at sequential tasks, GPUs can handle large numbers of simultaneous operations.

## GPU Jobs

You can view the available GPUs on Hyak with the `sinfo -s` command. To view which GPUs are available on the `ckpt` partition, use:
```
sinfo -p ckpt-all -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
```

### GPU Jobs on Checkpoint

A GPU job can be requested from `ckpt` by specifying the type and number of GPUs to allocate with the tag `--gpus-per-node`:
```
salloc --partition=ckpt-all --gpus-per-node=2080ti:1 --mem=10G --time=2:00:00 
```

### GPU Jobs on a Specific GPU Partition

If you have a GPU partition, you can start an interactive session on a GPU node by using the following command:
```
salloc --account=account --partition=gpu-rtx6k --gpus=1 --mem=10G --time=2:00:00
# Replace the account and partition flags to match your account and partitions.
```
If you are unsure if your accounts have GPU partitions, use the `hyakalloc` command to see all of your available resources. A detailed walkthrough for requesting a GPU job can be found [**HERE**](https://hyak.uw.edu/docs/tutorials/slurm/jobs/#requesting-gpus-from-a-gpu-partition).

:::note GPU Types on Hyak
You now know how to view all GPUs supported on Hyak with the `sinfo -s` command. Additional information about each GPU is listed below:

**L40 and L40s**: 48GB of GDDR6 memory per GPU card

**A40**: 48GB of GDDR6 memory per GPU card

**2080 Ti**: 11GB of GDDR6 memory per GPU card

**Titan**: 24GB of GDDR6 memory per GPU card

**RTX6k**: 48GB of GDDR6 memory per GPU card

**A100**: 40GB of HBM2 memory per GPU card

**P100**: 16GB of HBM2 memory per GPU card

:::

---

## NVIDIA NGC Containers

In the Containers section, you learned the multiple ways in which containers can be used. In this section we will cover [**NGC (NVIDIA GPU Cloud) containers**](https://catalog.ngc.nvidia.com/) that are performance-optimized, tested, and ready to deploy on GPU.

Researchers can leverage GPU acceleration to train large-scale language models, enabling more efficient processing of textual datasets and advancing tasks like text generation and sentiment analysis. GPUs play a pivotal role in accelerating training and inference tasks for deep learning models, from computer vision to speech recognition, empowering researchers to tackle complex problems with unprecedented speed and scalability. GPUs accelerate compute-intensive tasks like molecular dynamics simulations or climate modeling. GPU code acceleration offers unparalleled performance and scalability for researchers across disciplines.

We encourage you to check out what containers are available within NGC, as in this page we will only cover a couple that get you started with using the GPU.

:::note Relevant Vocabulary
**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like Hyak's current generation cluster, klone.

**Apptainer Definition File**: a recipe file for an Apptainer container which contains install instructions for software to be containerized. The file extension for an Apptainer definition file is .def.

**NVIDIA GPU Cloud**: A container registry that specializes in common GPU accelerated applications or GPU software development tools provided by NVIDIA. The [**NVIDIA NGC catalog**](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=) has a wide variety of containers for machine learning and AI applications.
:::

### Example container workloads

Below we will walk through examples of how to use two of the many containers available in NGC. We will cover using the HPC (Software Development Kit) SDK in a couple different forms. Other examples of containers you could explore on your own include:

- [**NVIDIA RAPIDS**](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/rapidsai/containers/rapidsai): [**RAPIDS**](https://rapids.ai/) is a platform for end-to-end data science and analytics pipelines entirely on GPUs. RAPIDS contains GPU accelerated versions of popular Python libraries like [**cuDF**](https://github.com/rapidsai/cudf) for Pandas and [**cuML**](https://github.com/rapidsai/cuml) for scikit-learn.

- [**NVIDIA Holoscan**](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/clara-holoscan/containers/holoscan): [**Holoscan**](https://github.com/nvidia-holoscan) is a platform for AI sensor processing focusing on low-latency sensor and network connectivity, optimized libraries for data processing and AI, and core microservices to run streaming, imaging, and other applications.

- [**Open Hackathons GPU Bootcamp**](https://github.com/openhackathons-org/): Another great place to get started with tools that are in the HPC SDK and in the broader GPU software stack is through the [**GPU Bootcamp**](https://github.com/openhackathons-org/gpubootcamp/tree/master/). This page details how to get started with Apptainer containers for HPC and AI. It has examples in Python, C++, using OpenACC directives, and also a miniprofiler. 

:::tip Getting Started with Containers
If you are new to containers, it may be useful to refer to the following resources to help get you started:

1. **[**What is a Container?**](https://hyak.uw.edu/docs/tutorials/containers/background/#what-is-a-container)**

2. **[**Getting Started With Apptainer**](https://hyak.uw.edu/docs/guides/software/containers/#apptainer-formerly-singularity)**

3. **[**Containers Tutorial**](https://youtu.be/zPsvUQV_GV0)**

:::

### Pre-requisites

Please refer to the **[**Apptainer and Docker**](/docs/guides/software/containers)** for information on getting started with Apptainer and getting access to NGC.

Get a summary of all the GPUs on the cluster and their current state. This will be helpful when requesting an interactive session on a GPU for the exercises below. 
```js
sinfo -p ckpt -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
```

### NVIDIA HPC SDK 

The [**HPC SDK**](https://developer.nvidia.com/hpc-sdk) houses compilers, libraries, and software tools that are most commonly used when working on HPC applications. Below we will demonstrate how to get started with this container. We will show how [**standard parallelization**](https://developer.nvidia.com/blog/accelerating-standard-c-with-gpus-using-stdpar/) is achieved with a mini app [**LULESH**](https://github.com/LLNL/LULESH) for hydrodynamics.

1. Get an interactive session on a GPU instance using some variant of the below command.

```js
salloc -A mygroup -p ckpt --gpus-per-node=a40:1 --mem=10G --time=1:00:00 --job-name=LULESH_testing
```

2. Run container, with LULESH code available. To do so we must first clone the LULESH repo, and then mount it in our container.

```js
git clone --branch 2.0.2-dev https://github.com/LLNL/LULESH.git

apptainer shell --nv -B LULESH:/source --pwd /source docker://nvcr.io/nvidia/nvhpc:23.1-devel-cuda12.0-ubuntu20.04

cd stdpar/build
make run
```

You can try out the other features included in the HPC SDK. This includes our profiling tools like [**Nsight systems**](https://developer.nvidia.com/nsight-systems) and the [**NVCC**](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/) compiler for CUDA codes. The HPC SDK should be your one stop shop for getting started with GPU accelerating your workloads.

### Gromacs

1. Get an interactive session on a GPU instance using some variant of the below command.

```js
salloc -A mygroup -p ckpt --gpus-per-node=a40:1 --mem=10G --time=1:00:00 --job-name=gromacs_testing
```

2. Get the example data, or use your own if you already are using GROMACS

```js
DATA_SET=water_GMX50_bare
wget -c https://ftp.gromacs.org/pub/benchmarks/${DATA_SET}.tar.gz
tar xf ${DATA_SET}.tar.gz
cd ./water-cut1.0_GMX50_bare/1536
```

3. Run container, with data available

```js
apptainer run --nv -B ${PWD}:/host_pwd --pwd /host_pwd docker://nvcr.io/hpc/gromacs:2022.3 gmx grompp -f pme.mdp
```

---

## Using Ollama on Hyak

### What Are Ollama LLMs?

Ollama LLMs are large language models (LLMs) developed by Ollama. LLMs are artificial intelligence systems that understand human language. Ollama LLMs can run locally on your device and do not require constant internet connection to cloud-based servers that other LLMs may require. Because they generally require root access for installation on Hyak, it is recommended that Ollama LLMs are used through NVIDIA containers. To get started with Ollama on Hyak, you will need to be accustomed with [**Apptainer**](https://hyak.uw.edu/docs/guides/software/containers#apptainer-formerly-singularity) and [**requesting GPU jobs**](https://hyak.uw.edu/docs/tutorials/slurm/jobs#requesting-gpus-from-a-gpu-partition). 

### Installing Ollama as a Container

Conventional LLM tools require root access for installation on Hyak. To maintain system security and stability, users do not have root or sudo access. Administrative privileges, including external program installations, are reserved for system administrators. To work around this, LLMs can be used via software [**containers**](https://hyak.uw.edu/docs/tutorials/containers/background#what-is-a-container).

You can install Ollama in a container definition file. This example will use the [**NVIDIA HPC SDK**](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/nvhpc) container. The NVIDIA HPC SDK container has Nvidia and Cuda drivers. Create the definition file with `vim` or `nano`:
```js
nano ollama.def
```
```js
Bootstrap: docker
From: nvcr.io/nvidia/nvhpc:24.9-devel-cuda_multi-rockylinux8

%post
    # Ollama install
    curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz
    tar -C /usr -xzf ollama-linux-amd64.tgz

```

:::note Customizing Your Container
In this example, the v.24.9 with RockyLinux8 NVHPC container is used. You may use other versions of NVHPC containers by modifying the `From:` line in your definition file. To view other available versions of NVHPC containers, click [**HERE**](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/nvhpc/tags).
:::

Next, you will want to pull the NVIDIA base container and install Ollama inside of it. You can build the container interactively or as a job submission:
```js
# interactively from checkpoint
salloc --partition=ckpt-all --cpus-per-task=2 --mem=50G --time=8:00:00
```
```js
apptainer build ollama.sif ollama.def
```
This container may take some time to build. To save time, you can copy a prebuilt `ollama.sif` file in your current directory using the following command:
```js
cp /mmfs1/sw/containers/ollama/ollama.sif .
```

:::note Requesting Resources for Larger LLMs
Depending on the size of the model you wish to run, you may want to request more resources. You can request all available memory with `--mem=0`. When requesting multiple GPUs, LLMs may run into issues distributing their memory usage across the GPUs. If the model is configured properly, this should not be an issue. You can request up to 8 GPUs (an entire GPU server). Efficiency will drop when requesting more than 8 GPUs because the GPU cards will be located on different nodes.  

Note that the more resources you request may increase the wait times to get your requested resources. It can be useful to convert the `salloc` flags above into `#SBATCH` directives in a executable bash ([**sbatch**](https://hyak.uw.edu/docs/tutorials/slurm/jobs#batch-jobs)) script along with the commands you want Ollama to execute when anticipated wait times are long. Additional information on requesting a GPU job can be found [**HERE**](https://hyak.uw.edu/docs/tutorials/slurm/jobs/#requesting-gpus-from-checkpoint). 
:::

To ensure the container was properly built, start an interactive shell session:
```js
apptainer shell --nv --bind /gscratch/ ollama.sif
```
The `--nv` flag enables GPU support by binding the necessary NVIDIA libraries from the host system. The `--bind /gscratch` flag allows containers to access files on the filesystem outside the container. The `Apptainer >` prompt should now appear on the command line, indicating that you have successfully entered the container shell. Because you have bound the filesystem, you can change to the containers root directory to find where Ollama was installed with `cd /`. You should be able to see an Ollama directory under `/usr`. Note that the `/usr` directory will also contain files and directories from the host kernel. You can now run Ollama as a background job with the following commands:
```js
# start the ollama server in the background
ollama serve &
# pulling an ollama model
ollama pull llama3.2
# run the pulled model
ollama run llama3.2

```

### Installing Ollama with Miniforge3

You can install Ollama and its Python client using the `conda/Miniforge3-25.9.1-0` module available on Hyak. This module provides a clean and isolated Conda base, ideal for building custom environments on Hyak.

First, load the Conda module:
```js
module load conda
```
This makes the `conda` command available in your shell. If this is your first time using Conda module on Hyak, you'll need to set up custom environment and package locations to avoid writing to your home directory. See the setup instructions [**here**](https://hyak.uw.edu/blog/2025-december-maintenance#conda-environments).

You can now create and manage your own environment for Ollama:
```js
conda create -n ollama python=3.12
conda activate ollama
```
Next, install Ollama CLI and the Python library for Ollama:
```js
conda install -c conda-forge ollama ollama-python
```
Ollama and its Python client are now ready to use in your Conda environment.

### Managing Your Ollama Storage

By default, pulled Ollama models will save in your [**home directory**](https://hyak.uw.edu/docs/systems/klone/storage#user-home-directory) in a hidden file named `.ollama`. Because your home directory has a 10GB limit, you may get a disk quota error when pulling larger models. Use the following commands to check the storage in your home directory and to list all hidden files:
```js
cd ~ # changing to your home directory
ls -a # lists all hidden files
du -h --max-depth 1 # checks your storage
```
If the `.ollama` directory is large enough, you may run into a disk quota error. You will need to clear out this directory by removing the `models` directory and creating a new default directory for ollama storage.
```js
cd .ollama
rm -rf models
```
It may also be useful to clear out your Apptainer cache:
```js
apptainer cache clear
```
Next, create a new directory in a location with a larger storage quota (i.e. storage space for your lab):
```js
cd ~
# example path
cd /gscratch/lab-name/my-directory
mkdir ollama
cd ollama
mkdir models # this will be your new storage directory
```
Next, go back to your home directory and set up a symbolic link to the new `models` directory you created:
```js
cd ~
cd .ollama
ln -s /gscratch/lab-name/my-directory/ollama/models models
ls -s
```
You should see `models` highlighted in light blue with an arrow pointing to the path to the new `models` directory you created. New ollama models will save here instead of `.ollama/models` so your home directory stays under the 10GB limit.
