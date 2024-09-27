---
slug: 2024-april-maintenance
title: April 2024 Maintenance Details
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,storage,training,ckpt,checkpoint,gpu,nvidia]
---

Hello Hyak Community,

Thank you for your patience this month while there was more scheduled downtime than usual to allow for electrical reconfiguration work in the UW Tower data center. We appreciate how disruptive this work has been in recent weeks. Please keep in mind that this work by the data center team has been critical in allowing the facility to increase available power to the cluster to provide future growth capacity, which was limiting deployment of new equipment in recent months.

The Hyak team was able to use the interruption to implement the following changes:
- Increase in checkpoint (`--partition=ckpt`) runtime for GPU jobs from 4-5 hours to 8-9 hours (pre-emption for requeuing will still occur subject to cluster utilization). Please see the updated [**documentation page**](https://hyak.uw.edu/docs/compute/checkpoint) for information about using idle resources.
- The NVIDIA driver has been updated for all GPUs.

Our next scheduled maintenance will be Tuesday May 14, 2024. 

#### Training Opportunities
Follow NSF ACCESS Training and Events posting [**HERE**](https://support.access-ci.org/news/events-trainings) to find online webinars about containers, parallel computing, using GPUs, and more from HPC providers around the USA. 

Questions?
If you have any questions for us, please reach out to the team by emailing help@uw.edu with Hyak in the subject line. 
