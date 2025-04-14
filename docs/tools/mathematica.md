---
id: matemathica
title: Mathematica
---

Mathematica is a mathematical computational program. In HPC, Mathematica is especially useful for its inclusions of built-in libraries with functions that let users simulate complex many-body systems, use CUDA architecture, and/or perform image processing. Mathematica uses the Wolfram Language. Further information regarding Mathematica and the Wolfram Language can be found [HERE](https://www.wolfram.com/mathematica/). 


## Mathematica on Hyak
To start up Mathematica on Hyak, launch a job on a compute node with the [salloc](https://hyak.uw.edu/docs/compute/scheduling-jobs#interactive-jobs-single-node) command. All modules, including Mathematica, are unavailable on login nodes. 
```bash
# using the salloc command to switch from a login node to a compute node
salloc
```
Next, use [LMOD](https://hyak.uw.edu/docs/tools/modules) to load the Mathematica module:
```bash
module load mathematica
```
Once it has loaded, you can start the Mathematica kernal:
```
math
```
:::note 
To start the kernal, the module must retrieve the license for Mathematica from the Physics Department. This can take anywhere from 30 seconds to 1 minute. For more information about the university's Mathematica license, click [HERE](https://phys.washington.edu/mathematica). 
:::

Once the kernal has started, the output should look something like this:
```
Wolfram 14.1.0 Kernel for Linux x86 (64-bit)
Copyright 1988-2024 Wolfram Research, Inc.
```
Mathematica is now available for interactive use.

:::tip Mathematica Support

* For additional Mathematica trainings and tutorials, visit [Wolfram U](https://www.wolfram.com/wolfram-u/) or the [Wolfram Library Archive](https://library.wolfram.com/infocenter/Books)

* For Mathematica usage support, use the Wolfram [contact form](https://www.wolfram.com/support/contact/?source=footer) or refer to the [FAQ page](https://support.wolfram.com/topic/mathematica).

* If you are having trouble setting up Mathematica on Hyak, please contact help@uw.edu with "Hyak Mathematica" in the subject line.

:::