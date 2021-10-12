---
slug: fairshare-improvements
title: Fairshare improvements on KLONE
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, features, fairshare, GPU, GPUs]
---

:::note
We have adjust legacy fairshare-related settings to account for GPUs and large memory contributions and usage in order to help more fairly allocate checkpoint resources.
:::

### History

In fall 2019 (almost 2 years ago to the day) the HYAK team received our first Turing generation GPU node. HYAK has had a modest GPU footprint in the past as far back as a decade ago with the first generation cluster (called “IKT”) and its pre-Pascal generation cards. In 2015 we acquired a smaller test bed of Pascal generation GPUs for the second generation cluster (called “MOX”). There were never more than a dozen GPUs in the cluster. The introduction of Turing GPUs marked a resurgence of interest in these accelerators on campus among our research community and in the 2 years since we’ve grown to over 300 GPUs.

### Background

HYAK clusters work on a condo model where labs are able to utilize their contributed hardware on demand but then burst into a spot market of idle capacity from other groups’ contributed hardware across the cluster (called the “checkpoint” or “ckpt” partition). Your checkpoint priority or “fairshare” in SLURM scheduler parlance is weighted such that your fairshare is directly proportional to your labs’ contribution to the cluster. In the MOX days GPU users tended to stay within their contributed hardware partitions and sparingly made use of checkpoint. We attributed this to the mental shift of getting students used to the idea of using a shared cluster platform compared to their historical working equipment of individual desktop computers. However, with the migration to the third generation HYAK cluster (called “KLONE”) and its new QoS scheduling system and the increasing comfort of students using a shared platform, GPU utilization in the checkpoint partition has increased as well. This is a good thing, we want groups to benefit from being able to burst beyond their contributed capacity and get as much resource as they need. This is the value proposition of being part of the HYAK community and our social contract with our researchers.

### Problem

Fairshare was simplistic to calculate in the pre-GPU days because our infrastructure was homogenous and it was easy to associate 1 node contributed to the cluster with 1 fairshare unit. During the last 2 years of exponential GPU adoption on HYAK the fairshare calculation has not evolved, 1 HPC node was the same as 1 GPU node which was 1 fairshare unit. This didn’t hold because a GPU node can cost between 4 to 8 times (or more) what a traditional HPC node does and as a result, labs that had GPU footprints on HYAK tended to have smaller fairshares relative to their contributions. In practice, this meant that as GPU users started using the checkpoint partition more on KLONE they noticed their jobs would compete with non-GPU checkpoint jobs.

### Solution

We have adjusted the fairshare for GPUs using the following considerations, you can request jobs in as granular units as 1 GPU card and 1 CPU core from the scheduler so it’s using those units.
* **Financially**: 1 GPU card is roughly equivalent to 40 CPU cores (on a dollar basis), therefore the cost normalization is 40:1 in favor of GPUs. 
* **Scarcity**: 1 server typically holds 8 GPU cards or 40 CPU cores, therefore the scarcity normalization is 5:1 in favor of GPUs.
* Combining the financial and scarcity considerations in the points above, the final weighting is 200:1 in favor of GPUs. That is to say that 1 GPU card is worth 200 times more than a single CPU core in the eyes of the scheduler and factored into your checkpoint fairshare.

### Summary

With the October 2021 monthly maintenance today we have introduced a new fairshare weighting calculation for access to checkpoint resources on the KLONE cluster that commensurately acknowledges GPU and high-memory nodes for their contributions to the HYAK community. This has no impact on jobs submitted to non-ckpt partitions.
