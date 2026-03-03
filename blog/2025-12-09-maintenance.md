---
slug: 2025-december-maintenance
title: December 2025 Maintenance Update
author: Kristen Finch
author_title: Director of Research Computing Solutions
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,hours,help,events]
---

During this month’s maintenance window, we conducted routine security updates and performed hardware consolidation in the Data Center. The next maintenance is scheduled for **Tuesday, January 13, 2025** (the second Tuesday of the month).

### Notable Updates
* **Node image updates** – Routine updates and security patches. 
* We also installed new modules: 
    * gcc/15.2.0
    * conda/Miniforge3-25.9.1-0 (read more below)

### New Feature: Conda Module Now Available on Hyak Klone

This month, we’re excited to announce that the **Conda module is now available on Hyak Klone**. Previously offered only on Tillicum, the module has now passed testing on Klone and is ready for full use. ***We highly recommend it as the primary way to manage Python environments on Hyak Klone*** due to its simplicity, reliability, and improved storage efficiency.

Using the Conda module means:
* No miniconda installation required. Just load the module and start creating environments.
* More efficient storage usage, leading to fewer issues with home directory quota limits.
* Cleaner, isolated Python environments, easier debugging, reproducibility, and environment cleanup.

Below is a quick guide to help you get started.

### Conda Environments

Conda allows you to create isolated environments that include specific versions of Python, libraries, and tools. 

#### Load Conda Module

First, load the Conda module:

```js
# remember on Klone, module commands are only available on compute nodes
module load conda
```

After loading the module, the `conda` command becomes available. You can now create and manage your own environments.

#### Create and Manage Conda Environments

For example, create an environment named "myenv" with Python 3.12 and the NumPy package:

```js
conda create --name myenv python=3.12 numpy
```

Activate the environment to use it:

```js
conda activate myenv
```

List your available Conda environments:

```js
conda env list
```

Remove an environment:

```js
conda env remove --name myenv
```

To install additional packages in `myenv` environment, use `conda install`. Conda has several default channels that will be used first for package installation. If you want to use another channel beyond the defaults channel, you can, but we suggest that you select your channel carefully.

:::warning
By default, the system Conda stores environments in your home directory (`$HOME/.conda/envs`). We recommend installing Conda environments to your **project directory** under `/gscratch/<group>/<myfolder>` due to the limited storage space (10 GB) in your home directory. **Please apply the steps by following the instructions below carefully.**
:::

#### Customize Environment and Package Locations

There are two ways to specify where your Conda environments and packages are stored.

##### Option 1. Use `--prefix` for explicit paths

Manually set the path to your Conda environment by `--prefix` and always activate your Conda environment with full path.

```js
module load conda
conda create --prefix /gscratch/<myproject>/<myfolder>/myenv python=3.12
conda activate /gscratch/<myproject>/<myfolder>/myenv
conda install numpy scipy matplotlib
```

##### Option 2. Configure defaults in `$HOME/.condarc`

To make this the default behavior, edit (or create) the file `$HOME/.condarc`:

```yaml
envs_dirs:
  - /gscratch/<myproject>/<myfolder>/conda/envs
pkgs_dirs:
  - /gscratch/<myproject>/<myfolder>/conda/pkgs
```

This will place all of your environments and package caches in this directory by default, and you won't have to worry about specifying the full prefix to your environment when installing it or activating it.

#### Installing Packages with `pip`

You can use `pip` inside a Conda environment to install Python packages. Our suggested use of pip is inside a conda environment. For example:

```js
module load conda
conda activate myenv
pip install seaborn
```

This ensures that `pip` installs packages into the active Conda environment — **not globally** — making it easy to clean up completely when you are done.

See the [<ins>**best practices**</ins>](https://www.anaconda.com/blog/using-pip-in-a-conda-environment) from Anaconda for using `pip` with Conda and [<ins>**pip documentation**</ins>](https://pip.pypa.io/en/stable/cli/pip_install/) for more information.

### [<ins>**New Tutorials Now Available**</ins>](https://hyak.uw.edu/learn)
This fall, our training sessions focused primarily on [<ins>**Tillicum**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036077), our new GPU-accelerated service. However, the core skills and workflows we covered apply equally well to Hyak Klone. With only minor adjustments to file paths or partitions, Klone users can benefit directly from these materials because the overall computing environments are very similar and the tools (modules, Slurm, containers, Python workflows, data management) work the same across both systems. We will offer more Hyak Klone trainings in 2026. 
* [<ins>**Tillicum Onboarding Tutorial**</ins>](https://github.com/UWrc/tillicum-onboarding)
* [<ins>**Tillicum Slurm Tutorial**</ins>](https://github.com/UWrc/tillicum-slurm)
* [<ins>**Tillicum Containers Tutorial**</ins>](https://github.com/UWrc/tillicum-containers) 
* [<ins>**Fine-tuning LLMs on Tillicum**</ins>](https://github.com/josecols/ft-llms-tillicum)
* [<ins>**Docker Containers Workshop**</ins>](https://github.com/UWrc/docker-tutorial) 

Stay informed by subscribing to our [<ins>**mailing list**</ins>](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) and the [<ins>**UWIT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

### Office Hours 
* **No office hours: 12/24/2025, 12/25/2025, 12/31/2025, or 1/1/2026**
* **Hyak and Tillicum Office Hours:**
    * Wednesdays at 2pm on **Zoom**. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email. [<ins>**Click here to Register for Wednesday Zoom Office Hours**</ins>](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu).
    * Thursdays at 2pm **in person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).
* **Winter AWS Office hours** – AWS solutions architects will be on Zoom to answer your questions and help you troubleshoot. 
    * [<ins>**Tuesday January 20, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249437)
    * [<ins>**Thursday February 12, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249438)
    * [<ins>**Thursday March 12, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249439)
* See our office hours schedule, subscribe to event updates, and bookmark our [<ins>**UWIT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

### External Training Opportunities

* The **NSF LEVEL UP AI** (Launching an Educational Vision to Expand Leadership, Understanding, and Progress in Artificial Intelligence) project brings together educators, researchers, and professionals across the computing community to build a shared vision for expanding capacity and access to AI education. 01/07/26 - 12:00 AM to 01/08/26 - 11:59 PM EST [<ins>**Learn more and register.**</ins>](https://cra.org/level-up-ai/)
* [<ins>**2 Postdoc positions in AI with deadlines arriving soon**</ins>](https://cosmicai.org/jobs/cosmicai-postdoctoral-fellow).
* The eScience Institute offers the annual Winter School to students and lecturers interested in developing basic skills and knowledge of the tools used in data science. Gaining literacy in topics such as Python, R, Jupyter, and reproducible environments can be beneficial beyond STEM, including areas like global or public health, public policy, social sciences, social work, international relations, and business management. There are no prerequisites to take this course and there is no credit offered. Only UW faculty, staff, students (undergraduates and graduates) from all three campuses are [<ins>**welcome to apply**</ins>](https://escience.washington.edu/data-science-learning/data-science-at-uw/winter-school/). Deadline to apply: February 4th, 2026.

Having trouble? [<ins>**Get Research Computing support**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3).  

Happy Computing, 

Hyak Team
