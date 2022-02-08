---
slug: rocky-linux
title: OS upgrade for KLONE
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, features, fairshare, GPU, GPUs]
---

:::note
We have adjusted legacy fairshare-related settings to account for GPUs and large memory contributions and usage in order to help more fairly allocate checkpoint resources.
:::

### Background

As we were building the KLONE.hyak cluster in late 2020 the HYAK team used it as an opportunity to deploy on the CentOS 8 operating system (OS), the latest version at the time of the most popular OS in academic research computing environments around the world. That marked a transition from MOX.hyak which ran on CentOS 7 and was nearing end of life support. Unfortunately around the time we were wrapping up the software stack the CentOS project announced it was no longer going to be a rebuild of the RedHat OS but rather an upstream version of it [[1](https://blog.centos.org/2020/12/future-is-centos-stream/), [2](https://www.redhat.com/en/blog/centos-stream-building-innovative-future-enterprise-linux)]. This might sound like a minor distinction but upstream builds are still fragile works in progress and more likely to have software bugs that impact stability.

<center>
	<img src="/img/blog/rocky-linux.png" alt="Rocky Linux" width="50%" />
</center>

Over time a consensus emerged that [Rocky Linux](https://rockylinux.org) was the CentOS successor, even being led
by the initial founder of the CentOS project, Greg Kurtzer of HPC fame. We had a solution!

### The Transition

Once most of the work launching the KLONE.hyak cluster was complete in the summer of 2021 and things settled after further node additions for a cluster capacity expansion in the fall of 2021 we were finally able to turn our attention to the CentOS to Rocky migration. The deadline was December 21, 2021 that the support would officially be turned off on CentOS 8 we only just deployed upon months earlier so the clock was ticking but the timing still worked.

<center>
	<img src="/img/blog/drake-redhat-rocky.jpg" alt="Drake on RedHat and Rocky" width="50%" />
</center>

Our goal was to make this as opaque to the user experience as possible. After all, it’s our job to worry about the non-science stuff for you. Since Rocky was supposed to be (at first) a code-for-code rebuild of CentOS this gave us confidence there would be minimal issues. 

We started with our backend (i.e., non-user facing infrastructure) and the SLURM scheduler was the first to go at the December 2021 maintenance. So far so good! 

At the January 2022 maintenance we swapped out all the compute node images for Rocky and a small handful of users reported issues compiling code afterwards but otherwise it was uneventful. 

The last piece of the cluster are the login nodes and in some ways we do want to take care since being externally facing to the internet there is little margin for error. We are happy to report that with the February 2022 maintenance (today), KLONE.hyak is on Rocky Linux! 🥳


### Summary

The HYAK team was forced to revisit a major OS migration early on after the new KLONE.hyak cluster launch that took some of our time and focus these last three months. This is unusual and no small feat but we have prevailed. We deployed a widely supported open-source OS that has enterprise level stability but is very cost-effective to the research community at the University of Washington. With this work behind us we should be on a sustainable platform for the life of the KLONE.hyak cluster and can re-direct our energy back to more user feature development and support. 

So in conclusion, (spoiler alert) Rocky won and it’s a good thing!

<center>
	<img src="/img/blog/rocky.png" alt="Rocky Wins!" width="50%" />
</center>
