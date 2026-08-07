---
title: Compilers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Hyak provides multiple compiler versions for C, C++, and Fortran on each system. Compilers are available through [**environment modules**](./modules) and should be loaded before building software.

Available compiler versions may change over time. Use `module spider <compiler>` or `module avail` to confirm which modules are currently available.

For MPI builds, load an MPI module and compile with MPI compiler wrappers. See [**MPI**](./mpi) for details.

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

:::note
Klone uses a [**flat module structure**](./modules#module-structure), so compiler modules are visible without loading another module first.
:::

The following base compiler families are supported on Klone:

| Vendor | Module         | Compilers |
|:-------|:---------------|:----------|
| GNU    | `gcc`          | C: `gcc`<br />C++: `g++`<br />Fortran: `gfortran` |
| Intel  | `intel/oneAPI` | C: `icx`<br />C++: `icpx`<br />Fortran: `ifx` |
| NVIDIA | `nvhpc`        | C: `nvc`<br />C++: `nvc++`<br />Fortran: `nvfortran` |
| AMD    | `aocc`         | C: `clang`<br />C++: `clang++`<br />Fortran: `flang` |

## GNU Compiler Collection (GCC)

The latest [**GNU Compiler Collection (GCC)**](https://gcc.gnu.org/) module on Klone is version 15.2.

```js
module load gcc/15.2.0
```

Older GCC versions are also available, including some combinations with MPI support. Additional modules prefixed with `contrib` may also appear; these are community-provided and maintained by their owners.

```shell-session terminal=true
gcc/9.3.0
gcc/10.2.0
gcc/11.2.0                (D)
gcc/12.3.0
gcc/13.2.0
gcc/15.2.0
```

## Intel Compiler

The latest Intel compiler suite on Klone is version 2026.0.0. This module is provided as part of the [Intel oneAPI suite](https://www.intel.com/content/www/us/en/developer/tools/oneapi/overview.html).

```js
module load intel/oneAPI/2026.0.0
```

:::warning MPI workflows
For Intel oneAPI MPI workflows on Klone, use `intel/oneAPI/2026.0.0`. Older oneAPI modules have shown MPI-related segmentation fault errors with the current Klone kernel. The 2026 release also removes the legacy `icc`, `icpc`, and `ifort` compilers; use `icx`, `icpx`, and `ifx` instead. For more background, see the [**June 2026 update**](/blog/2026-june-update#intel-oneapi-module-usage).
:::

## NVIDIA Compiler

The latest NVIDIA compiler suite on Klone is version 24.5. This module is provided as part of the [NVIDIA HPC SDK](https://developer.nvidia.com/hpc-sdk).

```js
module load nvhpc/24.5
```

### CUDA Compiler Driver

The CUDA compiler driver, `nvcc`, is used to compile CUDA code. The latest CUDA module on Klone is version 12.9.1.

```js
module load cuda/12.9.1
```

There are older CUDA versions available.

## AOCC Compiler

The [AOCC (AMD Optimizing C/C++ Compiler) suite](https://www.amd.com/en/developer/aocc.html) is based on LLVM and includes optimizations for AMD processors. The latest AOCC compiler module on Klone is version 4.2.0.

```js
module load aocc/4.2.0
```

</TabItem>
<TabItem value="tillicum" label="Tillicum">

:::note
Tillicum uses a [**hierarchical module structure**](./modules#module-structure). Load the required compiler first; dependent modules, such as CUDA, become visible afterward.
:::

The following base compiler families are supported on Tillicum:

| Vendor | Module | Compilers |
|:-------|:-------|:----------|
| GNU    | `gcc`  | C: `gcc`<br />C++: `g++`<br />Fortran: `gfortran` |
| NVIDIA | `cuda` | CUDA C/C++: `nvcc` |

## GNU Compiler Collection (GCC)

The latest [**GNU Compiler Collection (GCC)**](https://gcc.gnu.org/) module on Tillicum is version 13.4.0.

```bash
module load gcc/13.4.0
```

Older GCC versions are also available, including some combinations with MPI support.

```shell-session terminal=true
gcc/11.5.0
gcc/13.4.0 (D)
```

## CUDA Compiler Driver

The CUDA compiler driver, `nvcc`, is used to compile CUDA code. The latest CUDA module on Tillicum is version 13.0.0. Because Tillicum uses a hierarchical module structure, load GCC before loading CUDA.

```bash
module load gcc/13.4.0
module load cuda/13.0.0
```

</TabItem>
</Tabs>
