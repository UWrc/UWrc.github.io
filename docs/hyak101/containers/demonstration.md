---
id: demonstration
title: Pulling Containers
---

:::caution

This documentation is under construction.

:::

Pulling pre-built container images is often the easiest and quickest way to run your desired software enviroment. In this tutorial, we will pull a container from [DockerHub](https://hub.docker.com/). DockerHub is a cloud-based registry that provides access to a large repository of pre-built container images. Other container registries include [NVIDIA GPU Cloud](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=), [Biocontainers.pro](https://biocontainers.pro/registry) and [Sylabs.io](https://cloud.sylabs.io/library) For more information on accessible container registries, check out the Apptainer documentation page [HERE](https://hub.docker.com/). 
## Set Up

To start, log into Hyak and ensure that you are in the scrubbed directory. 
```bash
ssh UWNetID@klone.hyak.uw.edu
```
```bash
cd /gscratch/scrubbed
```
If you have not already, make a directory with your UW NetID. 
```bash
mkdir UWNetID
cd UWNetID
```
You should also ensure that the tutorial materials are downloaded. In this tutorial, the basics directory will be our working directory:
```bash
cp -r /sw/hyak101/basics .
cd basics
```
The program `Klone` uses to allow containers to run and be created is Apptainer. When pulling a docker container, Apptainer is able to convert the docker container into an apptainer container. However, to use Apptainer, you must be on a compute node:
```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=10G --time=2:00:00
```
#### Remember to use `hyakalloc` to see all of your available resources. 

## Downloading a Container via Docker
Going back to [DockerHub](https://hub.docker.com/), search for python. Choose the first search result with the green symbol next to it. This green symbol indicates that it is an official docker image. Next, click on `tags` next to the `overview` tab. Notice how you can search for previous versions of python here. In this tutorial, we will download the most recent verison of python at the top. Copy the code and paste it into your terminal. Omit `docker pull` and replace it with `apptainer pull docker://` so the docker container converts into an Apptainer container. Run this code to begin building the container.
```bash
apptainer pull docker://python:3.9.20-slim-bullseye
```
Check to see if it was sucessfully built. The container will be a `.sif` file.
```bash
ls
```
```bash
python_3.9.20-slim-bullseye.sif
```
You are now able to open a shell inside the container where you can run python:
```bash
apptainer shell python_3.9.20-slim-bullseye.sif
```
The command prompt will now start with `Apptainer>`. Input `python` into the terminal to run python:
```bash
Apptainer>python
```
`>>>` should appear on the command prompt, indiciating that you are now able to use python regularly. To exit python, use `Ctrl+D`. 

:::note
The above tutorial is useful if you want to use the most recent verison of python. However, there is a native version of python installed on Hyak. Check what version of python this is with:
```bash
python --version
```
You can check the version of python in the container with the following command:
```bash
apptainer exec python_3.9.20-slim-bullseye.sif python --version
```

:::
## Binding The Filesystem

Note that if you try to `ls`, none of your files and directories appear. This is because you must bind your filesystem to your container to use it. In this section, we will create, bind, and run a simple python script in the container. If you have not already, exit Apptainer with `exit`. Using the `nano` text editor, let's create our python script:
```bash
nano pi.py
```
```bash
# Example python script 
import math
print("Executing inside the container!")
print("Pi=,math.pi")
# Use `Ctrl+x` to exit the text editor. 
```
To bind the filesystem to the container AND run `pi.py`, use the following command:
```bash
apptainer exec --bind /gscratch/ python_3.9.20-slim-bullseye.sif python pi.py
```
You can also bind your filesystem inside of the shell so when you `ls`, your filesystem will be visable:
```bash
apptainer shell --bind exec /gscratch/ python_3.9.20-slim-bullsete.sif
```
```bash
Apptainer> ls
```
Now you can now run `py.pi` inside the shell:
```bash
Apptainer>python py.pi
```