---
id: slurm-forward
title: Slurm Job & Port Forwarding
---

Now that we have performed all of out set up, we have the following elements ready to go: 

**On our local computer: **
- We have configured ssh (`~/.ssh/config`) to have a `klone-login` short cut. 
- We have configured a ProxyJump `~/.ssh/klone-node-config` such that we can log in directly to a compute node where we have a job running. 

**On `klone`:**
- We have selected a working directory where these resources have been saved. In addition, this is the directory that we will see when Jupyter Notebook is open on our browser window. Any data files for analysis should be saved here as well so that they are available to us.
- We have a general purpose container (`hyak-container.sif`) with everything we need to perform our research on `klone`, or at least we have a symbolic link to that container. 
- We have an overlay image for that container (`conda-overlay.img`) where miniconda3 is installed and we have a conda environment (`jupyter`) where Jupyter Notebook is installed. 
- We have launcher scripts for the container in read-only and read-write mode (`launch-container.sh` and `launch-container-ro.sh`).
- We have a script that starts the Jupyter Notebook server (`start-jupyter-server.sh`)

We need a few more elements to tie all of these together, one script on `klone` to launch the container and start jupyter as a Slurm job, a script on our local computer to help automate the ProxyJump, and a script on our local computer to start SSH port forwarding so that we can access Jupyter Notebook running on `klone` from our browser window. 

### A Slurm script to start Jupyter server with `sbatch`

:::caution
**These steps are to be performed on `klone`**
:::

We have prepared a `sbatch` script which will execute `launch-container.sh` and `start-jupyter-server.sh` as a Slurm job, which will launch the container and start jupyter on a compute node. This prepared script is available under `/mmfs1/sw/hyak101/python`. Copy
it to your working directory, and we'll go through it.

```bash
ln -s /mmfs1/sw/hyak101/python/jupyter-server.job .
```
Let's go through it. 

```bash title="jupyter-server.job"
#!/bin/bash
#SBATCH --job-name=klone-container #DO NOT CHANGE
#SBATCH --cpus-per-task=1 #number of CPUs
#SBATCH --mem=16GB #RAM
#SBATCH --partition=ckpt #change if you have access to other resources
#SBATCH --time=4:00:00 #time limit 4 hours
#SBATCH --output=jupyter-server-%j.out

./launch-container.sh ./start-jupyter-server.sh
```
***It is very important not to change the job name***, since we automated getting the node hostname
for a job called `klone-container`, which we will discuss next. You might choose to change: the number of CPUs, the memory, the partition,
and the time limit.

The last line of the script executes `launch-container.sh` and `start-jupyter-server.sh` which will: start the container (with the read-write version of the container launcher),
and have that container run our Jupyter. 

We are not going to run this script right now, but when we do, it produces an output file that will be named `jupyter-server-12345678.out`, but with your job's ID, and we will monitor that for messages showing that Jupyter server is active. 

### Get Hostname with `set-hyak-node.sh`

:::caution
**These steps are to be performed on your local computer**
:::

