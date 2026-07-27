---
title: MATLAB
---

"MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages." [**Wikipedia**](https://en.wikipedia.org/wiki/MATLAB)

## MATLAB Session Options

MATLAB can be launched on Hyak using either of these methods:

- [**MATLAB via Command Line**](#matlab-via-command-line): load the MATLAB module on a compute node and run MATLAB from the terminal.
- [**MATLAB via Open OnDemand**](/docs/guides/ood/apps/matlab): launch MATLAB through Hyak's Open OnDemand web portal.

## MATLAB License Authentication

UW's MATLAB license is transitioning from a concurrent license to a named-user license per the request from MathWorks MATLAB. Beginning August 1, 2026, only MATLAB R2023b and newer versions will be valid on Hyak due to this license change.

- For command-line MATLAB sessions, users need to authenticate their named-user license with SSO using a one-time password:
  1. Launch MATLAB from the command line.
  2. When prompted, enter the email address associated with your UW MathWorks account.
  3. In a web browser, open the [**MathWorks one-time password page**](https://account.mathworks.com/security/generate/code) and sign in with UW SSO if prompted.
  4. Copy the one-time password from MathWorks into the MATLAB prompt.
  
  MATLAB should not prompt you to sign in again until the license expires or the saved credentials are cleared.

- For GUI MATLAB sessions, users will be prompted for SSO to connect with their UW MathWorks account and complete authentication the first time they launch MATLAB. This authentication should persist until the license expires or the saved credentials are cleared.

## MATLAB via Command Line

The latest Matlab version on `klone` is R2026a. You can use [**LMOD**](/docs/guides/software/modules) to load the module then run the binary, be sure to use the `-nodisplay` flag unless you enabled X11 forwarding to get the GUI.


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
