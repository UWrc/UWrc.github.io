---
id: vsc-proxy-jump
title: VS Code via ProxyJump
---

### This solution:

1. Provides a method to connect VS Code to a compute node on `klone`, preserving the login nodes for the community. *As a reminder, we prohibit users running processes on the login node.*

2. Runs VS Code on your local computer, but runs background processes on `klone`. **A local copy of VS Code is required for this exercise.** 

3. Requires: the set up of primary and secondary configuration files on your local computer, key-pair configuration, launching an interactive job, use of the `Remote-SSH` extension to connect to a compute node on `klone`.

:::warning MAC vs. Windows
In this section, some of the instructions differ for Mac and Windows users. 
:::


### Crucial Prerequisite

In the next steps you will be setting up a configuration that will require the use of SSH key pairs. This is a common security measure used when connecting to remote hosts. You will use TWO key pairs. One allows Hyak `klone` cluster to recognize your local computer and the other allows you to move between the `klone` login node and a compute node where you have a job running. 

#### A Keypair for `klone` to recognize your local computer. 

First, ensure you have a SSH public and private keypair for your local computer. You may have set this up in the past. From your Home directory on your local computer, search for `id_rsa` and `id_rsa.pub` the one ending in `.pub` is the public part of the key pair that you will share with `klone` to decode your private key and log on securely. These should be in a directory `~/.ssh` on your local computer. 

```js
cd ~/.ssh
```

If you don't have `id_rsa` and `id_rsa.pub` on your local computer, you should generate a new keypair with the following command: 
```js
ssh-keygen -t rsa -b 4096
```

The public key should look something like the following: 

:::caution important
Search for `id_rsa.pub` under `~/.ssh` on your local computer. 
:::

```js title="id_rsa.pub"
ssh-rsa AAAAB3NzaC1...SOME_STRING...FbFvEYcw== username@user-Device
```
Where it starts with ssh-rsa, contains some long and seemingly-random string, and ends with the username for your computer `@` the name of your computer. You will want to copy this key and paste it into a file called `authorized_keys` on `klone` in your Home Directory under the directory `.ssh`. 

:::caution important
Paste the contents of your `id_rsa.pub` into `~/.ssh/authorized_keys` on `klone`. 
:::

```js title="~/.ssh/authorized_keys"
ssh-rsa AAAAB3NzaC1...SOME_STRING...FbFvEYcw== username@user-Device
```
You can do this manually with copy and paste, or with the command
```js
ssh-copy-id klone-login
```
Below you will be prompted to do this, but we wanted to give you the tools to set this up now. This is a common stumbling block for completing this method for setting up VS Code on Hyak. 

#### A Keypair to navigate between nodes on `klone` with ssh.

:::warning
Here is where things get confusing because we will use the same protocol to also generate a second keypair  and the fie names below will be repeated. If you get confused, **please read the instructions again carefully**. If you are still stuck, please email help@uw.edu with "Hyak" in the subject line to ask for assistance. 
:::

