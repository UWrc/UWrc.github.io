---
id: syllabus_slurm
title: Syllabus
---

:::caution

This documentation is under construction.

:::

### Goals & Rationale

#### The main objective of this tutorial is to dimystify job submission and help researchers efficiently use HYAK's computing resources for their research.

Much of the HYAK documentation is organized into bite sized instructional guides for particular software tools or concepts, but these may be too advanced for users who are brand new to High Performance Computing (HPC) and and haven't used a job scheduler before. Here we have prepared a walk-through tutorial SLURM commands so that you can feel comfortable working independently on HYAK and tailoring tools and scripts to the needs of your research project. The advanced section of this tutorial offers a worked examples with publicly available data for submitting interactive, single, and array jobs with SLURM (i.e., submitting multiple jobs to be performed in parallel).

#### Our ultimate goal is to prepare you as an independent user of HYAK. 

:::note Hyak's Job Scheduler - SLURM
**SLURM**: The job scheduler used on HYAK. SLURM stands for **S**imple **L**inux **U**tility (for) **R**esource **M**anagement. See "Scheduler" on this page to learn what a scheduler is. See [**SLURM documentation**](https://slurm.schedmd.com/man_index.html) for detailed help using the job scheduler.
::: 

### Learning Objectives
* Understand the benefits of parallel computing and scheduling jobs.
* Understand how accounts and partitions determine research computing access, and the purpose and useage of the `hyakalloc` command. 
* Understand the concept of community idle resources and the checkpoint partitions (`ckpt`, `ckpt-g2`, `ckpt-all`).
* Become familiar with job types and job submission, including requesting GPU jobs. 
* Master monitoring the job queue.

:::tip PRO TIP
As you go through the tutorial look for tips like this one. In these boxes, we will include bits of information you might be able to use to customize this tutorial into a workflow when you feel comfortable. 
:::

### Course Content

Tutorial: SLURM
* [**Syllabus**](https://hyak.uw.edu/docs/hyak101/basics/syllabus_slurm)
* [**Scheduling Jobs**](https://hyak.uw.edu/docs/hyak101/basics/jobs)
* [**Job Arrays**](https://hyak.uw.edu/docs/hyak101/basics/arrays)
* Advanced SLURM
    * [**Locator Neural Network**](https://hyak.uw.edu/docs/hyak101/basics/advanced)
    * [**Interactive and Batch Jobs**](https://hyak.uw.edu/docs/hyak101/basics/nn_batch)
    * [**Parallel Computing**](https://hyak.uw.edu/docs/hyak101/basics/nn_array)
    * [**Parameter Sweep**](https://hyak.uw.edu/docs/hyak101/basics/nn_bash)

### Extra Practice

We have curated a list of [**Additional Resources**](https://hyak.uw.edu/docs/resources) and you will find many are relevant for this tutorial. 

:::info Acknowledgements
In the advanced sections of this tutorial we use publicly available data and software. 

Locator Neural Network is a copyright 2019 of C. J. Battey and released under a Non-Profit Open Software License 3.0 (NPOSL-3.0). 
* [**Locator publication**](https://elifesciences.org/articles/54507) Battey et al. 2020.
* [**Locator GitHub Repository**](https://github.com/kr-colab/locator.git) C. J. Battey and University of Oregon.
* [**Repository for the Dockerfile for Locator NN**](https://github.com/finchnSNPs/Docker_kr-colab_locator) Kristen Finch (Hyak Staff Scientist).
* [**DockerHub Repository for the Locator NN container**](https://hub.docker.com/repository/docker/finchnsnps/locator/general) Kristen Finch (Hyak Staff Scientist).

Our adaptation of *Populus trichocarpa* genotype data and locations are licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication license.
* [***Populus trichocarpa*** **Paper**](https://doi.org/10.1111/1755-0998.12056) Geraldes et al. 2013.
* [**Original genotyping results available on DRYAD**](https://doi.org/10.5061/dryad.1051d) Geraldes et al. 2013.
:::