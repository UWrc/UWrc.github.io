---
id: build
title: Building Containers
---

In this section, we will build a custom container containing Ubuntu and Git. By the end of this tutorial, you will be able to build containers in three different ways: interactively, from a definition file, and from a local image. 

## Set Up

In this tutorial, you will build your own custom container using [Docker Hub](https://hub.docker.com/). To start, ensure that you are using the basics directory as your working directory:
```bash
pwd
/gscratch/scrubbed/UWNetID/basics
```
You should also ensure that the tutorial materials are downloaded:
```bash
cp -r /sw/hyak101/basics .
cd basics
```


For this tutorial, we will be pulling containers using Apptainer and DockerHub. To do this, we must be in a compute node. Log into a compute node with the `salloc` command:
```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=10G --time=2:00:00
```
#### Use `hyakalloc` to view your available resources

## Pulling Ubuntu
Next, open up [Docker Hub](https://hub.docker.com/) and search for Ubuntu. We will pull the latest version of Ubuntu with the following command:
```bash
apptainer pull docker://ubuntu
```
#### The latest version will be downloaded if no further specifications are given after Ubuntu.

Check to see if Ubuntu was sucessfully pulled with `ls`. 
```bash
ls 
```
```bash
ubuntu_latest.sif
```
You can use the following command to check the version of Ubuntu you are running and the date it was uploaded:
```bash
apptainer inspect ubuntu_latest.sif
```
:::tip
For additional information regarding Apptainer commands:

```bash
apptainer --help
```
All Apptainer commands can also be found [HERE](https://apptainer.org/docs/user/main/quick_start.html)
:::

## Sandboxing

We can now create a writable directory known as a sandbox for this container, allowing for file modifications and additional software installations. The next step in this tutorial is to convert our Ubuntu container into a sandbox with the following command: 
```bash
apptainer build --sandbox ubuntu_latest ubuntu_latest.sif
```

This will create a directory named ubuntu_latest. Change into this directory using `cd` to and use `ls` to see the contents. Notice how the contents of `ubuntu_latest` reflects aspects of an Ubuntu operating system. Everything that was installed inside of the container image should be present in this directory.`cd` back into the basics directory and shell into the writable (sandboxed) version of ubuntu_latest to work interactively:
```bash
apptainer shell --writable --fakeroot ubuntu_latest
```

The `--fakeroot` tag allows users who may not have root access to simulate running a container as root. Because all Apptainer containers are read only by default, the `--writable` tag is used to allow users to make changes to the container's filesystem. The command prompt will now start with `Apptainer>` if you successfully shelled into ubuntu_latest. 

## Installing Git
The next software we will install for this container is Git. Before proceeding with this installation, it is important to first update the packages in `ubuntu_latest`. To start an update, use the Ubuntu package manager `apt`:
```bash
apt -y update
```
```bash
apt list --upgradable
```

Once the packages are updated, install git with the following command:
```bash
apt -y install curl git
```
Check the version of git installed with:
```
git --version
```
Exit the Apptainer with `exit` and build a new container from the `ubuntu_latest` sandbox. This can be named anything. In this tutorial, we will call it `ubuntu_latest-git.sif`. 
```bash
apptainer build ubuntu_latest_git.sif ubuntu_latest
```
You can check the version of git installed outside the shell with:
```bash
apptainer exec ubuntu_latest_git.sif git --verison
```
## Building a Container with a Definition File
In the previous example, you built a container interactively.
Alternatively, you can build a container by creating your own set of "blueprints" for your container. These blueprints are called Apptainer definition files. Definition files should include information such as what software to install and what base operating system your custom container will start with. Create a definition file with `nano`:

```bash
nano container-build.def
```
All definition files start with `Bootstrap` followed by the bootstrap agent. The bootstrap agent specifies which base operating system the container image will use. In this tutorial, we will be using the docker bootstrap agent. Other agents you may come across are localimage, oras, and scratch. `From: ubuntu` indicates what image you want to use or the specific repository in Docker Hub you are pulling from. In this case, we are using the Ubuntu repository. The final sections of our definition file will be `%post` and `%runscript`. The `%post` section is where new software and files can be downloaded and new directories can be made. The `%runscript` section can be used to test your container.  
```bash
Bootstrap: docker
From: ubuntu

%post
        # This is where you install your software
        apt -y update
        apt -y install curl
        apt -y install curl git
%runscript
        curl --version
        git --version
```
Save and exit the text editor and build the container using your definition file. 
```bash
apptainer git_container.sif container-build.def
```
FInally, use `apptainer run` to run the runscript. 
```bash
apptainer run git_container.sif
```
## Building a Container From a Local Image
Instead of pulling an image from the internet, you can use a local image with a definition file to build a container. If you followed the previous tutorial on [Pulling Containers](https://hyak.uw.edu/docs/hyak101/containers/demonstration), you should have the `python_3.9.20-slim-bullseye.sif` container. In this section, we will install tensor flow using `python_3.9.20-slim-bullseye.sif`. Start by creating a new definition file.
```bash
nano tf-python3.def
```
```bash
Bootstrap: localimage
From: python_3.9.20-slim-bullseye.sif

%post
        # install software here
        pip install tensorflow

%runscript
        python -c 'print("Hello from your custom apptainer image!")'
```
Like before, build the container using the definition file. `tensorflow_py3.sif` will be the name of the new container.
```bash
apptainer build tensorflow_py3.sif tf-python3.def
```
You should have the python file `tf_tutorial.py` in your basics directory. You can now bind the filesystem with `--bind` and run the python script with the following command:
```bash
apptainer exec --bind /gscratch/ tensorflow_py3.sif python tf_tutorial.py
```
