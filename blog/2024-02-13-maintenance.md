---
slug: 2024-february-maintenance
title: February 2024 Maintenance Details
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, storage, gpfs, storage scale, mmfs1, gscratch, lroc, cache, l40, genoa, ada, scrubbed]
---

Hello Hyak community! We have a few notable announcements regarding this month’s maintenance. If the hyak-users mailing list e-mail didn’t fully satisfy your curiosity, hopefully this expanded version will answer any lingering questions.

### GPUs

* **Software**: The GPU driver was upgraded to the latest stable version (545.29.06). The latest CUDA 12.3.2 is also now provided as a [module](https://hyak.uw.edu/docs/tools/modules). You are also encouraged to explore the use of container (i.e., Apptainer) based workflows, which bundle various versions of CUDA with your software of interest (e.g., PyTorch) over at [NGC](https://hyak.uw.edu/docs/tools/containers#nvidia-gpu-cloud-ngc). **NOTE**: Be sure to pass the `--nv` flag to Apptainer when working with GPUs.

* **Hardware**: The Hyak team has also begun the early deployments of our first Genoa-Ada GPU nodes. These are cutting-edge NVIDIA L40-based GPUs (code named “Ada”) running on the latest AMD processors (code named “Genoa”) with 64 GPUs released to their groups two weeks ago and an additional 16 GPUs to be released later this week. These new resources are not currently part of the checkpoint partition but we will be releasing guidance on making use of idle resources here over the coming weeks directly to the [Hyak user documentation](https://hyak.uw.edu/docs/) as we receive feedback from these initial researchers.

### Storage

* **Performance Upgrade**: In recent weeks, AI/ML workloads have been increasingly stressing the primary storage on `klone` (i.e., "gscratch"). Part of this was attributed to the run up to the International Conference for Machine Learning (**ICML**) 2024 full paper deadline on [Friday, February 2](https://icml.cc/Conferences/2024/CallForPapers). However, it also reflects a broader trend in the increasing demands of data-intensive research. The IO profile was so heavy at times that our systems automation throttled the checkpoint capacity to near 0 in order to keep storage performance up and prioritize general cluster navigation and contributed resources. We have an internal tool called `iopsaver` that automatically reduces IOPS by intelligently requeuing checkpoint jobs generating the highest IOPS while concurrently limiting the number of total active checkpoint jobs until the overall storage is within its operating capacity. At times over the past few weeks you may have noticed that `iopsaver` had reduced the checkpoint job capacity to near 0 to maintain overall storage usability. 

  During today’s maintenance, we have upgraded the memory on existing storage servers so that we could enable Local Read-Only Cache ([LROC](https://www.ibm.com/docs/en/storage-scale/5.1.9?topic=administering-local-read-only-cache)) although we don’t anticipate it will be live until tomorrow. Once enabled, LROC allows the storage cluster to make use of a previously idle SSD capacity to cache frequently accessed files on this more performant storage tier medium. We expect LROC to make a big difference as during this period of the last several weeks, the majority of the recent IO bottlenecking was attributed to a high volume of read operations. As always, we will continue to monitor developments and adjust our policies and solutions accordingly to benefit the most researchers and users of Hyak.

* **Scrubbed Policy**: In the recent past this space has filled up. As a reminder, this is a free-for-all space and a communal resource for when you have data you only need to temporarily burst out into past your usual allocations from your other group affiliations. To ensure greater equity among its use, we have instituted a 10TB and 10M files limit for each user in scrubbed. This impacts <1% of users as only a handful of users were using an amount of quota from scrubbed >10TB.

### Questions?

Hopefully you found these extra details informative. If you have any questions for us, please reach out to the team by emailing help@uw.edu with Hyak somewhere in the subject or body. Thanks!
