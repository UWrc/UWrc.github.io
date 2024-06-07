---
id: start-up-seq
title: Start Up Sequence
---

Your set up is complete. Here is the inventory of the items you prepared to execute this method to connect and run Jupyter Notebook from HYAK:

| Element        | `klone` or local | Notes |
| --------------------------- | ------------------------------ | ----- |
| `hyak-container.sif`| `klone`        |container image; directly or with a symbolic link|
| `conda-overlay.img` |   `klone`          |container overlay with conda and jupyter environment; in read-write or read-only mode|
| `launch-container.sh`|   `klone`           |launches container and overlay; in read-write or read-only mode|
| `start-jupyter-server.sh`|   `klone`          | starts jupyter |
| `jupyter-server.job`|   `klone`          | `sbatch` script that launches the container-overlay and jupyter as a SLURM job |
|`~/.ssh/config`|   local          | creates `ssh klone-login` short cut |
|`~/.ssh/klone-node-config`|   local           | creates `ssh klone-node` short cut for ProxyJump|
|`set-hyak-node.sh`|   local          | replaces Hostname in `~/.ssh/klone-node-config` for convenience|
|`start-jupyter-forwarding.sh`|   local         | starts port forwarding and provides web address for Jupyter Notebook|


:::important
Before we begin the Start Up Sequence, make sure that you have no jobs called `klone-container` running on `klone`. If you do, you can cancel those jobs with:

```bash
scancel --name klone-container
```
:::

Now we begin the Start Up Sequence: 

### 1. Login to klone

Log in using your `klone-login` short cut. 

```bash
ssh klone-login
```

### 2. Navigate to your working directory

Change directory to the directory you have been using during this tutorial, where you have your materials stored. For example:

```bash
cd /gscratch/scrubbed/working-directory
```

### 3. Start the Jupyter SLURM job

Submit the `jupyter-server.job` script with `sbatch` to start a job running the container-overlay and jupyter.

```bash
sbatch jupyter-server.job
Submitted batch job 12345678
```

Use the `watch` command with the `squeue` command to monitor the job in real time. `watch -n10` will issue the `squeue` every 10 seconds. Use `Ctrl` + `C` to exit the `watch` command.

```bash
watch -n10 squeue --user $USER
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
          12345678      ckpt klone-container UWNetID  R      00:01      1 n3219
# use Ctrl + C to exit the watch command
```

Once the job is running, or you see `R` under the column `ST` using `squeue`, use `Ctrl` + `C` to exit the `watch` command.

In your working directory, you will have a file called `jupyter-server-XXXXXX.out` where the X's are the jobID assigned to the job by SLURM. Use the command `tail --follow` to print the contents of the `jupyter-server-XXXXXX.out` file and wait for the message, "Info: Jupyter server is running, port & token in ~/.jupyter-port-and-token." Once you see this message, your Jupyter server session is ready for the next step. (Use `Ctrl` + `C` to exit the `tail` command)

```bash
tail --follow jupyter-server-12345678.out
//highlight-next-line
Info: Jupyter server is running, port & token in ~/.jupyter-port-and-token
# Use Ctrl + C to exit the tail command
```

### 4. Prepare your ProxyJump to the compute node

:::caution
**The next steps are performed on your local computer.**
:::

Above we used `squeue` to monitor the job we started. The `NODELIST` column of the `squeue` output shows the node where the job is running. **This is the Hostname for our `~/.ssh/klone-node-config` script.**

Let's try to execute the `set-hyak-node.sh` script and see if it will replace our Hostname with `n3219` where the job is running (the compute node will likely be different for you; `n3219` is just an example).

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
        Hostname n3219
        ProxyJump klone-login
```

If it didn't work, please use a text editor to manually change Hostname to the node where your job is running. 

### 5. Start Port Forwarding

:::caution
**The next steps are performed on your local computer.**
:::

Execute the `start-jupyter-forwarding.sh` script to get the web address to use Jupyter Notebook in the browser. 

```bash
./start-jupyter-forwarding.sh

Connect to:
  http://localhost:8888/?token=7e5c7a539a01some346235long38472398625token2392386
Close tunnel with:
  kill 99999

```

Copy and paste the web address into your browser, and you should be connected to your Jupyter server where you can work in a Jupyter Notebook.

When you're finished, you can use the kill command we generated to ensure your port forwarding is stopped:

```bash
kill 99999
```
