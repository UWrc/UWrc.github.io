---
id: modules
title: Modules
---

Modules are a method of modifying your environment that are unique to some software you're trying to run. It allows you to quickly switch between different programs or different versions of the same program.

## Basics

### What software is available?

```bash
module avail
```

The research computing team will maintain most of the core modules for building software, this includes GNU compilers (e.g., `gcc`, `g++`, `gfortran`) or their Intel compiler equivalents as well as most MPI libraries.

:::caution
As a legacy policy on MOX, any module with a "contrib" prefix is community generated and made available as-is without any support or guarantees. 
:::

Please refer to the cluster specific sections on KLONE [[link](#how-do-i-create-my-own-lmod-module-on-klone)] and MOX [[link](#how-do-i-create-my-own-environment-module-on-mox)] below for more details on creating your own modules.

:::tip
The HYAK team encourages the use of Singularity to better promote computational portability and reproducibility. You can read more about Singularity [[link](containers.md)] after loading its module.
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

The KLONE cluster uses the more feature-rich LMOD implementation of modules.

### LMOD

![LMOD](../../static/img/docs/tools-modules-lmod.png)

LMOD [[documentation](https://lmod.readthedocs.io/en/latest/)] [[project page](https://www.tacc.utexas.edu/research-development/tacc-projects/lmod)] is an upgraded implementation of environment modules created by the Texas Advanced Computing Center (TACC) at the University of Texas.

### How do I create my own LMOD module on KLONE?

This advanced user documentation page from the LMOD developers walks you through this [[link](https://lmod.readthedocs.io/en/latest/020_advanced.html)]. In short, you provide a command:

```bash
module use /path/to/personal/modulefiles
```

In this case you'll likely use a sub-directory under your lab's `/gscratch` folder and create individual folders with independent software packages. Once you have code compiled a modulefile needs to be created for each software package you installed, there are some examples from basic to advanced [[link](https://lmod.readthedocs.io/en/latest/100_modulefile_examples.html)]. You're welcome to <a href="mailto:help@uw.edu?subject=klone module help">email</a> us if you have any questions about modulefile creation.

## MOX

The MOX cluster uses an simpler implementation of modules called environment modules.

### Environment Modules

![Environment modules](../../static/img/docs/tools-modules-environment.png)

Environment modules [[documentation](https://modules.readthedocs.io/en/latest/)] [[Wikipedia](https://en.wikipedia.org/wiki/Environment_Modules_(software))] has a long development history going back to the 1990's. It's still in use today due to its simplicity and ease of deployment for cluster administrators and end users alike.

### How do I create my own environment module on MOX?

Compile your code under `/sw/contrib/` then create a modulefile under `/sw/modules-1.775/modulefiles/contrib/` and it will appear when you run `module avail`. There are existing modulefiles there you can use as a template for creating your own.

:::caution
Any `contrib` modules on MOX are provided and maintained by the local research community. Since no one except the original authors can vouch for the software supply chain provenance, anything under `contrib` is made publicly available as-is without any support, warranty, or guarantees.
:::
