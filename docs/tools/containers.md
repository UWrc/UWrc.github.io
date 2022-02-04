---
id: containers
title: Singularity and Docker
---

[sylabs]: /img/docs/sylabs-cloud.png 'Sylabs Cloud'

[docker-hub]: /img/docs/docker-hub.png 'Docker Hub'

[ngc]: /img/docs/ngc-catalog.png 'NGC'

[biocontainer]: /img/docs/biocontainer.png 'biocontainer'

[ngc-pytorch]: /img/docs/ngc-pytorch.png 'NGC Pytorch'

Have you ever found yourself saying:

1. I don't want to use HYAK because I can't install whatever I want? I found this command online and I can't setup the random "program" package with `sudo apt-get install program`? Hate HYAK because you somehow want to use Ubuntu?

2. I'm trying to work on my local computer then move it to HYAK and resume without friction? How about you set up something and now want to share that *exact* compute environment with a collaborator (or vice-versa)?

The answer to either (or both) of those things are containers! Software containers are a way to package everything you need into a file to send around and have it work exactly the same across environments. The most popular containerization format is [Docker](#docker) but that does require administrative access to run natively, so for shared platforms (e.g., HPC clusters like HYAK) an alternative called [Singularity](#singularity) was developed. Almost every Docker container can be seamlessly converted to Singularity so they're effectively interchangable.

What are the costs, trade offs, or downsides? You might imagine performance or that containerized applications run slower than native ones. This is not always true, in most instances they are near equivalent.

## Singularity

The official Singularity documentation [[www](https://sylabs.io/guides/latest/user-guide/)] is the best source.

### Ubuntu `apt-get` Example

Let's say that you want to use `git` and the current version of `git` on HYAK is 1.8.3.1 as shown below.

```shell-session terminal=true
$ which git
/usr/bin/git
$ git --version
git version 1.8.3.1
$
```

Let's say you want a newer version AND you also want it running on Ubuntu for some reason. Here we'll walk you through installing the latest `git` binary using `apt` repositories for Ubuntu 16.04 [[www](https://releases.ubuntu.com/16.04/)] or "Xenial Xerus".

1. Get an interactive session using some variant of the below command.

```bash
srun -A mygroup -p compute --time=1:00:00 -n 2 --mem=10G --pty $0
```

2. Load the Singularity module.

```bash
module load singularity
```

3. Create a Singularity definition file. Mine is below called `tools.def` to install the latest `curl` and `git` binaries from the Ubuntu repositories. Please see the Singularity definition files reference page [[www](https://sylabs.io/guides/latest/user-guide/definition_files.html)] for more advanced options.

```dockerfile
Bootstrap: docker
From: ubuntu:16.04
%post
    apt -y update
    apt -y install curl git

```

4. Build a Singularity container from its definition file. The generated SIF file is your portable container.

    The `.def` definition file should either be A) executable or B) a relative path (e.g. `./tools.def` while in the same directory as the file) or an absolute path (e.g. `/full/path/to/tools.def`).

    When using the `--fakeroot` option, build the container image in `/tmp`. This avoids [[a potential permission issue](https://sylabs.io/guides/3.6/admin-guide/installation.html#fakeroot-sub-uid-gid-mapping)] with our shared storage filesystem, GPFS.

```bash
singularity build --fakeroot /tmp/tools.sif ./tools.def
```

5. Move the container image to the desired location and run the binary.

You'll do this through the `singularity` executable to distinguish it from the `git` binary in the main operation system.

```shell-session terminal=true
$ mv /tmp/tools.sif .
$ singularity exec tools.sif git --version
git version 2.7.4
$
```

Notice the `git` version here is newer than the original we started with. Success!

## App Stores

If you followed the tutorial above you should be able to install anything you want but why re-create the wheel? There is a large developer community out there that maintains a majority of the most common scientific applications.

### Sylabs.io Cloud Library

![sylabs]

The largest collection of native Singularity containers can be found at the Sylabs.io Cloud Container Library [[www](https://cloud.sylabs.io/library)]. This would be the ideal first place to look for containers built by others since it is maintained by the creators of Singularity and provides the native container format.

### Docker Hub

![docker-hub]

The biggest collection of Docker images is from Docker Hub [[www](https://hub.docker.com)].

Let's say Docker Hub tells you the pull command for the container you want is `docker pull gcc:11.1.0-bullseye`. To have Singularity grab this Docker container and convert it to a Singularity container you'd modify the command to be `singularity pull docker://gcc:11.1.0-bullseye`.

### Biocontainers.pro

![biocontainer]

A bioinformatics focused set of Singularity containers can be found at the Biocontainers.pro registry [[www](https://biocontainers.pro/registry)]. It is a collection of (convertible to Singularity) Docker containers as well as native Singularity containers.

### NVIDIA GPU Cloud (NGC)

![ngc]

A container registry that specializes in common GPU accelerated applications or GPU software development tools is provided by NVIDIA called the NVIDIA GPU Cloud (NGC) [[www](https://ngc.nvidia.com/catalog/containers)]. For example, you might want to use a PyTorch container optimized for NVIDIA GPUs as seen below.

![ngc-pytorch]

Depending on the NGC container, it might have directions on the exact pull command for Singularity. If it does not work be sure to prepend their pull location with `docker://` since these are native Docker containers that need to be converted to Singularity.

The example above provides a Docker pull command for PyTorch but in this case you'd modify it similarly as if you got it from Docker Hub from `docker pull nvcr.io/nvidia/pytorch:21.05-py3` to `singularity pull docker://nvcr.io/nvidia/pytorch:21.05-py3`.

### NGC API Keys

In rare occasions a container in the NGC app store is going to require that you have an API. This is the only reason you'd need to register for a user account with NGC. Once you have an NGC account and are logged in, at the top right the pull down menu select "Setup" and there's an option to "Get API Key". Save that string of text.

You only have to register your API key once but load the ngc module (i.e., `module load ngc`) and run `ngc config set` which will prompt you for your API key. It's fine to select "ascii" as an option. Your API key will be stored under a `.ngc/config` file in your home directory.

```shell-session terminal=true
$ ngc config current
+-------------+----------------------------------------------------------+--------------------+
| key         | value                                                    | source             |
+-------------+----------------------------------------------------------+--------------------+
| apikey      | ******************************************************** | user settings file |
|             | ************************YTc3                             |                    |
| format_type | ascii                                                    | user settings file |
+-------------+----------------------------------------------------------+--------------------+
$
```
