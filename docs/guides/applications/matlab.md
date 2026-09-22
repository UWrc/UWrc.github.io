---
title: MATLAB
---

MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages.

## MATLAB Session Options

MATLAB can be launched on Hyak using either of these methods:

- [**MATLAB via Command Line**](#matlab-via-command-line): load the MATLAB module on a compute node and run MATLAB from the terminal.
- [**MATLAB via Open OnDemand**](/docs/guides/ood/apps/matlab): launch MATLAB through Hyak's Open OnDemand web portal.

## MATLAB License Authentication

Beginning August 1, 2026, only MATLAB R2023b and newer versions will be valid on Hyak.

Firstly, [**make sure you have access to MathWorks account through your UW email**](https://it.uw.edu/uware/matlab/).

:::info

- Students may obtain a free MATLAB license by visiting the [UW portal at Mathworks](https://www.mathworks.com/academia/tah-portal/university-of-washington-31094417.html) to register your UW student Mathworks account. Please then [join the Research Computing Club (stf group)](https://depts.washington.edu/uwrcc/hyak_access/) to access your free MATLAB license.
- Faculty and staff may purchase MATLAB through UWare, which includes all toolboxes. Instructions and more details are available [here](https://it.uw.edu/uware/matlab/).

:::

## Managing `.MathWorks` Storage

Running multiple MATLAB jobs may consume significant space in your home directory. If your home directory is near or over its quota, MATLAB may fail with an error like:

```text
Unable to communicate with required MathWorks services.
```

By default, each time you launch MATLAB on a compute node, MATLAB creates a host-specific directory under `~/.MathWorks/ServiceHost/<hostname>` to store runtime data. Over time, these directories can accumulate and cause `~/.MathWorks` to grow significantly.

We recommend moving the entire `~/.MathWorks` directory to dedicated storage outside your home directory, such as your lab's directory or another storage location you have access to, then creating a symbolic link from your home directory:

```bash
mv ~/.MathWorks /path/to/custom/location/.MathWorks
ln -s /path/to/custom/location/.MathWorks ~/.MathWorks
```

Replace `/path/to/custom/location` with the storage location you want to use.

You may also want to clean up the corresponding `ServiceHost/<hostname>` directory after jobs finish, or periodically remove stale `ServiceHost/<hostname>` directories to reduce storage usage.

## MATLAB via Command Line

The latest Matlab version on `klone` is R2026a. You can use [**LMOD**](/docs/guides/software/modules) to load the module then run the binary, be sure to use the `-nodisplay` flag unless you enabled X11 forwarding to get the GUI.


```shell-session terminal=true
n3112:~ $ module load matlab
n3112:~ $ matlab -nodisplay -nodesktop

                                      < M A T L A B (R) >
                            Copyright 1984-2026 The MathWorks, Inc.
                       R2026a Update 5 (26.1.0.3346908) 64-bit (glnxa64)
                                         August 3, 2026

 
To get started, type doc.
For product information, visit www.mathworks.com.
 
>> 
```
