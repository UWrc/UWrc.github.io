---
id: win-ssh
title: Flexible Connections
---

The next step is to set up a ProxyJump which will connect your local computer directly to the container running Jupyter on a `klone` compute node. A ProxyJump is a useful solution that can help you link external software to the server for real time code development.

:::caution 
These instructions are for **Windows users only**. If you are a Mac/Linux user, please navigate to the Mac/Linux-specific instructions.
:::

## Spending some time on SSH
All of your connections to Hyak are going to go through SSH, so it's worth customizing your
configurations to make this process as easy as possible. We're going to modify our main SSH
configuration, and create a sub-configuration that we can use for automation later in this guide.

Please note we will be doing some additional work on these files in the next section, so ***don't skip past this***.

### Your configuration on the cluster
There's really only one thing that needs to be set up on the cluster: your intracluster keys.
Like many other parts of this guide, we [**already have instructions**](https://hyak.uw.edu/docs/setup/ssh#intracluster-ssh-keys) on this, but since we're keeping this guide self-contained, we'll go through it again here:

If you haven't already done so, log in to the cluster & generate an intracluster SSH key:
```bash
ssh UWNetID@klone.hyak.uw.edu
(UWNetID@klone.hyak.uw.edu) Password:
###
### Truncated Duo 2-Factor Authentication
###
ssh-keygen -C klone -t rsa -b 2048 -f ~/.ssh/id_rsa -q -N ""
```

After that, add the key to your `authorized_keys` file and ensure the permissions are correct:
```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### A set of customized, local configurations
:::important

This entire next section is done on your local computer—your personal Windows machine—***not*** on the cluster.

:::

#### Your primary SSH config

First up create or edit your main SSH configuration file, located at `~/.ssh/config`. The contents of your SSH configuration file will depend on the operating system of your local machine, below is the version for Mac/Linux users. You can use the following template, making sure to replace `UWNetID` for your UW Net ID that you use to log in to `klone`:

```shell title="~/.ssh/config"
Host klone-login
//highlight-next-line
        User UWNetID
        Hostname klone.hyak.uw.edu
        ServerAliveInterval 30
        ServerAliveCountMax 1200

Host klone-node
    Include klone-node-config
```

Once this is in place, we can do the following to log in to klone:
```bash
ssh klone-login
# Instead of:
# ssh UWNetID@klone.hyak.uw.edu
```

Here's a quick rundown of the options we're setting:
- `ServerAliveInterval 30`: every 30 seconds, send a packet to the server (the login node) to keep the connection open.
- `ServerAliveCountMax 1200`: don't close the connection unless we've sent 1200 server-alive messages
without a response from the login node.

Finally, the last line will include the next file we're going to make: A secondary config for the node.

#### A secondary config for the node

These instructions are the same for Windows and Mac/Linux users. 

Here we're defining `klone-node` as a compute node (`n3000`, until we know what the node will be), and
using `ProxyJump` to connect to that node through the login node.

```shell title="~/.ssh/klone-node-config"
Host klone-node
  User UWNetID
  Hostname n3000
  ProxyJump klone-login
```

Because you will be effectively connecting directly from your local computer to the node, you will need to append the SSH public key from your **local** system to the `.ssh/authorized_keys` file under your home directory on `klone`. Or you can do the same by copying your local ssh key onto klone. While we cannot use our key as a authentication factor between our local machine and klone, we can use it when ssh'ing *between* klone nodes.

```bash
ssh-copy-id klone-login
```

**Windows may or may not require a permissions check.** 

If your private key permissions are too open, ssh won't let you connect to klone. To solve this, change the permissions on your private key file. [Apply this solution.](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open)

:::tip EXTRA CREDIT: Testing your Connection
The following is ***optional***, but demonstrates what we have just set up by configuring `klone-login` and `klone-node`. You will test the connection in the next section of the Hyak 101 tutorial. If you wish to test your connection now, follow these steps. 

First, test your new `ssh` shortcut to get onto the login node. Then, request an interactive job in the `ckpt` partition with 1 CPU (unless otherwise specified with `--ntasks`, a job will have 1 task) and 16GB of memory. The `Hostname` will appear when your node is allocated, and follow your UWNetID For example:

```bash
ssh klone-login
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=klone-container
...
salloc: Nodes n3319 are ready for job
[UWNetID@n3319 ~]$
```

The next section of the tutorial will introduce a script that when run on locally will replace the `Hostname` line of your `~/.ssh/klone-node-config` file. For now, manually replace the `Hostname` line with your job node by editing `~/.ssh/klone-node-config` with a text editor. Remember to replace `UWNetID` for your UW Net ID that you use to log in to `klone` if you have not already done that.

```bash title="~/.ssh/klone-node-config"
Host klone-node
  User UWNetID
//highlight-next-line
  Hostname n3319
  ProxyJump klone-login
```

Test your shortcut to connect directly to the node from your local computer:

```bash
ssh klone-node
###
### Truncated Log in Messages and Duo 2FA if required
###
[UWNetID@n3319 ~]$
```

You just logged into the compute node where you have an interactive job running directly from your local computer. 
:::