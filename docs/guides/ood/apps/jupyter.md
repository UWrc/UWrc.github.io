---
title: Jupyter
---

Jupyter is a web-based interactive computing platform that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. OOD allows users to launch notebooks on the home directory without any set-up, server configuration, or forwarding.

## Accessing Jupyter

To access Jupyter, navigate to [**Hyak OnDemand**](https://ondemand.hyak.uw.edu/) and select `Interactive Apps > Jupyter`. You will be prompted to enter information about the job you want to run.

## Custom Environments

Custom environments allow you to import external libraries like NumPy into your Jupyter notebook. There are two ways to create a custom environment for your Jupyter notebook:

### Conda Environment

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

### Apptainer Image

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
