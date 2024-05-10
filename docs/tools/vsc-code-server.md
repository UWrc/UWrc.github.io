---
id: vsc-code-server
title: VS Code via Code-Server
---

### This solution: 

1. Provides a method to connect VS Code to a compute node on `klone`, preserving the login nodes for the community. *As a reminder, we prohibit users running processes on the login node.*

2. Uses a server to develop and execute your code reducing battery usage. `code-server` handles the VSCode background processes, preventing them from slowing down your local machine. 

3. Provides a simpler alternative to [**VS Code via ProxyJump**](tools/vsc-proxy-jump.md), which requires a lot of setup and for Windows users requires 2-factor authentication to login and change directory. 

4. Involves steps: making a symbolic link to the container stored on hyak or pulling the docker container yourself, launching a batch job to start the container on a compute node, opening a SSH tunnel to the compute node where the container is running, and securely accessing VS Code through your browser window. 

### Accessing the Container

**This step only needs to be performed during initial set up.**

We have pulled a version of the code-server container for our users. This removes 5 minutes of set up, and allows use of the container without occupying user disk storage. 

First, navigate to a directory a where you will store your symbolic link to the code-server container. In this example, we will navigate to our home directory. 

```bash
cd $HOME
```

Create a symbolic link to the container which we have stored for you in `/mmfs1/sw/containers/code-server/`. The symbolic link shortcut will appear in the directory where the command was initiated, unless otherwise specified.

```bash
ln -s /mmfs1/sw/containers/code-server/code-server_4.89.0-39.sif code-server_4.89.0-39.sif
# Now you can use the code-server container from your directory rather than specifying the entire path to our version of the container.
```

This will link to code-server container version 4.89.0-39. There are other versions of the container you might consider: [**code-server tags**](https://hub.docker.com/r/codercom/code-server/tags), and below, we include optional instructions for pulling the latest version of code-server. 

:::tip Optional: pull the container yourself

**This step only needs to be performed during initial set up.**

Start an interactive job to pull the cointainer with the apptainer module. Here is an example command to start your interactive job (find out which accounts and partitions your can access with the `hyakalloc` command): 

```bash
salloc --account=uwit --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=code-server --time=2:00:00
```

Loading the apptainer module is required. 
```bash
module load apptainer
```

Pull the container from DockerHub. This will take a few minutes to complete. When complete, you will have a container image called  `code-server_lastest.sif`. There are other versions of the container you might consider rather than the latest version: [**code-server tags**](https://hub.docker.com/r/codercom/code-server/tags).
```bash
apptainer pull docker://codercom/code-server
```

:::

### Launch code-server with SLURM

Download the SLURM batch script.
```bash
wget https://hyak.uw.edu/files/code-server.job
```

Edit the job script (find comments "#update this line") to set your code-server session home directory and provide the name of the container if it does not match `code-server_latest.sif`, and edit the `SBATCH` directives as needed. The code block below shows the lines that should be updated as needed. 

```bash
# To identify accounts and partitions that are available to you, use the hyakalloc command
//highlight-next-line
#SBATCH --account=uwit # update this line 
//highlight-next-line
#SBATCH --partition=ckpt # update this line
//highlight-next-line
#SBATCH --time=02:00:00 # update this line to change time limit
# Set home destination for code-server session
//highlight-next-line
CODER_HOME="/gscratch/scrubbed/<UWNetID>" # update this line
# Provide container file
//highlight-next-line
CODER_SIF="code-server_4.89.0-39.sif" # update this line if needed
```
Submit the script with `sbatch`. **Repeat this step and all following steps each time you log in and connect to VS Code.**
```bash
//highlight-next-line
sbatch code-server.job
Submitted batch job 17440706
```
This script will start a batch job and launch the code-server container. The `SSH` tunneling instructions, including the code-server session password, will be written to the output file (`stdout`) called `code-server.job.<JobID>` (`code-server.job.17440706` in this example). Concatenate (`cat`) the output file for tunneling instructions. The following is an example output.

```bash
//highlight-next-line
cat code-server.job.17440706
1. SSH tunnel from your workstation using the following command:

   ssh -N -L 8080:n3088:59985 <UWNetID>@klone.hyak.uw.edu

   and point your web browser to http://localhost:8080

2. log in to Code Server using the following credentials:

   password: +WwYzgh7YH/yHzUWNWNS

When done using Code Server, terminate the job by:

1. Sign out of Code Server (Find the three-lines icon Menu and select "Sign out of Code Server")
2. Issue the following command on the login node:

      scancel --name code-server
```

:::tip Pro Tip
Monitor the job with `squeue` and your UWNetID like the following example.

```bash
//highlight-next-line
squeue -u <UWNetID>
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          17440706   compute code-ser  <UWNetID>  R       3:15      1 n3088
```
:::

The output file (`code-server.job.17440706` in this example) will also contain messages from `code-server` as the connection is established. These messages include:

1. The storage location of session associated files - `~/.local/share/code-server` in your home directory.
2. The location of the configuration file for the session which contains the password that is also printed in the output file - `~/.config/code-server/config.yaml` in your home directory.
3. Which IP and Port `code-server` HTTP and session is listening to. 

As your session continues, more information will be printed to this output file. 

### Establish the SSH tunnel

Follow the instructions in the output file. Open a new terminal/powershell/PuTTy window **ON YOUR COMPUTER** and use your version of the tunnel command from your job output file (e.g., `code-server.job.17440706`). The following is an example:
```bash
//highlight-next-line
ssh -N -L 8080:n3088:59985 <UWNetID>@klone.hyak.uw.edu
... provide UWNetID password
... Duo 2 Factor Authentication
```
The login will appear to hang, but your connection is now open. 

:::warning
Do not use the code-server password to open the ssh tunnel. After your ssh command, your UWNetID password is required. Multiple failed login attempts will result in a IP ban. 
:::

Open a new browser window to **http://localhost:8080** and provide **the password from the output file** (`code-server.job.17440706` and `+WwYzgh7YH/yHzUWNWNS` in this example).

![](/img/docs/vscode/vsc-pw.png 'Provide Password')

Extensions can be installed through the browser and will be stored in `~/.local/share/code-server/extensions` in your home directory.

### End the Session

To end your session, find the three-lines icon Menu and select "Sign out of Code Server."

![](/img/docs/vscode/vsc-signout.png 'Sign Out')

And end the batch job with `scancel` on `klone` like the following example.

```bash
scancel --name code-server
```

If you have trouble with this method, please report errors in an email to **help@uw.edu** with HYAK in the message. 

### Background Reading

[**Coder Home**](https://coder.com/)

[**Code-server github repo**](https://github.com/coder/code-server)

[**Code-server documentation**](https://coder.com/docs/code-server/latest)

[**DockerHub page**](https://hub.docker.com/r/codercom/code-server)

[**Video explaining the benefits of Code-server**](https://www.youtube.com/watch?v=h17bHCCEcvI&pp=ygULY29kZS1zZXJ2ZXI%3D)
