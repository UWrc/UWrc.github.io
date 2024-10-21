---
id: build
title: Building Containers
---

In this section, we will learn how to:
* alter and rebuild containers interactively with the sandbox method
* build containers from a container recipe file called a "definition" file (`.def`)
* build containers from a previously pulled container that is already on Hyak

By the end of this tutorial, you will be able to build containers in three different ways: interactively, from a definition file, and from a local image. 

## Set Up

In this section, we will build our own custom container using after pulling a base image from [**Docker Hub**](https://hub.docker.com/). To start, ensure that you are using the basics directory as your working directory. 
```bash
pwd
/gscratch/scrubbed/UWNetID/basics
# You should see your UW NetID above replacing the word "UWNetID"
```
If you are just jumping into the tutorial, be sure to make a copy of the basics directory:
```bash
cp -r /sw/hyak101/basics .
cd basics
```

For this tutorial, we will be pulling containers from Docker Hub using Apptainer. To do this, we must be in a compute node. Start a job on a compute node with the `salloc` command:
```bash
salloc --partition=ckpt-all --cpus-per-task=1 --mem=10G --time=2:00:00
```
#### Use `hyakalloc` to view your available resources. If you are a demo account user, please use the `ckpt-all` partition as shown above. 

## Building a Container Interactively

We'll start this section of the tutorial by demonstrating how to alter and rebuild containers interactively with the sandbox method. First we need to pull an Ubuntu container from Docker Hub. We will convert this into a sandbox, open a writable shell into it, install Git, and rebuild a new version of the container that includes Git.

### Pulling Ubuntu
Start by opening up [**Docker Hub**](https://hub.docker.com/) and searching for Ubuntu. We will pull the latest version of Ubuntu with the following command:
```bash
apptainer pull docker://ubuntu
```
#### The latest version will be downloaded if no further specifications are given in the command after Ubuntu.
The build should last 30 seconds to 1 minute. During the pull and build, you will see messages from Apptainer on the progress of the command.
```bash
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Copying blob ff65ddf9395b done   | 
Copying config 59ab366372 done   | 
Writing manifest to image destination
2024/10/20 19:58:49  info unpack layer: sha256:ff65ddf9395be21bfe1f320b7705e539ee44c1053034f801b1a3cbbf2d0f4056
INFO:    Creating SIF file...
```
Check to see if the Ubuntu container was sucessfully pulled with `ls`. 
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
```bash
org.label-schema.build-arch: amd64
org.label-schema.build-date: Sunday_20_October_2024_19:58:50_PDT
org.label-schema.schema-version: 1.0
org.label-schema.usage.apptainer.version: 1.3.3-1.el8
org.label-schema.usage.singularity.deffile.bootstrap: docker
org.label-schema.usage.singularity.deffile.from: ubuntu
org.opencontainers.image.ref.name: ubuntu
org.opencontainers.image.version: 24.04
```

:::tip
For additional information regarding Apptainer commands:

```bash
apptainer --help
```
All Apptainer commands can also be found [**HERE**](https://apptainer.org/docs/user/main/quick_start.html)
:::

As with previous execises, you can use `apptainer shell` to open a shell into `ubuntu_latest.sif` and execute commands interactively. 

Before we do that, let's check the native version of Git that is installed on Hyak.
```bash
git --version
```
```bash
git version 2.43.5
```
Remember that this version of Git will not be available inside the Ubuntu container until we install it. The Ubuntu container is a bare and clean version of the Ubuntu OS and that's it. Let's demonstrate that. 

Open a shell into the `ubuntu_latest.sif` container.
```bash
apptainer shell ubuntu_latest.sif
```
Execute the command to obtainer the Git version.
```bash
Apptainer>git --version
```
The following will result indicating there is no version of Git installed in the container. 
```bash
bash: git: command not found
```
Next, we will demonstrate how to convert the container into a sandbox so that additional software can be installed into it interactivey. 

### Sandboxing

In this section we will create a writable directory known as a "sandbox" for this container, allowing for file modifications and additional software installations. This method of container development is available and may fit the preferences of some users, but it isn't the recommended method for building custom containers because it doesn't include a record of the steps taken for further container development. Additionally, this might not work with some containers because it brings the user space of the container into the kernal space of the host, `klone` which could lead to some incompatibilities. However, we want to demonstrate this so that you can explore the method and determine if it fits your needs. 

Convert our Ubuntu container into a sandbox with the following command: 
```bash
apptainer build --sandbox ubuntu_latest ubuntu_latest.sif
```
This conversion should take 1-2 minutes. 
```bash 
INFO:    Starting build...
INFO:    Verifying bootstrap image ubuntu_latest.sif
INFO:    Creating sandbox directory...
INFO:    Build complete: ubuntu_latest
```

This will create a directory named `ubuntu_latest`. Open this directory using `cd` to and use `ls` to see the contents. Notice how the contents of `ubuntu_latest` reflects aspects of an Ubuntu operating system. 

```bash
ls
```
```bash
bin   dev          etc   lib    media  opt   root  sbin         srv  tmp  var
boot  environment  home  lib64  mnt    proc  run   singularity  sys  usr
```

Everything that was installed inside of the container image should be present in this directory. 

`cd` back into the basics directory and shell into the writable, sandboxed version of ubuntu_latest to work interactively:
```bash
cd ../
```
```bash
apptainer shell --writable --fakeroot ubuntu_latest
```
You will see the following messages and warnings that indicate that some Hyak paths and features so not exist inside the sandboxed container. 
```bash
INFO:    User not listed in /etc/subuid, trying root-mapped namespace
INFO:    Using fakeroot command combined with root-mapped namespace
WARNING: Skipping mount /etc/localtime [binds]: /etc/localtime doesn't exist in container
WARNING: Skipping mount /mmfs1 [binds]: /mmfs1 doesn't exist in container
WARNING: Skipping mount /scr [binds]: /scr doesn't exist in container
WARNING: Skipping mount /var/run/slurm [binds]: /var/run/slurm doesn't exist in container
WARNING: Skipping mount /var/spool/slurmd [binds]: /var/spool/slurmd doesn't exist in container
WARNING: Skipping mount /var/run/munge [binds]: /var/run/munge doesn't exist in container
```

The `--fakeroot` tag allows users who may not have root access to simulate running a container as root. Because all Apptainer containers are read-only by default, the `--writable` tag is used to allow users to make changes to the container's filesystem. The command prompt will now start with `Apptainer>` if you successfully shelled into ubuntu_latest. 

### Installing Git
Finally, we can install Git into the container. Before proceeding with this installation, it is important to first update the package information in `ubuntu_latest` sandbox container. The next command refreshes packages lists, updates package information, and updates the local cache; without updating the package information the Git package can not be found and installed. To start an update, use the Ubuntu package manager `apt`:
```bash
apt -y update
```
Next install Git.
```bash
apt -y install git
```
Then confirm that Git is installed and check the version with:
```bash
git --version
```
```bash
git version 2.43.0
```
You'll notice that this version of Git is distinct from the local version that is installed on Hyak (2.43.0 vs. 2.43.5). 

### Rebuild Container now with Git installed

Exit the Apptainer with `exit` and build a new container from the `ubuntu_latest` sandbox that now has Git installed. This can be named anything. In this tutorial, we will call it `ubuntu_latest-git.sif`. 
```bash
apptainer build ubuntu_latest_git.sif ubuntu_latest
```
This should take 30 seconds to 1 minute to complete. 
```bash
INFO:    Starting build...
INFO:    Creating SIF file...
INFO:    Build complete: ubuntu_latest_git.sif
```
You can check the version of git installed outside the shell with:
```bash
apptainer exec ubuntu_latest_git.sif git --version
```
Next we'll demonstrate how to do the same thing, build a custom Ubuntu container with additional software installed, but this time from a definition file. 

## Building a Container with a Definition File
In the previous example, you built a container interactively. Alternatively, you can build a container by creating your own set of "blueprints" for your container. These blueprints are called Apptainer definition files. Definition files should include information such as the base operating system your custom container should start with and instructions to install software. Definition files provide a record of what you did to build your container, adding crucial documentation of your process. 

A definition file is simply a text file with specialized syntax for Apptainer. So let's start a new text file called `container-build.def` with `nano`:

```bash
nano container-build.def
```
And paste the following text into the file.
```bash title="container-build.def"
Bootstrap: docker
From: ubuntu

%post
        # This is where you install your software
        apt -y update
        apt -y install curl
        apt -y install git
%runscript
        curl --version
        git --version
```
Let's break down what these sections do when Apptainer builds the container: 
* All definition files start with `Bootstrap` followed by the bootstrap agent which specifies the base operating system the container image will use. In this tutorial, we will be using the Docker bootstrap agent. Other agents you may come across are localimage, oras, and scratch. 
* `From: ubuntu` indicates what image you want to use or the specific repository in Docker Hub you are pulling from. In this case, we are using the Ubuntu repository and without further specifications, the starting OS will be the latest version of Ubuntu available on Docker Hub. 
* The `%post` section is where new software and files can be downloaded and new directories can be made. Here we are updating package information, and this time we will install Git and Curl into the container.
* The `%runscript` section can be used to test your container; the commands under the `%runscript` section will be executed when the command `apptainer run` is used.  

Save and exit the text editor. Use `Ctrl+x` to exit the text editor. Next we will build the container using your definition file. 
```bash
apptainer build git-container.sif container-build.def
```
The build should take 1-2 minutes.
```bash
INFO:    User not listed in /etc/subuid, trying root-mapped namespace
INFO:    The %post section will be run under fakeroot
INFO:    Starting build...
Copying blob ff65ddf9395b done   | 
Copying config 59ab366372 done   | 
Writing manifest to image destination
2024/10/20 22:26:25  info unpack layer: sha256:ff65ddf9395be21bfe1f320b7705e539ee44c1053034f801b1a3cbbf2d0f4056
INFO:    Running post scriptlet
+ apt -y update

### TRUNCATED MESSAGE
INFO:    Adding runscript
INFO:    Creating SIF file...
INFO:    Build complete: git-container.sif
```

FInally, use `apptainer run` to run the runscript and test the container. 
```bash
apptainer run git-container.sif
```
```bash
curl 8.5.0 (x86_64-pc-linux-gnu) libcurl/8.5.0 OpenSSL/3.0.13 zlib/1.3 brotli/1.1.0 zstd/1.5.5 libidn2/2.3.7 libpsl/0.21.2 (+libidn2/2.3.7) libssh/0.10.6/openssl/zlib nghttp2/1.59.0 librtmp/2.3 OpenLDAP/2.6.7
Release-Date: 2023-12-06, security patched: 8.5.0-2ubuntu10.4
Protocols: dict file ftp ftps gopher gophers http https imap imaps ldap ldaps mqtt pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp
Features: alt-svc AsynchDNS brotli GSS-API HSTS HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz NTLM PSL SPNEGO SSL threadsafe TLS-SRP UnixSockets zstd
git version 2.43.0
```
## Building a Container From a Local Image
Instead of pulling a container image from the internet to build your custom container, you can use a local image to build your container. This can be usful to containue customizing your containers by continuing to build upon them and installing additional software for your project. 

If you followed the previous section of the tutorial on [**Pulling Containers**](https://hyak.uw.edu/docs/hyak101/containers/demonstration), you should have the `python_3.9.20-slim-bullseye.sif` container. In this section, we will install TensorFlow using `python_3.9.20-slim-bullseye.sif`. Start by creating a new definition file.
```bash
nano tf-python3.def
```
And paste the following text into the file.
```bash title="tf-python3.def"
Bootstrap: localimage
From: python_3.9.20-slim-bullseye.sif

%post
        # install software here
        pip install tensorflow

%runscript
        python -c 'print("Hello from your custom Python Container Image!")'
        python -c 'import tensorflow as tf ; print("Container TensorFlow Version =",tf.__version__)'
```
Like before, build the container using the definition file. `tensorflow_py3.sif` will be the name of the new container.
```bash
apptainer build tensorflow_py3.sif tf-python3.def
```
This build could take 5-6 minutes to complete.
```bash 
INFO:    User not listed in /etc/subuid, trying root-mapped namespace
INFO:    The %post section will be run under fakeroot
INFO:    Starting build...
INFO:    Verifying bootstrap image python_3.9.20-slim-bullseye.sif
INFO:    Running post scriptlet
+ pip install tensorflow
Collecting tensorflow
  Downloading tensorflow-2.17.0-cp39-cp39-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (601.3 MB)
     ━━━━━╺━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 76.2/601.3 MB 16.7 MB/s eta 0:00:32
### TRUNCATED MESSAGE
INFO:    Adding runscript
INFO:    Creating SIF file...
```
To demonstrate that the container has TensorFlow installed, use the following command to run the runscript: 
```bash
apptainer run tensorflow_py3.sif 
```
```bash
Hello from your custom Python Container Image!
2024-10-20 22:50:17.628290: I tensorflow/core/util/port.cc:153] oneDNN custom operations are on. You may see slightly different numerical results due to floating-point round-off errors from different computation orders. To turn them off, set the environment variable `TF_ENABLE_ONEDNN_OPTS=0`.
2024-10-20 22:50:17.657501: I external/local_xla/xla/tsl/cuda/cudart_stub.cc:32] Could not find cuda drivers on your machine, GPU will not be used.
2024-10-20 22:50:18.294650: I external/local_xla/xla/tsl/cuda/cudart_stub.cc:32] Could not find cuda drivers on your machine, GPU will not be used.
2024-10-20 22:50:18.582287: E external/local_xla/xla/stream_executor/cuda/cuda_fft.cc:485] Unable to register cuFFT factory: Attempting to register factory for plugin cuFFT when one has already been registered
2024-10-20 22:50:18.800485: E external/local_xla/xla/stream_executor/cuda/cuda_dnn.cc:8454] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
2024-10-20 22:50:18.851364: E external/local_xla/xla/stream_executor/cuda/cuda_blas.cc:1452] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered
2024-10-20 22:50:19.468198: I tensorflow/core/platform/cpu_feature_guard.cc:210] This TensorFlow binary is optimized to use available CPU instructions in performance-critical operations.
To enable the following instructions: AVX2 AVX512F AVX512_VNNI FMA, in other operations, rebuild TensorFlow with the appropriate compiler flags.
2024-10-20 22:50:22.234052: W tensorflow/compiler/tf2tensorrt/utils/py_utils.cc:38] TF-TRT Warning: Could not find TensorRT
TensorFlow Version = 2.17.0
```

Finally, we prepared a script to demonstrate TensorFlow with this container. You should have the python file `tf_tutorial.py` in your basics directory. You can now bind the filesystem with `--bind` and run the python script with the following command:
```bash
apptainer exec --bind /gscratch/ tensorflow_py3.sif python tf_tutorial.py
```

You now have built Apptainer containers in three different ways: interactively, from a definition file, and from a local image. We hope you will be able to adapt these methods to fit your needs and the needs of your research project. If you have any questions or suggestions for how to improve this tutorial, please email **help@uw.edu** with "Hyak" in the subject line, and let us know what you think. Thank you! 

:::important Acknowledgements
The script `tf_tutorial.py` is the "TensorFlow 2 quickstart for beginners" from https://www.tensorflow.org/tutorials/quickstart/beginner made into a script with minimal adaptions. 
:::