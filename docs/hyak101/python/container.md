---
id: container
title: Building a Container
---

## The briefest introduction to containers
A container is some executable code packaged up with its dependencies, and the amount of dependencies
can range from a handful of libraries to an entire operating system.
Normally, when you hear people talk about containers, they stress the size benefits:
they're supposed to package up *just enough* dependencies for their code to run.

For the purposes of this guide, try to forget about that idea.
We're going to make a container with a whole operating system in it:
all the little pieces of software that we might want to use
interactively—`cd`, `cat`, `vim`, `squeue`, etc.—and we're going to use it like it's a virtual machine.

The difference between a virtual machine and a whole-OS container is fairly small:
the VM will emulate hardware, the container won't. That works for us, since we want to use the node's
hardware anyway.

Jargon essentialists won't like it, but for the purposes of this guide you can just imagine that
we're building a personal Linux machine.

## Our general-purpose container definition
Apptainer containers are represented by a single file (normally suffixed `.sif`), and they're created from definition files.
We've already created the definition file we're going to use for this at `/mmfs1/sw/hyak101/python/hyak-container.def`.
Start by making a copy of it in your home directory:
```shell terminal=true
$ cp /mmfs1/sw/hyak101/hyak-container.def ~
```

Now, let's take a look at the different sections of the definition, starting from the top.

### `%header`: Our starting point
```bash title="~/hyak-container.def"
Bootstrap: docker
From: nvcr.io/nvidia/cuda:11.8.0-devel-rockylinux8
```