This script may take a little hacking on your part: while the Bash portion should work regardless
of your operating system, there are too many versions of `sed` to make this work for everyone.
You can download the script [here](https://hyak.uw.edu/files/hyak101/python/set-hyak-node.sh), and we'll walk through it afterwards:

```bash title="set-hyak-node.sh"
#!/bin/bash
NODE=$(ssh klone-login 'squeue \
    --user $USER \
    --states RUNNING \
//highlight-next-line
    --name klone-container \
    --Format NodeList \
    --noheader ')
sed -I '' -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
```

Don't forget to make the script executable. 
```bash
chmod +x set-hyak-node.sh
```

This script works by setting the variable `NODE` and modifying `~/.ssh/klone-node-config` with: 
1. The `ssh klone-login` command to login with your short cut. 
2. The `squeue` command to view your Slurm jobs **named `klone-container`**.
3. The `sed` command then modifies `~/.ssh/klone-node-config` in place by searching `~/.ssh/klone-node-config` for "Hostname" followed by any number of any characters (`.*`), and replaces it with "Hostname $NODE" where `$NODE` is the node running your job called "klone-container" (`n3120` in this example).

If you remember, `~/.ssh/klone-node-config` looked like this with `n3000` or another compute node name as a placeholder. 

```bash title="~/.ssh/klone-node-config"
Host klone-node
  User UWNetID
  //highlight-next-line
  Hostname n3000
  ProxyJump klone-login
```

If you execute this `set-hyak-node.sh` while your `klone-container` job is actively running on `klone` (on compute node `n3120` in this example), you should see something like this:

```bash title="~/.ssh/klone-node-config"
Host klone-node
  User UWNetID
  //highlight-next-line
  Hostname n3120
  ProxyJump klone-login
```

That's is, a whole script to replace the `Hostname` with whatever node is running your `klone-container` job. That is why during the [**Flexible Connections EXTRA CREDIT at the bottom of the page**](https://hyak.uw.edu/docs/hyak101/python/ssh), we had you "tet your connection" by manually replacing `n3000` with the compute node where you had a job running. The result of using this script and manually changing this is the same. 

:::warning `sed` version matters
If this `sed` doesn't work, and you can't figure out how to modify it for your version of `sed`, you can just as easily
edit this file by hand, with `nano` or another text editor, and change the `Hostname` line to the correct node.
:::

If you want to test that your script works to replace the Hostname, [**Return to Flexible Connections EXTRA CREDIT at the bottom of the page**](https://hyak.uw.edu/docs/hyak101/python/ssh), and once you have a job called `klone-container` running on `klone`, execute `set-hyak-node.sh` and see if the script works by viewing `~/.ssh/klone-node-config` before and after running the script to see when Hostname changes. Like this: 

```bash
cat ~/.ssh/klone-node-config

Host klone-node
//highlight-next-line
        Hostname n3000
        ProxyJump klone-login

./set-hyak-node.sh
cat ~/.ssh/klone-node-config

Host klone-node
//highlight-next-line
        Hostname n3120
        ProxyJump klone-login
```

:::important
If Hostname is left blank (i.e., no placeholder) this will not work. Edit `~/.ssh/klone-node-config` to replace the `n3000` placeholder and try again.
:::

### A script for SSH Port Forwarding

:::caution
**These steps are to be performed on your local computer**
:::

I swear, this is the last one. [**You can download it to your local computer by clicking here**](https://hyak.uw.edu/files/hyak101/python/start-jupyter-forwarding.sh). We'll use it during the start up sequence. The takeaway message is that this script gets your Jupyter session information from `klone` (via all the ssh configurations you set up), starts port forwarding, and gives you instructions for accessing Jupyter through the Browser on your local computer.

:::tip EXTRA CREDIT: Understanding the Script

Let's go through the `start-jupyter-forwarding.sh` script as it is fairly complex.

#### Retrieving the connection information
```bash title="start-jupyter-forwarding.sh"
#!/bin/bash
JUPYTER_INFO=$(ssh klone-node 'cat ~/.jupyter-port-and-token' 2>/dev/null)

if [[ -z $JUPYTER_INFO ]]; then
    echo "Error: Couldn't retreive Jupyter server port/token"
    exit 1
fi
```

**This script will only work when Jupyter Server is running on `klone`. We will run this script later.**

The first thing this script does is take a peak into klone with our `klone-node` ProxyJump short cut and attempts to find a file that is saved to our home directory `~/.jupyter-port-and-token` when Jupyter is running. This file containers the port and token information for your Jupyter session. It will use that information to set up our port forwarding. 

`~/.jupyter-port-and-token`, will look something like this and be different everytime you use Jupyter this way, providing extra Cybersecurity:

```shell terminal=true
cat ~/.jupyter-port-and-token
34567 7e5c7a539a01some346235long38472398625token2392386
```

The contents of `~/.jupyter-port-and-token` becomes a Bash variable called `JUPYTER_INFO` variable, i.e. `JUPYTER_INFO='34567 7e5c7a539a01some346235long38472398625token2392386'`.
If the variable is empty (which we check with `-z`), the script exits after printing an error message.

#### Separating the port and the token

Here's a bit of advanced Bash:

```bash title="start-jupyter-forwarding.sh"
JUPYTER_PORT=${JUPYTER_INFO% *}
JUPYTER_TOKEN=${JUPYTER_INFO#* }
```

The variable `JUPYTER_PORT` will strip a space (and everything after it) from `JUPYTER_INFO`, leaving us with just the port. The variable `JUPYTER_TOKEN` is the opposite: it will strip a space (and everything *before* it) from `JUPYTER_INFO`, leaving us with just the token.

If you want to learn more about string manipulation in Bash, check out
The Linux Documentation Project's [**Advanced Bash Guide**](https://tldp.org/LDP/abs/html/string-manipulation.html).

#### Forwarding the port

```bash title="start-jupyter-forwarding.sh"
ssh -N -L 8888:localhost:$JUPYTER_PORT klone-node &
SSH_PID=$!

if (( $? != 0 )); then
    echo "Error: Port forwarding failed."
    exit 1
fi
```

Let's break down the `ssh` command at the top:
- `-N`: this tells SSH not to run anything remotely, since we're just forwarding a port.
- `-L`: this tells SSH that we're forwarding a port.
- `8888:localhost:$JUPYTER_PORT`: connect port `8888` on `localhost` to `$JUPYTER_PORT` (something like `34567`) on the remote host.
- `klone-node`: using our SSH configurations from earlier, the remote host is the compute node running our job.
- `&`: put this process in the background.

Before we move on, we save the process ID for SSH (the last process ID is saved in `$!`) into a variable called `SSH_PID`
and we make sure it didn't exit with an error (the last exit code is saved in `$?`).

#### Print it all out

```bash title="start-jupyter-forwarding.sh"
echo
echo "Connect to:"
echo "  http://localhost:8888/?token=$JUPYTER_TOKEN"
echo "Close tunnel with: "
echo "  kill $SSH_PID"
echo
```

This part of the script is what you see printed to the screen when you run it. It will print the web address we'll use to connect to our Jupyter server, and print out the `kill` command you can use to close the SSH forwarding when you're done.

### Putting it all together

We'll run this for real during the start up sequence, but just so you know it will look like something this when we execute the `start-jupyter-forwarding.sh` script: 

```bash
./start-jupyter-forwarding.sh

Connect to:
  http://localhost:8888/?token=7e5c7a539a01some346235long38472398625token2392386
Close tunnel with:
  kill 99999

```

You will then copy and paste the web address into your browser, and you should be connected to your Jupyter server.

When you're finished, you can use the kill command we generated to ensure your port forwarding is stopped:

```bash
kill 99999
```

:::