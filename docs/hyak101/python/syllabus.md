---
id: syllabus
title: Syllabus
---

:::tip

This isn't merely an overview. There won't be a quiz; but if you open a ticket & the answer is on the syllabus, expect a pinch of snark when we quote this page with a link.

:::

## Prerequisites

You must be able to access the Klone Hyak cluster. If you don't already have an account, [start here](https://hyak.uw.edu/docs/join-group).

These instructions have been tested on MacOS and Linux.
If you are a Windows user, cluster-side instructions are the same, but not all the client-side instructions will apply.
We are working on the Windows instructions, and will update the hyak-users mailing list when they're complete.

:::note

Parts of this guide will be challenging for novices.
There is a small amount of Bash programming involved, and while most can be copy & pasted, you may run into difficulties
if you need to make modifications.

:::

## Course Description

We are going to create a general-purpose, customizable Apptainer container to use on the Klone Hyak cluster for the following tasks:

1. Installing Conda in a mutable overlay.
1. Starting & connecting to JupyterLab or a Jupyter Notebook server.
1. Running Slurm & custom Hyak commands.

## Goals & Rationale

#### Our first goal is to help Hyak researchers start researching quicker.
The Hyak documentation already includes many of the instructions in this guide, but they're atomic.
Instead of individual instruction sets, which aren't designed with each other in mind, everything in this guide is connected.
That means, for example, the SSH customizations *in this guide* will apply directly to the container runscripts we build *in this guide*.

#### Our second goal is to eliminate the most common problem on Hyak: conda's decimation of file quotas.
The [conda](https://docs.conda.io/en/latest/) ecosystem is a powerful resource for researchers, and unsurprisingly
it is among the most commonly-used pieces of software on the cluster. One of the things conda does—whether you're building
lean with [Miniconda](https://docs.conda.io/en/latest/miniconda.html) or including the [kitchen sink](https://en.wiktionary.org/wiki/kitchen_sink) with [Anaconda](https://www.anaconda.com/)—is create tens of thousands of files.

Due to the way GPFS (the technology behind our shared filesystems) handles [inodes](https://en.wikipedia.org/wiki/Inode), we have cautious quotas on the number of files
individuals and groups are allowed to create. Home directories are limited to 256,000 files, which may seem large, but almost
every day we answer a ticket where conda has busted a quota. Due to the integral nature of home directories on Linux, this
means most things just won't work until the user clears up some files.

This guide takes a different approach. We're not going to use 1,000 files, 10,000 files or 100,000 files for conda, we're going to use *one*: an Apptainer overlay.

#### Our third goal is to demystify containers enough that they're the default choice.
Untangling tech jargon is tough, and there's no shortage of essays explaining containers and "container-ization".
Don't worry: we're not going to try and replicate that work here.
Instead, we're going to build something general-purpose that, if it doesn't already meet your needs, you'll feel comfortable modifying so it does.

One of the most common questions we answer, especially from new HPC users, is "how do I install this piece of software?"
When you use a search engine to answer that question, the results mostly require elevated privileges—`sudo`, on our systems—which we won't grant for a variety of reasons. We're going to answer a more precise question, "how do I install this piece of software *on Hyak*?":
the simplest way, most of the time, is to use a container.

#### A mental model for best practices.
Using a high-performance computing cluster the *Right Way™* is a unique skillset,
and the best practices you've learned on one cluster aren't necessarily correct on others.
We're hoping that a walkthrough like this—which covers installing and connecting to your software in reusable, reproducible environments—will
help cement some of the best practices for *Hyak*, and make building a workflow a bit quicker.

## Course Content


1. [Building a Container](https://hyak.uw.edu/docs/hyak101/python/container):
   - [The briefest introduction to containers](https://hyak.uw.edu/docs/hyak101/python/container#the-briefest-introduction-to-containers),
   - [Our general-purpose container definition](https://hyak.uw.edu/docs/hyak101/python/container/#our-general-purpose-container-definition),
   - [Building containers on Hyak](https://hyak.uw.edu/docs/hyak101/python/container/#building-containers-on-hyak).

1. [Flexible Connections](https://hyak.uw.edu/docs/hyak101/python/ssh):
   - [Spending some time on SSH](https://hyak.uw.edu/docs/hyak101/python/ssh#spending-some-time-on-ssh),
   - [Your configuration on the cluster](https://hyak.uw.edu/docs/hyak101/python/ssh#your-configuration-on-the-cluster),
   - [A set of customized, local configurations](https://hyak.uw.edu/docs/hyak101/python/ssh#a-set-of-customized-local-configurations).

1. [Working in the Overlay](https://hyak.uw.edu/docs/hyak101/python/overlay):
   - [Creating a mutable overlay](https://hyak.uw.edu/docs/hyak101/python/overlay#creating-a-mutable-overlay),
   - [A direct line to the node](https://hyak.uw.edu/docs/hyak101/python/overlay#a-direct-line-to-the-node),
   - [Installing Miniconda](https://hyak.uw.edu/docs/hyak101/python/overlay#installing-miniconda),
   - [Configuring Jupyter](https://hyak.uw.edu/docs/hyak101/python/overlay#configuring-jupyter).

1. [Interactivity & Jobs](https://hyak.uw.edu/docs/hyak101/python/jobs):
   - [Open up Jupyter](https://hyak.uw.edu/docs/hyak101/python/jobs#open-up-jupyter),
   - [Using Conda and Slurm](https://hyak.uw.edu/docs/hyak101/python/jobs#using-conda-and-slurm),
   - [Connect with VSCode](https://hyak.uw.edu/docs/hyak101/python/jobs#connect-with-vscode).

:::info Acknowledgements
Special thanks goes out to the researchers who volunteered their time to provide feedback and testing for these instructions.
Collaboration makes writing these sorts of how-to's much quicker: explaining "how" is easier when we know "what."