Your next required keypair is called an [<ins>**Intracluster SSH Key, which we explained elsewhere in our docs**</ins>](https://hyak.uw.edu/docs/setup/intracluster-keys). This pair is for navigating between nodes on `klone` with ssh (Intracluster = Within `klone`, get it?). 

**ON `klone`** execute the following command
```js
ssh-keygen -C klone -t rsa -b 2048 -f ~/.ssh/id_rsa -q -N ""
```
This command creates a 2048-bit RSA key with `klone` in the comment field and will look something like the following
```js title="id_rsa.pub"
ssh-rsa AAAAB3NzaC1...SOME_OTHER_STRING...FbFvEYcw== klone
```
Next, add the contents of your public key to the `authorized_keys` file in your home directory with the following commands:
```js
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```
This also ensures the `authorized_keys` file has appropriate permissions.

Your `authorized_keys` file should have at least two keypairs: one for your local computer and one for `klone`. 
```js 
cat ~/.ssh/authorized_keys
```
```js title="~/.ssh/authorized_keys"
ssh-rsa AAAAB3NzaC1...SOME_STRING...FbFvEYcw== username@user-Device
ssh-rsa AAAAB3NzaC1...SOME_OTHER_STRING...FbFvEYcw== klone
```


:::important

This entire next section is done on your local computer—your personal MacOS/Linux or Windows machine—**not** on the cluster.

:::

### Configure SSH

Prepare your main SSH configuration file, located at `~/.ssh/config` **ON YOUR COMPUTER**. The contents of your SSH configuration file will depend on the operating system of your local machine (Mac/Linux or Windows). This step will create a short cut for logging into `klone`; instead of `ssh UWNetID@klone.hyak.uw.edu` the command to login will be `ssh klone-login`.

#### Mac/Linux Users

Use the following template for `~/.ssh/config` on Mac/Linux, replacing `UWNetID` with **your UW Net ID**.

```js title="~/.ssh/config"
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

```js
chmod 600 ~/.ssh/config
```

Once this is in place, we can do the following to log in to `klone`:

```js
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

```js title="~/.ssh/config"
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

```js title="~/.ssh/klone-node-config"
Host klone-node
//highlight-next-line
  User UWNetID
  Hostname n3000
  ProxyJump klone-login
```

This file will also need the correct permissions. **Windows should not require a permissions check.** Mac/Linux update permissions with:

```js
chmod 600 ~/.ssh/klone-node-config
```

:::note
You may have already completed this step as a prerequisite, but here it is again just in case. Because you will be effectively connecting directly from your local computer to the node, you will need to append the SSH public key from your **local** system to the `~/.ssh/authorized_keys` file under your cluster home directory on `klone`. This command will update your authorized keys list. 

```js
ssh-copy-id klone-login
```
:::

Or you can do the same by copying your local ssh key into `~/.ssh/authorized_keys` file on `klone`. While we cannot use our key as a authentication factor between our local machine and klone, we can use it when ssh'ing *between* klone nodes.

#### Windows Users

If your private key permissions are too open, ssh won't let you connect to klone. To solve this, change the permissions on your private key file. [<ins>**Apply this solution.**</ins>](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open)

### Testing your connection

Test your new `ssh` shortcut to get onto the login node.

```js
ssh klone-login
```
Request an interactive job in the `ckpt` partition with 1 CPU (unless otherwise specified with `--ntasks`, a job will have 1 task) and 16GB of memory. **Note: the job will be called "vsc-proxy-jump" as per `--job-name=`.** 
```js
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=vsc-proxy-jump
```

The `Hostname` will appear when your node is allocated, and follow your UWNetID For example:

```js
salloc: Nodes n3120 are ready for job
[UWNetID@n3120 ~]$
```

Manually replace the `Hostname` line with your job node. Don't forget to replace `UWNetID` with **your UW Net ID** if you have not already.

```js title="~/.ssh/klone-node-config"
Host klone-node
//highlight-next-line
  User UWNetID
//highlight-next-line
  Hostname n3120
  ProxyJump klone-login
```

Test your shortcut to connect directly to the node from your local computer:

```js
$ ssh klone-node
. . .
[UWNetID@n3120 ~]$
```

We will use this short cut (ProxyJump) with the `Remote-SSH` extension of VS Code to connect VS Code to the open comute node on `klone`. 

:::tip PRO TIP
Manually editing `~/.ssh/klone-node-config` everytime you want to connect VS Code is tedious and prone to error. Use the following bash script **ON YOUR COMPUTER** to get the hostname of the compute node you wish to connect to with your ProxyJump. [<ins>**Download the script here**</ins>](https://hyak.uw.edu/files/set-hyak-node.sh).

**WARNING this script doesn'tusually work on Windows since bash and sed are not available. If might work if your re on Windows with WSL or Gitbash. MOREOVER, it might not work if you have a different version of sed**

```js title="set-hyak-node.sh"
#!/bin/bash
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
```js
chmod +x set-hyak-node.sh
```
This script works by setting the variable `NODE` and modifying `~/.ssh/klone-node-config` with: 
1. The `ssh klone-login` command to login with your short cut. 
2. The `squeue` command to view your Slurm jobs **named `vsc-proxy-jump`**.
3. The `sed` command then modifies `~/.ssh/klone-node-config` in place by searching `~/.ssh/klone-node-config` for "Hostname" followed by any number of any characters (`.*`), and replaces it with "Hostname $NODE" where `$NODE` is the node running your job called "vsc-proxy-jump" (`n3120` in this example).
:::

:::note
For at least one other version of `sed` this script works after a small adjustment. If the script version above doesn't work for you, try the following: 

```js title="set-hyak-node.sh"
#!/bin/bash
NODE=$(ssh klone-login 'squeue \
    --user $USER \
    --states RUNNING \
    --name vsc-proxy-jump \
    --Format NodeList \
    --noheader ')
  //highlight-next-line
sed -i -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
```
:::

### Connect VS Code to Node via ProxyJump

On your local machine, open VS Code (install the Remote-SSH extension if necessary). Use `Remote-SSH` to Connect to Host. 

![Connect to Host](/img/docs/vscode/VSCode-Connect.png 'Connect to Host')

Select `klone-node` in the list of configured hosts. 

![Select klone-node](/img/docs/vscode/VSCode-klone-node.png 'Select klone-node')

After two-factor authentication and when any remaining remote extensions are installed, a terminal will show that we are connected to the configured compute node. Now you will be able to navigate to the remote file structure of Hyak like your home directory or group directories in `/gscratch/`. 

![Connected to klone-node](/img/docs/vscode/VSCode-Connected.png 'Connected to klone-node')

Via this method, Windows users may have to provide two-factor authenication when changing directories. A better alternative for Windows users might be to connect [<ins>**VS Code via Code-server**</ins>](tools/vsc-code-server.md).

### End the Session

To end your session, use the File menu and select "Close Remote Connection."

And end the job on the compute node with `scancel` on `klone` like the following example.

```js
scancel --name vsc-proxy-jump
```

If you have trouble with this method, please report errors in an email to **help@uw.edu** with Hyak in the message.
