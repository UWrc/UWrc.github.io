---
id: tillicum
title: Get Started
---

## Tillicum Onboarding Training

***New to Tillicum?*** We have prepared a guided introduction to the Tillicum GPU cluster at the University of Washington.

Check it out here → [<ins>**Tillicum Onboarding Training**</ins>](https://github.com/UWrc/tillicum-onboarding)

---

## Project Allocations

**Tillicum is available to:**
* UW faculty, academic staff, and research units.
* UW affiliates supported by a sponsoring department.
* A UW worktag is required to enroll in this service.

**Eligible and ready to try it?**
* Sign up for a project allocation to start using Tillicum → [<ins>**Tillicum Access Request Form**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=aabee72f87ae6210e385333e3fbb3581)
* See if Tillicum is right for you with 100 GPU hours and 100GB of dedicated project storage → [<ins>**Tillicum Demo Account Request**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=b71cefcc97ef2a500a7637b6f053af15)

---
## Pay-as-you-go by the GPU Hour

***Your first 100 GPU hours are free!***

On Tillicum, computing units are "GPU Hours" and are applied to all jobs scheduled with [<ins>**Slurm**</ins>](/docs/tillicum/scheduling-jobs).

:::important Tillicum Usage Rates
***GPU Hour*** = Elapsed Time x ***N*** GPUs

**Usage Rate: $0.90/GPU Hour** - Billing is monthly and handled as a subscription in UW-IT's ITBill system. 

Every scheduled job on Tillicum is subject to a the usage rate and requires at least 1 GPU (141GB RAM). 
* Jobs are bound by a **maximum of ~200GB system RAM and 8 CPUs**
* ***If more system RAM or more CPUs are required, additional GPUs must be added***
:::

Tillicum Processes ***not*** subject to charge: 
* [<ins>**storage**</ins>](/docs/tillicum/storage.md)
* data [<ins>**import, export**</ins>](/docs/storage/globus.md)
* data parsing, manipulation
* code development on the Login node (any code development via a Slurm Job in subject to charge)

---


## Two Factor Authentication

UW policy is that all services require 2 factor authentication (2FA) by default as a security posture. Please go to [<ins>**this 2FA page**</ins>](https://identity.uw.edu/2fa/) and ensure you have 2FA enabled and configured before proceeding with this tutorial.

:::important
You need 2FA to log onto any UW-IT Research Computing cluster.
:::

## Logging in with SSH

Once you have your account and 2FA set up, you can use `ssh` to log into `tillicum`. `ssh` is the most common method of logging into the cluster using the command-line interface (CLI).

**Mac:**
If you're using any Linux or Linux-like system (e.g., MacOS, BSD) you probably already have a Terminal installed by default. Locate Terminal in your Applications directory on your Mac.

**Windows:**
Newer versions of Windows have a new Linux sub-system so there are native options to bring up a local terminal. Alternatively, you can login to `tillicum` using Command Prompt or Windows Powershell. Other options include [<ins>**PuTTY**</ins>](https://www.putty.org/) and [<ins>**Git Bash - use "The Bash Shell" with Git installed on Windows from this link for a video with install instructions.**</ins>](https://carpentries.github.io/workshop-template/install_instructions/#shell).

Once you have a shell open in Terminal or any of the Windows options, you can login with the following command by replacing the word `UWNetID` with your UW Net ID. Then you will be prompted to enter your password for your UW Net ID. You'll know it worked when you see the "Tillicum AI" welcome message printed to your screen.

```js
ssh UWNetID@tillicum.hyak.uw.edu
```
```js
Enter a passcode or select one of the following options:

 1. Duo Push to XXX-XXX-1234
 2. Phone call to XXX-XXX-1234

Passcode or option (1-2): 1
Success. Logging you in...
      _____ _ _ _ _                           _    ___ 
     |_   _(_) | (_) ___ _   _ _ __ ___      / \  |_ _|
       | | | | | | |/ __| | | | '_ ` _ \    / _ \  | | 
       | | | | | | | (__| |_| | | | | | |  / ___ \ | | 
       |_| |_|_|_|_|\___|\__,_|_| |_| |_| /_/   \_\___|

This login node is meant for interacting with the job scheduler and 
transferring data to and from Tillicum. Please work by requesting an 
interactive session on (or submitting batch jobs to) compute nodes.

Visit the HYAK website for more documentation:
https://hyak.uw.edu/docs/

Questions? E-mail help@uw.edu with "hyak" in the subject.

Run "scontrol show res" to see any reservations in place that will 
prevent your jobs from running with the reason "ReqNodeNotAvail".
```

:::warning
Too many incorrect login attempts will result in a IP ban, which could last up to an hour.
:::
