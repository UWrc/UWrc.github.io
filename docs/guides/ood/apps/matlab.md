---
title: MATLAB
---

## MATLAB Session Options

- **MATLAB via Open OnDemand**: described below. Launch MATLAB through Hyak's Open OnDemand web portal.
- [**MATLAB via Command Line**](/docs/guides/applications/matlab): load the MATLAB module on a compute node and run MATLAB from the terminal.

## MATLAB License Authentication

UW's MATLAB license is transitioning from a concurrent license to a named-user license per the request from MathWorks MATLAB. Beginning August 1, 2026, only MATLAB R2023b and newer versions will be valid on Hyak due to this license change.

Firstly, [**make sure you have access to MathWorks account through your UW email**](https://www.mathworks.com/academia/tah-portal/university-of-washington-31094417.html).

For MATLAB sessions launched through OOD, [users will be prompted for SSO to connect with their UW MathWorks account and complete authentication the first time they launch MATLAB](/docs/guides/applications/matlab#matlab-license-authentication). This authentication should persist until the license expires or the saved credentials are cleared.

## Launching MATLAB

Launching a MATLAB session is the same as scheduling any other interactive session. To launch a MATLAB session via Hyak's OOD, select MATLAB from the list of interactive apps. Then, select parameters for the session and select "Launch".

![Screenshot of Hyak OOD that shows how to launch a MATLAB Session.](/img/docs/ood/MATLAB_request.png 'Sample MATLAB form submission on Hyak OOD.')

The session will show up as a job in the "My Interactive Sessions" tab. Allocation of resources might take a few minutes, depending on the queue and requested resources.

![Screenshot showing active MATLAB sessions.](/img/docs/ood/MATLAB_scheduled.png 'Scheduled MATLAB session.')

Once a session is running, you can adjust connection quality, launch a VNC session, or share a view-only link with others.

![Screenshot showing connection options.](/img/docs/ood/MATLAB_launch.png 'Running MATLAB session.')

The MATLAB app will open in a workspace where you can interact with the MATLAB environment.

![Screenshot of MATLAB environment.](/img/docs/ood/MATLAB_vnc.png 'MATLAB App via Hyak OOD.')
