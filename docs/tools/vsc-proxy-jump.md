---
id: vsc-proxy-jump
title: VS Code via ProxyJump
---

### This solution:

1. Provides a method to connect VS Code to a compute node on `klone`, preserving the login nodes for the community. *As a reminder, we prohibit users running processes on the login node.*

2. Runs VS Code on your local computer, but runs background processes on `klone`. **A local copy of VS Code is required for this exercise.** 

3. Requires: the set up of primary and secondary configuration files on your local computer, key-pair configuration, launching an interactive job, use of the `Remote-SSH` extension to connect to a compute node on `klone`.

:::warning MAC vs. Windows
In the next exercise, some of the instructions differ for Mac and Windows users. 
:::

:::important

This entire next section is done on your local computer—your personal MacOS/Linux or Windows machine—**not** on the cluster.

:::

### Configure SSH

Prepare your main SSH configuration file, located at `~/.ssh/config` **ON YOUR COMPUTER**. The contents of your SSH configuration file will depend on the operating system of your local machine (Mac/Linux or Windows). This step will create a short cut for logging into `klone`; instead of `ssh UWNetID@klone.hyak.uw.edu` the command to login will be `ssh klone-login`.

#### Mac/Linux Users

Use the following template for `~/.ssh/config` on Mac/Linux, replacing `UWNetID` with **your UW Net ID**.

```bash title="~/.ssh/config"
Host klone-login
//highlight-next-line
        User UWNetID
        Hostname klone.hyak.uw.edu
        ServerAliveInterval 30
        ServerAliveCountMax 1200
        ControlMaster auto
        ControlPersist 3600
        ControlPath ~/.ssh/%r@klone-login:%p

Host klone-node
    Include klone-node-config
```

Whether you're creating this file for the first time, or modifying an existing config, make sure the file has the correct permissions:

```bash
chmod 600 ~/.ssh/config
```

Once this is in place, we can do the following to log in to `klone`:

```bash
ssh klone-login
#Instead of:
#ssh UWNetID@klone.hyak.uw.edu
```

Here's a summary of the options set with this configuration file:
- `ServerAliveInterval 30`: every 30 seconds, send a packet to the server (the login node) to keep the connection open.
- `ServerAliveCountMax 1200`: don't close the connection unless we've sent 1200 server-alive messages
without a response from the login node.
- `ControlMaster auto`: enable SSH multiplexing, i.e. connection sharing. This means once we've established the first connection, we won't have to reauthenticate for subsequent connections; the new connection will use the already open socket. *This feature is not supported for Windows Users.*
- `ControlPersist 3600`: this keeps the control socket open for an hour after the initial connection has been closed.
- `ControlPath ~/.ssh/%r@klone-login:%p`: this is the path where the socket, appearing as a file, will actually be located. The `%r` is an abbreviation for the remote username, i.e. your UW Net ID, and `%p` is an abbreviation for the port (normally 22 for SSH).
- `Host klone-node \ Include klone-node-config`: indicates there is a secondary config for the direct connection to compute node which we will use later with `Remote-SSH`. We will make the secondary configuration file `~/.ssh/klone-node-config` in the next step. 

#### Windows Users

Use the following template for `~/.ssh/config` on Windows, replacing `UWNetID` with **your UW Net ID**. The Windows version config has fewer settings but accomplishes the same. 

```bash title="~/.ssh/config"
Host klone-login
//highlight-next-line
        User UWNetID
        Hostname klone.hyak.uw.edu
        ServerAliveInterval 30
        ServerAliveCountMax 1200

Host klone-node
    Include klone-node-config
```

### A secondary config for connection a compute node

**These instructions are the same for Windows and Mac/Linux users.**

Use the following template for `~/.ssh/klone-node-config` on Mac/Linux and Windows, replacing `UWNetID` with **your UW Net ID**. Define `klone-node` as a compute node `n3000` as a placeholder until we know what the node will be, and using `ProxyJump` to connect to that node through the login node.

```bash title="~/.ssh/klone-node-config"
Host klone-node
//highlight-next-line
  User UWNetID
  Hostname n3000
  ProxyJump klone-login
```

This file will also need the correct permissions. **Windows should not require a permissions check.** Mac/Linux update permissions with:

```bash
chmod 600 ~/.ssh/klone-node-config
```

Because you will be effectively connecting directly from your local computer to the node, you will need to append the SSH public key from your **local** system to the `~/.ssh/authorized_keys` file under your cluster home directory on `klone`. This command will update your authorized keys list. 

