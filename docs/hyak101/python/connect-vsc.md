---
id: connect-vsc
title: Jupyter in VS Code
---

This final section is broken up into two parts.
The first part is trivial: using VS Code's Remote-SSH extension to connect to an interactive job & edit code.
The second part isn't so trivial: we're going to use an undocumented VS Code feature to ***SSH directly into our container on the node***
so that VSC ode extensions can, for instance, run Jupyter Notebooks from our conda environment.

Let's start with the easy part.

### Using VS Code on a compute node

This is very similar to [**our instructions for connecting to VS Code via a ProxyJump**](https://hyak.uw.edu/docs/tools/vsc-proxy-jump), but more complex. All we need to do here is add a single step to our interactive job setup.

#### 1. Start an interactive job named called 'klone-container'

Once again, we're requesting an interactive job with 1 CPU and 16GB of memory. Just have to wait for it to be allocated.

```bash
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=klone-container
```

Use the `watch` command with the `squeue` command to monitor the job in real time. `watch -n10` will issue the `squeue` every 10 seconds. Use `Ctrl` + `C` to exit the `watch` command.

```bash
watch -n10 squeue --user $USER
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678      ckpt klone-container UWNetID  R      00:01      1 n3219
# use Ctrl + C to exit the watch command
```

Once the job is running, or you see `R` under the column `ST` using `squeue`, use `Ctrl` + `C` to exit the `watch` command.

#### 2. On your local machine, get the job's node

Once we have the job, on our local machine we'll use `set-hyak-node.sh` to set the Hostname to match our job's node.

```bash
./set-hyak-node.sh
cat ~/.ssh/klone-node-config
Host klone-node
        Hostname n3219
        ProxyJump klone-login
```

#### 3. In VS Code, connect with Remote-SSH to the node

:::caution
**The next steps are performed on your local computer.**
:::

With the `klone-node` SSH target ready to go, we'll first use the Remote-SSH extension to connect to a host:

![](/img/docs/hyak101/python/VSCode-Connect.png 'Connect to Host')

Then we'll enter `klone-node`:

![](/img/docs/hyak101/python/VSCode-klone-node.png 'Select klone-node')

And, after VSCode finishes installing the remote extensions, we should see that we're connected:

![](/img/docs/hyak101/python/VSCode-Connected.png 'Connected to klone-node')

That's it. You can now open remote folders like your home directory, or your group's `gscratch` directories, and
use VSCode as you usually do.

### Using VS Code in the container

This is the tricky part. If we want VSCode itself to be able to run anything in our container's conda environments,
we'll have to connect directly to the container. First, we need to add a couple new SSH targets.

#### Additions to our local SSH configuration

:::caution
**The next steps are performed on your local computer.**
:::

We're going to modify our **local** SSH configurations again, starting with the main config at `~/.ssh/config`. Add the highlightes lines below to your `~/.ssh/config`:

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

These new shortcuts will allow us to connect (through klone-login) to our container, either with `ssh klone-container-rw` or `ssh klone-container-ro` depending on whether we need to make changes in our overlay. As mentioned before, the `%r` in the `RemoteCommand` line is an SSH config abbreviation for the remote username—i.e. your UW Net ID—so no need to change it here. What this is telling SSH is that, when we run `ssh klone-container-ro`, the first thing it should do before allowing us to interact is run our
`launch-container-ro.sh` command.

Also, the `Host` from `~/.ssh/klone-node-config` needs to apply to both `klone-node` and `klone-container` shortcuts, so don't forget to update `~/.ssh/klone-node-config` by adding `klone-container*` to the `Host` line:

```bash title="~/.ssh/klone-node-config"
//highlight-next-line
Host klone-node klone-container*
  Hostname n3000
  ProxyJump klone-login
```

#### Modifying the VSCode RemoteSSH extension
:::warning Uncharted territory
**Huge caveat:** this VS Code feature, as far as we can tell, is *undocumented*. If this doesn't work, it may be too difficult to
be worth troubleshooting. 
:::

With that disclaimer out of the way, let's modify our VS Code's `settings.json`:
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
In this demonstration, we're going to run the the VS Code Jupyter extension,
which means we'll have to install the extensions on klone.
When you browse the 'Extensions' tab, you should see an option to "Install in SSH: klone-container-rw":

![](/img/docs/hyak101/python/VSCode-install-extensions.png 'Install Jupyter remotely')

Install both the Jupyter and the Python extensions before continuing.

#### Opening a Jupyter Notebook

Once the extensions are installed, open up your home directory in VS Code and we'll try to make a new Jupyter Notebook:

![](/img/docs/hyak101/python/VSCode-jupyter.png 'Create a Notebook')

The first time you run the VS Code Jupyter plugins, it'll ask you where you want to run Jupyter. In this case,
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
with our overlay in read-write mode, and installing & running VS Code extensions
by using an undocumented, hidden feature of the Remote-SSH extension.

There are quite a few things that can go wrong, and it's tough to troubleshoot when they do.
For most users, we recommend using JupyterLab or Jupyter Notebook in your browser, using the interactive job from before.
