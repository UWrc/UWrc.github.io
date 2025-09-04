---
id: environment
title: Software Environment
---


Tillicum provides a flexible software environment for research computing. Users can run software through **modules** (via LMOD) or **containers** (via Apptainer).  

## Key Differences from Klone  

- **Modules**: Tillicum uses a **hierarchical module structure**.  
  - First, load a compiler (e.g., GCC, CUDA).  
  - Then, only the modules built with that compiler become visible.  
  - This reduces incompatibilities and helps ensure a smoother user experience. 
  - [<ins>**Read more about using modules below.**</ins>](#using-modules) 

- **Conda**: Tillicum provides a **Conda module** that simplifies working with Python or other Conda-based environments.  
  - When loaded, the Conda module prints helpful instructions directly to your terminal.  
  - This feature is not yet available on Klone.  

```js
Miniforge (conda) has been loaded.

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
We highly recommend using containers to build your software environment on Tillicum. In particular, [<ins>**NVIDIA NGC Catalog**</ins>](https://catalog.ngc.nvidia.com/?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=) has pre-built containers with CUDA and NVIDIA drivers configured, which work well with the Tillicum environment. 

If you are new to containers, we recommend our [<ins>**Containers Tutorial**</ins>](../hyak101/containers/syllabus.md).

## Using Modules  

Modules help you load compilers, libraries, and applications into your environment. Tillicum uses a **hierarchical module structure**.

With a clean environment `module avail` lists only the available core modules which include compilers.

```js
module avail
```
Results as of September 3, 2025. 
```js

----------------------- /gpfs/software/modulefiles/Core -----------------------
   conda/Miniforge3-25.3.1-3        cuda/13.0.0    parallel/20240822
   cuda/12.9.1               (D)    gcc/13.4.0

```

Once you select you a compiler, the output of `module avail` will change to show you only the modules that were built using the selected compiler. For exmaple, **CMake 3.31.8** can be loaded by first loading **GCC 13.4.0**.

```js
module load gcc/13.4.0
```

```js
-------------------- /gpfs/software/modulefiles/gcc/13.4.0 --------------------
   cmake/3.31.8    ffmpeg/7.1

----------------------- /gpfs/software/modulefiles/Core -----------------------
   conda/Miniforge3-25.3.1-3        cuda/13.0.0        parallel/20240822
   cuda/12.9.1               (D)    gcc/13.4.0  (L)
   ```

Then load **CMake 3.31.8**

```js
module load cmake/3.31.8
```

To clear the module list use 

```js
module purge
```

**OpenMPI 5.0.8** on Tillicum was built with **GCC 13.4.0** and **CUDA 12.9.1**. Load it with 

```js
module load gcc/13.4.0

module load cuda/12.9.1

module load openmpi/5.0.8
```
