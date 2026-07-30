---
title: MATLAB
---

MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages.

## MATLAB Session Options

MATLAB can be launched on Hyak using either of these methods:

- [**MATLAB via Command Line**](#matlab-via-command-line): load the MATLAB module on a compute node and run MATLAB from the terminal.
- [**MATLAB via Open OnDemand**](/docs/guides/ood/apps/matlab): launch MATLAB through Hyak's Open OnDemand web portal.

## MATLAB License Authentication

UW's MATLAB license is transitioning from a concurrent license to a named-user license per the request from MathWorks MATLAB. Beginning August 1, 2026, only MATLAB R2023b and newer versions will be valid on Hyak due to this license change.

Firstly, [**make sure you have access to MathWorks account through your UW email**](https://www.mathworks.com/academia/tah-portal/university-of-washington-31094417.html).

- For command-line MATLAB sessions, users need to authenticate their named-user license with SSO using a one-time password:
  1. Launch MATLAB from the command line.
  2. When prompted, enter the email address associated with your UW MathWorks account.
  3. In a web browser, open the [**MathWorks one-time password page**](https://account.mathworks.com/security/generate/code) and sign in with UW SSO if prompted.
  4. Copy the one-time password from MathWorks into the MATLAB prompt.

```shell-session terminal=true
$ module load matlab
$ matlab -nodisplay -notesktop
Please enter your MathWorks Account email address and press Enter: <UWNetID>@uw.edu
You need a one-time password to sign in. To get a one-time password, follow these steps:
	1. Go to https://www.mathworks.com/mwa/otp
	2. Enter your MathWorks Account email address.
	3. Copy the generated one-time password.
	4. Return here and enter the password.
Enter the one-time password:
xxxxxx


                                      < M A T L A B (R) >
                            Copyright 1984-2026 The MathWorks, Inc.
                       R2026a Update 2 (26.1.0.3251617) 64-bit (glnxa64)
                                          May 5, 2026
 
To get started, type doc.
For product information, visit www.mathworks.com.
 
>> 
```
  
  MATLAB should not prompt you to sign in again until the license expires or the saved credentials are cleared.

- For GUI MATLAB sessions, users will be prompted for SSO to connect with their UW MathWorks account and complete authentication the first time they launch MATLAB. This authentication should persist until the license expires or the saved credentials are cleared.

## MATLAB via Command Line

The latest Matlab version on `klone` is R2026a. You can use [**LMOD**](/docs/guides/software/modules) to load the module then run the binary, be sure to use the `-nodisplay` flag unless you enabled X11 forwarding to get the GUI.


```shell-session terminal=true
n3000:~ $ module load matlab                    
n3000:~ $ matlab -nodisplay

                            < M A T L A B (R) >
                  Copyright 1984-2026 The MathWorks, Inc.
                  R2026a Update 2 (26.1.0.3251617) 64-bit (glnxa64)
                              May 5, 2026

To get started, type doc.
For product information, visit www.mathworks.com.
 
>> 
```
