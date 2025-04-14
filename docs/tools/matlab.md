---
id: matlab
title: MATLAB
---

"MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages." [[**Wikipedia**](https://en.wikipedia.org/wiki/MATLAB)]

The latest Matlab version on `klone` is R2023b. You can use LMOD [[**www**](modules.md)] to load the module then run the binary, be sure to use the `-nodisplay` flag unless you enabled X11 forwarding to get the GUI.


```shell-session terminal=true
n3000:~ $ module load matlab                    
n3000:~ $ matlab -nodisplay

                            < M A T L A B (R) >
                  Copyright 1984-2023 The MathWorks, Inc.
                  R2023b (23.2.0.2365128) 64-bit (glnxa64)
                              August 23, 2023

To get started, type doc.
For product information, visit www.mathworks.com.
 
>> 
```
MATLAB can also be launched via Hyak's OnDemand (OOD) portal. For more information, see [**Open OnDemand/MATLAB**](ood/matlab.md).