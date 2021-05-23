---
id: compilers
title: Compilers
---

The compilers are provided using environment modules, you can review modules [here](modules.md).

A lot of software you may want to use and compile yourself could be written in C, C++, or Fortran. We support two compiler flavors for you to try: the [GNU compiler](#gnu-compiler) or the [Intel compiler](#intel-compiler). 

## GNU Compiler

The latest GNU compiler provided as a module is version 10.2 [[www](https://gcc.gnu.org/gcc-10/)]. This was built with the `--enable-languages=c,c++,fortran` flag.

```bash
module load gcc/10.2.0
```

There are older GNU compiler versions and combinations with MPI support. Additional (not listed below) modules prefixed with "contrib" are community provided and maintained.

```shell-session terminal=true
$ module avail gcc
----- /sw/klone -----
gcc/9.3.0    
gcc/10.2.0 (D)
$
```

## Intel Compiler

The latest Intel compiler is the 2021 version, this module comes bundled with the entire oneAPI suite (e.g., Intel MPI).

```bash
module load intel/oneAPI/2021.1.1 
```
