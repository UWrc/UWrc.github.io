---
title: Software Environment
---


Tillicum provides a flexible software environment for research computing. Users can run software through **modules** (via LMOD) or **containers** (via Apptainer).  

## Key Differences from Klone  

- **Modules**: Tillicum uses a **hierarchical module structure**.  
  - First, load a compiler (e.g., GCC, CUDA).  
  - Then, only the modules built with that compiler become visible with `module avail`.  
  - This reduces incompatibilities and helps ensure a smoother user experience. 
  - [**Read more about using modules below.**](#using-modules) 

- **Conda**: Tillicum provides a **Conda module** that simplifies working with Python or other Conda-based environments.  
  - When loaded, the Conda module prints helpful instructions directly to your terminal.  
  - This feature is not yet available on Klone.  

```js
Miniforge (conda) has been loaded.

WARNING: Login nodes are CPU ONLY. Install pkgs with GPU support on compute nodes.

- Please create and work in your own conda environments:
    conda create -n myenv python=3.11
    conda activate myenv

- To customize environment or package locations, edit your ~/.condarc:
    envs_dirs:
      - /path/to/your/envs
    pkgs_dirs:
      - /path/to/your/pkgs

  For more information, see:
    https://docs.conda.io/projects/conda/en/latest/configuration.html

- If your personal Conda stops working after unloading this module, try:
    source ~/.bashrc
```

- **Containers**: Tillicum supports **Apptainer containers** for running portable, reproducible software stacks. However, on Tillicum the GPFS storage filesystem named `/gpfs` so remember to use `--bind /gpfs`.

```js
apptainer shell --bind /gpfs container.sif
```
We highly recommend using containers to build your software environment on Tillicum. In particular, [**NVIDIA NGC Catalog**](https://catalog.ngc.nvidia.com/?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=) has pre-built containers with CUDA and NVIDIA drivers configured, which work well with the Tillicum environment. 

If you are new to containers, we recommend our [**Containers Tutorial**](../hyak101/containers/syllabus.md).

--- 

## Using Modules  

### Command Summary

The module command sets the appropriate environment variable independent of your shell.

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
`ml` can be used instead of module, module load, or module list depending on the situation. This can be seen in the examples below.
:::

| Example | Equivalent|
|:-----|:-----|
| `ml` | `module list` |
| `ml [module]` | `module load [module]` |
| `ml -[module]` | `module unload [module]` |
| `ml avail` | `module avail` |

Any module sub-commands (e.g., avail, spider, show, etc.) can be written as `ml subcommand arg1 arg2`.

### Finding Modules

#### `module avail`

List all modules visible in your current session:

```js
$ module avail

--------------------------------- /gpfs/software/modulefiles/Core ---------------------------------
   conda/Miniforge3-25.3.1-3    gcc/13.4.0      (D)    parallel/20240822
   gcc/11.5.0                   jupyter/minimal

  Where:
   D:  Default Module
   . . .
```

To narrow results, for instance, if you want to see all `gcc` modules:

```js
$ module avail gcc

--------------------------------- /gpfs/software/modulefiles/Core ---------------------------------
   gcc/11.5.0    gcc/13.4.0 (D)
   . . .
```

#### `module spider`

Perform a **deep search** through all module hierarchies, even ones not currently visible. Note that module avail doesn't show modules from all trees in the hierarchical system. If you want to know all available software on the system, please use `module spider`.

```js
$ module spider cuda

------------------------------------------------------------------------------------------------
  cuda:
------------------------------------------------------------------------------------------------
    Description:
      NVIDIA CUDA Toolkit for GPU-accelerated computing.

     Versions:
        cuda/12.4.0
        cuda/12.9.1
        cuda/13.0.0

------------------------------------------------------------------------------------------------
  For detailed information about a specific "cuda" package (including how to load the modules) use t
he module's full name.
  Note that names that have a trailing (E) are extensions provided by other modules.
  For example:

     $ module spider cuda/13.0.0
------------------------------------------------------------------------------------------------
```

```js
$ module spider cuda/13.0.0

------------------------------------------------------------------------------------------------
  cuda: cuda/13.0.0
------------------------------------------------------------------------------------------------
    Description:
      NVIDIA CUDA Toolkit for GPU-accelerated computing.


    You will need to load all module(s) on any one of the lines below before the "cuda/13.0.0" module is available to load.

      gcc/13.4.0
 
    Help:
      Adds CUDA Toolkit 13.0.0 to your environment.
      
      The NVIDIA CUDA Toolkit provides a development environment for creating high-performance, GPU-
accelerated applications. The toolkit includes GPU-accelerated libraries, debugging and optimization
 tools, a C/C++ compiler, and a runtime library.
```

A modulefile's complete name includes its name and version. An installed application can have several versions. 

`module spider cuda/13.0.0` illustrates that `gcc/13.4.0` needs to be loaded at first before `cuda/13.0.0` is available to load.

:::tip
`module spider` is the most reliable way to see all installed software and learn what prerequisites must be loaded first. **Always use `module spider` instead of `module avail` to find out how to `module load`.**
:::

### Module Hierarchies

Tillicum uses a hierarchical module structure to ensure compatibility between software stacks.

#### Hierarchy Levels

In Lmod module hierarchy, each compiler module adds to the `MODULEPATH` a compiler version modulefile directory. Similarly, applications that use libraries depending on MPI implementations must be built with the same compiler - MPI pairing. This leads to modulefile hierarchy.

#### Example

With a clean environment `module avail` lists only the available core modules which include compilers.

```js
$ module avail

--------------------------------- /gpfs/software/modulefiles/Core ---------------------------------
   conda/Miniforge3-25.3.1-3    gcc/13.4.0      (D)    parallel/20240822
   gcc/11.5.0                   jupyter/minimal
```

Once you load a particular compiler, you will only see the modules that depend on that compiler with `module avail`.

```js
$ module load gcc/13.4.0
$ module avail

------------------------------ /gpfs/software/modulefiles/gcc/13.4.0 ------------------------------
   cmake/3.31.8    cuda/12.9.1 (D)    cuda/13.0.0    ffmpeg/7.1

--------------------------------- /gpfs/software/modulefiles/Core ---------------------------------
   conda/Miniforge3-25.3.1-3    gcc/13.4.0      (L,D)    parallel/20240822
   gcc/11.5.0                   jupyter/minimal
```

Now CUDA modules built with GCC 13.4.0 become visible.

Then load CUDA and MPI:

```js
$ module load cuda/12.9.1
$ module load openmpi/5.0.8
$ module list

Currently Loaded Modules:
  1) gcc/13.4.0   2) cuda/12.9.1   3) openmpi/5.0.8
```

If you swap compilers, Lmod automatically unloads any modules that depends on the old compiler and reloads those modules that are dependent on the new compiler.

```js
$ module load gcc/11.5.0 

Inactive Modules:
  1) openmpi/5.0.8

The following have been reloaded with a version change:
  1) cuda/12.9.1 => cuda/12.4.0     2) gcc/13.4.0 => gcc/11.5.0
```

:::warning
Do not include `module load` commands in your startup files (e.g., $HOME/.bashrc and $HOME/.bash_profile). This can cause conflicts when switching environments in batch jobs or interactively.
:::

### User Collections

You can save and restore commonly used modules using [**user collections**](https://lmod.readthedocs.io/en/latest/010_user.html#user-collections). Note that Lmod can load only one user collection at a time.

## Conda Environments

Conda allows you to create isolated environments that include specific versions of Python, libraries, and tools. 

### Load Conda Module

First, load the Conda module:

```js
$ module load conda
```

After loading the module, the `conda` command becomes available. You can now create and manage your own environments.

### Create and Manage Conda Environments

For example, create an environment named "myenv" with Python 3.12 and the NumPy package:

```js
conda create --name myenv python=3.12 numpy
```

Activate the environment to use it:

```js
conda activate myenv
```

List your available Conda environments:

```js
conda env list
```

To install additional packages in `myenv` environment, use `conda install`. Conda has several default channels that will be used first for package installation. If you want to use another channel beyond the defaults channel, you can, but we suggest that you select your channel carefully.

:::warning
By default, the system Conda stores environments in your home directory ($HOME/.conda/envs). We recommend installing Conda environments to your **project directory** under `/gpfs/<myproject>/<myfolder>` (see instructions below) due to the limited storage space (10 GB) in your home directory. 

`scrubbed` is also **not recommended** for storing Conda environments. Many files inside a Conda environment retain the original access times from when they were added to the Conda package cache or source, not when you created or installed the environment. Therefore, these files may appear inactive and can be removed by the scrubbed storage erasure policies, leading to corrupted Conda environments.
:::

Remove an environment:

```js
conda env remove --name myenv
```

### Customize Environment and Package Locations

There are two ways to specify where your Conda environments and packages are stored.

#### Option 1. Use `--prefix` for explicit paths

Manually set the path to your Conda environment by `--prefix` and always activate your Conda environment with full path.

```js
module load conda
conda create --prefix /gpfs/<myproject>/<myfolder>/myenv python=3.12
conda activate /gpfs/<myproject>/<myfolder>/myenv
conda install numpy scipy matplotlib
```

#### Option 2. Configure defaults in `$HOME/.condarc`

To make this the default behavior, edit (or create) the file `$HOME/.condarc`:

```yaml
envs_dirs:
  - /gpfs/<myproject>/<myfolder>/conda/envs
pkgs_dirs:
  - /gpfs/<myproject>/<myfolder>/conda/pkgs
```

This will place all of your environments and package caches in this directory by default, and you won't have to worry about specifying the full prefix to your environment when installing it or activating it.

### Installing Packages with `pip`

You can use `pip` inside a Conda environment to install Python packages. Our suggested use of pip is inside a conda environment. For example:

```js
module load conda
conda activate myenv
pip install seaborn
```

This ensures that `pip` installs packages into the active Conda environment — **not globally** — making it easy to clean up completely when you are done.

See the [**best practices**](https://www.anaconda.com/blog/using-pip-in-a-conda-environment) from Anaconda for using `pip` with Conda and [**pip documentation**](https://pip.pypa.io/en/stable/cli/pip_install/) for more information.
