---
id: compilers
title: Compilers
---

The compilers are provided using environment modules, you can review modules [<ins>**here**</ins>](modules.md).

A lot of software you may want to use and compile yourself could be written in C, C++, or Fortran. We support two compiler flavors for you to try: the [<ins>**GNU compiler**</ins>](#gnu-compiler) or the [<ins>**Intel compiler**</ins>](#intel-compiler). 

## GNU Compiler

The latest GNU compiler provided as a module is version 10.2 [<ins>**www**</ins>](https://gcc.gnu.org/gcc-10/). This was built with the `--enable-languages=c,c++,fortran` flag.

```js
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

```js
module load intel/oneAPI/2021.1.1 
```
