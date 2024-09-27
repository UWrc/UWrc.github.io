---
id: matlab
title: Matlab
---

"MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages." [[Wikipedia](https://en.wikipedia.org/wiki/MATLAB)]

The latest Matlab version on `klone` is R2020b. You can use LMOD [[www](modules.md)] to load the module then run the binary, be sure to use the `-nodisplay` flag unless you enabled X11 forwarding to get the GUI.

```shell-session terminal=true
n3000:~ $ module load matlab                    
n3000:~ $ matlab -nodisplay

                        < M A T L A B (R) >
            Copyright 1984-2020 The MathWorks, Inc.
        R2020b Update 4 (9.9.0.1570001) 64-bit (glnxa64)
                        January 7, 2021
 
To get started, type doc.
For product information, visit www.mathworks.com.
 
>> 
```