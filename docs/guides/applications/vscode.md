---
title: "VS Code"
---

[**Visual Studio Code (VS Code)**](https://code.visualstudio.com/) is a versatile and lightweight source-code editor developed by Microsoft, known for its robustness, extensive customization options, and integration with various programming languages and tools. Connecting VS Code to Hyak's HPC environment enables seamless development and debugging of complex scientific or computational applications, leveraging version control integration and efficient code editing.

:::warning Be a good HPC-citizen - do not connect to a login node
While developing your code with connectivity Hyak is a great usage of our services, connecting directly to the login node via the `Remote-SSH` extension will result in VS Code server processes running silently in the background and leading to node instability. As a reminder, **we prohibit users running processes on the login node**. 
:::

## Connection Methods

Here we provide three solutions to connect VS Code to Hyak that will help limit the possibility that your work would cause system instability on the login node: 

- [**(Simplest) VS Code on Open OnDemand via Code-server**](ood/vscode.md): Open OnDemand (OOD) is a web-based portal that provides an integrated, single access point for access to the Klone HPC Cluster. VS Code on OOD is provided through code-server. 
- [**VS Code via Code-server**](#vs-code-via-code-server): a Docker container which uses a server to develop and execute your code reducing battery usage. `code-server` handles the VS Code background processes, preventing them from slowing down your local machine.
- [**VS Code via ProxyJump**](#vs-code-via-proxyjump): uses ProxyJump and the `Remote-SSH` VS Code extension to connect to a compute node. This option requires more from your local machine, more set up, and more authentication steps for Windows users. 

### Additional Considerations

VS Code's high usage is due to it silently installing its built in features into the user's home directory `~/.vscode` on `klone` enabling intelligent autocomplete features. This is a well known issue, and there is a solution that involves disabling the `@builtin TypeScript` plugin from the VS Code on your local machine. [**Here is a link to a blog post about the issue and the super-easy solution.**](https://medium.com/good-robot/use-visual-studio-code-remote-ssh-sftp-without-crashing-your-server-a1dc2ef0936d) Disabling @builtin TypeScript will reduce your usage of the shared resources and avoid problems. Disabling @builtin TypeScript is also recommended for the [**VS Code via ProxyJump**](#vs-code-via-proxyjump) method.

Silent processes from VS Code will continue to run on `klone` even after you have logged off. Check which processes are running on the login node, especially if you have been receiving usage violations when you are not aware of jobs running. Look for `vscode-server` among the listed processes with the following command, replacing `UWNetID` with **your UW Net ID**.

```js
ps aux | grep <UWNetID>
``` 

---

## VS Code via Code-Server

This solution:

1. Provides a method to connect VS Code to a compute node on `klone`, preserving the login nodes for the community. *As a reminder, we prohibit users running processes on the login node.*

2. Uses a server to develop and execute your code reducing battery usage. `code-server` handles the VSCode background processes, preventing them from slowing down your local machine. 

3. Provides a simpler alternative to [**VS Code via ProxyJump**](#vs-code-via-proxyjump), which requires a lot of setup and for Windows users requires 2-factor authentication to login and change directory. 

4. Involves steps: making a symbolic link to the container stored on hyak or pulling the docker container yourself, launching a batch job to start the container on a compute node, opening a SSH tunnel to the compute node where the container is running, and securely accessing VS Code through your browser window. 

### Accessing the Container

**This step only needs to be performed during initial set up.**

We have pulled a version of the code-server container for our users. This removes 5 minutes of set up, and allows use of the container without occupying user disk storage. 

First, navigate to a directory a where you will store your symbolic link to the code-server container. In this example, we will navigate to our home directory. 

```js
cd $HOME
```

Create a symbolic link to the container which we have stored for you in `/mmfs1/sw/containers/code-server/`. The symbolic link shortcut will appear in the directory where the command was initiated, unless otherwise specified.

```js
ln -s /mmfs1/sw/containers/code-server/code-server_4.89.0-39.sif code-server_4.89.0-39.sif
# Now you can use the code-server container from your directory 
# rather than specifying the entire path to our version of the container.
```

This will link to code-server container version 4.89.0-39. There are other versions of the container you might consider: [**code-server tags**](https://hub.docker.com/r/codercom/code-server/tags), and below, we include optional instructions for pulling the latest version of code-server. 

:::tip Optional: pull the container yourself

**This step only needs to be performed during initial set up.**

Start an interactive job to pull the container with the apptainer module. Here is an example command to start your interactive job (find out which accounts and partitions your can access with the `hyakalloc` command): 

```js
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=code-server --time=2:00:00
```

Pull the container from DockerHub. This will take a few minutes to complete. When complete, you will have a container image called  `code-server_latest.sif`. There are other versions of the container you might consider rather than the latest version: [**code-server tags**](https://hub.docker.com/r/codercom/code-server/tags).
```js
apptainer pull docker://codercom/code-server
```

:::

### Launch code-server with Slurm

Download the Slurm batch script.
```js
wget https://hyak.uw.edu/files/code-server.job
```

Edit the job script (find comments "#update this line") to set your code-server session home directory and provide the name of the container if it does not match `code-server_latest.sif`, and edit the `SBATCH` directives as needed. The code block below shows the lines that should be updated as needed. 

```js
# To identify accounts and partitions that are available to you, use the hyakalloc command
//highlight-next-line
#SBATCH --partition=ckpt # update this line
//highlight-next-line
#SBATCH --time=02:00:00 # update this line to change time limit
# Set home destination for code-server session
//highlight-next-line
CODER_HOME="/gscratch/scrubbed/UWNetID" # update this line
# Provide container file
//highlight-next-line
CODER_SIF="code-server_4.89.0-39.sif" # update this line if needed
```
Submit the script with `sbatch`. **Repeat this step and all following steps each time you log in and connect to VS Code.**
```js
//highlight-next-line
sbatch code-server.job
Submitted batch job 12345678
```
This script will start a batch job and launch the code-server container. The `SSH` tunneling instructions, including the code-server session password, will be written to the output file (`stdout`), for example `code-server.job.12345678` would be the output file in here where 12345678 is our fictional Job ID--the JobID for your output file will be different. Concatenate (`cat`) the output file for tunneling instructions. The following is an example output.

```js
//highlight-next-line
cat code-server.job.12345678
1. SSH tunnel from your workstation using the following command:

   ssh -N -L 8080:n3088:59985 UWNetID@klone.hyak.uw.edu

   and point your web browser to http://localhost:8080

2. log in to Code Server using the following credentials:

   password: +WwYzgh7YH/yHzUWNWNS

When done using Code Server, terminate the job by:

1. Sign out of Code Server (Find the three-lines icon Menu and select "Sign out of Code Server")
2. Issue the following command on the login node:

      scancel -f 12345678
```

:::tip Pro Tip
Monitor the job with `squeue` and your UWNetID like the following example.

```js
//highlight-next-line
squeue -u <UWNetID>
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678   compute code-ser  UWNetID  R       3:15      1 n3088
```
:::

The output file (`code-server.job.12345678` in this example) will also contain messages from `code-server` as the connection is established. These messages include:

1. The storage location of session associated files - `~/.local/share/code-server` in your home directory.
2. The location of the configuration file for the session which contains the password that is also printed in the output file - `~/.config/code-server/config.yaml` in your home directory.
3. Which IP and Port `code-server` HTTP and session is listening to. 

As your session continues, more information will be printed to this output file. 

### Establish the SSH tunnel

Follow the instructions in the output file. Open a new terminal/powershell/PuTTy window **ON YOUR COMPUTER** and use your version of the tunnel command from your job output file (e.g., `code-server.job.12345678`). The following is an example:
```js
//highlight-next-line
ssh -N -L 8080:n3088:59985 UWNetID@klone.hyak.uw.edu
... provide UWNetID password
... Duo 2 Factor Authentication
```
The login will appear to hang, but your connection is now open. 

:::warning
Do not use the code-server password to open the ssh tunnel. After your ssh command, your UWNetID password is required. Multiple failed login attempts will result in a IP ban. 
:::

Open a new browser window to <ins>**http://localhost:8080**</ins> and provide **the password from the output file** (`code-server.job.17440706` and `+WwYzgh7YH/yHzUWNWNS` in this example).

![Input password from output file.](/img/docs/vscode/vsc-pw.png 'Provide Password')

Extensions can be installed through the browser and will be stored in `~/.local/share/code-server/extensions` in your home directory.

### End the Code-Server Session

To end your session, find the three-lines icon Menu and select "Sign out of Code Server."

![Page with arrow indicating to click on the top left to sign of of code server](/img/docs/vscode/vsc-signout.png 'Sign Out')

And end the batch job with `scancel` and the JobID on `klone` like the following example.

```js
scancel -f 12345678
```

If you have trouble with this method, please report errors in an email to [**help@uw.edu**](mailto:help@uw.edu) with Hyak in the message. 

### Background Reading

[**Coder Home**](https://coder.com/)

[**Code-server github repo**](https://github.com/coder/code-server)

[**Code-server documentation**](https://coder.com/docs/code-server/latest)

[**DockerHub page**](https://hub.docker.com/r/codercom/code-server)

[**Video explaining the benefits of Code-server**](https://www.youtube.com/watch?v=h17bHCCEcvI&pp=ygULY29kZS1zZXJ2ZXI%3D)

---

## VS Code via ProxyJump

This solution:

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
Here is where things get confusing because we will use the same protocol to also generate a second keypair  and the fie names below will be repeated. If you get confused, **please read the instructions again carefully**. If you are still stuck, please email [**help@uw.edu**](mailto:help@uw.edu) with "Hyak" in the subject line to ask for assistance. 
:::

Your next required keypair is called an [**Intracluster SSH Key, which we explained elsewhere in our docs**](https://hyak.uw.edu/docs/getting-started/intracluster-keys). This pair is for navigating between nodes on `klone` with ssh (Intracluster = Within `klone`, get it?). 

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

If your private key permissions are too open, ssh won't let you connect to klone. To solve this, change the permissions on your private key file. [**Apply this solution.**](https://superuser.com/questions/1296024/windows-ssh-permissions-for-private-key-are-too-open)

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

We will use this short cut (ProxyJump) with the `Remote-SSH` extension of VS Code to connect VS Code to the open compute node on `klone`. 

:::tip PRO TIP
Manually editing `~/.ssh/klone-node-config` every time you want to connect VS Code is tedious and prone to error. Use the following bash script **ON YOUR COMPUTER** to get the hostname of the compute node you wish to connect to with your ProxyJump. [**Download the script here**](https://hyak.uw.edu/files/set-hyak-node.sh).

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

Via this method, Windows users may have to provide two-factor authentication when changing directories. A better alternative for Windows users might be to connect [**VS Code via Code-server**](#vs-code-via-code-server).

### End the ProxyJump Session

To end your session, use the File menu and select "Close Remote Connection."

And end the job on the compute node with `scancel` on `klone` like the following example.

```js
scancel --name vsc-proxy-jump
```

If you have trouble with this method, please report errors in an email to [**help@uw.edu**](mailto:help@uw.edu) with Hyak in the message.
