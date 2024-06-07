---
id: win-overlay
title: Working in the Overlay
---

In this section we're going to create an overlay: think of it as adding a changeable layer on top of the unchangeable container.
This section is critical because we will install Conda & modify it within the overlay.

:::important
This section is performed entirely on `klone`, not your local computer. 
:::

## Creating a mutable overlay
We recommend exiting any interactive jobs on `klone` if applicable and using `exit` to log out of `klone` completely, starting with a clean slate. 

First, we'll use our new `ssh` shortcut to get onto the login node. Then, we'll request an interactive job called `klone-container` in the `ckpt` partition with 1 CPU (unless otherwise specified with `--ntasks`, a job will have 1 task) and 16GB of memory for a mazimum time of 4 hours:

```bash
ssh klone-login
###
### Truncated login and Duo 2-Factor Authentication
###
salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=klone-container --time=4:00:00
```

Now that we're on a node, in a job named "klone-container", we can create our overlay.
The command itself is trivial, but it does require a bit of thought.
The size you specify here is in MB: consider how much space you think you'll need to fit your Conda installation.
Two things to keep in mind:
1. The overlay we are creating is an `ext3` filesystem, so while technically it is possible to change the size, it's often easier to start over.
   - This means you should try to make sure it's large enough to fit your Conda installation and environments.
2. When you run this, a file will be created that takes up ***the entire space***.
   - This means that while you want the file to be large enough to fit Conda, you will anger your lab if you allocate 100GB when you only needed 5GB.


By this point in the tutorial, we hope you understand that disk storage management is important, as we have stressed [**selecting your working directory**](https://hyak.uw.edu/docs/hyak101/python/setup#selecting-your-working-directory). 
Here is the command to create your overlay for conda:
```bash
apptainer overlay create --size 5120 conda-overlay.img
```

Once finished, you can run the container with your overlay attached. We'll test the overlay by writing a file within at the root-level of the overlay:

```bash
apptainer run --overlay conda-overlay.img hyak-container.sif
Apptainer> echo "It works!" > /overlay.txt
Apptainer> cat /overlay.txt
It works!
Apptainer> exit
```

:::note
Above, `Apptainer>` indicates that you are working in a shell inside the container-overlay image. You don't need to copy `Apptainer>` with these code lines to follow the tutorial.
:::

Try to understand where we just created that file. That `overlay.txt` ***exists only in your overlay***.
If you enter this container without adding the overlay, `overlay.txt` won't exist.
It doesn't exist on the node (users don't have permissions to create files here). 

To demonstrate this: 

```bash
apptainer run hyak-container.sif
Apptainer> cat /overlay.txt
cat: /overlay.txt: No such file or directory
Apptainer> exit
exit
cat /overlay.txt
cat: /overlay.txt: No such file or directory
```

Before we continue, there's a distinction you must understand:

- You can attach your overlay, like we just did, in `read-write` mode. This allows you to make modifications.
- You can also attach your overlay as `read-only`, by appending `:ro` to the overlay path like this:

```bash
apptainer run --overlay conda-overlay.img:ro hyak-container.sif
```

:::warning Read-write overlays are restricted

If you attach an overlay in `read-write` mode, you will not be able to attach it to another container—even in `read-only`—until it has been closed.

If you attach an overlay in `read-only` mode, you can use it as many times as you need.
:::

The command to run our container is rather long, and there's two different ways we might call it (one for read-write, one for read-only),
so we've made two short scripts to lauch the container with overlay, which we want you to copy into your working directory:

```bash 
cp /sw/hyak101/python/launch-container.sh .
cp /sw/hyak101/python/launch-container-ro.sh .
```

Use `cat launch-container-ro.sh` to view its contents. Use `cat launch-container.sh` to view it or its contents below: 

```bash title="~/launch-container.sh"
#!/bin/bash
apptainer run --overlay conda-overlay.img hyak-container.sif ${@}
```

The only difference between these launchers is the inclusion of `:ro` in the latter, which
mounts the overlay read-only.

