---
title: Using Ollama on Hyak
---

## What Are Ollama LLMs?

Ollama LLMs are large language models (LLMs) developed by Ollama. LLMs are artificial intelligence systems that understand human language. Ollama LLMs can run locally on your device and do not require constant internet connection to cloud-based servers that other LLMs may require. Because they generally require root access for installation on Hyak, it is recommended that Ollama LLMs are used through NVIDIA containers. To get started with Ollama on Hyak, you will need to be accustomed with [**Apptainer**](https://hyak.uw.edu/docs/guides/software/containers#apptainer-formerly-singularity) and [**requesting GPU jobs**](https://hyak.uw.edu/docs/tutorials/slurm/jobs#requesting-gpus-from-a-gpu-partition). 

## Installing Ollama as a Container

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

Note that the more resources you request may increase the wait times to get your requested resources. It can be useful to convert the `salloc` flags above into `#SBATCH` directives in a executable bash ([**sbatch**](https://hyak.uw.edu/docs/tutorials/slurm/jobs#batch-jobs)) script along with the commands you want Ollama to execute when anticipated wait times are long. Additional information on requesting a GPU job can be found [**HERE**](https://hyak.uw.edu/docs/tutorials/slurm/jobs#requesting-gpus-from-checkpoint). 
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

## Installing Ollama with Miniforge3

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

## Managing Your Ollama Storage

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
