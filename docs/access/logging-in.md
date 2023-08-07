---
id: logging-in
title: Logging In
---

## The Login Node

You log into the `klone.hyak.uw.edu` cluster above at the terminal using your netID. You will be prompted for your password and 2FA (DUO) authentication. We don't allow ssh keys to the login node since it would be bypassing one of the factors (of 2-factor authentication).

:::warning Monitoring & Warnings

Login-node CPU and memory usage are closely monitored by automation. Any egregious use will result in immediate performance throttling, the severity of which escalates exponentially while the offending activity persists. Warnings describing the crossed thresholds & the extent of the throttling will be sent by our monitoring system, *Arbiter2*, to the email associated with your UW NetID.
:::

### Acceptable Use

The Klone login node (i.e. `klone-login01` or `klone.hyak.uw.edu`) is a resource shared by all cluster users. As such, acceptable uses of this system are very limited:

1. Downloading to or uploading from the cluster.
1. File management like moving, copying, or renaming files and directories.
1. Light text editing with `vim` or a worse text editor.
1. Interacting with the Slurm scheduler, i.e. to submit jobs.
1. Running Hyak-built commands like `hyakalloc` or `hyakstorage`.



:::tip
If your command would run a little slow on an inexpensive laptop from 2002, you shouldn't run it on the login node! Instead, request an [interactive job](https://hyak.uw.edu/docs/compute/scheduling-jobs#interactive-jobs-single-node) on a compute node.
:::

## Accessing the Login Node

### Logging in with SSH

You can SSH to the login node.

### Logging in with OnDemand

You can use the login node shell button.
