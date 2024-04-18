---
id: nvidia_ngc
title: GPUs and NVIDIA NGC Containers
---

In the Containers section, you learned the multiple ways in which containers can be used. In this section we will cover [NGC (NVIDIA GPU Cloud) containers](https://catalog.ngc.nvidia.com/) that are performance-optimized, tested, and ready to deploy on GPU.

Researchers can leverage GPU acceleration to train large-scale language models, enabling more efficient processing of textual datasets and advancing tasks like text generation and sentiment analysis. GPUs play a pivotal role in accelerating training and inference tasks for deep learning models, from computer vision to speech recognition, empowering researchers to tackle complex problems with unprecedented speed and scalability. GPUs accelerate compute-intensive tasks like molecular dynamics simulations or climate modeling. GPU code acceleration offers unparalleled performance and scalability for researchers across disciplines.

We encourage you to check out what containers are available within NGC, as in this page we will only cover a couple that get you started with using the GPU.

### Example container workloads
Below we will walk through examples of how to use two of the many containers available in NGC. We will cover using the HPC (Software Develpment Kit) SDK in a couple different forms. Other examples of containers you could explore on your own include:


- [NVIDIA RAPIDS](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/rapidsai/containers/rapidsai): [ RAPIDS](https://rapids.ai/) is a platform for end-to-end data science and analytics pipelines entirely on GPUs. RAPIDS contains GPU accelerated versions of popular Python libraries like [cuDF](https://github.com/rapidsai/cudf) for Pandas and [cuML](https://github.com/rapidsai/cuml) for scikit-learn.


- [NVIDIA Holoscan](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/clara-holoscan/containers/holoscan): [Holoscan](https://github.com/nvidia-holoscan) is a platform for AI sensor processing focusing on low-latency sensor and network connectivity, optimized libraries for data processing and AI, and core microservices to run streaming, imaging, and other applications.

- [Open Hackathons GPU Bootcamp](https://github.com/openhackathons-org/):
Another great place to get started with tools that are in the HPC SDK and in the broader GPU software stack is through the [GPU Bootcamp](https://github.com/openhackathons-org/gpubootcamp/tree/master/). This page details how to get started with Apptainer containers for HPC and AI. It has examples in Python, C++, using OpenACC directives, and also a miniprofiler. 

### Pre-requisites

Please refer to the [Apptainer and Docker](/docs/tools/containers.md) for information on getting started with Apptainer and getting access to NGC.

Get a summary of all the GPUs on the cluster and their current state. This will be helpful when requesting an interactive session on a GPU for the exercises below. 
```bash
sinfo -p ckpt -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
```

### NVIDIA HPC SDK 
The [HPC SDK](https://developer.nvidia.com/hpc-sdk) houses compilers, libraries, and software tools that are most commonly used when working on HPC applications. Below we will demostrate how to get started with this container. We will show how [standard parallelization](https://developer.nvidia.com/blog/accelerating-standard-c-with-gpus-using-stdpar/) is achieved with a mini app [LULESH](https://github.com/LLNL/LULESH) for hydrodynamics.

1. Get an interactive session on a GPU instance using some variant of the below command.

```bash
salloc -A mygroup -p ckpt --gpus-per-node=a40:1 --mem=10G --time=1:00:00 --job-name=LULESH_testing
```

2. Run container, with LULESH code available. To do so we must first clone the LULESH repo, and then mount it in our container.

```bash
git clone --branch 2.0.2-dev https://github.com/LLNL/LULESH.git

apptainer shell --nv -B LULESH:/source --pwd /source docker://nvcr.io/nvidia/nvhpc:23.1-devel-cuda12.0-ubuntu20.04

cd stdpar/build
make run
```

You can try out the other features included in the HPC SDK. This includes our profiling tools like [Nsight systems](https://developer.nvidia.com/nsight-systems) and the [NVCC](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/) compiler for CUDA codes. The HPC SDK should be your one stop shop for getting started with GPU accelerating your workloads.

### Gromacs

1. Get an interactive session on a GPU instance using some variant of the below command.

```bash
salloc -A mygroup -p ckpt --gpus-per-node=a40:1 --mem=10G --time=1:00:00 --job-name=gromacs_testing
```

2. Get the example data, or use your own if you already are using GROMACS

```bash
DATA_SET=water_GMX50_bare
wget -c https://ftp.gromacs.org/pub/benchmarks/${DATA_SET}.tar.gz
tar xf ${DATA_SET}.tar.gz
cd ./water-cut1.0_GMX50_bare/1536
```

3. Run container, with data available

```bash
apptainer run --nv -B ${PWD}:/host_pwd --pwd /host_pwd docker://nvcr.io/hpc/gromacs:2022.3 gmx grompp -f pme.mdp
```