---
id: overlay
title: Working in the Overlay
---
In this section we're going to create an overlay: think of it as adding a changeable layer on top of the unchangeable container.
If you recall the first section, where we went over container creation, the container was already made & there was nothing to do on your part.
This won't be the same way: in order to install Conda & modify it, you *will* need to do everything in this section yourself.
Let's get started!

## Creating a mutable overlay
First, we'll use our new `ssh` shortcut to get onto the login node.
Then, we'll request an interactive job in the `ckpt` partition with 1 CPU (unless otherwise specified with `--ntasks`, a job will have 1 task) and 16GB of memory:

```shell terminal=true
$ ssh klone-login
$ salloc --partition=ckpt --cpus-per-task=1 --mem=16G --job-name=klone-container
```

Now that we're on a node, in a job named "klone-container", we can create our overlay.
The command itself is trivial, but it does require a bit of thought.
The size you specify here is in MB: consider how much space you think you'll need to fit your Conda installation.
Two things to keep in mind:
1. The overlay we are creating is an `ext3` filesystem, so while technically it is possible to change the size, it's often easier to start over.
   - This means you should try to make sure it's large enough to fit your Conda installation and environments.
2. When you run this, a file will be created that takes up the entire space.
   - This means that while you want the file to be large enough to fit Conda, you will anger your lab if you allocate 100GB when you only needed 5GB.


If you don't have enough space (home directories are limited to 10GB), you can place this in your lab's `gscratch` directory.
In this example, we're making a 5GB overlay in our home directory:
```shell terminal=true
$ apptainer overlay create --size 5120 ~/conda-overlay.img
```

Once this is finished, you can run the container with your overlay attached & you'll be able to write anywhere that isn't either A) bind-mounted from the node or B) somewhere you're not allowed to write on the shared storage `/mmfs1`. For instance, a file at the root-level:

```shell terminal=true
$ apptainer run --overlay ~/conda-overlay.img ~/hyak-container.sif
Apptainer> echo "It works!" > /overlay.txt
Apptainer> cat /overlay.txt
It works!
Apptainer>
```

Try to internalize where we just created that file. That file exists only *in your overlay*.
If you enter this container without adding the overlay, it won't exist.
It also won't exist on the node (users don't have permissions to create files here):

```shell terminal=true
$ apptainer run ~/hyak-container.sif
Apptainer> cat /overlay.txt
cat: /overlay.txt: No such file or directory
Apptainer> exit
exit
$ cat /overlay.txt
cat: /overlay.txt: No such file or directory
```

Before we continue, there's a distinction you must understand:

- You can attach your overlay, like we just did, in `read-write` mode. This allows you to make modifications.
- You can also attach your overlay as `read-only`, by appending `:ro` to the overlay path like this:

  ```shell terminal=true
  apptainer run --overlay ~/conda-overlay.img:ro ~/hyak-container.sif
  ```

Here's the caveat (it's important enough that it gets a bright-red box):

:::warning Read-write overlays are restricted

If you attach an overlay in `read-write` mode, you will not be able to attach it to another container—even in `read-only`—until it has been closed.

If you attach an overlay in `read-only` mode, you can use it as many times as you need.
:::

The command to run our container is rather long, and there's two different ways we might call it (one for read-write, one for read-only),
so let's make a couple short launchers:

```bash title="~/launch-container.sh"
#!/bin/bash
apptainer run --overlay ~/conda-overlay.img ~/hyak-container.sif ${@}
```
```bash title="~/launch-container-ro.sh"
#!/bin/bash
apptainer run --overlay ~/conda-overlay.img:ro ~/hyak-container.sif ${@}
```

The only difference between these launchers is the inclusion of `:ro` in the latter, which
mounts the overlay read-only.

