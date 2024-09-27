---
id: container
title: Building a Container
---

:::caution caution: the next section is optional 

This section is going to describe how the main container we prepared for this tutorial was developed. We highly encourage you to read and understand the development of this container because it will help you adapt this tutorial to fit the needs of your research project. However, if you are interested in completing this tutorial to set up Jupyter Notebooks on Hyak, complete this following step, and skip to the section titled **Flexible Connections** for your OS. This saves you an hour (you're welcome).

First navigate to your working directory, which you selected in the previous section titled, [**Getting Started.**](https://hyak.uw.edu/docs/hyak101/python/setup#selecting-your-working-directory) and issue the following command: 

```bash
ln --symbolic /mmfs1/sw/hyak101/python/hyak-container.sif hyak-container.sif
```
:::

### The briefest introduction to containers
A container is some executable code packaged up with its dependencies, and the amount of dependencies
can range from a handful of libraries to an entire operating system.

We're going to make a container with a whole operating system in it:
all the little pieces of software that we might want to use
interactively—`cd`, `cat`, `vim`, `squeue`, etc.—and we're going to use it like it's a virtual machine.

The difference between a virtual machine and a whole-OS container is fairly small:
the VM will emulate hardware, the container won't. That works for us, since we want to use the klone's
hardware anyway.

Jargon essentialists won't like it, but for the purposes of this guide you can just imagine that
we're building a personal Linux machine.

### Go to working directory before building your container

Start by navigating to the working directory you selected for this tutorial. For example, we selected a directory under `/gscratch/scrubbed` named with our UWNetID. NOTE: this following step will be different for every user. Please see the [**Getting Started.**](https://hyak.uw.edu/docs/hyak101/python/setup#selecting-your-working-directory) Section for more information about how to set this up for you. Use something similar to the following command to navigate to your working directory: 

```bash
cd /gscratch/scrubbed/UWNetID
```

### Our general-purpose container definition file

Apptainer containers are represented by a single file (normally suffixed `.sif`), and they're created from definition files (kind of like a recipe for your container).
We've already created the definition file we're going to use for this at `/mmfs1/sw/hyak101/python/hyak-container.def`. Next, make a copy of it in your working directory (we will use a shorthand where `.` will copy the file to the directory where the command is issued, in this case your working directory):
```bash
cp /mmfs1/sw/hyak101/python/hyak-container.def .
```
After copying the `.def` file to your working directory, you should see the file is there with the list command or `ls`, and you can print the `.def` file to the screen and take a look at its contents with the `cat` command

```bash
ls
# you should see hyak-container.def among the other items you may have in the directory
cat hyak-container.def
```

Now, let's take a look at the different sections of the definition, starting from the top.

```bash title="hyak-container.def"
Bootstrap: docker
From: nvcr.io/nvidia/cuda:11.8.0-devel-rockylinux8
```

Apptainer containers, can be built from Docker containers, noted by `Bootstrap: docker`.
Since we plan on using the node's hardware, we're going to try and keep our container OS as similar to our
host OS as possible. We're using Rocky Linux 8 and our current CUDA version is 11.8, so this container from
[**NVIDIA GPU Cloud**](https://catalog.ngc.nvidia.com/containers)  will line up neatly with our nodes.

#### `%setup` and `%files` section

Next we'll look at the `%setup` and `%files` sections which are for preparing for the build.

```bash title="hyak-container.def"
%setup
    grep ^slurm: /etc/passwd >> ${APPTAINER_ROOTFS}/etc/passwd
    grep ^slurm: /etc/group >> ${APPTAINER_ROOTFS}/etc/group
```
Be careful with the `%setup` step: these actions are performed on the *host* operating system, not on the container's.
For example, with the `%setup` section above, we're appending the user ID and group ID of the node's Slurm user into the container, using the `${APPTAINER_ROOTFS}` variable.

```bash title="hyak-container.def"
%files
    /etc/yum.repos.d/hyak-slurm.repo
    /opt/hyak-user-tools
    /usr/local/bin/hyak*
```
In the `%files` section, we're copying over a few files from the host operating system (`klone`) to the container's:
1. Hyak's Slurm package repository, so we can install & run Slurm commands,
2. The `hyak-user-tools` virtual environment in `/opt`, so we can run commands like `hyakalloc`,
3. And the user tools executables themselves, which are located on the nodes under `/usr/local/bin`.

#### `%post` section for post-build instructions

```bash title="hyak-container.def"
%post
    dnf install --assumeyes --allowerasing \
      @core @standard slurm python39

    mkdir /scr /mmfs1
    ln --symbolic /mmfs1/sw /sw
    ln --symbolic /mmfs1/data /data
    ln --symbolic /mmfs1/gscratch /gscratch
```
Once the container has been built, we have a fully functioning Rocky Linux 8 operating system within the container.
Rocky is downstream of FedoraLinux , and it uses the `dnf` package manager. We're installing a handful of things with `dnf`:
- The package group `core`: these are the 'minimum' packages for an interactive operating system.
- The package group `standard`: this contains, as the name suggests, the "standard" packages for a Rocky Linux installation.
This installs software like `tar`, `vim`, `tree`, etc.
- The `slurm` package: this will install Slurm from the Hyak package repository
we copied in during the `%files` section.
- The `python39` package: this is a dependency for Hyak user tools, e.g. `hyakstorage` or `hyakalloc`.

:::tip PRO TIP: Customization Opportunity
It is possible to change the version of Python that is available in this container by using a text editor like `nano` or `vim` to edit `hyak-container.def` and change the Python version (i.e., change `python39` to something else). You might need to research the correct syntax for installing a different version of Python. We'll talk more about customization later in this section. 
:::

After we have these basic packages installed, we made a couple directories (with `mkdir`) and symbolic links (with `ln -s`). Here is why:
- `/scr` is the path to the node's local SSD storage. This is a default bind-mount for our Apptainer configuration.
- `/mmfs1` is the path to our shared storage device, and this is also a default bind-mount. Like with `/scr`, we just need to provide an empty directory for it to bind to.
- The symbolic links, `/sw`, `/data`, and `/gscratch`, are—like on the nodes—shortcuts to commonly-used directories on `/mmfs1`.

#### `%runscript`: What the container does

```bash title="hyak-container.def"
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

This is the last piece, and it involves just a touch of shell programming. We're using [**a case statement**](https://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_03.html), and we're looking for patterns in the arguments given to the container. Thankfully, our "patterns" are very simplistic:
1. `""`: a blank string, i.e. what happens if you simply do `apptainer run hyak-container.sif`. The default behavior we want is to launch an interactive shell.
1. `*)`: everything else. Any input we receive, we will attempt to run as a command. We are emulating the behavior of `apptainer exec` here, since we're going to try and keep our interactions with `apptainer` as uniform as possible.

### Building containers on Hyak
Container building should be performed in a job—interactive or batch—on a compute node.


:::important Important: Klone-Login Acceptable Uses
Before we continue, here's a quick overview of what kind of activities are allowed on the login nodes:
1. Downloading to or uploading from the cluster.
1. File management like moving, copying, or renaming files and directories.
1. Light text editing with `vim`, `nano`, or another text editor.
1. Interacting with the Slurm scheduler, i.e. to submit jobs.
CPU & memory are closely monitored on the login nodes as they are a finite, shared resource.
If our automation detects unusually high activity, your account will be throttled & you'll
receive an email warning.

In other words, resource-intensive actions like building a container should be done on a node.
:::

We will use a `sbatch` script to build our container, but will submit the build job to a compute node and it will run in the background until it is complete. First, copy the script to your working directory from `/mmfs1/sw/hyak101/python`:

```bash
cp /mmfs1/sw/hyak101/python/container-build.job .
# "." is shorthand for "here" copy the script to the directory where the command was issued (i.e., your working directory)
```
Let's take a look at the script:

```bash title="container-build.job"
#!/bin/bash
#SBATCH --job-name=container-build
#SBATCH --cpus-per-task=1
#SBATCH --mem=16GB
#SBATCH --partition=ckpt
#SBATCH --time=60
#SBATCH --output=%x_%j.out

# The lines above are called sbatch directives (i.e., flags that pass specifications of your job request to Slurm). 
# Let's go through each:
# --job-name=container-build -> this line gives the job the name "container-build"
# --cpus-per-task=1 -> this line requests on CPU for this job
# --mem=16GB -> this line requests on 16GB of RAM for this job
# --partition=ckpt -> this line submits the job to the ckpt partition; you can change this if you have access to other partitions (view your partitions with hyakalloc)
# --time=60 -> this line sets a maximum time limit of 60 minutes for this job; the clock starts when the job starts, not when it is subitted
# --output=%x_%j.out -> saved all output messages that print to the screen (i.e., stdout) to a file called container-build_XXXXXX.out 
# (using the shorthand %x to stand of the job-name and %j which will be the job ID assigned by Slurm)

//highlight-start
mkdir /tmp/$USER
apptainer build /tmp/$USER/hyak-container.sif hyak-container.def
cp /tmp/$USER/hyak-container.sif .
//highlight-end
```
The `#SBATCH` lines tell Slurm what we want: a single CPU and 16GB of RAM, in the `ckpt` partition, with a time limit of 60 minutes.
Using `sbatch` is the best way to submit non-interactive jobs on the cluster, and there are quite a few options.
Check out [**the official Slurm documentation**](https://slurm.schedmd.com/sbatch.html) for more details.

This job is only a few commands. First:

- `mkdir /tmp/$USER`: We're going to build the container in /tmp, so we'll make a subdirectory for our work there.
`$USER` is a default environment variable that expands to your username.

Then, the build:

- `apptainer build`: the Apptainer executable and subcommand.
- `/tmp/$USER/hyak-container.sif`: a temporary place to build the container image. **Important**: building the image in `/tmp/$USER` avoids permissions issues with GPFS, so don't skip this.
- `hyak-container.def`: the path to the container definition we made in our working directory.

Finally, saving our container:

- `cp /tmp/$USER/hyak-container.sif .`: Copy the container image we made in `/tmp` to our working directory (`.`; it is also an option to edit this to show the absolute path to your working directory).

As is, the container is ~4GB and so, you will occupy ~4GB of storage in your working directory. This is why we have stressed several times to thoughtfully select your working directory for this tutorial. Review [**Getting Started.**](https://hyak.uw.edu/docs/hyak101/python/setup#selecting-your-working-directory) for reasons why this is important. Regardless of where you put the final container image, make sure the destination exists & has sufficient space before you submit your job.

:::tip pro tip: stroage monitoring
You can use the `hyakstorage` command to see your file & space quotas, in your home directory and the gscratch directories you can access.
[**Here's our documentation for that command**](https://hyak.uw.edu/docs/storage/gscratch#checking-utilization-hyakstorage).
:::

### Submitting the job

Submit the job to build the container with `sbatch`. 

```bash
sbatch container-build.job
Submitted batch job 12345678
```
Use the `watch` command with the `squeue` command to monitor the job in real time. `watch -n30` will issue the `squeue` every 30 seconds. Use `Ctrl` + `C` to exit the `watch` command.

```bash
watch -n30 squeue --user $USER
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678      ckpt containe UWNetID  R      00:01      1 n3000
# use Ctrl + C to exit the watch command
```

Additionally, you can watch the output messages as the container is built by monitoring the output file that the sbatch script requested, which will appear in your working directory beginning with `container-build_XXXXXX.out` where the X's are the jobID assigned to the job by Slurm. For example (Use `Ctrl` + `C` to exit the `tail` command):

```bash
tail --follow --retry container-build_12345678.out
# Use Ctrl + C to exit the tail command
```

Remember that if for some reason this doesn't work, the container image has already been created and you can find it `/mmfs1/sw/hyak101/python/hyak-container.sif`, and use it with a symbolic link in your working directory (command show at the top of this section. [**Go back to the top**](https://hyak.uw.edu/docs/hyak101/python/container)). 

### Customizing the `hyak-container.sif` for your research project

You now have a generalized container for hyak that you can edit or add your own software to. There are two options for customizing your container: 

1. Edit the `%post` section of `hyak-container.def` to install more packages. 
2. Start a new `.def` file that builds a new container based on `hyak-container.sif` rather than rebuilding the container everytime you want to make a change. 

:::tip PRO TIP
Option 2 above is truely PRO MODE. You can pull ANY container from the internet and make a new `.def` file based on it. This means you can customize ANY container image with your choice of software. For example, the below can be applied to NVIDIA containers, Python containers, Linux foundation containers, YOU NAME IT YOU BUILD IT. 
:::

#### Option 1 container customization: edit `hyak-container.def`

Make a copy of `hyak-container.def` for your custom build.

```bash
cp hyak-container.def hyak-container-custom.def
```

Open `hyak-container-custom.def` with a text editor and add additional installation instructions to the `%post` section. For example, I want to install `matplotlib` with `pip`, so I will add `pip install matplotlib` to `hyak-container-custom.def` as shown below:

```bash title="hyak-container-custom.def"
%post
    dnf install --assumeyes --allowerasing \
      @core @standard slurm python39

    mkdir /scr /mmfs1
    ln --symbolic /mmfs1/sw /sw
    ln --symbolic /mmfs1/data /data
    ln --symbolic /mmfs1/gscratch /gscratch

//highlight-start
    pip install matplotlib
//highlight-end
```

Also make a copy of `container-build.job` to submit this job using the new definition file. 

```bash
cp container-build.job container-build-custom.job
```

Edit the sbatch script `container-build-custom.job` as follows: 
1. Replacing `hyak-container.def` with `hyak-container-custom.def` 
2. Replace `hyak-container.sif` with `hyak-container-custom.sif` to avoid overwriting the original version of the container
3. Change the `--job-name` line to `container-build-custom`

```bash title="container-build-custom.job"
#!/bin/bash
//highlight-start
#SBATCH --job-name=container-build-custom
//highlight-end
#SBATCH --cpus-per-task=1
#SBATCH --mem=16GB
#SBATCH --partition=ckpt
#SBATCH --time=60
#SBATCH --output=%x_%j.out

### Truncated comments section. 

mkdir /tmp/$USER
//highlight-start
apptainer build /tmp/$USER/hyak-container-custom.sif hyak-container-custom.def
cp /tmp/$USER/hyak-container-custom.sif .
//highlight-end
```

Submit the build job.

```bash
sbatch container-build-custom.job
```

When that is complete, the bottom of `container-build-custom_XXXXXX.out` will show that matplotlib and its dependencies were successfully installed with `pip`. `local-custom.sif` is the name of your customized version of `hyak-container-custom.sif` with matplotlib.

#### Option 2 container customization: build on a local container with a new `.def`

We can build custom containers on top of existing containers, which comes with a few benefits: 
1. Saves time during the build because the existing container doesn't have to be rebuilt to install new software. 
2. Avoids errors that could occur from edition the original `.def` file for the container. 

Create an empty text document called `local-custom.def` with the `touch` command: 

```bash
touch local-custom.def
```

Use a text editor to open `local-custom.def` and add the following lines: 

```bash title="local-custom.def"
Bootstrap: localimage
From: /sw/hyak101/python/hyak-container.sif

# From the Hyak Team's General-Purpose container.
# See /sw/hyak101/python/hyak-container.def for build details.

# Adds matplotlib and dependencies.

%post
    pip install matplotlib
```

Also make a copy of `container-build.job` to submit this job using the new definition file. 

```bash
cp container-build.job local-custom-build.job
```

Edit the sbatch script `local-custom-build.job` as follows: 
1. Replacing `hyak-container.def` with `local-custom.def` 
2. Replace `hyak-container.sif` with `local-custom.sif` to avoid overwriting the original version of the container
3. Change the `--job-name` line to `local-custom-build`

```bash title="local-custom-build.job"
#!/bin/bash
//highlight-start
#SBATCH --job-name=local-custom-build
//highlight-end
#SBATCH --cpus-per-task=1
#SBATCH --mem=16GB
#SBATCH --partition=ckpt
#SBATCH --time=60
#SBATCH --output=%x_%j.out

### Truncated comments section. 

mkdir /tmp/$USER
//highlight-start
apptainer build /tmp/$USER/local-custom.sif local-custom.def
cp /tmp/$USER/local-custom.sif .
//highlight-end
```

Submit the build job.

```bash
sbatch local-custom-build.job
```

When that is complete, the bottom of `local-custom-build_XXXXXX.out` will show that matplotlib and its dependencies were successfully installed with `pip`. `local-custom.sif` is the name of your customized version of `hyak-container.sif` with matplotlib.
