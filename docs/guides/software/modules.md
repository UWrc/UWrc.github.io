---
title: Modules
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Modules are a method of modifying your environment that are unique to some software you're trying to run. It allows you to quickly switch between different programs or different versions of the same program. Both Klone and Tillicum use Lmod for module management, but with some differences in how modules are organized.

## Basics

### What software is available?

```js
module avail
```

### What modules do I currently have loaded?

```js
module list
```

### How to (un)load a software?

Replace "software" below with a specific module you know exists or identified via `module avail` above.

```js
module load <software>
```

Conversely, you can unload a specific module.

```js
module unload <software>
```

You can unload every module you might have loaded.

```js
module purge
```

### Command Summary

| Command | Description|
|:-----|:-----|
| `module list` | List active modules in the current session |
| `module avail` | List available modules in `MODULEPATH` |
| `module spider [module]`| Search all modules in `MODULEPATH` and every module hierarchy |
| `module load [modules]` | Load modules |
| `module swap [module1] [module2]` | Replace `module1` with `module2` |
| `module unload [modules]` | Unload specific modules |
| `module purge` | Unload ALL modules from the current session |
| `module show [module]` | Show functions performed by loading module |
| `module help [module]` | Show module-specific help message |
| `module use [-a] [path]` | Prepend or append path to `MODULEPATH` |