In the [Building a Container](container#runscript-what-the-container-does) section,
we defined a couple methods of running the container.
1. Without arguments: launch an interactive shell.
2. With arguments: try to execute the arguments.

Passing the arguments given to this Bash script (`${@}`) to the container makes sure our launcher
can start both methods.

One last thing, don't forget to make these scripts executable:
```shell terminal=true
chmod +x ~/launch-container*.sh
```

## A direct line to the node
If you recall from the last section, we created an SSH configuration for the node, but the
node hostname was just a placeholder. Now that we're running a named, interactive job on the cluster,
let's write some automation on our local machine to grab the nodename for us.

### A short script to get the node hostname
This script may take a little hacking on your part: while the Bash portion should work regardless
of your operating system, there are too many versions of `sed` to make this work for everyone.
You can download the script [here](https://hyak.uw.edu/files/hyak101/python/set-hyak-node.sh), and we'll walk through it afterwards:

```bash title="~/set-hyak-node.sh"
#!/bin/bash
NODE=$(ssh klone-login 'squeue \
    --user $USER \
    --states RUNNING \
    --name klone-container \
    --Format NodeList \
    --noheader ')
sed -I '' -E s"/Hostname.*/Hostname $NODE/" ~/.ssh/klone-node-config
```

First, we're going to set the variable `NODE` with the results of an `ssh klone-login` command.
We're running `squeue` to view Slurm jobs, and we're looking specifically for the following:
a job under our username, which is currently running, where the job name is `klone-container`.
Then, we'll print out that job's node without a header.
If you run this command by itself (while your `klone-container` job is actively running), you should see something like this:

```shell terminal=true
$ ssh klone-login 'squeue --user $USER \
--states RUNNING \
--name klone-container \
--Format NodeList \
--noheader '
n3120
```

The second line of this script uses `sed`, and the syntax may be different on your machine depending
on what version of `sed` you have installed. One step at a time:
- `-I ''`: this modifies the file in place, and doesn't save a backup.
- `-E`: this interprets regular expressions as modern/extended, rather than basic.
- `s"/Hostname.*/Hostname $NODE/""`: This searches for a line with `Hostname` followed by any number of any characters (`.*`), and replaces it with
`Hostname n3120` where n3120 is the node running your `klone-container` job.

If this is too much, don't worry: the end result is that you're replacing the `Hostname` with whatever node is running your `klone-container` job.
If this `sed` doesn't work, and you can't figure out how to modify it for your version of `sed`, you can just as easily
edit this file by hand, with `vim` or another text editor, and change the `Hostname` line to the correct node.

Now, let's see it in action. First, we'll make our new script executable, then we'll run it and see what it does.
A quick reminder that this only works while your 'klone-container' job is active, so if your job has timed out or you've stopped it,
you'll have to start another job. Just remember to name the job with `--job-name klone-container` (either in your `SBATCH`script or with `salloc`).

Anyway, here's what we should see:

```shell terminal=true
$ chmod +x ~/set-hyak-node.sh
$ cat ~/.ssh/klone-node-config
Host klone-node
//highlight-next-line
        Hostname n3000
        ProxyJump klone-login
$ ~/set-hyak-node.sh
$ cat ~/.ssh/klone-node-config
Host klone-node
//highlight-next-line
        Hostname n3120
        ProxyJump klone-login
```

It works: we've got the node name. Now, let's try connecting directly to the node & running our container. If you made the text file from the earlier example, this is basically what you should expect (with a different node hostname, of course):

```shell terminal=true
$ ssh klone-node
[UWNetID@n3120 ~]$ ~/launch-container.sh
Apptainer> cat /overlay.txt
It works!
Apptainer>
```

## Installing Miniconda
Let's use our `launch-container.sh` script to get into the container (in read-write mode) and install Miniconda.
We'll start by downloading the installer from the Anaconda repository:

```shell terminal=true
$ ssh klone-node
[UWNetID@n3120 ~]$ ~/launch-container.sh
Apptainer> wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

Once the installer finishes downloading, we'll tell it to install Miniconda at `/opt/miniconda` which will *only exist* in our overlay:
```shell terminal=true
Apptainer> bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/miniconda
```

To make this even more convenient, once Miniconda is installed, we'll add the overlay's `conda` to our `~/.bashrc`.
```shell terminal=true
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
```shell terminal=true
Apptainer> exit
exit
[UWNetID@n3120 ~]$ ~/launch-container.sh
Apptainer> conda
usage: conda [-h] [-V] command ...
```

:::tip Fun Fact
Even this *mini* installation of Conda, with no custom environments, takes up over 22,000 inodes! However, as far as the cluster is concerned, you've only created a single file: your overlay at `~/conda-overlay.img`.
:::

Next up, we'll create an environment and install Jupyter.

## Configuring Jupyter
This final section, while nominally about installing and conecting to a Jupyter server,
is worth understanding even if you don't intend to use Jupyter.
This is a demonstration of running services (like a Jupyter server) inside a container & connecting to them remotely.
### Installing the Jupyter software
First, we'll create a `jupyter` environment, activate it, and install the `jupyter` package.
```shell terminal=true
Apptainer> conda create --name jupyter
Apptainer> conda activate jupyter
Apptainer> conda install -y jupyter
```
### Creating our Jupyter server launch script
If you recall from the [Building a Container](container#runscript-what-the-container-does) section,
we defined a second way to start our container: `apptainer run hyak-container.sif arguments`, which attempts to run
whatever we put in `arguments`. We need script that will launch a Jupyter server for us, so that we can pass that
to the container as our argument.

This script has already been created, and you can copy it from
`/mmfs1/sw/hyak101/python` into your home directory. Let's walk through it, as it is fairly complex:

#### 1. Getting into our conda environment:

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
At the top, we have a variable that you can change if you want to run JupyterLab instead of a
Jupyter notebook server. Just change the `SERVER_TYPE` to `'lab'`.

Next is our first error check: if we're not in a container (i.e. if the environment variable `APPTAINER_NAME` isn't set),
print an error message and exit.

Then, we'll source our `~/.bashrc` to get access to the conda installation in our overlay
and activate the `jupyter` environment we created. If that `conda` command fails for any reason,
exit with an error message.

#### 2. Finding an open port:

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

#### 3. Starting the Jupyter server:

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

#### 4. Getting the Jupyter server's connection information:

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

#### 5. Keeping our launcher running:
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

All that's left is to make sure the launcher is executable:
```shell terminal=true
$ chmod +x ~/start-jupyter-server.sh
```

Phew. This section was a lot of work, but the majority of the container & connection preparation is finished.
It's time to start launching some jobs & using our container.
