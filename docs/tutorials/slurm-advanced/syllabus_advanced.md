---
title: Syllabus
pagination_next: tutorials/slurm-advanced/advanced
---

:::caution
Advanced Slurm builds upon modules presented in the following tutorials. We recommend you review the skills presented before proceeding.

1. [**Hyak Basics**](https://hyak.uw.edu/docs/tutorials/linux-basics)
1. [**Containers**](https://hyak.uw.edu/docs/tutorials/containers/syllabus)
1. [**Slurm**](https://hyak.uw.edu/docs/tutorials/slurm/syllabus)

:::

### Goals & Rationale

#### The main objective of this tutorial is to provide a worked example demonstrating the use of scripting with the Job Scheduler, Slurm, to execute a program from a software container

Now that you have mastered: (1) using the command line to navigate and execute commands on Hyak, (2) building and customizing containers for your computing software, (3) and requesting jobs with Slurm, you are ready to combine all of these tasks. This tutorial offers an additional worked example that utilizes a container, computes against publicly available data, and uses Slurm to submit interactive, single batch, and array jobs with Slurm (i.e., submitting multiple jobs to be performed in parallel). Additionally, the final module provides an example of how to leverage Slurm's array feature and scripting for automating research tasks.

#### Our ultimate goal is to prepare you as an independent user of Hyak

:::tip Video available

<iframe width="560" height="315" src="https://www.youtube.com/embed/Mflpj3cTMu8?si=Kiqg5tSfSDEbGNMI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

:::note Relevant Vocabulary

**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like `klone`.

**Containers**: Containers are lightweight, isolated software environments that encapsulate an application, along with its dependencies and runtime settings. Containers are useful because they provide a consistent and reproducible way to package, distribute, and run software across different computing environments.

**Docker Hub**: A cloud-based registry service for storing and sharing Docker images, providing access to a vast repository of pre-built container images. It enables developers to easily find, distribute, and collaborate on containerized applications.

A **job scheduler** is a component or software system responsible for managing and optimizing the allocation of computing resources and tasks within a distributed computing environment. It orchestrates the execution of jobs, tasks, or processes across available resources such as CPUs, memory, and storage.

**Slurm**: The job scheduler used on Hyak. Slurm stands for **S**imple **L**inux **U**tility (for) **R**esource **M**anagement. See [**Slurm documentation**](https://slurm.schedmd.com/man_index.html) for detailed help using the job scheduler.

:::

#### Why Containers?

While there are other methods to install software such as modules and specialized environments (e.g., conda and venv). In our opinion, containerizing the software for your research is the ***best way to ensure reproducibility***. A container is some executable code packaged up with its dependencies, and the amount of dependencies can range from a handful of libraries to an entire operating system. You can publish you container along with your code and manuscript ensuring that your work can be reproduce no matter what operating system the user is running and ensuring dependencies and versions align with those under which your results are presented.

Tools and software are the responsibility of each individual researcher; this is important for you to ensure your own computational reproducibility. Please click here to review our [**Software Usage Policy for Hyak Users**](https://hyak.uw.edu/docs/guides/software/modules#software-usage-policy-for-hyak-users).

### Learning Objectives

* Provide an example of a protocol utilizing a software container and Slurm.
* Demonstrate how to submit interactive and single batch jobs with Slurm.
* Demonstrate how to set up an array job where each job is executing the same command on a different input file.
* Leverage scripting to organize and automate parallel computing.

### Course Content

* [**Set Up**](https://hyak.uw.edu/docs/tutorials/slurm/advanced)
* [**Interactive and Batch Jobs**](https://hyak.uw.edu/docs/tutorials/slurm/nn_batch)
* [**Parallel Computing**](https://hyak.uw.edu/docs/tutorials/slurm/nn_array/)
* [**Parameter Sweep**](https://hyak.uw.edu/docs/tutorials/slurm/nn_sweep)

### Extra Practice

We have curated a list of [**Additional Resources**](https://hyak.uw.edu/docs/resources/resources) and you will find many are relevant for this tutorial.
