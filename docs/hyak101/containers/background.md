---
id: background
title: Introduction
---


### Hyak Software Usage Policy

Hyak is a shared research environment with a baseline software setup to serve the majority of users and some pre-installed modules for commonly used tools. Researchers do not have root or sudo access to ensure system security and stability. Researchers must install, manage, and maintain any additional software required for their projects, ensuring reproducibility of their research. Support is available through the Hyak help desk and ticketing system, along with documentation for guidance. [**Click here for more information about Hyak’s Software Usage Policy**](https://hyak.uw.edu/docs/tools/software#software-usage-policy-for-hyak-users).  

### What is a Container?


Containers are isolated software environments containing an application and all of its dependencies and runtime settings. Containers are a useful tool for running software on Hyak because for some software, installation requires privilaged user access. In addition, operating systems (OS) also have a fixed kernal space and user space configuration, making it difficult to install software that has incompatible OS requirements. 

:::note System Memory: user space vs kernal space

System memory is divided into two parts: the user space and the kernal space. 

**User Space**: The space where all users process (applications, libraries, utilities, etc) run. All code outside the kernal is executed here.

**Kernel Space**: The kernal of a Linux OS is run in kernal space. The kernal is the core of the OS. Device drivers also run here. 
:::

Specifically, the Hyak OS is Rocky Linux 8 (kernal space) and some software have distinct OS requirements. Containers allow you to use the host OS kernal but with a distinct user space. Because containers share the host OS kernel, they are also very lightweight and efficient. 

:::tip Benefits of Containers

* Containers are a lightweight, isolated software environments that encapsulates an application, along with its ***dependencie*s** and runtime settings. Containers ***avoid kernal space and user space incompatibilities*** that can inhibit proper software installation. 

* Containers are provide a ***consistent and reproducible*** way to package, distribute, and run software across different computing environments. If you are a research software developer, containers provide an extra layer of control that can help your users use your software properly and can improve their user experience. If you are a researcher using a collection of open-source or publicly developed tools, publishing your software containers with your work add a layer or ***reproducibility to your science***. If another researcher or a collaborator wants to recreate your process for their system, they now have an isolated computing environment to use the same programs ***without dependency and version headaches***. 

* Hyak users and groups have a limit on the number of files that they are allowed to store on Hyak's filesystem. Some software packages are composed of numerous files and the number of files can grow as you continue to use the package. Containers ***count as one file***, improving storage usage for individuals users and lab groups. 

* Containers are already available for many popular computing software packages. ***Developers are on board*** and recognize the benefits of containers. 

* Containers are also useful for downloading ***different versions of the same software***, which will allow you to use features from older spackage versions that may no longer be unavailable in newer versions.
:::



### Containers on Hyak


:::note Relevant Vocabulary

**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like Hyak's current generation cluster, `klone`.

**Apptainer Definition File**: a recipe file for an Apptainer container which contains install instructions for software to be containerized. The file extension for an Apptainer definition file is `.def`.

:::

The container program `klone` uses is called Apptainer. Apptainer uses a SIF container format. SIF stands for **S**ingularity **I**mage **F**ormat and is essentially a compressed [**SquashFS**](https://hyak.uw.edu/docs/tools/squashfs) filesystem. This means that all containers on Apptainer act as a single file, making them easy to share. Apptainer also supports a sandbox format by using the `--sandbox` option (discussed later), which lets users create writable directories that allow file modifications and additional software installations since SquashFS filesystems are read-only by default.

#### For more information, please refer to the Apptainer documentation [HERE](https://apptainer.org/docs/user/latest/). 

### Apptainer vs. Docker

:::note Relevant Vocabulary

**Docker**: An open-source platform that automates the deployment, scaling, and management of applications through containerization, enabling consistent environments across development, testing, and production. It allows developers to package applications and their dependencies into lightweight, portable containers that can run anywhere, ensuring reliability and efficiency.

**Docker Hub**: A cloud-based registry service for storing and sharing Docker images, providing access to a vast repository of pre-built container images. It enables developers to easily find, distribute, and collaborate on containerized applications.

**Dockefile**: a recipe file for a Docker container which contains install instructions for sftware to be containerized. 

:::

If you have heard of containers before starting this tutorial, you have likely heard about them in the context of Docker containers. Docker is another container program, but it requires users to have root access to build writable containers. Under Hyak's shared computing environment, users are not given root access and Apptainer on Hyak allows users to build containers with the `--fakeroot` tag simulating root access and resulting in a read-only container and filesystem. Apptainer is often used in High Performance Computing (HPC) because it allows users to install with simulated root access (`fakeroot`) in the shared computing environment. 

Hyak users may find it useful to use Docker to build containers on their local computer, upload them to Docker Hub, and download and convert them to Apptainer containers for use on Hyak. Apptainer performs this conversion, allowing Docker containers to be run on Hyak. Docker Hub is a great resource for publishing containers. Using Docker is a skill unto itself and outside of the scope of this tutorial. Docker is not loaded on Hyak. 

### Read-only filesystem

Apptainer containers are by default read-only. This means that under default parameters you cannot store files within the container and the container is isolated so that it cannot access any files from outside the container. During this tutorial we will provide exercises to demonstrate the read-only filesystem of containers and methods to allow the container to access you files on Hyak (i.e., using `--bind /gscratch/`) and to manipulate files stored within the container (`--sandbox`).

### Container Repositories

To create a container, you need a container image. Container images can either be built or pulled from container repositories. Container repositories are registries of downloadable container images. A common repository you may come across is [**Docker Hub**](https://hub.docker.com/). You can pull container images from Docker Hub by using `apptainer pull docker://publisher/container-tag`. The container publishers and tags are found on the repository site. You can think of a container as a house and a container image as the blueprint. 

:::note Useful Tools
Some popular tools that have Docker containers are:

1. [**python**](https://hub.docker.com/_/python)
2. [**ubuntu**](https://hub.docker.com/_/ubuntu)
3. [**R**](https://hub.docker.com/r/rocker/rstudio)
4. [**tensorflow**](https://hub.docker.com/r/tensorflow/tensorflow)
5. [**pytorch**](https://hub.docker.com/r/pytorch/pytorch)
:::

In addition to Docker Hub, the [**NVIDIA NGC**](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=) is a repository for containers with various GPU software packaged inside. You can also download [**tensorflow**](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/l4t-tensorflow) and [**pytorch**](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch) containers from NVIDIA. Other container repositories include [**Biocontainers**](https://biocontainers.pro/registry) for bioinformatics and other life science software containers, and native Apptainer containers at [**Sylabs.io**](https://cloud.sylabs.io/library). More information regarding other container repositories can be found [**HERE**](https://hyak.uw.edu/docs/tools/containers/). 

In the next section, we will practice pulling pre-built containers from Docker Hub.