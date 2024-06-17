---
id: software
title: Software on klone
---

:::note

This documentation is under construction.

:::

Tool and software are the responsibility of each individual researcher; this is important for you to ensure your own computational reproducibility. Our [**Tools & Software**](https://hyak.uw.edu/docs/tools/software) give examples for using several common tools, so here I will review the software that is necessary for your understanding of this tutorial. 

:::note Relevant Vocabulary

**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like `klone`.

**Apptainer Definition File**: a recipe file for an Apptainer container which contains install instructions for sftware to be containerized. The file extension for an Apptainer definition file is `.def`.

**Containers**: Containers are lightweight, isolated software environments that encapsulate an application, along with its dependencies and runtime settings. Containers are useful because they provide a consistent and reproducible way to package, distribute, and run software across different computing environments.

**Docker**: An open-source platform that automates the deployment, scaling, and management of applications through containerization, enabling consistent environments across development, testing, and production. It allows developers to package applications and their dependencies into lightweight, portable containers that can run anywhere, ensuring reliability and efficiency.

**Docker Hub**: A cloud-based registry service for storing and sharing Docker images, providing access to a vast repository of pre-built container images. It enables developers to easily find, distribute, and collaborate on containerized applications.

**Dockefile**: a recipe file for a Docker container which contains install instructions for sftware to be containerized. 

Visit our [**External Resources**](https://hyak.uw.edu/docs/resources) page to find helpful guides and videos for understanding containers.

:::

### Containers

One of the most common questions we answer, especially from new HPC users, is "how do I install this piece of software?" When you use a search engine to answer that question, the results mostly require elevated privileges—`sudo`, on our systems—which ***we won't grant under any circumstances for a variety of reasons***. When we respond to these types of Help-tickets, we're going to answer a more precise question, "how do I install this piece of software *on Hyak*?": the simplest way, most of the time, is to use a container.

As stated above, containers are lightweight, isolated software environments that encapsulate an application, along with its dependencies and runtime settings. A container is some executable code packaged up with its dependencies, and the amount of dependencies can range from a handful of libraries to an entire operating system. 

:::tip Pro Tip: Containers for Reproducible Science!
Okay, there are other ways to install software. You can install software into a directory you have access to and as long as you don't need elevanted priveldges, this will work. Additionally, you can set up a [**Module with LMOD**](https://hyak.uw.edu/docs/tools/modules) which can add convenience by bringing executables and binaries from that software into your PATH so that they can be accessed as if they were built under evelated privledges. Have at it. 

However, in our opinion, containerizing the software for your research is the best way to ensure reproducibility. You can publish you container along with your code and manuscript ensuring that your work can be reproduce no matter what operating system the user is running and ensuring dependencies and versions align with those under which your results are presented. 

It might be painful to learn something new, but it is worth it. You can do hard things. 
:::

#### Make containers from scratch with `.def` files or Docker

TODO

#### Pull an existing container from a repository

TODO

### Software for this tutorial

For this tutorial, we will be using a container I made based on a Neural Network called Locator [1](https://elifesciences.org/articles/54507). Locator is a set of python tools [2](https://github.com/kr-colab/locator.git) that build a neural network with Tensorflow to predict the location of organisms basiced on their genotype (DNA; or genetic background). The neural network is trained on genotypes from a set of organisms with known location (latitude and longitude). The network is then passed genotypes from organisms of unknown origin, and their location is predicted (latitude and longitude). Model error can be determined by calculating the distance as-the-crow-flies (Haversine) between the known and predicted locations. 

I built a container for Locator based on a python container (version 3.8-slim-buster), using a `Dockerfile` [3](https://github.com/finchnSNPs/Docker_kr-colab_locator) on my local computer, and following the Locator installation instructions. Next a pushed the container to Docker Hub [4](https://hub.docker.com/repository/docker/finchnsnps/locator/general). I pulled it to `klone` with the following command: 

```bash
# Code for reference. No need to run this now. 
apptainer pull locator.sif docker://finchnsnps/locator:locator_v2
```

#### Copying materials for this tutorial. 

TODO


### Literture Cited

1. [**Locator publication**](https://elifesciences.org/articles/54507) (Battey et al. 2020). 
2. [**Locator GitHub Repository**](https://github.com/kr-colab/locator.git) University of Oregon
3. [**Repository for the author's Dockerfile for Locator NN**](https://github.com/finchnSNPs/Docker_kr-colab_locator) 
4. [**Docker Hub Repository for the author's Locator NN container**](https://hub.docker.com/repository/docker/finchnsnps/locator/general)