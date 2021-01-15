---
id: containers
title: Singularity and Docker
---

[singularity-hub]: /img/docs/singularity-hub.png 'Singularity Hub'

[docker-hub]: /img/docs/docker-hub.png 'Docker Hub'

Have you ever found yourself saying:

1. I don't want to use HYAK because I can't install whatever I want? I found this command online and I can't setup the random "program" package with `sudo apt-get install program`? Hate HYAK because you somehow want to use Ubuntu?

2. I'm trying to work on my local computer then move it to HYAK and resume without friction? How about you set up something and now want to share that *exact* compute environment with a collaborator (or vice-versa)?

The answer to either (or both) of those things are containers! Software containers are a way to package everything you need into a file to send around and have it work exactly the same across environments. The most popular containerization format is [Docker](#docker) but that does require administrative access to run natively, so for shared platforms (e.g., HPC clusters like HYAK) an alternative called [Singularity](#singularity) was developed. Almost every Docker container can be seamlessly converted to Singularity so they're effectively interchangable.

What are the costs, trade offs, or downsides? You might imagine performance or that containerized applications run slower than native ones. This is not always true, in most instances they are near equivalent.

## Singularity

The official Singularity documentation [[www](https://sylabs.io/guides/3.7/user-guide/)] is the best source.

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

1. Get a build node using some variant of the below command.

```bash
srun -p build --time=1:00:00 -n 2 --mem=15G --pty $0
```

2. Load the Singularity module.

```bash
module load singularity
```

3. Create a Singularity definition file. Mine is below called `tools.def` to install the latest `curl` and `git` binaries from the Ubuntu repositories.

```dockerfile
Bootstrap: docker
From: ubuntu:16.04
%post
    apt -y update
    apt -y install curl git

```

4. Built a Singularity container from its definition file. The generated SIF file is your portable container.

```bash
singularity build --fakeroot tools.sif tools.def
```

5. Run the binary.

You'll do this through the `singularity` executable to distinguish it from the `git` binary in the main operation system.

```shell-session terminal=true
$ singularity exec tools.sif git --version            
git version 2.7.4
$ 
```

Notice the `git` version here is newer than the original we started with. Success!

### Singularity Hub

![singularity-hub]

The biggest collection of native Singularity images is at Singularity Hub [[www](https://singularity-hub.org)].

## Docker

asdf

### Docker Hub

![docker-hub]

The biggest collection of Docker images is from Docker Hub [[www](https://hub.docker.com)].
