---
id: background
title: Introduction
---


### Hyak Software Usage Policy

Hyak is a shared research environment with a baseline software setup to serve the majority of users and some pre-installed modules for commonly used tools. Researchers do not have root or sudo access to ensure system security and stability. Researchers must install, manage, and maintain any additional software required for their projects, ensuring reproducibility of their research. Support is available through the Hyak help desk and ticketing system, along with documentation for guidance. Click here for more information about Hyak’s Software Usage Policy.  

### What is a Container?


Containers are isolated software environments containing an application and all of its dependencies and runtime settings. Containers are a useful tool for running software on Hyak as most users do not have the privilages to directly download new software. An operating system also has a fixed kernal space and user space configuration. This makes it difficult to install software that has incompatible distributions of these components. With containers, the user space is independent of the operating system your system runs underneath. This is referring to Linux distributions (distros) which can often be incompatible with software you may want to download. For example, a system running RHEL cannot directly download Ubuntu software due to incompatible user spaces. Addtionally, because containers share the host OS kernel, they are also very lightweight and efficient. Containers are also useful for downloading different versions of the same software. This is particuarly useful if you need to reproduce previous work or you want to use older features that are unavailable in newer versions.

:::note System Memory: user space vs kernal space

System memory is divided into two parts: the user space and the kernal space. 

**User Space**: The space where all user processes (applications, libraries, utilities, etc) run. All code outside the kernal is executed here.

**Kernel Space**: The kernal of a linux OS is run in kernal space. The kernal is the core of the OS. Device drivers also run here. 
:::


### Containers on Hyak


:::note Relevant Vocabulary for this section

**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like `klone`.

**Apptainer Definition File**: a recipe file for an Apptainer container which contains install instructions for software to be containerized. The file extension for an Apptainer definition file is `.def`.

:::

The container program `Klone` uses is called Apptainer. Apptainer uses a SIF container format. SIF stands for Singularity Image Format and is essentially a compressed [SquashFS](https://hyak.uw.edu/docs/tools/squashfs) filesystem. This means that all containers on Apptainer act as a single file, making them easy to share. Apptainer also supports a sandbox format by using the `--sandbox` option. This lets users create writable directories that allow file modifications and additional software installations since SquashFS filesystems are read-only by default.

#### For more information, please refer to the Apptainer documentation [HERE](https://apptainer.org/docs/user/latest/). 

### Apptainer vs. Docker

:::note Relevant Vocabulary for this section

**Docker**: An open-source platform that automates the deployment, scaling, and management of applications through containerization, enabling consistent environments across development, testing, and production. It allows developers to package applications and their dependencies into lightweight, portable containers that can run anywhere, ensuring reliability and efficiency.

**Docker Hub**: A cloud-based registry service for storing and sharing Docker images, providing access to a vast repository of pre-built container images. It enables developers to easily find, distribute, and collaborate on containerized applications.

**Dockefile**: a recipe file for a Docker container which contains install instructions for sftware to be containerized. 

:::

Docker is a shared enviroment. Because users do not have root access, Hyak uses Apptainer instead. Luckily, Apptainer can convert Docker containers into Apptainer containers so you can still run public Docker Hub containers. Apptainer containers are often used in High Performance Computing because they can simulate root access with the `--fakeroot` tag to run containers as if they were being run on root. As mentioned earlier, the default container image format for Apptainer is SIF. The filesystem is mounted as a SquashFS filesystem from the image, making it, by default, read-only. The default Docker filesystem is writable. Because of this, you may need to bind the filesystem or convert the container into a sandbox to execute Docker containers that write files. 

### Container Repositories

To create a container, you need a container image. Container images can either be built from scratch or pulled from container repositories. Container repositories are registries of downloadable container images. A common repository you may come across is [Docker Hub](https://hub.docker.com/). You can pull container images from Docker Hub by using `apptainer pull docker://container-tag`. The container tags are found on the repository site. You can think of a container as a house and a container image as the blueprint. 

:::note Useful Tools
Some popular tools that have docker containers are:

1. [python](https://hub.docker.com/_/python)
2. [ubuntu](https://hub.docker.com/_/ubuntu)
3. [R](https://hub.docker.com/r/rocker/rstudio)
4. [tensorflow](https://hub.docker.com/r/tensorflow/tensorflow)
5. [pytorch](https://hub.docker.com/r/pytorch/pytorch)
:::

[NVIDIA NGC](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=) is a repository for containers with various GPU software packaged inside. You can also download [tensorflow](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/l4t-tensorflow) and [pytorch](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch) via NVIDIA. Other container repositories include [Biocontainers](https://biocontainers.pro/registry) for bioinformatics based containers, and native Apptainer containers at [Sylabs.io](https://cloud.sylabs.io/library). More information regarding other container repositories can be found [HERE](https://hyak.uw.edu/docs/tools/containers/). 