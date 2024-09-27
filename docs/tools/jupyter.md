---
id: jupyter
title: Jupyter Notebooks
---

:::caution

These instructions cover jupyter-notebook 7.1.2, though should be easily adaptable for both newer versions and jupyter-lab.

:::

### Pre-requisites 

This tutorial assumes you have already completed the [set up of Miniconda covered here](https://hyak.uw.edu/docs/tools/python#install). Throughout this exercise, it might be helpful to refer to those instructions if you get stuck. 

:::note

The examples below use my `UWNetID` (finchkn) and a compute node that was available during the development of this documentation (n3097); you will have to replace finchkn with your `UWNetID` and probably `n3097` with a different compute node name when required. 

:::

### Set Up

:::important

Before beginnning this exercise, **please select a random number between 4096 and 16384 for your Jupyter-Notebook server to start on.** It is important that this number is unique and does not conflict with either another user or an existing service on your machine. From this point out, we will use 9195 as an example.

:::

Start an interactive job on a compute node with `salloc`. 

```bash
[finchkn@klone-login03 ~]$ salloc -A uwit -p ckpt --time=4:00:00 --mem=10G -c 4
    salloc: Pending job allocation 1546486
    salloc: job 1546486 queued and waiting for resources
    salloc: job 1546486 has been allocated resources
    salloc: Granted job allocation 1546486
    salloc: Waiting for resource configuration
    salloc: Nodes n3097 are ready for job
[finchkn@n3097 ~]$
```

### Install and Configure Jupyter Notebook 

Create a conda environment and install required packages. 

```bash
[finchkn@n3097 ~]$ conda create -n jupyter-notebook
[finchkn@n3097 ~]$ conda activate jupyter-notebook
(jupyter-notebook)[finchkn@n3097 ~]$ conda install -c conda-forge notebook
```
Set up a password for your Jupyter Notebook Session. This will remain your password every time you log in - Remember it. 

```bash
(jupyter-notebook)[finchkn@n3097 ~]$ jupyter-notebook --generate-config
(jupyter-notebook)[finchkn@n3097 ~]$ jupyter-notebook password
//highlight-next-line
    Enter password:
//highlight-next-line
    Verify password:
[JupyterNotebookApp] Wrote hashed password to ~/.jupyter/jupyter_server_config.json
```

### Start Jupyter Notebook Sessions

Remember, we chose 9195 as our random number for this exercise. You can choose any number between 4096 and 16384 for your connection, and replace 9195 with that number in the following examples. 

Start jupyter notebook.

```bash
(jupyter-notebook)[finchkn@n3097 ~]$ jupyter notebook --port 9195 --ip 0.0.0.0
    [I 2024-04-01 16:05:45.434 ServerApp] Extension package jupyter_lsp took 0.9552s to import
    ...
    [I 2024-04-01 16:05:58.515 ServerApp] Jupyter Server 2.13.0 is running at: 
    [I 2024-04-01 16:05:58.515 ServerApp] http://n3097:9195/tree   
    [I 2024-04-01 16:05:58.515 ServerApp]     http://127.0.0.1:9195/tree
    [I 2024-04-01 16:05:58.516 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
    ...
```
Keep this window open. Messages about your session will be printed there. 

Now open a new Terminal/Windows Powershell/PuTTy window and start an `ssh` tunnel from your local computer to the jupyter notebook session that you initiated on the klone compute node. 

```bash
kristenfinch@Kristens-MBP-3 ~ % ssh -L 9195:n3097:9195 finchkn@klone.hyak.uw.edu
    (finchkn@klone.hyak.uw.edu) Password: 
    (finchkn@klone.hyak.uw.edu) Duo two-factor login for finchkn

    Enter a passcode or select one of the following options:

    1. Duo Push to XXX-XXX-XXXX
    2. Phone call to XXX-XXX-XXXX

    Passcode or option (1-2): 1
    Success. Logging you in...
     _    _                    _                 _
    | | _| | ___  _ __   ___  | |__  _   _  __ _| | __
    | |/ / |/ _ \| '_ \ / _ \ | '_ \| | | |/ _` | |/ /
    |   <| | (_) | | | |  __/ | | | | |_| | (_| |   <
    |_|\_\_|\___/|_| |_|\___| |_| |_|\__, |\__,_|_|\_\
                                     |___/
```

Next direct your browser to [http://localhost:9195](http://localhost:9195). You will be prompted for the password you set with jupyter-notebook a few steps ago. 

![](/img/docs/jupyter-notebook/jupyter-notebook-password-prompt.png 'Provide Password')

The browser will open the Jupyter Notebook Session and you will see contents of the directory on klone. 

![](/img/docs/jupyter-notebook/jupyter-notebook-files.png 'Files')

Your token for this session will also appear in the terminal window connected to the compute node. 

```bash
[I 2024-04-01 16:13:54.521 ServerApp] User 99999somee92ftoken1bfhere9999999 logged in.
[I 2024-04-01 16:13:54.522 ServerApp] 302 POST /login?next=%2Ftree%3F (99999somee92ftoken1bfhere9999999) 462.64ms
```
While the connection is open. Another option is to direct your browser to [http://localhost:9195/?token=99999somee92ftoken1bfhere9999999](http://localhost:9195/?token=99999somee92ftoken1bfhere9999999)

### Ending your Session

End your session from the browser with the File Menu and "Shut Down" or "Log Out." 

![](/img/docs/jupyter-notebook/jupyter-notebook-end.png 'End Session')

Then go to your terminal window to the compute node and use Control + C to end the session there. 

```bash
$ ^C
    [I 2024-04-01 16:54:11.419 ServerApp] interrupted
    [I 2024-04-01 16:54:11.419 ServerApp] Serving notebooks from local directory: /dir/
        0 active kernels
        Jupyter Server 2.13.0 is running at:
        http://n3097:9195/tree
        http://127.0.0.1:9195/tree
    Shut down this Jupyter server (y/[n])? y
    [C 2024-04-01 16:54:14.872 ServerApp] Shutdown confirmed
    [I 2024-04-01 16:54:14.875 ServerApp] Shutting down 5 extensions
(jupyter-notebook) [finchkn@n3097 ~]$
```

End the interactive job.

```bash
(jupyter-notebook) [finchkn@n3097 ~]$ exit
salloc: Relinquishing job allocation 1546486
salloc: Job allocation 1546486 has been revoked.
```