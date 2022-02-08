---
slug: rocky-linux
title: OS upgrade for KLONE
author: Michael Wanek
author_title: HPC Systems Engineer
author_url: https://github.com/mwanek
author_image_url: https://avatars.githubusercontent.com/u/89407740?v=4
tags: [klone, hyak, hpc, supercomputer, features, linux, centos, rocky]
---

:::note
KLONE has a new OS, we upgraded to Rocky Linux from CentOS 8.
:::

### Background

In late 2020, while building the current-generation cluster, KLONE, our previous-generation cluster, MOX, was running CentOS 7 – which was nearing end-of-life support. We used the transition to KLONE as an opportunity to deploy CentOS 8, the world’s most popular OS in academic research computing environments. Unfortunately, around the time we were wrapping up KLONE’s software stack, the CentOS project announced [[1](https://blog.centos.org/2020/12/future-is-centos-stream/), [2](https://www.redhat.com/en/blog/centos-stream-building-innovative-future-enterprise-linux)] a transition of their own: Red Hat unilaterally terminated the development of CentOS as an open-source version of Red Hat Enterprise Linux (RHEL). CentOS would become an upstream version of RHEL – in other words, more experimental and ultimately less stable. 

<center>
	<img src="/img/blog/rocky-linux.png" alt="Rocky Linux" width="75%" />
</center>

As the dust from this announcement settled, a consensus emerged: [Rocky Linux](https://rockylinux.org), led by the initial founder of the CentOS project, Greg Kurtzer, would become the CentOS successor.

### The Transition

Fast-forward to late 2021: after our summer ‘21 launch of KLONE, and our fall ‘21 cluster capacity expansion, we were finally able to turn our attention to the CentOS to Rocky migration. And just in time, too, because CentOS 8–the operating system we deployed just months earlier–would be officially unsupported after December 21, 2021.

<center>
	<img src="/img/blog/drake-centos-rocky.jpg" alt="Drake on CentOS and Rocky" width="50%" />
</center>

Our goal was to make this OS transition as smooth and unnoticeable to our users as possible. After all, this is our mission: we take care of the tech so that you can take care of the science. Rocky, like CentOS, is intended to be a bug-for-bug, open-source version of RHEL, and with its talented, globe-spanning team of developers, we were confident that the impact of this transition would be minimal.

We began the transition with our backend during the December ‘21 maintenance: the KLONE head node, our SLURM scheduler, was successfully migrated to Rocky 8. So far so good! During our next maintenance, January ‘22, we migrated all the compute node images to Rocky. A handful of users reported code-compiling issues, which we were able to resolve, but otherwise it was uneventful. We took extra care on the final piece of the Rocky migration–the login nodes–due to their accessibility from the wider internet. And, as of today’s maintenance, we are excited and relieved to report that KLONE is now a 100% Rocky cluster! 🥳

### Summary

The HYAK team was forced to revisit a major OS migration, mere months after the initial launch of KLONE. This is highly unusual–and no small feat–but we have prevailed. We deployed a widely-supported, open-source OS with enterprise-level stability, while remaining cost-effective to the research community at the University of Washington. With this work behind us, we’ve arrived at a sustainable platform for the life of the KLONE cluster. We’re excited for the future of KLONE, and excited to redirect our time back to feature development.

We want to give a huge thank-you to our users for their patience during this migration period. Spoiler alert: Rocky won and it’s a good thing!

<center>
	<img src="/img/blog/rocky.png" alt="Rocky Wins!" width="50%" />
</center>
