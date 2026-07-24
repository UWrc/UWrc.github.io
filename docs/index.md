---
id: index
title: UW Research Computing Documentation
sidebar_label: Home
slug: /
sidebar_position: 0
---

# Welcome

UW Research Computing operates two primary computing systems: **Hyak Klone**, a traditional shared HPC cluster, and **Tillicum**, a pay-as-you-go GPU cluster, as well as research storage systems Kopah S3 Storage and Lolo Data Archive. Each has unique characteristics, access models, and dedicated documentation sections. Topics that apply across systems - such as data transfer, tools, and storage - are broken out into their own sections rather than duplicated under each cluster.

## Computing Systems

### Hyak Klone

Hyak Klone is UW's traditional shared HPC cluster, operating on a condo model where research groups contribute resources to a shared pool. It supports a wide range of workloads including CPU-intensive computation, moderate GPU work, and large-scale parallel jobs.

- **[Hyak Klone architecture](/docs/systems/klone/architecture)**
- **[Hyak Klone details and pricing](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035560)**

### Tillicum

Tillicum is a pay-as-you-go GPU cluster featuring NVIDIA H200 GPUs, designed for AI and GPU-intensive research workloads. Unlike Klone's condo model, Tillicum uses a usage-based billing approach with no upfront resource contribution required.

- **[Tillicum architecture](/docs/systems/tillicum/architecture)**
- **[Tillicum details and pricing](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036077)**

## New to HPC? Start Here

If you have never used Hyak Klone, Tillicum, or any HPC system before, we recommend starting with **Open OnDemand (OOD)**. OOD provides a graphical, web-based interface to the Hyak Klone and Tillicum clusters that lets you run jobs, manage files, and launch popular graphical applications (Jupyter Notebook, VS Code, RStudio, etc.) with minimal command-line experience.

Starting with OOD gives you a working environment right away. As you get comfortable, you can develop command-line skills at your own pace.

**[Get started with Open OnDemand](/docs/guides/ood/getting-started)**

## Ready to Learn the Command Line?

Working from the command line unlocks more streamlined processes and production workflows on the cluster. These tutorials introduce the Linux filesystem, walk you through essential commands, and give you hands-on practice to build confidence.

- **[Linux Fundamentals Tutorial](https://github.com/UWrc/linux-fundamentals)** — Start here to learn essential command-line skills for Hyak
- **[Basic Linux Commands](/docs/tutorials/linux-basics)** — Navigating the file system, understanding storage, and everyday commands

## Helpful Pages

- **[Open OnDemand](/docs/guides/ood/getting-started)** — Web-based graphical interface to Hyak Klone and Tillicum
- **[SSH & Login](/docs/getting-started/ssh-login)** — Instructions for logging in to the clusters
- **[Slurm on Klone](/docs/systems/klone/scheduling-jobs)** — Scheduling jobs on Hyak Klone
- **[Slurm on Tillicum](/docs/systems/tillicum/scheduling-jobs)** — Scheduling jobs on Tillicum
- **[Python on Hyak](/docs/guides/software/conda-python)** — Setting up and running Python workflows on the cluster
- **[Data Transfer](/docs/guides/data-transfer/scp-rsync)** — Move data to and from the clusters
- **[Kopah S3 Storage](/docs/systems/kopah/overview)** — Object storage for research data
- **[Data Commons](/docs/resources/data-commons/requirements)** — Shared datasets available cluster-wide
- **[Tools and Software](/docs/guides/software/containers)** — Software available across computing systems
- **[Tutorials and Training](/learn)** — Guided learning resources and workshops
- **[Events](https://calendar.washington.edu/sea_uwit-rc)** — Upcoming workshops, office hours, and training sessions

## Stay Connected

Sign up for the **[Hyak mailing list](https://mailman11.u.washington.edu/mailman/listinfo/hyak-users)** to receive system announcements about service issues, scheduled maintenance, and other changes.

## Getting Help

Need assistance? Email us at **[help@uw.edu](mailto:help@uw.edu)** with "Hyak" or "Tillicum" in the subject line and we'll get back to you.
