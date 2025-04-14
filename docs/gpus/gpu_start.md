---
id: gpu_start
title: Start Here
---
GPUs offer significant performance enhancements for computationally intensive tasks. GPU cores are designed for parallel computating, making them a useful tool for training machine learning models, molecular dynamics simulations, and data mining. Unlike CPUs which excel at sequential tasks, GPUs can handle large numbers of simultaneous operations.

## GPU Jobs
You can view the available GPUs on Hyak with the `sinfo -s` command. To view which GPUs are available on the `ckpt` partition, use:
```
sinfo -p ckpt-all -O nodehost,cpusstate,freemem,gres,gresused -S nodehost | grep -v null
```
### GPU Jobs on Checkpoint
A GPU job can be requested from `ckpt` by specifing the type and number of GPUs to allocate with the tag `--gpus-per-node`:
```
salloc --partition=ckpt-all --gpus-per-node=2080ti:1 --mem=10G --time=2:00:00 
```
### GPU Jobs on a Specific GPU Partition
If you have a GPU partition, you can start an interactive session on a GPU node by using the following command:
```
salloc --account=account --partition=gpu-rtx6k --gpus=1 --mem=10G --time=2:00:00
# Replace the account and partition flags to match your account and partitions.
```
If you are unsure if your accounts have GPU partitions, use the `hyakalloc` command to see all of your available resources. A detailed walkthrough for requesting a GPU job can be found **[HERE](https://hyak.uw.edu/docs/hyak101/basics/jobs/#requesting-gpus-from-a-gpu-partition)**.


:::note GPU Types on Hyak
You now know how to view all GPUs supported on Hyak with the `sinfo -s` command. Additional information about each GPU is listed below:

**<ins>L40 and L40s</ins>**: 48GB of GDDR6 memory per GPU card

**<ins>A40</ins>**: 48GB of GDDR6 memory per GPU card

**<ins>2080 Ti</ins>**: 11GB of GDDR6 memory per GPU card

**<ins>Titan</ins>**: 24GB of GDDR6 memory per GPU card

**<ins>RTX6k</ins>**: 48GB of GDDR6 memory per GPU card

**<ins>A100</ins>**: 40GB of HBM2 memory per GPU card

**<ins>P100</ins>**: 16GB of HBM2 memory per GPU card

:::

The next section is aimed to provide additional context for GPUs and NVIDIA NGC containers used to train LLMs.
