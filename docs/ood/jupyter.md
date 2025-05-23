---
id: jupyter
title: Jupyter
---

Jupyter is a web-based interactive computing platform that allows users to create and share documents that contain live code, equations, visualizations, and narrative text. Jupyter notebooks are a great way to write and execute code in an interactive environment.

OOD allows users to launch notebooks on the Home directory without any set-up, server configuration, or forwarding. 

## Accessing Jupyter

To access Jupyter, navigate to [Hyak OnDemand](https://ondemand.hyak.uw.edu/) and select `Interactive Apps > Jupyter`. You will be prompted to enter information about the job you want to run. 

## Custom Environments

Custom environments allow you import external libraries like Numpy into your Jupyter notebook. There are two ways to create a custom environment for your Jupyter notebook:

### 1. Conda Environment

We recommend using a Miniconda environment for your Jupyter Notebook setup. Instructions for installing and setting up Miniconda on Hyak can be found [here](https://hyak.uw.edu/docs/tools/python#miniconda3). Once you have created and activated your desired environment, follow these steps to connect your Jupyter Notebook to the environment.


First, install the `ipykernel` package, which provides the IPython kernel required to run Jupyter Notebooks:
```js
(myEnv) [bsoni@n3263 ~]$ conda install -c anaconda ipykernel
```
This will install the necessary package to create and manage Jupyter kernels within your Conda environment.



Next, create a new kernel for the environment you want to use. Replace `myEnv` with the name of your environment.
```js
(myEnv) [bsoni@n3263 ~]$ python -m ipykernel install --user --name=myEnv --display-name "Python (myEnv)"
```
Now, you have a new kernel that you can select from within your Jupyter notebook (`Kernel > Change Kernel`). Any packages installed in your conda environment will automatically be available to you.

:::warning
It is not recommended to install packages using `pip install` directly **inside** a Jupyter notebook (e.g., using `!pip install package-name`). This can lead to inconsistencies, conflicts, and clog your filesystem. 


To properly manage packages within a Conda environment, always install packages **outside** the notebook in the terminal, using one of the following commands:
```js
(myEnv) [bsoni@n3263 ~]$ conda install packageName
```
or 
```js
(myEnv) [bsoni@n3263 ~]$ pip install packageName
```
:::


### 2. Apptainer Image
Under the `Jupyter Container` section of the form, you can enter the path of the custom Apptainer image you want to use. We offer a number of pre-built Apptainer images with popular libraries and tools. If you are unfamiliar with containers, you can learn more from [our tutorial](https://hyak.uw.edu/docs/hyak101/containers/syllabus/). A quick example is below:

1. Obtain the desired container from a container catalog. For example, we can use `nvcr.io/nvidia/pytorch:25.01-py3` from the [NVIDIA catalog](https://catalog.ngc.nvidia.com).
2. Pull the container to Hyak:
```js
apptainer pull docker://nvcr.io/nvidia/pytorch:25.01-py3 <directory_with_large_quota>
```
If we want to make modifications to the container, we can use a definition file to install packages on the image, set up environment variables, or more, as shown below:

```js
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
```js
realpath <container_path>
```
4. Enter the path of the container in the `Jupyter Container` section of the form.
