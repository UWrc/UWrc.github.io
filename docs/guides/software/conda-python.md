---
title: Python
---

Python is a scripting and general purpose programming language with a rich ecosystem of computational libraries. On both Hyak Klone and Tillicum it's widely used for machine learning (PyTorch, TensorFlow), data science, and general computing. We recommend using the **Conda module** (`module load conda`) as the primary way to manage Python environments on both Hyak Klone and Tillicum. The Conda module was previously available only on Tillicum and is now fully supported on Klone as well. Using the Conda module means no Miniconda installation is required, more efficient storage usage, and cleaner, isolated Python environments that are easier to debug, reproduce, and clean up. For users who need full reproducibility and portability, [**containers**](#containers) are an alternative approach.

## Conda Module

### Load the Conda Module

Load the Conda module to make the `conda` command available:

```js
module load conda
```

After loading the module, you can create and manage your own environments.

:::note Klone Users
On Klone, module commands are **only available on compute nodes**. You must first obtain a compute node via `salloc` or submit a Slurm batch job before running `module load conda`.
:::

:::note Tillicum Users
On Tillicum, modules are available on login nodes. However, login nodes are **CPU-only**. If you need to install packages with GPU support (e.g., PyTorch with CUDA), do so on a compute node with a GPU allocated.
:::

### Create and Manage Environments

Conda allows you to create isolated environments that include specific versions of Python, libraries, and tools.

Create an environment named "myenv" with Python 3.12 and the NumPy package:

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

Remove an environment:

```js
conda env remove --name myenv
```

To install additional packages in your environment, use `conda install`. Conda has several default channels that will be used first for package installation. If you want to use another channel beyond the defaults, you can, but we suggest that you select your channel carefully.

### Storage Considerations

:::warning Home Directory Storage Limit
By default, the system Conda stores environments in your home directory (`$HOME/.conda/envs`). We recommend installing Conda environments to your **project directory** due to the limited storage space (10 GB) in your home directory.

- **Klone**: Use a path under `/gscratch/<group>/<myfolder>`
- **Tillicum**: Use a path under `/gpfs/projects/<group>/<myfolder>`

Please follow the instructions below to customize your environment and package locations.
:::

:::caution Scrubbed Storage Not Recommended
We do not recommend storing Conda environments in scrubbed storage. Many files inside a Conda environment retain the original access times from when they were added to the Conda package cache, not when you created or installed the environment. These files may appear inactive and can be removed by the scrubbed storage erasure policies, leading to corrupted Conda environments.
:::

#### Customize Environment and Package Locations

There are two ways to specify where your Conda environments and packages are stored.

##### Option 1. Use `--prefix` for explicit paths

Manually set the path to your Conda environment with `--prefix` and always activate your Conda environment with the full path.

**Klone:**

```js
module load conda
conda create --prefix /gscratch/<myproject>/<myfolder>/myenv python=3.12
conda activate /gscratch/<myproject>/<myfolder>/myenv
conda install numpy scipy matplotlib
```

**Tillicum:**

```js
module load conda
conda create --prefix /gpfs/<myproject>/<myfolder>/myenv python=3.12
conda activate /gpfs/<myproject>/<myfolder>/myenv
conda install numpy scipy matplotlib
```

##### Option 2. Configure defaults in `$HOME/.condarc`

To make this the default behavior, edit (or create) the file `$HOME/.condarc`:

**Klone:**

```yaml
envs_dirs:
  - /gscratch/<myproject>/<myfolder>/conda/envs
pkgs_dirs:
  - /gscratch/<myproject>/<myfolder>/conda/pkgs
```

**Tillicum:**

```yaml
envs_dirs:
  - /gpfs/<myproject>/<myfolder>/conda/envs
pkgs_dirs:
  - /gpfs/<myproject>/<myfolder>/conda/pkgs
```

This will place all of your environments and package caches in the specified directory by default, and you won't have to worry about specifying the full prefix to your environment when installing it or activating it.

### Installing Packages with pip

You can use `pip` inside a Conda environment to install Python packages. Our suggested use of `pip` is inside a conda environment. For example:

```js
module load conda
conda activate myenv
pip install seaborn
```

This ensures that `pip` installs packages into the active Conda environment — **not globally** — making it easy to clean up completely when you are done.

See the [**best practices from Anaconda**](https://www.anaconda.com/blog/using-pip-in-a-conda-environment) for using `pip` with Conda and the [**pip documentation**](https://pip.pypa.io/en/stable/cli/pip_install/) for more information.

## Containers

While we recommend the Conda module for most Python workflows, containers offer additional benefits for certain use cases: 
* Full reproducibility
* Portability across systems
* Complete encapsulation of the entire software stack including system-level dependencies 

Containers are especially useful for GPU workflows with complex dependencies. The [**NVIDIA NGC Catalog**](https://catalog.ngc.nvidia.com/) has pre-built containers with CUDA and NVIDIA drivers configured that work well with the Hyak Klone and Tillicum computing environments.

For detailed instructions on using Apptainer containers on Hyak, see the [**Containers**](/docs/guides/software/containers) documentation. If you are new to containers, see the [**Containers Tutorial**](/docs/tutorials/containers/syllabus) to get started.

:::tip Cluster-Specific Bind Paths
When running Apptainer containers, remember to bind the correct storage filesystem for your cluster:
- **Klone**: `apptainer shell --bind /gscratch container.sif`
- **Tillicum**: `apptainer shell --bind /gpfs container.sif`
:::

## Additional Resources

- [**Disk Storage Management with Conda**](/blog/conda-disk-storage) — Tips for managing disk storage when using Conda on Hyak.
- [**Conda Configuration Documentation**](https://docs.conda.io/projects/conda/en/latest/configuration.html) — Official reference for `.condarc` options and conda configuration.