Lmod provides a convenient shortcut command [**`ml`**](https://lmod.readthedocs.io/en/latest/010_user.html#ml-a-convenient-tool) for the `module` command.

:::tip
`ml` can be used instead of module, module load, or module list depending on the situation.
:::

| Example | Equivalent|
|:-----|:-----|
| `ml` | `module list` |
| `ml [module]` | `module load [module]` |
| `ml -[module]` | `module unload [module]` |
| `ml avail` | `module avail` |

:::tip
The Hyak team encourages the use of Apptainer to better promote computational portability and reproducibility. You can read more about Apptainer [**here**](containers.md).
:::

---

## Module Structure

:::info Select your system
Hyak Klone and Tillicum handle modules differently. Use the tabs below to view instructions for the system you're working on. Your selection applies to the entire page.
:::

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

Klone uses a **flat module structure**. The Hyak team maintains most core modules for building software, including GNU compilers (e.g., `gcc`, `g++`, `gfortran`) or their Intel compiler equivalents as well as select MPI libraries.

There is a larger list of modules maintained by the broader Hyak community that appears when you run `module avail`. **Community created or "contrib" modules are provided as is.** Community modules on Klone are separated into a lower section and within the lower section each module is further prefixed by the respective group that created the module. Not all contributed modules are publicly available.

### Login vs Compute Node

Modules are meant to be set up for programs used in intensive computing; they should only be loaded on compute nodes. To reinforce this point the `module` command does not exist on the login nodes. If you try to run the `module` command you will receive a warning message. This warning is benign and you can even disable it if you have modules loading in your start up shell file (e.g., `.bashrc`, `.zshrc`).

If you wanted to be more discerning, the logic is useful to include in your start up shell file for identifying if the host is a login node:

```
export LOGIN_NODE=$(hostname | grep -q '^klone1' ; echo $?)

if [[ $LOGIN_NODE ]]
then
	echo "This is a login node"
else
	echo "This is a compute node"
fi
```

</TabItem>
<TabItem value="tillicum" label="Tillicum">

Tillicum uses a **hierarchical module structure**. This means:

1. First, load a compiler (e.g., GCC, CUDA).
2. Then, only the modules built with that compiler become visible with `module avail`.
3. This reduces incompatibilities and helps ensure a smoother user experience.

### Finding Modules

#### `module avail`

With a clean environment, `module avail` lists only the available core modules which include compilers:

```js
$ module avail

----- /gpfs/software/modulefiles/Core -----
   conda/Miniforge3-25.3.1-3    gcc/13.4.0      (D)    parallel/20240822
   gcc/11.5.0                   jupyter/minimal
```

#### `module spider`

Perform a **deep search** through all module hierarchies, even ones not currently visible:

```js
$ module spider cuda

-----
  cuda:
-----
     Versions:
        cuda/12.4.0
        cuda/12.9.1
        cuda/13.0.0
```

```js
$ module spider cuda/13.0.0

  You will need to load all module(s) on any one of the lines below
  before the "cuda/13.0.0" module is available to load.

      gcc/13.4.0
```

:::tip
`module spider` is the most reliable way to see all installed software and learn what prerequisites must be loaded first. **Always use `module spider` instead of `module avail` to find out how to `module load`.**
:::

### Module Hierarchies

Once you load a particular compiler, you will only see the modules that depend on that compiler:

```js
$ module load gcc/13.4.0
$ module avail

----- /gpfs/software/modulefiles/gcc/13.4.0 -----
   cmake/3.31.8    cuda/12.9.1 (D)    cuda/13.0.0    ffmpeg/7.1

----- /gpfs/software/modulefiles/Core -----
   conda/Miniforge3-25.3.1-3    gcc/13.4.0      (L,D)    parallel/20240822
   gcc/11.5.0                   jupyter/minimal
```

Then load CUDA and MPI:

```js
$ module load cuda/12.9.1
$ module load openmpi/5.0.8
$ module list

Currently Loaded Modules:
  1) gcc/13.4.0   2) cuda/12.9.1   3) openmpi/5.0.8
```

If you swap compilers, Lmod automatically unloads dependent modules and reloads compatible ones:

```js
$ module load gcc/11.5.0 

Inactive Modules:
  1) openmpi/5.0.8

The following have been reloaded with a version change:
  1) cuda/12.9.1 => cuda/12.4.0     2) gcc/13.4.0 => gcc/11.5.0
```

:::warning
Do not include `module load` commands in your startup files (e.g., `$HOME/.bashrc` and `$HOME/.bash_profile`). This can cause conflicts when switching environments in batch jobs or interactively.
:::

### User Collections

You can save and restore commonly used modules using [**user collections**](https://lmod.readthedocs.io/en/latest/010_user.html#user-collections). Note that Lmod can load only one user collection at a time.

</TabItem>
</Tabs>

---

## Creating Custom Modules

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

### Personal Lmod Modules

This [**advanced user documentation**](https://lmod.readthedocs.io/en/latest/020_advanced.html) from the Lmod developers walks you through creating personal modules. You need to compile your code separately first. In short, you provide a command directing it to the folder with your collection of module files:

```js
module use /path/to/personal/modulefiles
```

In this case you'll likely use a sub-directory under your lab's `/gscratch` folder or your home directory and create individual folders with independent software packages. Once you have code compiled, a modulefile needs to be created for each software package you installed. There are some examples from basic to advanced [**here**](https://lmod.readthedocs.io/en/latest/100_modulefile_examples.html).

### Shared Lmod Modules

Each group has a special folder for installing codes that are intended to be shared for all Klone users. Each folder gets a 100GB block quota and 160,000 inode quota at `/sw/contrib/mylab-src` where "mylab" is your account affiliation. We can raise these limits if specific code compiles require, however, in our experience the default quotas are sufficient for all but the most rare cases.

You place your modulefiles in `/sw/contrib/modulefiles/mylab` and when anyone runs `module avail` it will now appear in the "contrib" section in the lower half. Note the prefix is automatically tagged to your group name.

</TabItem>
<TabItem value="tillicum" label="Tillicum">

### Personal Lmod Modules

You can create personal modules on Tillicum following the same approach as Klone. Point Lmod to your custom modulefile directory:

```js
module use /path/to/personal/modulefiles
```

Place your modulefiles in a directory under your project space on `/gpfs`. See the Lmod [**advanced user documentation**](https://lmod.readthedocs.io/en/latest/020_advanced.html) for details on writing modulefiles.

:::note
Because Tillicum uses a hierarchical module structure, your custom modules should be organized to match the hierarchy if they depend on specific compilers or CUDA versions.
:::

</TabItem>
</Tabs>

---

## Additional Resources

- Lmod [**documentation**](https://lmod.readthedocs.io/en/latest/)
- Lmod [**project page**](https://www.tacc.utexas.edu/research-development/tacc-projects/lmod) (Texas Advanced Computing Center)
- Environment Modules [**documentation**](https://modules.readthedocs.io/en/latest/)
