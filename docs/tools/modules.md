---
id: modules
title: Modules
---

Modules are a method of modifying your environment that are unique to some software you're trying to run. It allows you to quickly switch between different programs or different versions of the same program.

## Basics

Please refer to the cluster specific sections on KLONE [[link](#klone)] and MOX [[link](#mox)] below for more details on creating your own modules.

### What software is available?

```bash
module avail
```

The research computing team will maintain most of the core modules for building software, this includes GNU compilers (e.g., `gcc`, `g++`, `gfortran`) or their Intel compiler equivalents as well as select MPI libraries.

There is a larger list of modules maintained by the broader HYAK community that appears when you run this command. **Community created or "contrib" modules are provided as is.** Community modules on KLONE are separated into a lower section and within the lower section each module is further prefixed by the respective group that created the module. All modules appear together when you run this command on MOX but the community provided modules appear with a "contrib" prefix.

:::tip
The HYAK team encourages the use of Apptainer to better promote computational portability and reproducibility. You can read more about Apptainer [[link](containers.md)] after loading its module.
:::

### What modules do I currently have loaded?

```bash
module list
```

### How to (un)load a software?

Replace "software" below with a specific module you know exists or identified via `module avail` above.

```bash
module load <software>
```

Conversely, you can unload a specific module.

```bash
module unload <software>
```

You can unload every module you might have loaded.

```bash
module purge
```

## KLONE

The KLONE cluster uses the more feature-rich LMOD implementation of modules. You're welcome to <a href="mailto:help@uw.edu?subject=klone module help">email</a> us if you have any questions about modulefile creation on KLONE.

### LMOD

![LMOD](../../static/img/docs/tools-modules-lmod.png)

LMOD [[documentation](https://lmod.readthedocs.io/en/latest/)] [[project page](https://www.tacc.utexas.edu/research-development/tacc-projects/lmod)] is an upgraded implementation of environment modules created by the Texas Advanced Computing Center (TACC) at the University of Texas.

### How do I create personal LMOD modules on KLONE?

This advanced user documentation page from the LMOD developers walks you through this [[link](https://lmod.readthedocs.io/en/latest/020_advanced.html)]. You need to compile your code separately first. In short, you provide a command directing it to the folder with your collection of module files:

```bash
module use /path/to/personal/modulefiles
```

In this case you'll likely use a sub-directory under your lab's `/gscratch` folder or your home directory and create individual folders with independent software packages. Once you have code compiled a modulefile needs to be created for each software package you installed, there are some examples from basic to advanced [[link](https://lmod.readthedocs.io/en/latest/100_modulefile_examples.html)]. 

### How do I create shared LMOD modules on KLONE?

Each group has a special folder for installing codes that are intended to be shared for all KLONE users. Each folder here gets a 100GB block quota and 160,000 inode quota at `/sw/contrib/mylab-src` where "mylab" is your account affiliation. We can raise these limits if specific code compiles require, however, in our experience the default quotas are sufficient for all but the most rare cases.

You place your modulefiles in `/sw/contrib/modulefiles/mylab` and when anyone runs `module avail` it will now appear in the "contrib" section in the lower half. Note the prefix is automatically tagged to your group name for you to more easily identify the ones you contributed (and likely will use most regularly).

## MOX

The MOX cluster uses an simpler implementation of modules called environment modules. You're welcome to <a href="mailto:help@uw.edu?subject=mox module help">email</a> us if you have any questions about modulefile creation on MOX.

### Environment Modules

![Environment modules](../../static/img/docs/tools-modules-environment.png)

Environment modules [[documentation](https://modules.readthedocs.io/en/latest/)] [[Wikipedia](https://en.wikipedia.org/wiki/Environment_Modules_(software))] has a long development history going back to the 1990's. It's still in use today due to its simplicity and ease of deployment for cluster administrators and end users alike.

### How do I create my own environment module on MOX?

Compile your code under `/sw/contrib/` then create a modulefile under `/sw/modules-1.775/modulefiles/contrib/` and it will appear when you run `module avail`. There are existing modulefiles there you can use as a template for creating your own.

:::caution
Any `contrib` modules on MOX are provided and maintained by the local research community. Since no one except the original authors can vouch for the software supply chain provenance, anything under `contrib` is made publicly available as-is without any support, warranty, or guarantees.
:::
