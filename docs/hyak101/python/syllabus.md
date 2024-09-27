---
id: syllabus
title: Syllabus
---

### Goals & Rationale

#### Our first goal is to provide a tutorial that connects many Hyak foundational skills so that researchers can learn and customize these tools to fit their needs.
The Hyak documentation already includes many of the instructions in this guide, but they're atomic. Instead of individual instruction sets, which aren't designed with each other in mind, everything in this guide is connected - python environments, jupyter notebook server, and connections to other external software. That means, for example, the SSH customizations *in this guide* will apply only to the container runscripts we build *in this guide*; to use these elements for other workflows, you will need to customize them to fit your needs. 

#### Our second goal is to eliminate the most common problem on Hyak: conda's decimation of file quotas.
The [**conda**](https://docs.conda.io/en/latest/) ecosystem is a powerful resource for researchers, and unsurprisingly
it is among the most commonly-used pieces of software on the cluster. One of the things conda does—whether you're building
lean with [**Miniconda**](https://docs.conda.io/en/latest/miniconda.html) or with [**Anaconda**](https://www.anaconda.com/)—is create tens of thousands of files.

Due to the way GPFS (the technology behind our shared filesystems) handles [**inodes**](https://en.wikipedia.org/wiki/Inode), we have cautious quotas on the number of files
individuals and groups are allowed to create. Home directories are limited to 256,000 files, which may seem large, but almost
every day we answer a ticket where conda has busted a quota. Due to the integral nature of home directories on Linux, this
means most things just won't work until the user clears up some files.

This guide takes a different approach. We're not going to use 1,000 files, 10,000 files or 100,000 files for conda, we're going to use *one*: an Apptainer overlay.

#### Our third goal is to demystify containers enough that they're the default choice for our researchers.
One of the most common questions we answer, especially from new HPC users, is "how do I install this piece of software?" When you use a search engine to answer that question, the results mostly require elevated privileges—`sudo`, on our systems—which we won't grant under any circumstances for a variety of reasons. We're going to answer a more precise question, "how do I install this piece of software *on Hyak*?":
the simplest way, most of the time, is to use a container. Here, we're going to build something general-purpose that, if it doesn't already meet your needs, we encourage you to modify it to meet your needs.

:::tip PRO TIP

As you go through the tutorial look for tips like this one. In these boxes, we will include bits of information you might be able to use to customize this tutorial when you feel comfortable. 

On that note, your first PRO TIP: Untangling tech jargon is tough, and there's no shortage of essays explaining containers and "container-ization" ([**See Additional Resources**](https://hyak.uw.edu/docs/hyak101/python/setup#additional-resources)). We encourage you to educate yourself about containers and other relevant topics as additional learning to accompany this tutorial. 

:::

#### A mental model for best practices.
Using a high-performance computing cluster the *Right Way* is a unique skillset, and the best practices you've learned on one cluster aren't necessarily correct on others. We're hoping that a walkthrough like this—which covers installing and connecting to your software in reusable, reproducible environments—will help cement some of the best practices for *Hyak*, and make building a workflow a bit quicker.

### Course Description

We are going to create a general-purpose, customizable Apptainer container to use on the Klone Hyak cluster for the following tasks:

1. Installing Conda in a mutable container overlay.
1. Starting & connecting to a Jupyter Notebook server.
1. Running Slurm & custom Hyak commands.

### Course Content

:::caution check your OS
Be advised that we have broken the tutorial into separate instructions for Mac/Linux and Windows users. The same content is covered, but with different steps. 
:::

TODO- FIX WITH NEW LAYOUT

1. [**Getting Started**](https://hyak.uw.edu/docs/hyak101/python/setup):
   - Prerequisites
   - Selecting your Working Directory
   - Initial Set Up vs. Start Up Sequence
   - Additional Resources

1. [**Building a Container**](https://hyak.uw.edu/docs/hyak101/python/container):
   - [The briefest introduction to containers](https://hyak.uw.edu/docs/hyak101/python/container#the-briefest-introduction-to-containers),
   - [Our general-purpose container definition](https://hyak.uw.edu/docs/hyak101/python/container#our-general-purpose-container-definition),
   - [Building containers on Hyak](https://hyak.uw.edu/docs/hyak101/python/container#building-containers-on-hyak).

1. [**Flexible Connections**](https://hyak.uw.edu/docs/hyak101/python/ssh):
   - [Spending some time on SSH](https://hyak.uw.edu/docs/hyak101/python/ssh#spending-some-time-on-ssh),
   - [Your configuration on the cluster](https://hyak.uw.edu/docs/hyak101/python/ssh#your-configuration-on-the-cluster),
   - [A set of customized, local configurations](https://hyak.uw.edu/docs/hyak101/python/ssh#a-set-of-customized-local-configurations).

1. [**Working in the Overlay**](https://hyak.uw.edu/docs/hyak101/python/overlay):
   - [Creating a mutable overlay](https://hyak.uw.edu/docs/hyak101/python/overlay#creating-a-mutable-overlay),
   - [A direct line to the node](https://hyak.uw.edu/docs/hyak101/python/overlay#a-direct-line-to-the-node),
   - [Installing Miniconda](https://hyak.uw.edu/docs/hyak101/python/overlay#installing-miniconda),
   - [Configuring Jupyter](https://hyak.uw.edu/docs/hyak101/python/overlay#configuring-jupyter).

1. [**Interactivity & Jobs**](https://hyak.uw.edu/docs/hyak101/python/jobs):
   - [Open up Jupyter](https://hyak.uw.edu/docs/hyak101/python/jobs#open-up-jupyter),
   - [Using Conda and Slurm](https://hyak.uw.edu/docs/hyak101/python/jobs#using-conda-and-slurm),
   - [Connect with VSCode](https://hyak.uw.edu/docs/hyak101/python/jobs#connect-with-vscode).

:::info Acknowledgements
Special thanks goes out to the researchers who volunteered their time to provide feedback and testing for these instructions.
Collaboration makes writing these sorts of how-to's much quicker: explaining "how" is easier when we know "what."
:::