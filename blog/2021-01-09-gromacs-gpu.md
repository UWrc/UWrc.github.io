---
id: gromacs-gpu
title: gromacs on GPUs
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [gromacs, molecular dynamics, md, gpu, cuda, cuda11]
---

:::info
During the January 12, 2021 mox maintenance period long overdue package updates will be applied. The most user impactful upgrade is the GPU driver from to 418.40.04 to 460.27.04 that will allow for CUDA 11 support (up from CUDA 10).
:::

The second most widely used GPU-enabled workflow on HYAK (besides machine learning) is molecular dynamics (MD) so we wanted to test one of the most popular MD codes, gromacs [[source](http://www.gromacs.org/About_Gromacs)], and ensure this driver upgrade wouldn't negatively impact our researchers. I couldn't find gromacs compiled with GPU support currently in our module collection so I used it as an opportunity to create one for you all, read on!

:::warning
This is an excercise to demonstrate the support for molecular dynamics on GPUs as a proof-of-concept. Scientific verification of the software compile options (e.g., single-precision) and its results is the responsibility of the researcher.
:::

## Using gromacs

I'll start with the end result for those of you who just want to use it but following that I'll dive into the nuts and bolts of how we created the module so you can perform additional optimizations.

This is a GPU-enabled version of gromacs so we need a GPU first (can verify with `nvidia-smi`).

```bash
srun -p build-gpu --time=4:00:00 -n 4 --mem=20G --gpus=1 --pty $0
```

### gromacs-2020.4 module

Once we have a GPU we use modules to load gromacs-2020.4 and all its required dependencies (e.g., CUDA11).

```bash
module load gromacs/2020.4-cuda11.1
```

All packages are sub-commands of the `gmx` binary so you can verify the module.

```shell-session terminal=true
$ gmx -version
        :-) GROMACS - gmx, 2020.4 (-:

GROMACS version:    2020.4  
Verified release checksum is 79c2857291b034542c26e90512b92fd4b184a1c9d6fa59c55f2e24ccf14e7281
Precision:          single  
Memory model:       64 bit  
MPI library:        thread_mpi
OpenMP support:     enabled (GMX_OPENMP_MAX_THREADS = 64)
GPU support:        CUDA
SIMD instructions:  AVX_512 
FFT library:        fftw-3.3.3-sse2
RDTSCP usage:       enabled 
TNG support:        enabled 
Hwloc support:      hwloc-1.11.8
Tracing support:    disabled
C compiler:         /sw/gcc/10.1.0/bin/gcc GNU 10.1.0
C compiler flags:   -mavx512f -mfma -fexcess-precision=fast -funroll-all-loops -O3 -DNDEBUG
C++ compiler:       /sw/gcc/10.1.0/bin/g++ GNU 10.1.0
C++ compiler flags: -mavx512f -mfma -fexcess-precision=fast -funroll-all-loops -fopenmp -O3 -DNDEBUG
CUDA compiler:      /sw/cuda/11.1.1-1/bin/nvcc nvcc: NVIDIA (R) Cuda compiler driver;Copyright (c) 2005-2020 NVIDIA Corporation;Built on Mon_Oct_12_20:09:46_PDT_2020;Cuda compilation tools, release 11.1, V11.1.105;Build cuda_11.1.TC455_06.29190527_0
CUDA compiler flags:-gencode;arch=compute_35,code=sm_35;-gencode;arch=compute_37,code=sm_37;-gencode;arch=compute_50,code=sm_50;-gencode;arch=compute_52,code=sm_52;-gencode;arch=compute_60,code=sm_60;-gencode;arch=compute_61,code=sm_61;-gencode;arch=compute_70,code=sm_70;-Wno-deprecated-gpu-targets;-gencode;arch=compute_35,code=compute_35;-gencode;arch=compute_50,code=compute_50;-gencode;arch=compute_52,code=compute_52;-gencode;arch=compute_60,code=compute_60;-gencode;arch=compute_61,code=compute_61;-gencode;arch=compute_70,code=compute_70;-gencode;arch=compute_75,code=compute_75;-gencode;arch=compute_80,code=compute_80;-use_fast_math;;-mavx512f -mfma -fexcess-precision=fast -funroll-all-loops -fopenmp -O3 -DNDEBUG
CUDA driver:        11.20   
CUDA runtime:       11.10   
```

### Test simulation of Lysozyme

I used a tutorial from the gromacs website [here](http://www.gromacs.org/@api/deki/files/198/=gmx-tutorial.pdf) to show it runs processes on GPU(s). The tutorial runs an MD simulation on a lysozyme but that's the extent of my study there. The commands below are a summary of the tutorial with a note that the `genbox` subcommand is now replaced by `solvate`.

```bash
gmx pdb2gmx -f 1LYD.pdb -water tip3p
gmx editconf -f conf.gro -bt dodecahedron -d 0.5 -o box.gro
gmx solvate -cp box.gro -cs spc216.gro -p topol.top -o solvated.gro
gmx trjconv -s solvated.gro -f solvated.gro -o solvated.pdb
gmx grompp -f em.mdp -p topol.top -c solvated.gro -o em.tpr -maxwarn 3
```

The final gromacs command below starts the fun, the documentation suggests it will automatically identify the GPUs available to send work to them. However, there are more explicit GPU arguments we encourage you to explore.

```bash
gmx mdrun -v -deffnm em
```

You can `ssh` into the node you're using in a separate window to have a parallel `nvidia-smi` command run so we can monitor the load on the GPU(s).

```shell-session terminal=true
+-------------------------------------------------------------------+
| Processes:                                                        |
|  GPU   GI   CI        PID   Type   Process name        GPU Memory |
|        ID   ID                                         Usage      |
|===================================================================|
|    0   N/A  N/A    143353      C   gmx                     165MiB |
|    1   N/A  N/A    143353      C   gmx                     165MiB |
|    2   N/A  N/A    143353      C   gmx                     167MiB |
|    3   N/A  N/A    143353      C   gmx                     167MiB |
|    4   N/A  N/A    143353      C   gmx                     167MiB |
|    5   N/A  N/A    143353      C   gmx                     167MiB |
|    6   N/A  N/A    143353      C   gmx                     167MiB |
|    7   N/A  N/A    143353      C   gmx                     165MiB |
+-------------------------------------------------------------------+
```

We can see a process occuping each GPU so it works! At least, gromacs uses GPUs...the GPUs themselves weren't stressed heavily and that requires the user to increase the number of rank processes and match that with available GPUs. You can do this by adding arguments to the `gmx mdrun` command but by default it did 2 ranks per GPU it detected, which is not a lot.

## (Optional) Compile Notes

You need CUDA11, GNU Compiler, and OpenBLAS library for the version I put together but I was focused on a proof-of-concept and not squeezing out every last drop of performance. There's a lot of further optimization to be done and that's left as an exercise for the reader:

1. Try the Intel compiler and see if it provides further optimization for non-GPU parts of the workflow.
2. Try other math libraries (e.g., MKL) and see if it speeds things up.
3. Add in MPI support if you want to use multiple GPUs across multiple nodes.
4. Add in modules (e.g., PLUMED).
5. Other stuff I can't think of with compile flags [[here](https://manual.gromacs.org/documentation/2020/install-guide/index.html)].

### Download Source

From the login node I staged a folder in the [modules](/docs/tools/modules) directory.

```bash
cd /sw/gromacs/2020.4-cuda11.1
```

Grab regression tests.

```bash
wget http://gerrit.gromacs.org/download/regressiontests-2020.4.tar.gz
```

Download gromacs-2020.4 [[source](https://manual.gromacs.org/documentation/2020.4/download.html)].

```bash
wget ftp://ftp.gromacs.org/pub/gromacs/gromacs-2020.4.tar.gz
```

### Get a GPU and Code

I used the shared `build-gpu` node for an interactive session but if you are affiliated with a group that has their own you can use that instead.

```bash
srun -p build-gpu --time=4:00:00 -n 4 --mem=20G --gpus=1 --pty $0
```

Once you get a session with GPU (you can run `nvidia-smi` to confirm you see one). Extract regression tests.

```bash
tar xvzf regressiontests-2020.4.tar.gz
```

Do the same for the gromacs code and enter the directory.

```bash
tar xzvf gromacs-2020.4.tar.gz
cd gromacs-2020.4
```

### Pre-requisite Modules

Modules loaded individually for readability but you could load all modules in one command. Get a refresher on modules [here](/docs/tools/modules).

```bash
module load cmake/3.11.2
module load gcc/10.1.0
module load cuda/11.1.1-1
module load contrib/openblas/0.2.20
```

### Compile

I created a subdirectory within the source to compile.

```bash
mkdir cuda11
cd cuda11
```

Use `cmake` to create the `Makefile`. **Note**: if you copy-and-paste the `cmake` command below you *will* have to modify the paths referenced for your environment.

```bash
cmake .. -DGMX_BUILD_OWN_FFTW=OFF -DREGRESSIONTEST_DOWNLOAD=OFF -DGMX_GPU=ON -DGMX_MPI=OFF -DCMAKE_INSTALL_PREFIX=/sw/gromacs/2020.4-cuda11.1 -DREGRESSIONTEST_PATH=/sw/gromacs/2020.4-cuda11.1/regressiontests-2020.4 -DCUDA_TOOLKIT_ROOT_DIR=/sw/cuda/11.1.1-1
```

With the `Makefile` ready you can run `make -j 4` and replace 4 with however many cores you have in your session then `make install`. I created the module file separately so you can load it with `module load gromacs/2020.4-cuda11.1` and run the single `gmx` binary.
