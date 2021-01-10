---
id: compilers
title: Compilers
---

The compilers are provided using environment modules, you can review modules [here](modules.md).

A lot of software you may want to use and compile yourself could be written in C, C++, or Fortran. We support two compiler flavors for you to try: the [GNU compiler](#gnu-compiler) or the [Intel compiler](#intel-compiler). 

## GNU Compiler

The latest GNU compiler provided as a module is version 10.1 [[www](https://gcc.gnu.org/gcc-10/)]. This was built with the `--enable-languages=c,c++,fortran` flag.

```bash
module load gcc/10.1.1
```

There are older GNU compiler versions and combinations with MPI support. Additional (not listed below) modules prefixed with "contrib" are community provided and maintained.

```shell-session terminal=true
$ module avail gcc
----- /sw/modules-1.775/modulefiles -----
gcc/6.3.1  
gcc/8.2.1  
gcc/10.1.0  
gcc_4.8.5-impi_2017  
gcc_8.2.1-ompi_3.1.4  
gcc_8.2.1-ompi_4.0.1  
gcc_8.2.1-ompi_4.0.2  
$
```

## Intel Compiler

The latest Intel compiler is the 2020 version.

```bash
module load icc_20u1 
```

Also with Intel MPI support.

```bash
module load icc_20u1-impi_2020u1
```

There are various Intel compilers with different MPI libraries available.

```shell-session terminal=true
$ module avail icc
----- /sw/modules-1.775/modulefiles -----
icc_19-ompi_4.0.1           
icc_19u5-impi_2019u5  
icc_19-ompi_2.1.6     
icc_19-ompi_4.0.1-cuda_9.2  
icc_20u1              
icc_19             
icc_19-ompi_3.1.2
icc_20u1-impi_2020u1  
icc_19-impi_2019   
icc_19-ompi_3.1.4     
icc_19u5                    
$ 
```