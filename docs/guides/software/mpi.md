---
title: MPI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[**Message Passing Interface (MPI)**](https://www.mpi-forum.org/) is commonly used to run parallel applications across multiple CPU cores or nodes. MPI is closely tied to the compiler and MPI implementation used to build an application, so use the same MPI module when compiling and running your code.

Use [**environment modules**](./modules) to load MPI. Available module names and versions may change over time, so use `module spider mpi`, `module spider openmpi`, or `module spider ompi` to confirm what is currently available.

:::warning
Do not mix MPI implementations between build and run. For example, an application compiled with Open MPI should be run with the same Open MPI module loaded, not Intel MPI.
:::

## Compiler Wrappers

After loading an MPI module, compile MPI programs with MPI compiler wrappers rather than calling the underlying compiler directly:

| Language | Wrapper   |
|:---------|:----------|
| C        | `mpicc`   |
| C++      | `mpicxx`  |
| Fortran  | `mpifort` |

The wrapper command selects the correct compiler, include paths, and libraries for the loaded MPI implementation.

## MPI Modules

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

Klone provides MPI through Open MPI modules and through Intel MPI included with the Intel oneAPI suite.

### Open MPI

Use Open MPI for general MPI workloads:

```js
module load ompi
```

For workflows that require the legacy Intel compilers with MPI, use the Open MPI stack built with the legacy Intel compilers:

```js
module load ompi/4.1.6-intel
```

For workflows built with the AMD Optimizing C/C++ Compiler (AOCC), use the Open MPI stack built with AOCC:

```js
module load ompi/4.1.6-aocc
```

### Intel MPI

Intel MPI is included with Intel oneAPI:

```js
module load intel/oneAPI/2026.0.0
```

:::warning
For Intel oneAPI MPI workflows on Klone, use `intel/oneAPI/2026.0.0`. Older oneAPI modules have shown MPI-related segmentation fault errors with the current Klone kernel. The 2026 release also removes the legacy `icc`, `icpc`, and `ifort` compilers; use `icx`, `icpx`, and `ifx` instead. For more background, see the [**June 2026 update**](/blog/2026-june-update#intel-oneapi-module-usage).
:::

</TabItem>
<TabItem value="tillicum" label="Tillicum">

Tillicum uses a [**hierarchical module structure**](./modules#module-structure). Load the compiler first, then load the MPI module that appears in that compiler hierarchy.

```js
module load gcc/13.4.0
module load openmpi/5.0.8
```

If you change compiler modules, Lmod may unload or reload dependent MPI modules. Run `module list` before building or running to confirm the active compiler and MPI stack.

</TabItem>
</Tabs>

## Compile and Run

Compile the program with the wrapper for its language:

```js
mpicc -o c_mpi_exec c_mpi_prog.c
```

Run MPI programs inside an interactive job or batch job. You can use the Open MPI-provided `mpirun` launcher or Slurm's `srun` launcher:

```js
salloc -p compute -N 2 --ntasks-per-node=40
# Load mpi module; then
mpirun -np 80 ./c_mpi_exec
# or
srun --mpi=pmix -n 80 ./c_mpi_exec
```

Match `--nodes`, `--ntasks-per-node`, and the total task count to the way your MPI application is designed to run. For more Slurm guidance, see [**Klone Scheduling Jobs**](/docs/systems/klone/scheduling-jobs) or [**Tillicum Scheduling Jobs**](/docs/systems/tillicum/scheduling-jobs).