Apptainer containers, as you can see here, can be built from Docker containers.
Since we plan on using the node's hardware, we're going to try and keep our container OS as similar to our
host OS as possible. We're using Rocky Linux 8 and our current CUDA version is 11.8, so this container from
[NVIDIA GPU Cloud](https://catalog.ngc.nvidia.com/containers)  will line up neatly with our nodes.

### `%setup` and `%files:` Preparing for the build
```bash title="~/hyak-container.def"
%setup
    grep ^slurm: /etc/passwd >> ${APPTAINER_ROOTFS}/etc/passwd
    grep ^slurm: /etc/group >> ${APPTAINER_ROOTFS}/etc/group
```
Be careful with the `%setup` step: these actions are performed on the *host* operating system, not on the container's.
We're appending the user ID and group ID of the node's Slurm user into the container, using the `${APPTAINER_ROOTFS}` variable.

```bash title="~/hyak-container.def"
%files
    /etc/yum.repos.d/hyak-slurm.repo
    /opt/hyak-user-tools
    /usr/local/bin/hyak*
```
In the `%files` section, we're copying over a few files from the host operating system to the container's:
1. Hyak's Slurm package repository, so we can install & run Slurm commands,
2. The `hyak-user-tools` virtual environment in `/opt`, so we can run commands like `hyakalloc`,
3. And the user tools executables themselves, which are located on the nodes under `/usr/local/bin`.

### `%post`: The post-build instructions

```bash title="~/hyak-container.def"
%post
    dnf install --assumeyes --allowerasing \
      @core @standard slurm python39

    mkdir /scr /mmfs1
    ln --symbolic /mmfs1/sw /sw
    ln --symbolic /mmfs1/data /data
    ln --symbolic /mmfs1/gscratch /gscratch
```
Once the container has been built, we have a fully functioning Rocky Linux 8 operating system.
Rocky is downstream of FedoraLinux , and it uses the `dnf` package manager. We're installing a handful of things:
- The package group `core`: these are the 'minimum' packages for an interactive operating system.
- The package group `standard`: this contains, as the name suggests, the "standard" packages for a Rocky Linux installation.
This installs software like `tar`, `vim`, `tree`, etc.
- The `slurm` package: this will install Slurm from the Hyak package repository
we copied in during the `%files` section.
- The `python39` package: this is a dependency for Hyak user tools, e.g. `hyakstorage` or `hyakalloc`.

After we have these basic package installed, we're going to make a couple directories and links.
- `/scr` is the path to the node's local SSD storage.
This is a default bind-mount for our Apptainer configuration.
- `/mmfs1` is the path to our shared storage device, and this is also a default bind-mount.
Like with `/scr`, we just need to provide an empty directory for it to bind to.

The links, `/sw`, `/data`, and `/gscratch`, are—like on the nodes—shortcuts to commonly-used directories on `/mmfs1`.

### `%runscript`: What the container does

```bash title="~/hyak-container.def"
%runscript
    case ${@} in
        "")
            # Launch an interactive shell if no arguments are given:
            exec /bin/bash
            ;;
        *)
            # If any arguments are given, attempt to run them as a command:
            exec ${@}
            ;;
    esac
```

This is the last piece, and it involves just a touch of shell programming.
We're using [a case statement](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_03.html), and we're looking for patterns in the arguments given to the container.
For reference, here's an example of how the runscript would get called:

```shell terminal=true
$ apptainer run ~/hyak-container.sif argument-here
```

Thankfully, our "patterns" are very simplistic:
1. `""`: a blank string, i.e. what happens if you simply do `apptainer run ~/hyak-container.sif`.
The default behavior we want is to launch an interactive shell.
1. `*)`: everything else. Any input we receive, we will attempt to run as a command.
We are emulating the behavior of `apptainer exec` here, since we're going to try and keep our interactions
with `apptainer` as uniform as possible.

## Building containers on Hyak
Container building should be performed in a job—interactive or batch—on a compute node.
Before we continue, here's a quick overview of what kind of activities are allowed on the login nodes:

:::important Important: Klone-Login Acceptable Uses

1. Downloading to or uploading from the cluster.
1. File management like moving, copying, or renaming files and directories.
1. Light text editing with `vim` or a worse text editor.
1. Interacting with the Slurm scheduler, i.e. to submit jobs.

:::

CPU & memory are closely monitored on the login nodes as they are a finite, shared resource.
If our automation detects unusually high activity, your account will be throttled & you'll
receive an email warning.

In other words, resource-intensive actions like building a container should be done on a node.

### Creating a job script
Here's an SBATCH script we can use to build our container (like with the definition, you can copy this from `/mmfs1/sw/hyak101/python` into your home directory):

```bash title="~/container-build.job"
#!/bin/bash
#SBATCH --job-name=container-build
#SBATCH --cpus-per-task=1
#SBATCH --mem=16GB
#SBATCH --partition=ckpt
#SBATCH --time=60

//highlight-start
mkdir /tmp/$USER
apptainer build /tmp/$USER/hyak-container.sif ~/hyak-container.def
cp /tmp/$USER/hyak-container.sif ~
//highlight-end
```
The `#SBATCH` lines tell Slurm what we want: a single CPU and 16GB of RAM, in the `ckpt` partition, with a time limit of 60 minutes.
Using `sbatch` is the best way to submit non-interactive jobs on the cluster, and there are quite a few options.
Check out [the official Slurm documentation](https://slurm.schedmd.com/sbatch.html) for more details.

This job is only a few commands, so let's go through them real quick. First:

- `mkdir /tmp/$USER`: We're going to build the container in /tmp, so we'll make a subdirectory for our work there.
`$USER` is a default environment variable that expands to your username.

Then, the build:

- `apptainer build`: the Apptainer executable and subcommand.
- `/tmp/$USER/hyak-container.sif`: a temporary place to build the container image. **Important**: building the image in `/tmp/$USER` avoids permissions issues with GPFS, so don't skip this.
- `~/hyak-container.def`: the path to the container definition we made in our home directory.

Finally, saving our container:

- `cp /tmp/$USER/hyak-container.sif ~`: Copy the container image we made in `/tmp` to our home directory (`~`).


Before we submit this job, make sure you have enough space in the destination.
If your home directory doesn't have ~4GB free, you can replace the destination with:
1. A subdirectory in your group's `gscratch` space, i.e. `/mmfs1/gscratch/groupname/$USER`.
1. Our shared filesystem's temporary space, `scrubbed`, i.e. `/mmfs1/gscratch/scrubbed/$USER`.
**Note**: any files or directories in `scrubbed` that are older than 3 weeks are automatically removed, hence the name.

Regardless of where you put the final container image, make sure the destination exists & has sufficient space before you submit your job.

:::tip
You can use the `hyakstorage` command to see your file & space quotas, in your home directory and the gscratch directories you can access.
[Here's](../storage/gscratch#checking-utilization-hyakstorage) our documentation for that command.
:::

### Submitting the job
We've arrived at the part where, if it were necessary, you would submit the job to create this container.
The job itself takes a bit longer than half an hour, since we're installing an operating system and the whole set of basic utilities.
However, if you didn't modify the container definition, you don't actually need to build this one (or, rebuild, I should say):
it's already created, and you can find it `/mmfs1/sw/hyak101/hyak-container.sif`.

For the remainder of this guide, it'll be easiest if you create a link to it from your home directory, like this:
```shell terminal=true
$ ln --symbolic /mmfs1/sw/hyak101/hyak-container.sif ~/hyak-container.sif
```
However, if you made some changes, or just want to observe the build process, all you would need to do (on the login node)
is submit the job with `sbatch`:
```shell terminal=true
$ sbatch ~/container-build.job
Submitted batch job 12345678
$ squeue --user $USER --states RUNNING
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678      ckpt containe username  R      00:01      1 n3000
$ tail --follow --retry ~/slurm-12345678.out
```

You'll receive a job ID, and once you see it running with `squeue`,
you can watch the container being built with `tail`.
