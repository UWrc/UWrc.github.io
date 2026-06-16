---
title: GPUs on Tillicum
---

Tillicum is built around **NVIDIA H200 SXM GPUs**, providing cutting-edge accelerated computing for AI, machine learning, data science, and scientific simulation workloads.

## Hardware Specifications

| Specification | Details |
|---------------|---------|
| **GPU Model** | NVIDIA H200 SXM (Hopper architecture) |
| **Total GPUs** | 192 across 24 nodes (8 GPUs per node) |
| **GPU Memory** | 141 GB HBM3e per GPU |
| **GPU Interconnect** | NVLink™ 4.0 (900 GB/s GPU-to-GPU bandwidth) |
| **Network Fabric** | 400 Gbps NDR InfiniBand |
| **Compute Nodes** | 24 Dell XE9680 servers |

## Resource Allocation

Each Tillicum compute node has **8 GPUs** provisioned with:
- **200 GB system RAM per GPU**
- **8 CPUs per GPU**

All jobs on Tillicum require at least 1 GPU. CPU-only jobs are not permitted.

## Requesting GPUs

Use the `--gres=gpu:<count>` flag or `-G <count>` when submitting jobs:

```bash
# Request 1 GPU for an interactive debug session
salloc --qos=debug --gres=gpu:1 --cpus-per-task=8 --mem=200G --time=00:30:00

# Request 4 GPUs for a batch job
salloc --qos=normal --gres=gpu:4 --cpus-per-task=32 --mem=800G --time=08:00:00
```

## Multi-GPU and Multi-Node Training

The NVLink 4.0 interconnect and 400 Gbps InfiniBand fabric make Tillicum well-suited for distributed training across multiple GPUs and nodes. Supported frameworks include PyTorch Distributed, DeepSpeed, and NCCL-based communication.

:::info Content Under Development
Additional guidance on multi-GPU workflows, CUDA optimization, and NVIDIA NGC container usage on Tillicum is being developed. For now, refer to the [NVIDIA NGC Catalog](https://catalog.ngc.nvidia.com/) for pre-built containers optimized for H200 GPUs.
:::
