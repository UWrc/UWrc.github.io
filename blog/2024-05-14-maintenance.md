---
slug: 2024-may-maintenance
title: May 2024 Maintenance Details
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,mox,hyak,hpc,supercomputer,infiniband,apptainer,training]
---

Hello HYAK Community,

Thanks again for your patience with our monthly scheduled maintenance, there are some notable improvements we implemented today. 

**KLONE node image:** Over the past few weeks you may have noticed some KLONE instability. This was a result of some behind the scenes storage upgrades that inadvertently introduced wider impacts to the existing cluster automation in place. At the time, we introduced a temporary fix to get the cluster back online but with today’s maintenance we implemented a more comprehensive fix.

**Infiniband firmware:** The KLONE cluster is built on the infiniband HPC interconnect for node-to-node communication. While KLONE originally launched with the HDR generation of infiniband, we have since upgraded mid-KLONE to have a HDR-NDR hybrid interconnect. NDR infiniband is required to support the latest compute slices we offer. We updated the firmware on our NDR switches following vendor recommendations for increased stability.

**Apptainer on MOX:** Apptainer (formerly Singularity) is the root-less containerization solution we provide on both HYAK clusters. Apptainer version 1.3.1 was deployed on both KLONE and MOX. As a reminder, on KLONE Apptainer is accessed through a module and is only available on compute nodes after `module load apptainer`. On MOX, Apptainer is default software and can be accessed with Apptainer commands directly after starting an interactive job for example, `apptainer --version`. 

**Training Opportunities:** COMPLECS (San Diego Supercomputer) is hosting an Intermediate Linux Shell Scripting online workshop on Thursday May, 16 at 11:00 am Pacific Time. [**Register here**](https://na.eventscloud.com/ereg/newreg.php?eventid=780668&).

Our next scheduled maintenance will be **Tuesday June, 11, 2024**. Stay informed by joining our mailing list. [**Register here.**](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users)  

**Questions?** If you have any questions for us, please reach out to the team by emailing **help@uw.edu** with Hyak in the subject line.