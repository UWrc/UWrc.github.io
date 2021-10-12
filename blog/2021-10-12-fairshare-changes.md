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

In fall 2019 (almost two years ago to the day) the HYAK team received our first Turing generation GPU node. HYAK has had a modest GPU footprint in the past as far back as a decade ago with the first generation cluster (called "IKT") and its pre-Pascal generation cards. In 2015 we acquired a smaller test bed of Pascal generation GPUs for the second generation cluster (called "MOX"). There were never more than a dozen GPUs in either the IKT or MOX clusters, but the introduction of Turing GPUs marked a resurgence of interest in these accelerators among the UW research community. In the last two years, we've substantially expanded our capabilities to over 300 GPUs.

### Background

HYAK clusters work on a "condo" model: labs are able to utilize their contributed hardware on-demand as well as take advantage of idle capacity from other groups' hardware via the checkpoint (`ckpt`) partition. Your checkpoint priority — or "fairshare" in SLURM scheduler parlance — is weighted such that your fairshare is directly proportional to your lab’s contribution to the cluster. In the MOX days, GPU users tended to stay within their contributed hardware partitions and rarely made use of checkpoint. We attributed this to a mental shift: students were used to using a single resource, like a desktop computer, rather than a shared cluster of computing resources. However, with the migration to the third generation HYAK cluster (called "KLONE") and its new QoS scheduling system and the increasing comfort of students using a shared platform, GPU utilization in the checkpoint partition has increased as well. This is a good thing: we want groups to benefit from their HYAK membership in the cluster and take advantage of idle cluster resources beyond their initial hardware contributions. This is a primary tenet of our social contract with the HYAK community: as a node contributor to the cluster, you have access to idle resources of the whole cluster.

### Problem

Fairshare was simpler to calculate in the pre-GPU days because our infrastructure was homogenous: one node contributed to the cluster equaled one fairshare unit. During the last two years of exponential GPU adoption on HYAK, the fairshare calculation has not evolved: 1 HPC node was the same as 1 GPU node at 1 fairshare unit. This didn’t hold because a GPU node can cost between 4 to 8 times (or more) than a traditional HPC node. The result was that labs with GPU or other speciality (e.g., high-memory) nodes tended to have smaller fairshares compared to groups with the same dollar investment but only in traditional CPU nodes. In practice, this meant these GPU users often directly competed for resources with non-GPU jobs in the checkpoint partition on a non-level playing field.

### Solution

Taking into consideration all of this information, as well as the fact that you can request as little as 1 GPU or 1 CPU from the scheduler, we have adjusted the fairshare calculations as follows:
* **Financially**: 1 GPU card is roughly equivalent to 40 CPU cores (on a dollar basis), therefore the cost normalization is 40:1 in favor of GPUs. 
* **Scarcity**: 1 server typically holds 8 GPU cards or 40 CPU cores, therefore the scarcity normalization is 5:1 in favor of GPUs.
* Combining the financial and scarcity considerations in the points above, the final weighting is 200:1 in favor of GPUs. In other words, 1 GPU card is worth 200 times more than a single CPU core in the eyes of the scheduler and factored into your checkpoint fairshare.

### Summary

With the October monthly maintenance today we have introduced a new fairshare weighting system on the KLONE cluster's checkpoint (`ckpt`) partition that commensurately acknowledges GPU labs for their contributions to the HYAK community. This has no impact on jobs submitted to non-ckpt partitions.
