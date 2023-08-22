---
slug: oss-enterprise-linux
title: The State of Enterprise Linux
author: Michael Wanek
author_title: HPC Engineer
author_url: https://github.com/mwanek
author_image_url: https://avatars.githubusercontent.com/u/89407740?v=4
tags: [linux, centos, rhel, rocky, suse, openela]
---

### Rocky Linux

Hyak uses [Rocky Linux](https://rockylinux.org/) on our compute nodes, our login nodes, and our backend nodes. We switched from CentOS to Rocky in early 2022, after Red Hat permanently ended CentOS development, and we wrote a blog post about our transition [here](https://hyak.uw.edu/blog/rocky-linux).

Operating system migrations are difficult, and we were hoping to use Rocky for as long as possible. Now—less than two years after our change—Red Hat has thrown another curveball at the open-source enterprise Linux community.

### The Latest from Red Hat

You can read the update about Red Hat source code here: [Furthering the evolution of CentOS Stream](https://www.redhat.com/en/blog/furthering-evolution-centos-stream).

Our team doesn't have any position on these changes, but we understand the implication: this may make downstream, bug-for-bug compatible Linuxes—like Rocky—more difficult to maintain.

You can read Rocky Linux's official response here: [Rocky Linux Expresses Confidence Despite Red Hat's Announcement](https://rockylinux.org/news/2023-06-22-press-release/).

The Rocky Linux team's confidence belies the significance of Red Hat's change. Red Hat's blog post—a mere 318 words—sparked collosal action. Multiple corporations, including tech giants SUSE and Oracle, joined forces to establish a collaborative trade assocation: OpenELA, the Open Enterprise Linux Association.

You can read the OpenELA annoucement here: [CIQ, Oracle and SUSE Create Open Enterprise Linux Association for a Collaborative and Open Future](https://openela.org/news/hello_world/).

### What this means for Hyak

It's too early to tell how this will impact Hyak. Rocky Linux may continue to be the de facto standard for stable, OSS Enterprise Linux. It's possible some flavor of SUSE takes the lead, like openSUSE Leap. We also need to see what will come out of OpenELA.

Our plan is for Hyak to remain on Rocky Linux: we will let you know if & when anything changes.