In the [**Building a Container**](container#runscript-what-the-container-does) section,
we defined a couple methods of running the container.
1. Without arguments: launch an interactive shell.
2. With arguments: try to execute the arguments.

Passing the arguments given to this script (`${@}`) to the container makes sure our launcher
can start both methods.

One last thing, don't forget to make these scripts executable:
```bash
chmod +x launch-container*.sh
```
From now on, we are going to use the `launch-container.sh` script to launch the container-overlay combo in read-write mode, but you can go back to the read-only version at any time. 

## Installing Miniconda
Let's use our `launch-container.sh` script to get into the container (in read-write mode) and install Miniconda. To run the Bash script `launch-container.sh` we add `./` in front and we will see the `Apptainer>` prompt indicating we are inside a shell within the container. Then we can use `wget` to download the installer script from the internet. 

```bash
./launch-container.sh
# Note "Apptainer>" shows that you are inside the container.
Apptainer> wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

Once the installer finishes downloading, we'll tell it to install Miniconda at `/opt/miniconda` which will ***only exist*** in our overlay:
```bash
Apptainer> bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/miniconda
```

To make this even more convenient, once Miniconda is installed, we'll add the overlay's `conda` to our `~/.bashrc`.
```bash
Apptainer> /opt/miniconda/bin/conda init bash
no change     /opt/miniconda/condabin/conda
no change     /opt/miniconda/bin/conda
no change     /opt/miniconda/bin/conda-env
no change     /opt/miniconda/bin/activate
no change     /opt/miniconda/bin/deactivate
no change     /opt/miniconda/etc/profile.d/conda.sh
no change     /opt/miniconda/etc/fish/conf.d/conda.fish
no change     /opt/miniconda/shell/condabin/Conda.psm1
no change     /opt/miniconda/shell/condabin/conda-hook.ps1
no change     /opt/miniconda/lib/python3.9/site-packages/xontrib/conda.xsh
no change     /opt/miniconda/etc/profile.d/conda.csh
//highlight-next-line
modified      /mmfs1/home/UWNetID/.bashrc

//highlight-next-line
==> For changes to take effect, close and re-open your current shell. <==
```

Now we'll reconnect & see if it worked:
```bash
Apptainer> exit
# Relauch the container with the launch-container.sh script
./launch-container.sh
Apptainer> conda
usage: conda [-h] [-V] command ...
```
Being able to open the conda usage documentation shows that the installation of conda worked. 

:::caution Fun Fact
Even this *mini* installation of Conda, with no custom environments, takes up over 22,000 inodes! However, as far as the cluster is concerned, you've only created a single file: your overlay at `~/conda-overlay.img`.
:::

Next up, we'll create an environment and install Jupyter.

## Configuring Jupyter
To complete our containerized version of conda, we will demonstrate running services (like a Jupyter server) inside a container.

:::tip Pro tip: customization opportunity
If you are a conda user, but don't need this container for jupyter, at this point you could build a custom environment for any python protocol by adapting the following isntructions to install your required packages. 
:::

### Installing the Jupyter software
First, we'll create a `jupyter` environment, activate it, and install the `jupyter` package.

```bash
Apptainer> conda create --name jupyter
Apptainer> conda activate jupyter
Apptainer> conda install -y jupyter
```

The set up of your container-overlay combo is complete for this tutorial. Now you can exit the container and move onto the next set of instructions starting jupyter. 
```bash
Apptainer> exit
```

### Creating our Jupyter server launch script
If you recall from the [**Building a Container**](container#runscript-what-the-container-does) section,
we defined a second way to start our container: `apptainer run hyak-container.sif arguments`, which attempts to run
whatever we put in `arguments`. We need script called `start-jupyter-server.sh` that will launch a Jupyter server for us, so that we can pass that
to the container as our argument.

This script has already been created, and you can copy it from
`/mmfs1/sw/hyak101/python` into your home directory. 

```bash
cp /mmfs1/sw/hyak101/python/start-jupyter-server.sh .
# print the contents of the script to your screen with cat
```
We'll use this script during the start up sequence. The take-away message is that `launch-container.sh` and `start-jupyter-server.sh` work together to launch the container and overlay and start conda and jupyter server from within the container. 

:::tip Extra Credit: Understanding the script

Let's walk through `start-jupyter-server.sh`, as it is fairly complex:

#### 1. Getting into our conda environment.

At the top, we have a variable that you can change if you want to run JupyterLab instead of a
Jupyter notebook server. Just change the `SERVER_TYPE` to `'lab'`.

```bash title="~/start-jupyter-server.sh"
#!/bin/bash
SERVER_TYPE='notebook'

if [[ -z $APPTAINER_NAME ]]; then
    echo "Error: not in an Apptainer container"
    exit 1
fi

. ~/.bashrc
conda activate jupyter
if (( $? != 0 )); then
    echo "Error: couldn't start Jupyter"
    exit 1
fi
```

Next is our first error check: if we're not in a container (i.e. if the environment variable `APPTAINER_NAME` isn't set),
print an error message and exit.

Then, we'll source our `~/.bashrc` to get access to the conda installation in our overlay
and activate the `jupyter` environment we created. If that `conda` command fails for any reason,
exit with an error message.

#### 2. Finding an open port.

```bash title="~/start-jupyter-server.sh"
function OPEN_PORT() {
    read LOWERPORT UPPERPORT < /proc/sys/net/ipv4/ip_local_port_range
    (( RANGE = UPPERPORT - LOWERPORT ))
    (( PORT = 0 ))
    while :; do
        (( PORT = LOWERPORT + (RANDOM % RANGE) ))
        (echo -n >/dev/tcp/localhost/$PORT) >/dev/null 2>&1
        if (( $? != 0 )) ; then
            echo $PORT
            break
        fi
    done
}
```
This starts by reading the local port range, available at `/proc/sys/net/ipv4/ip_local_port_range`.
Then, it picks random ports in that range until it finds one that isn't being used, and prints it out.

#### 3. Starting the Jupyter server.

```bash title="~/start-jupyter-server.sh"
jupyter $SERVER_TYPE --port $(OPEN_PORT) --ip "0.0.0.0" --no-browser >/dev/null 2>&1 &
JUPYTER_PID=$!
sleep 15
```

Here we launch the Jupyter server, with the following options:
- `$SERVER_TYPE`: this is what we specified at the top, a `notebook` server.
- `--port $(OPEN_PORT)`: this verified-open port from our helper function.
- `--ip "0.0.0.0"`: this says that we'll allow connections from anywhere.
- `--no-browser`: this launches the Jupyter server without attempting to start up a browser like Firefox locally.
- `>/dev/null 2>&1`: this silences the Jupyter launch by sending `STDOUT` and `STDERR` to `/dev/null`.
- `&` this puts the server process in the background.

Before we move on, we save the process ID (`$!`) for the Jupyter server and sleep for 15 seconds while it starts up.

#### 4. Getting the Jupyter server's connection information.

```bash title="~/start-jupyter-server.sh"
for i in {1..5}; do
    RUNNING_SERVER=$(jupyter $SERVER_TYPE list --json)
    if [[ -n $RUNNING_SERVER ]]; then
        python3 -c \
        "import json; d=json.loads('$RUNNING_SERVER'); print(d['port'],d['token'])" \
        > ~/.jupyter-port-and-token
        break
    fi
    sleep 5
done
```
This loop will try 5 times to get the port & token for the Jupyter server that we started.
Once we see some output from the `jupyter notebook` command, i.e. the `RUNNING_SERVER` variable isn't empty,
we'll use a Python oneliner to:
1. Parse and print the port and token.
2. Place that information in a hidden file for us later.

#### 5. Keeping our launcher running.
```bash title="~/start-jupyter-server.sh"
if [[ -n $RUNNING_SERVER ]]; then
    echo "Info: Jupyter server is running, port & token in ~/.jupyter-port-and-token"
    wait $JUPYTER_PID
    rm ~/.jupyter-port-and-token
else
    echo "Error: couldn't find a running Jupyter server"
    exit 1
fi
```
If we ended up getting the server information,
we'll keep the script running with `wait $JUPYTER_PID`, which will wait until the Jupyter process is closed.
Once the Jupyter server is closed, we remove the hidden file with our connection information.

If we didn't get any Jupyter server information, print an error message and exit.

:::