```bash
ssh-copy-id klone-login
```

Or you can do the same by copying your local ssh key into `~/.ssh/authorized_keys` file on `klone`. While we cannot use our key as a authentication factor between our local machine and klone, we can use it when ssh'ing *between* klone nodes.

#### Windows Users

If your private key permissions are too open, ssh won't let you connect to klone. To solve this, change the permissions on your private key file. [**Apply this solution.**](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open)

### Testing your connection

Test your new `ssh` shortcut to get onto the login node.

```bash
ssh klone-login
```
Request an interactive job in the `ckpt` partition with 1 CPU (unless otherwise specified with `--ntasks`, a job will have 1 task) and 16GB of memory. **Note: the job will be called "vsc-proxy-jump" as per `--job-name=`.** 
```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=vsc-proxy-jump
```

The `Hostname` will appear when your node is allocated, and follow your UWNetID For example:

```bash
salloc: Nodes n3120 are ready for job
[UWNetID@n3120 ~]$
```

Manually replace the `Hostname` line with your job node. Don't forget to replace `UWNetID` with **your UW Net ID** if you have not already.

```bash title="~/.ssh/klone-node-config"
Host klone-node
//highlight-next-line
  User UWNetID
//highlight-next-line
  Hostname n3120
  ProxyJump klone-login
```

Test your shortcut to connect directly to the node from your local computer:

```bash
$ ssh klone-node
. . .
[UWNetID@n3120 ~]$
```

We will use this short cut (ProxyJump) with the `Remote-SSH` extension of VS Code to connect VS Code to the open comute node on `klone`. 

:::tip PRO TIP
Manually editing `~/.ssh/klone-node-config` everytime you want to connect VS Code is tedious and prone to error. Use the following bash script **ON YOUR COMPUTER** to get the hostname of the compute node you wish to connect to with your ProxyJump. [**Download the script here**](https://hyak.uw.edu/files/set-hyak-node.sh).

**WARNING this script doesn'tusually work on Windows since bash and sed are not available. AND it might not work if you have a different version of sed**

```bash title="set-hyak-node.sh"
#!/bin/bash
set -euo pipefail
NODE=$(ssh klone-login 'squeue \
    --user $USER \
    --states RUNNING \
//highlight-next-line
    --name vsc-proxy-jump \
    --Format NodeList \
    --noheader ')
sed -I '' -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
```
**NOTE** : *If the interactive job you request is not named "vsc-proxy-jump" designated by `--job-name` then `set-hyak-node.sh` will not work.* **Your `salloc --job-name` (requested above) and `set-hyak-node.sh` line `--name` must match.**

Don't forget to make the script executable. 
```bash
chmod +x set-hyak-node.sh
```
This script works by setting the variable `NODE` and modifying `~/.ssh/klone-node-config` with: 
1. The `ssh klone-login` command to login with your short cut. 
2. The `squeue` command to view your Slurm jobs **named `vsc-proxy-jump`**.
3. The `sed` command then modifies `~/.ssh/klone-node-config` in place by searching `~/.ssh/klone-node-config` for "Hostname" followed by any number of any characters (`.*`), and replaces it with "Hostname $NODE" where `$NODE` is the node running your job called "vsc-proxy-jump" (`n3120` in this example).
:::

### Connect VS Code to Node via ProxyJump

On your local machine, open VS Code (install the Remote-SSH extension if necessary). Use `Remote-SSH` to Connect to Host. 

![](/img/docs/vscode/VSCode-Connect.png 'Connect to Host')

Select `klone-node` in the list of configured hosts. 

![](/img/docs/vscode/VSCode-klone-node.png 'Select klone-node')

After two-factor authentication and when any remaining remote extensions are installed, a terminal will show that we are connected to the configured compute node. Now you will be able to navigate to the remote file structure of Hyak like your home directory or group directories in `/gscratch/`. 

![](/img/docs/vscode/VSCode-Connected.png 'Connected to klone-node')

Via this method, Windows users may have to provide two-factor authenication when changing directories. A better alternative for Windows users might be to connect [**VS Code via Code-server**](tools/vsc-code-server.md).

### End the Session

To end your session, use the File menu and select "Close Remote Connection."

And end the job on the compute node with `scancel` on `klone` like the following example.

```bash
scancel --name vsc-proxy-jump
```

If you have trouble with this method, please report errors in an email to **help@uw.edu** with Hyak in the message.
