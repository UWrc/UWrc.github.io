---
slug: 2024-september-maintenance
title: September 2024 Maintenance Details
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,hours,help,math,amd,modules]
---

Hello Hyak Community,

Thanks again for your patience with our monthly scheduled maintenance. During this maintenance session, we were able to provide package updates to node images to ensure compliance with the latest operating system level security fixes and performance optimizations. Of note, the Nvidia GPU driver on Klone has been updated to the latest production datacenter release, version 560.35.03.

The next maintenance will be **Tuesday October 8, 2024**. 

### AMD Math libraries

In June we announced the addition of AMD Nodes and Slices to `klone` which make up our generation 2 or `g2` collection of resources. [**Click here to read more about the difference between our `g1` and `g2` resources.**](https://hyak.uw.edu/blog/g1-vs-g2) During August, we installed a new AMD compiler suite, AOCC, along with specialized math libraries like AOCL, OpenBLAS, and ScaLAPACK as `modules` to make the most of this upgade. The new modules are useful on all partitions. The AOCC and AOCL modules are particularly relevant for partitions `cpu-g2`, `cpu-g2-mem2x`, and `ckpt-g2`. These tools are designed to optimize performance on AMD processors, speeding up complex mathematical computations. Whether you're working on simulations, data analysis, or any number-crunching tasks, these libraries may help ensure you get faster, more efficient results. If you're looking to boost your workflow, it's worth exploring how these libraries can benefit your projects. Here are the names of the new modules:

```bash
aocc/4.2.0
aocl/4.2.0
openblas/0.3.28
scalapack/2.2.0
```

In our benchmarking tests, performance of these libraries was similar on `g1` and `g2` CPUs for each math library, regardless of architecture. The best library performer on AMD CPUs is AOCC+AOCL, and for Intel CPUs it’s OpenBLAS+ScaLAPACK:

<center>
	<img src="/img/blog/HPL_CPU_perf_compare.png" alt="Image displays graph indicating that the best library performer on AMD CPUs is AOCC plus AOCL, and for Intel CPUs it’s OpenBLAS plus ScaLAPACK" width="70%" />
</center>

### Fall Office Hours

Hyak HPC Staff Scientist and Facilitator, Kristen Finch, will be holding office hours fall term. Zoom office hours will be held on Wednesdays at 2pm. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email.

[**Click here to Register**](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu)

In-person office hours will be held on Thursdays at 2pm at the eScience Institute (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195). 
[**Click here to RSVP for in-person Office Hours**](https://docs.google.com/spreadsheets/d/e/2PACX-1vTHNxjZuAIPACn6DxOL_QzKFx9CjE7036SrOhn382JnJ74v62QtJNHUQEMSg6GEd0HomFQXu8WvWP79/pubhtml).

[**Click here to visit the eScience Office Hours page to see additional eScience office hours including AI/ML, R, Earth Data, and Python**](https://escience.washington.edu/using-data-science/office-hours#office-hour-schedule) (not available to help with Homework).
 
If you would like to request 1 on 1 help, please send a ticket to **help@uw.edu** with "Hyak Office Hour" in the subject line to coordinate a meeting with Kristen.

### August 2024 Training Videos 

In case you missed it, we recorded the August 2024 Wednesday training sessions and posted them on the UW-IT YouTube channel under the playlist, "Hyak Training." Here are the links: 

* [**Hyak: R and Rstudio (August 28, 2024) recording.**](https://youtu.be/rcorOJV93tY)
 
* [**Hyak: Containers are your friend (August 21, 2024) recording**](https://youtu.be/zPsvUQV_GV0)
  
* [**Hyak: Slurm and Advanced Slurm (August 14, 2024) recording**](https://youtu.be/iYM7xpRhp8I)
  
* [**Hyak Basics: Linux CLI workshop (August 7, 2024) recording**](https://youtu.be/WqGCJMQhiC0)

Keep an eye on your indox for updates about our Fall training schedule; training sessions are currently TBA. Trainings will be announced via the Hyak mailing list, [**click here to join the mailing list.**](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users)
