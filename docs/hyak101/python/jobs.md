---
id: jobs
title: Interactivity & Jobs
---

## Open up Jupyter
This final section continues right where we left off: with Jupyter.
We had just finished going through our Jupyter server launch script, so now we
will start a job using our container and that launcher.

### Starting the server with SBATCH
As with the container-building SBATCH script, this one is available under `/mmfs1/sw/hyak101/python`. Copy
it to your home directory, and we'll go through it.

#### 1. The SBATCH variables
```bash title="~/jupyter-server.job"
#!/bin/bash
#SBATCH --job-name=klone-container
#SBATCH --cpus-per-task=1
#SBATCH --mem=16GB
#SBATCH --partition=ckpt
#SBATCH --time=4:00:00
#SBATCH --output=jupyter-server-%j.out
```
The only part of this you shouldn't change is the job name, since we automated getting the node hostname
for a job called `klone-container`. Everything else is up to you: the number of CPUs, the memory, the partition,
and the time limit.

#### 2. Starting the Jupyter server in the container
```bash title="~/jupyter-server.job"
~/launch-container.sh ~/start-jupyter-server.sh
```
Here are our scripts in action: start the container (with the read-write version of the container launcher),
and have that container run our Jupyter launcher. Once the job has started, watch the job's output file for
changes. It'll be named `jupyter-server-12345678.out`, but with your job's ID, so we can check it out with:
```shell terminal=true
$ tail --follow jupyter-server-12345678.out
//highlight-next-line
Info: Jupyter server is running, port & token in ~/.jupyter-port-and-token
```

Once you see that informational message, the Jupyter server is running and we're ready for the last step:
the port forwarding.

### The last Bash script of the guide

