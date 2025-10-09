---
id: architecture
sidebar_label: System Architecture
title: Tillicum System Architecture
---

**Tillicum** is the University of Washington’s next-generation AI-accelerated research computing platform, purpose-built for the most demanding scientific workflows in machine learning, data science, and simulation. Designed around cutting-edge NVIDIA H200 GPUs with ultra-fast NVLink 4.0 interconnect and a 400 Gbps InfiniBand network, Tillicum enables researchers to move beyond the limits of traditional HPC with transformative performance and efficiency. 

## Key Features

- **24 Dell XE9680 servers**
- **GPU Acceleration:** 192 NVIDIA H200 GPUs with 141 GB memory and ultra-high-bandwidth NVLink 4.0
- **High-Speed Networking:** 400 Gbps NDR InfiniBand for low-latency GPU communication
- **High-Performance Storage:** Shared 3 PB flash storage optimized for active, high-throughput computing
- **Common Datasets:** Curated datasets preloaded or available upon request for AI and data science workloads
- **Flexible Scheduling:** Support for interactive, batch, and multi-node workloads
- **Container Support:** Apptainer and Docker-compatible environments
- **Research Software Support:** Optimized deep learning frameworks (e.g., PyTorch, TensorFlow), MPI, CUDA, and more

<img style={{width: "300px", height: "200px"}} src="/img/systems/tillicum_2.jpg" alt="Tillicum cluster image"/>

| Component         | Details |
|-------------------|---------|
| **Cluster**       | `tillicum` |
| **Service**       | Deployed August 2025, Early Access August 28-October 6, 2025, General Availability October 15 2025 - |
| **Operating System** | Rocky 9 |
| **Compute**       | 1,536 CPU cores [Intel Emerald Rapids] |
| **Accelerators**  | 192 GPU cards (141 GB memory per GPU) [NVIDIA Hopper – H200 SXM] |
| **GPU Interconnect** | NVLink™ 4.0 (900 GB/s GPU-to-GPU bandwidth) |
| **Interconnect**  | 400 Gbps NDR InfiniBand |
| **Storage**       | ~3 PB high-performance flash storage for active computing |
| **Namesake**      | Tillicum is a word in Chinook Jargon, meaning *“the people.”* 