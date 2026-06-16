---
title: Interactive Apps
---

Open OnDemand provides several interactive applications that can be launched directly from the web portal. This page covers the available apps and their configurations.

## Jupyter

Jupyter is a web-based interactive computing platform that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. OOD allows users to launch notebooks on the home directory without any set-up, server configuration, or forwarding.

### Accessing Jupyter

To access Jupyter, navigate to [**Hyak OnDemand**](https://ondemand.hyak.uw.edu/) and select `Interactive Apps > Jupyter`. You will be prompted to enter information about the job you want to run.

### Custom Environments

Custom environments allow you to import external libraries like NumPy into your Jupyter notebook. There are two ways to create a custom environment for your Jupyter notebook:

#### Conda Environment

We recommend using a Miniconda environment for your Jupyter Notebook setup. Instructions for installing and setting up Miniconda on Hyak can be found [**here**](https://hyak.uw.edu/docs/guides/software/conda-python#miniconda3). Once you have created and activated your desired environment, follow these steps to connect your Jupyter Notebook to the environment.

First, install the `ipykernel` package, which provides the IPython kernel required to run Jupyter Notebooks:

```bash
(myEnv) [user@node ~]$ conda install -c anaconda ipykernel
```

Next, create a new kernel for the environment you want to use. Replace `myEnv` with the name of your environment:

```bash
(myEnv) [user@node ~]$ python -m ipykernel install --user --name=myEnv --display-name "Python (myEnv)"
```

Now, you have a new kernel that you can select from within your Jupyter notebook (`Kernel > Change Kernel`). Any packages installed in your conda environment will automatically be available to you.

:::warning
It is not recommended to install packages using `pip install` directly **inside** a Jupyter notebook (e.g., using `!pip install package-name`). This can lead to inconsistencies, conflicts, and clog your filesystem.

To properly manage packages within a Conda environment, always install packages **outside** the notebook in the terminal:

```bash
(myEnv) [user@node ~]$ conda install packageName
```

or

```bash
(myEnv) [user@node ~]$ pip install packageName
```
:::

#### Apptainer Image

Under the `Jupyter Container` section of the form, you can enter the path of a custom Apptainer image you want to use. We offer a number of pre-built Apptainer images with popular libraries and tools. If you are unfamiliar with containers, you can learn more from [**our tutorial**](https://hyak.uw.edu/docs/tutorials/containers/syllabus/).

1. Obtain the desired container from a container catalog. For example, we can use `nvcr.io/nvidia/pytorch:25.01-py3` from the [**NVIDIA catalog**](https://catalog.ngc.nvidia.com).
2. Pull the container to Hyak:

```bash
apptainer pull docker://nvcr.io/nvidia/pytorch:25.01-py3 <directory_with_large_quota>
```

If you want to make modifications to the container, you can use a definition file:

```bash
Bootstrap: docker
From: nvcr.io/nvidia/pytorch:25.01-py3

%post
    apt-get -y update
    apt-get -y install <package1> <package2> . . .
    mkdir /scr /mmfs1
    ln --symbolic /mmfs1/sw /sw
    ln --symbolic /mmfs1/data /data
    ln --symbolic /mmfs1/gscratch /gscratch
%environment
    export PATH=/usr/bin:$PATH
```

3. Obtain the resolved physical path of the container:

```bash
realpath <container_path>
```

4. Enter the path of the container in the `Jupyter Container` section of the form.

---

## VS Code

Visual Studio Code (VS Code) is a popular open-source code editor that supports a range of languages and extensions. We offer VS Code through [**code-server**](https://github.com/coder/code-server) as a tool for developing code on Hyak. Our OnDemand application allows users to connect to allocated compute nodes without a complicated [**ProxyJump**](https://hyak.uw.edu/docs/guides/applications/vscode) setup.

### Accessing VS Code

1. Navigate to `Interactive Apps` and select VS Code.
2. Select a VS Code-Server container.
3. Optionally specify a working directory and data directory (see below).
4. Click `Launch` to start the VS Code-Server container.

### Working Directory vs. Data Directory

When launching VS Code through Open OnDemand, you can specify both a _working_ and _data_ directory:

- **Working Directory:** This is the root directory of your VS Code workspace. The files and code you work on will be located here. You should set this to the project folder or the location where your source code resides.

- **Data Directory:** This is where VS Code extensions and settings are stored. If you change this directory after installing extensions, you may need to reinstall or migrate them. Keeping this separate from your working directory helps preserve your [**home directory quota**](https://hyak.uw.edu/docs/systems/klone/storage#user-home-directory) since extensions and cache files can consume a lot of space. Choosing a location with ample storage (such as personal scratch/lab space) can help prevent running out of space in your home directory.

### FAQ

- **Why can't I find an extension?** VS Code-Server supports extensions from the [**Open-VSX extension gallery**](https://open-vsx.org). Because of this, you may not find all available extensions on Microsoft's marketplace.
- **How can I install my own extensions?** You can install your own .VSIX extension files by uploading them and installing them manually with Right Click -> Install Extension VSIX.
- **How can I reuse my VS Code configuration?** You can sync your VS Code settings, extensions, and preferences across sessions by using the Settings Sync extension.

---

## MATLAB

"MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages." [**Wikipedia**](https://en.wikipedia.org/wiki/MATLAB)

MATLAB is available as an interactive app on Hyak's OnDemand (OOD) portal at [**https://ondemand.hyak.uw.edu/**](https://ondemand.hyak.uw.edu/). It can also be launched manually on a compute node as outlined on the [**Tools & Software/MATLAB**](https://hyak.uw.edu/docs/guides/applications/matlab) page.

### Launching MATLAB

Launching a MATLAB session is the same as scheduling any other interactive session. To launch a MATLAB session via Hyak's OOD, select MATLAB from the list of interactive apps. Then, select parameters for the session and select "Launch".

![Screenshot of Hyak OOD that shows how to launch a MATLAB Session.](/img/docs/ood/MATLAB_request.png 'Sample MATLAB form submission on Hyak OOD.')

The session will show up as a job in the "My Interactive Sessions" tab. Allocation of resources might take a few minutes, depending on the queue and requested resources.

![Screenshot showing active MATLAB sessions.](/img/docs/ood/MATLAB_scheduled.png 'Scheduled MATLAB session.')

Once a session is running, you can adjust connection quality, launch a VNC session, or share a view-only link with others.

![Screenshot showing connection options.](/img/docs/ood/MATLAB_launch.png 'Running MATLAB session.')

The MATLAB app will open in a workspace where you can interact with the MATLAB environment.

![Screenshot of MATLAB environment.](/img/docs/ood/MATLAB_vnc.png 'MATLAB App via Hyak OOD.')

---

## RStudio

R is a language used for statistical computing and data analysis. For ease of use, R can be used via RStudio, an integrated development environment (IDE) that supports both R and Python languages. For more information, refer to the documentation pages for [**R**](https://www.r-project.org/about.html) and [**RStudio**](https://docs.posit.co/ide/user/).

### Accessing RStudio

:::warning
To access OOD off campus, you must connect to a VPN. For more information on working remotely, click [**here**](https://it.uw.edu/guides/working-remotely/working-remotely/#connect).
:::

To access the RStudio interactive app, navigate to the OOD portal [**here**](https://ondemand.hyak.uw.edu/pun/sys/dashboard) and select RStudio from the drop down menu of interactive apps from the dashboard at the top of the page. Similar to Hyak's job scheduler Slurm, this form allows you to select the account and partition for your job. To use community idle resources, select the `ckpt` partition.

You are also able to select an RStudio server container that is provided from the rocker project. Alternatively, you may use a custom container by selecting "Custom" and specifying the absolute path to the container (e.g., `/mmfs1/sw/ondemand/containers/rstudio/sifs/tidyverse-27jan2025.sif`).

Once you specify the RStudio server container, you have the option to change the User R Library Path (R_LIBS_USER). When you use the `install.packages()` command, the package library along with all of its dependencies will be installed in the directory specified with the User R Library Path field. By default, this is the path to your [**home directory**](https://hyak.uw.edu/docs/systems/klone/storage/#user-home-directory) which has a 10G storage limit. If you plan on using `install.packages()`, it is recommended to change the User R Library Path to somewhere with a larger storage quota.

![Sample RStudio form on Hyak's OOD.](/img/docs/ood/rstudio-interactive-app.JPG 'RStudio form.')

Once you click Launch, you should see your job under the "My Interactive Sessions" tab. It may take some time for your job to move through the queue depending on the amount of resources requested. Once your job has the requested resources, you will be able to connect to the RStudio server:

![Connecting to the RStudio server on Hyak's OOD.](/img/docs/ood/rstudio-connect.JPG 'Connect RStudio.')

![Sample RStudio interface on Hyak's OOD.](/img/docs/ood/rstudio-interactive-session.JPG 'RStudio interface.')

### Custom R Containers

The `install.packages()` command can be used to install most packages during your RStudio interactive session as long as the container has all the dependencies required by the package. Some packages may require changes to the operating system. To install these packages, you will need to build a custom container.

To start, create a definition file to build your container:

```bash
Bootstrap: docker
From: rocker/tidyverse

%post
    # Update Ubuntu packages
    apt-get update -y

    # Installing Ubuntu system libraries
    apt-get install -y libglpk40
    apt-get install -y \
        libxml2 \
        libxt6 \
        zlib1g-dev \
        libbz2-dev \
        liblzma-dev \
        libpcre3-dev \
        libicu-dev \
        libjpeg-dev \
        libpng-dev \
        libxml2-dev \
        libglpk-dev \
        libz-dev

    # Installing CRAN packages via Rscript into the container
    Rscript -e 'install.packages("RColorBrewer")'

    # Installing Bioconductor packages
    Rscript -e 'if (!require("BiocManager", quietly = TRUE)) install.packages("BiocManager")'
    Rscript -e 'BiocManager::install(version = "3.20")'
    Rscript -e 'BiocManager::install("regioneR")'
    Rscript -e 'BiocManager::install("regioneReloaded")'

    # Recommended for use with OOD
    mkdir /scr /mmfs1
    ln --symbolic /mmfs1/sw /sw
    ln --symbolic /mmfs1/data /data
    ln --symbolic /mmfs1/gscratch /gscratch
```

:::note
The above example serves as a template and should be edited to fit your R environment needs.
:::

Once your definition file is created, you can build the container:

```bash
apptainer build customR.sif customR.def
```

:::note Specifying an R version
In this example, the latest version of `rocker/tidyverse` is being pulled. If you would like to use a specific version of R, you can change `From: rocker/tidyverse` at the start of your `.def` file to something like `From: rocker/tidyverse:4.3.2`.
:::

Because the `tidyverse` package includes a large collection of R packages that would be time consuming to install from scratch, using a prebuilt `rocker/tidyverse` image is generally a good choice for a base container.

:::tip Useful Resources

Some prebuilt containers are tailored for specific types of workflows:

1. [**Rstudio server container**](https://hub.docker.com/r/tuftsttsrt/rserver) from Tufts University HPC — has various [**CRAN**](https://github.com/TuftsHPCbioinfo/rstudio_server/blob/main/cran_package_list.txt) and [**Bioconductor**](https://github.com/TuftsHPCbioinfo/rstudio_server/blob/main/bioc_package_list.txt) packages installed.

2. [**Single Cell RNA-seq container**](https://hub.docker.com/r/yzhangtufts/r-scrnaseq) from Tufts University HPC — has a large range of [**bioinformatics packages**](https://github.com/TuftsHPCbioinfo/r-scrnaseq/blob/main/Dockerfile) useful for scRNAseq analysis.

3. [**Rocker project containers**](https://hub.docker.com/u/rocker) — useful for running R and RStudio Server environments. For more information, refer to the [**Rocker Project website**](https://rocker-project.org/).
:::