I swear, this is the last one. You can download it [here](https://hyak.uw.edu/files/hyak101/python/start-jupyter-forwarding.sh), and then we'll walk through it:

#### Retrieving the connection information
```bash title="~/start-jupyter-forwarding.sh"
#!/bin/bash
JUPYTER_INFO=$(ssh klone-node 'cat ~/.jupyter-port-and-token' 2>/dev/null)

if [[ -z $JUPYTER_INFO ]]; then
    echo "Error: Couldn't retreive Jupyter server port/token"
    exit 1
fi
```

We start by saving the output of a remote command that we run on the login node.
The file with the Jupyter information, `~/.jupyter-port-and-token`, will look something like this:

```shell terminal=true
$ cat ~/.jupyter-port-and-token
34567 7e5c7a539a01
```

That line is what ends up in our `JUPYTER_INFO` variable, i.e. `JUPYTER_INFO='34567 7e5c7a539a01'`.
If the variable is empty (which we check with `-z`), exit after printing an error message.

#### Separating the port and the token

Here's a bit of advanced Bash:

```bash title="~/start-jupyter-forwarding.sh"
JUPYTER_PORT=${JUPYTER_INFO% *}
JUPYTER_TOKEN=${JUPYTER_INFO#* }
```

The variable `JUPYTER_PORT` will strip a space (and everything after it) from `JUPYTER_INFO`, leaving us with just the port.
The variable `JUPYTER_TOKEN` is the opposite: it will strip a space (and everything *before* it) from `JUPYTER_INFO`, leaving
us with just the token.

If you want to learn more about string manipulation in Bash, check out
The Linux Documentation Project's [Advanced Bash Guide](https://tldp.org/LDP/abs/html/string-manipulation.html).

#### Forwarding the port

```bash title="~/start-jupyter-forwarding.sh"
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

Before we move on, we save the process ID for SSH (the last process ID is saved in `$!`)
and we make sure it didn't exit with an error (the last exit code is saved in `$?`).

#### Print it all out

```bash title="~/start-jupyter-forwarding.sh"
echo
echo "Connect to:"
echo "  http://localhost:8888/?token=$JUPYTER_TOKEN"
echo "Close tunnel with: "
echo "  kill $SSH_PID"
echo
```

This part is easy: print out the web address we'll use to connect to our Jupyter server,
and print out the `kill` command you can use to close the SSH forwarding when you're done.

### Putting it all together

All we have to do now is make sure the node is correct, start the forwarding, and open
a browser:

```shell terminal=true
$ ~/start-jupyter-forwarding.sh

Connect to:
  http://localhost:8888/?token=7e5c7a539a01
Close tunnel with:
  kill 99999

```

Copy and paste the web address into your browser, and you should be connected to your Jupyter server.

When you're finished, you can use the kill command we generated to ensure your port forwarding is stopped:

```shell terminal=true
$ kill 99999
```

## Using Conda and Slurm
### Interactive jobs

All the difficult work is behind us. If we want to use our container interactively, we'll
just use all the shortcuts we created.

#### 1. Start an interactive job on the login node
```shell terminal=true
$ ssh klone-login
[UWNetID@klone-login01 ~]$ salloc --account=uwit --partition=ckpt \
--cpus-per-task=1 --mem=16G \
//highlight-next-line
--job-name=klone-container
salloc: Pending job allocation 1234567
salloc: job 1234567 queued and waiting for resources
salloc: job 1234567 has been allocated resources
salloc: Granted job allocation 1234567
salloc: Waiting for resource configuration
salloc: Nodes n3120 are ready for job
[UWNetID@n3120 ~]$
```
First, we'll request an interactive job in the checkpoint partition, with a single CPU and 16GB of memory.
The most important part, if you're going to connect directly to the node, is that you need to name the job with
`--job-name=klone-container` so that our node-finding script works properly.

#### 2. Get into our container
```shell terminal=true
[UWNetID@n3120 ~]$ ~/launch-container.sh
Apptainer>
```
We automated this step, too. Now we're in our container, attached to a read-write overlay filesystem.

#### 3. Run Conda and Slurm commands
```shell terminal=true
Apptainer> conda
usage: conda [-h] [-V] command ...
# Truncated the remainder of the conda output

Apptainer> squeue -u $USER
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
           1234567      ckpt klone-co  uwnetid  R      10:00      1 n3120
Apptainer>
```

And that's all there is to it. Before we move on to non-interactive jobs, here's the background
on Slurm compatibility:

:::info What's required for Slurm?
Running Slurm in any container requires the following:
1. The same version of Slurm running on the node (which we installed from the Hyak repository).
1. The same user ID and group ID for the Slurm user as on the node (which we copied during the container build).
1. Three bind-mounts to node filesystems, all of which are included in the compute node's default Apptainer configuration:
   - `/var/run/munge`
   - `/var/run/slurm`
   - `/var/spool/slurmd`
:::
### Non-interactive jobs

Running non-interactive jobs is a little more complex, since we'll need to pass a script to our container.
Let's say you've written a bit of code that uses one of the conda environments in your overlay: we'll call
it `~/do-some-research.py`. We'll start by writing a Bash script to get into the conda environment & run the script:

```bash title="~/start-research.sh"
#!/bin/bash
. ~/.bashrc
conda activate ResearchEnvironment
python3 ~/do-some-research.py
```

Don't forget to make this script executable:
```shell terminal=true
[UWNetID@klone-login01 ~]$ chmod +x ~/start-research.sh
```

Now we'll make an SBATCH script, where we pass this script to our container:

```bash title="~/research.job"
#!/bin/bash
#SBATCH --job-name=research
#SBATCH --cpus-per-task=8
#SBATCH --mem=64GB
//highlight-start
#SBATCH --account=uwit
#SBATCH --partition=compute
//highlight-end
#SBATCH --time=8:00:00

~/launch-container-ro.sh ~/start-research.sh
```

This will start a job named 'research' with 8 CPUs, 64GB of RAM, and a time limit
of 8 hours. Don't forget to change the account or parition.
This tells our container (with our conda overlay in read-only) to run
the `~/start-research.sh` wrapper for our `~/do-some-research.py` Python script.
All that's left is to submit the job with `sbatch ~/research.job` and wait for the results.

## Connect with VSCode

This final section is broken up into two parts.
The first part is trivial: using VSCode's Remote-SSH extension to connect to an interactive job & edit code.
The second part isn't so trivial: we're going to use an undocumented VSCode feature to *SSH directly into our container on the node*
so that VSCode extensions can, for instance, run Jupyter Notebooks from our conda environment.

Let's start with the easy part.

### Using VSCode on a compute node

All we need to do here is add a single step to our interactive job setup.

#### 1. Start an interactive job named 'klone-container'
```shell terminal=true
[UWNetID@klone-login01 ~]$ salloc --account=uwit --partition=ckpt \
--cpus-per-task=1 --mem=16G \
//highlight-next-line
--job-name=klone-container
# Truncated Slurm output
[UWNetID@n3120 ~]$
```
Once again, we're requesting an interactive job with 1 CPU and 16GB of memory. Just have to wait for it to be allocated.

#### 2. On your local machine, get the job's node

Once we have the job, on our local machine we'll make sure our SSH configuration has the correct node:

```shell terminal=true
$ ~/set-hyak-node.sh
$ cat ~/.ssh/klone-node-config
Host klone-node
        Hostname n3120
        ProxyJump klone-login
```

#### 3. In VSCode, connect with Remote-SSH to the node

With the `klone-node` SSH target ready to go, we'll first use the Remote-SSH extension to connect to a host:

![](/img/docs/hyak101/python/VSCode-Connect.png 'Connect to Host')

Then we'll enter `klone-node`:

![](/img/docs/hyak101/python/VSCode-klone-node.png 'Select klone-node')

And, after VSCode finishes installing the remote extensions, we should see that we're connected:

![](/img/docs/hyak101/python/VSCode-Connected.png 'Connected to klone-node')

That's it. You can now open remote folders like your home directory, or your group's `gscratch` directories, and
use VSCode as you usually do.

### Using VSCode in the container

This is the tricky part. If we want VSCode itself to be able to run anything in our container's conda environments,
we'll have to connect directly to the container. First, we need to add a couple new SSH targets.

#### Additions to our local SSH configuration
We're going to modify our **local** SSH configurations again, starting with the main config at `~/.ssh/config`:

```bash title="~/.ssh/config"
Host klone-login
        User UWNetID
        Hostname klone.hyak.uw.edu
        ServerAliveInterval 30
        ServerAliveCountMax 1200
        ControlMaster auto
        ControlPersist 3600
        ControlPath ~/.ssh/UWNetID@klone-login:%p

Host klone-node
        Include klone-node-config

//highlight-start
Host klone-container*
        Include klone-node-config
        ForwardAgent yes
        RequestTTY yes

Host klone-container-rw
        RemoteCommand /mmfs1/home/%r/launch-container.sh

Host klone-container-ro
        RemoteCommand /mmfs1/home/%r/launch-container-ro.sh
//highlight-end
```

These new shortcuts will allow us to connect (through klone-login) to our container, either with `ssh klone-container-rw` or `ssh klone-container-ro` depending on whether we need to make changes in our overlay.
As mentioned before, the `%r` in the `RemoteCommand` line is an SSH config abbreviation for the remote username—i.e. your UW Net ID—so no need to change it here.
What this is telling SSH is that, when we run `ssh klone-container-ro`, the first thing it should do before allowing us to interact is run our
`launch-container-ro.sh` command.

Also, the `Hostname` from `klone-node-config` needs to apply to both `klone-container` shortcuts, so don't forget to update `~/.ssh/klone-node-config`:

```shell {1} title="~/.ssh/klone-node-config"
Host klone-node klone-container*
  Hostname n3000
  ProxyJump klone-login
```

#### Modifying the VSCode RemoteSSH extension
**Huge caveat:** this VSCode feature, as far as we can tell, is *undocumented*. If this doesn't work, it may be too difficult to
be worth troubleshooting. With that disclaimer out of the way, let's modify our VSCode's `settings.json`:

![](/img/docs/hyak101/python/VSCode-open-json.png 'Open VSCode Settings')

Once you have it open, you need to add the following:

```json
    "remote.SSH.enableRemoteCommand": true,
```

#### Using Remote-SSH to connect to the container
Assuming you still have your `klone-container` job running, and your `~/.ssh/klone-node-config` has
the correct compute node for the job, we can connect directly to the container. Select the `Connect to Host...` option
in the Remote-SSH extension again:

![](/img/docs/hyak101/python/VSCode-Connect.png 'Connect to Host')

But this time, connect to `klone-container-rw`:

![](/img/docs/hyak101/python/VSCode-klone-container.png 'Select klone-container-rw')

It may take a few moments to connect, but once you're in it will look quite similar to when
we connected directly to the node.
Since we're already in the container, we can interact with `conda` right away:

![](/img/docs/hyak101/python/VSCode-conda.png 'Activate conda')

#### Installing VSCode extensions remotely
In this demonstration, we're going to run the the VSCode Jupyter extension,
which means we'll have to install the extensions on klone.
When you browse the 'Extensions' tab, you should see an option to "Install in SSH: klone-container-rw":

![](/img/docs/hyak101/python/VSCode-install-extensions.png 'Install Jupyter remotely')

Install both the Jupyter and the Python extensions before continuing.

#### Opening a Jupyter Notebook

Once the extensions are installed, open up your home directory in VSCode and we'll try to make a new Jupyter Notebook:

![](/img/docs/hyak101/python/VSCode-jupyter.png 'Create a Notebook')

The first time you run the VSCode Jupyter plugins, it'll ask you where you want to run Jupyter. In this case,
we're going to select "Default", because it will run Jupyter "locally" (in the container):

![](/img/docs/hyak101/python/VSCode-jupyter-server.png 'Select the local Jupyter')

It will prompt you to reload the window, which you should do, and finally we'll make sure we're using the right Python:

![](/img/docs/hyak101/python/VSCode-select-python.png 'Select the Python interpreter')

You'll see a list, probably something similar to this, and you can select whichever conda environment's Python you want:

![](/img/docs/hyak101/python/VSCode-python-list.png 'Pick a conda environment')

And with all of that configuration in place, we should be able to test it out with something simple, like this:

![](/img/docs/hyak101/python/VSCode-cell-test.png 'A simple test cell')

#### Is it worth it?

Making this work is advanced, requiring a large stack of interdependent pieces:
we're connecting to directly to our container, on a compute node, running an interactive job,
with our overlay in read-write mode, and installing & running VSCode extensions
by using an undocumented, hidden feature of the Remote-SSH extension.

There are quite a few things that can go wrong, and it's tough to troubleshoot when they do.
For most users, we recommend using JupyterLab or Jupyter Notebook in your browser, using the interactive job from before.
