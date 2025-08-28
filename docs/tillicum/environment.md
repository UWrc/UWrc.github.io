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

- **Containers**: Tillicum supports **Apptainer containers** for running portable, reproducible software stacks. However, on Tillicum the GPFS storage filestsem named `/gpfs` so remember to use `--bind /gpfs`.

```js
apptainer shell --bind /gpfs container.sif
```
