---
id: demonstration
title: Pulling Containers
---

Pulling pre-built container images is often the easiest and quickest way to run your desired software enviroment. In this tutorial, we will pull a container from [**Docker Hub**](https://hub.docker.com/). DockerHub is a cloud-based registry that provides access to a large repository of pre-built container images. Other container registries include [**NVIDIA NGC**](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=), [**Biocontainers**](https://biocontainers.pro/registry), [**Sylabs.io**](https://cloud.sylabs.io/library), and [**Quay.io**](https://quay.io/). For more information on accessible container registries, check out the containers documentation page [**HERE**](https://hyak.uw.edu/docs/tools/containers#container-repositories). 

## Set Up

To start, log into Hyak and navigate away from your home directory to a directory where you have access to storage. For this tutorial, we will work these exercises using a directory in `/gscratch/scrubbed/`. You may choose a working directory under another path on the filesystem, but we recommend not performing these exercises in your Home directory due to storage limitations. Learn more about storage on Hyak [**HERE**](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory).  

```bash
# Remember to replace the word "UWNetID" in the command below with your UW NetID. 
ssh UWNetID@klone.hyak.uw.edu
```
Navigate to `/gscratch/scrubbed/`
```bash
cd /gscratch/scrubbed
```
If you have not already, make a directory with your UW NetID. 
```bash
# Remember to replace the word "UWNetID" in the command below with your UW NetID.
mkdir UWNetID
cd UWNetID
```
Next, ensure that the tutorial materials are copied to your working directory. In this tutorial, your copy of the basics directory will be our working directory:
```bash
cp -r /sw/hyak101/basics .
cd basics
```
The program `klone` uses for containers is Apptainer. When pulling a Docker container, Apptainer is able to convert the Docker container into an Apptainer container. However, to use Apptainer, you must be on a compute node:
```bash
salloc --partition=ckpt-all --cpus-per-task=1 --mem=10G --time=2:00:00
```
#### Remember to use `hyakalloc` to see all of your available resources. If you are a demo account user, please use the `ckpt-all` partition as shown above. 

## Pulling a Container to Hyak from Docker Hub

For this exercise, we will pull a Python container from [**Docker Hub**](https://hub.docker.com/). [**Follow this link to open Docker Hub**](https://hub.docker.com/) and search for Python. Choose the first search result with the green badge symbol next to it. This green symbol indicates that it is an official docker image. 

![](/img/docs/containers-tutorial/dockerhub_python1.png 'Official Python Image on Docker')


Next, click on "Tags" tab next to the "Overview" tab. Notice how you can search for previous versions of Python here. In this tutorial, we will download the most recent verison of Python (as of Fall 2024), which is installed in a container running Ubuntu's slim-bullseye release. Copy the code from the code box for the `3.9.20-bullseye` image and paste it into your terminal. 

![](/img/docs/containers-tutorial/dockerhub_python2.png 'Container pull code for Python image')

Omit `docker pull` and replace it with `apptainer pull docker://` so Apptainer pulls the container image from Docker Hub and converts it into an Apptainer container. Run this code to pull and build the container.
```bash
apptainer pull docker://python:3.9.20-slim-bullseye
```
The build should last 30 seconds to 1 minute. During the pull and build, you will see messages from Apptainer on the progress of the command.
```bash
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Copying blob 51915174edd6 done   | 
Copying blob 6dce3b49cfe6 done   | 
Copying blob 6baa3c816245 done   | 
Copying blob b1a235768000 done   | 
Copying config 577d271f21 done   | 
Writing manifest to image destination
2024/10/20 19:33:02  info unpack layer: sha256:6dce3b49cfe6dc4b4e0198412bb0578215c86dae41303c47438639853bcba562
2024/10/20 19:33:03  info unpack layer: sha256:6baa3c8162456d475e4457e9618f8675a68275ab908ce7d7b387be1383fab464
2024/10/20 19:33:03  info unpack layer: sha256:b1a235768000dab9a30d44317a02455337c578675503eda9c991f7aef041b6b6
2024/10/20 19:33:04  info unpack layer: sha256:51915174edd6bffd3e0d77786e26ff610a2864d5277374a84cfa7e43a297723d
INFO:    Creating SIF file...
```

Once that is complete, check to see if it was sucessfully built. The container will have a file extension `.sif`.
```bash
ls
```
```bash
python_3.9.20-slim-bullseye.sif
```
:::caution Disk Quota Exceeded

When building a container, you may encournter the following error:

![](/img/docs/disk-quota-exceeded.png 'Disk Quota Exceeded Error Message')

If you run into a Disk Quota Exceeded error when building the container, it is likely due to exceeding the stroage limit in your **[home directory](https://hyak.uw.edu/docs/storage/gscratch/#user-home-directory)**  where the Apptainer cache is located by default. Because your home directory has a 10GB storage limit, the following commands may be useful to monitor your storage usage. To assess your storage in your home directory, use the following command:
```bash
du -h --max-depth 1
```
If you find your storage exeeding the 10GB quota, you will need to eliminate storage. It can be helpful to clear the Apptainer cache with the following:
```bash
apptainer cache clean
```
#### Default Apptainer Cache

You can now start up a job on a compute node with `salloc` if you have not already. 
When you start a job on a compute node, the internal storage of that node
is available to be used for temporary read/write operations with the jobs.
This makes it a great place for the apptainer cache and the physical architecture of our filesystem doesn't interfere with this. 
You can configure Apptainer to store its cache in a directory located on the local storage of the compute node with:
```bash
export APPTAINER_CACHEDIR=/scr
# or
export APPTAINER_CACHEDIR=/tmp
```
You can now proceed with building your container:
```bash
apptainer build container-image.sif container-recipe.def
```
:::

You are now able to open a shell inside the container where you can run Python:
```bash
apptainer shell python_3.9.20-slim-bullseye.sif
```
The command prompt will change and now start with `Apptainer>`. This is how you know that you are now inside the Apptainer container. Input `python` into the terminal to open the container's Python shell:
```bash
Apptainer>python
```
```bash
Python 3.9.20 (main, Oct 19 2024, 01:00:05) 
[GCC 10.2.1 20210110] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```
`>>>` should appear on the command prompt, indiciating that you are now able to use Python interactively. To exit Python, use `Ctrl+D`. 
To exit the container write `exit`

```bash 
exit
```
:::note
The above tutorial is useful if you want to use the most recent verison of Python. However, there is a native version of Python installed on Hyak. Check what version of Python this is with:
```bash
python --version
```
You can check the version of Python in the container with the following command:
```bash
apptainer exec python_3.9.20-slim-bullseye.sif python --version
```
`apptainer exec` rather than `apptainer shell` sends a command to be **executed** inside the container, rather than first opening a shell into the container. 
:::

## Binding The Filesystem

Recall that Apptainer containers are by default read-only. This means that under default parameters you cannot store files within the container and the container is isolated so that it cannot access any files from outside the container. To demonstrate this, try to execute `ls` from within the container, and you will see none of your files and directories on Hyak will appear. 

Open a shell into the container once more
```bash
apptainer shell python_3.9.20-slim-bullseye.sif
```
Try `ls` to list the directory.
```bash
ls
```

This isn't very practical. We will usually have more files outside of the container upon which we want to execute commands. To make the Hyak filesystem accessible to the container, you must bind your filesystem to your container. In this section, we will bind the Hyak filesystem and run a simple Python script in the container. If you have not already, exit Apptainer with `exit`. Using the `nano` text editor, let's create our Python script:

```bash
nano pi.py
```
```bash title="pi.py"
# Example Python script imports the Math library and prints the number pi. 
import math
print("Executing inside the container!")
print("Pi=",math.pi)
# Use `Ctrl+x` to exit the text editor. 
```
Try to run the `pi.py` script without binding the filesystem. 
```bash
apptainer exec python_3.9.20-slim-bullseye.sif python pi.py
```
```bash
/usr/local/bin/python: can't open file '/gscratch/scrubbed/finchkn/basics/pi.py': [Errno 2] No such file or directory
```
To access the `pi.py` script and execute it, the file system much be bound to the container. To bind the filesystem to the container AND run `pi.py`, use the following command:
```bash
apptainer exec --bind /gscratch/ python_3.9.20-slim-bullseye.sif python pi.py
```
```bash
Executing inside the container!
Pi= 3.141592653589793
```
You can also use `apptainer shell` to open a shell into the container and bind the filesystem so that the files are accessible and visible with `ls`.
```bash
apptainer shell --bind /gscratch/ python_3.9.20-slim-bullseye.sif
```
Now with `ls` you can list the contents of your working directory.
```bash
Apptainer> ls
```
Now you can now run `pi.py` inside the shell:
```bash
Apptainer>python pi.py
```

In the next section, we'll learn how to build custom containers. 