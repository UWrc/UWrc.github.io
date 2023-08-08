---
slug: 2023-august-maintenance
title: August maintenance completed
author: Michael Wanek
author_title: HPC Engineer
author_url: https://github.com/mwanek
author_image_url: https://avatars.githubusercontent.com/u/89407740?v=4
tags: [maintenance, august, apptainer]
---

August's scheduled maintenance is complete and the Hyak clusters have resumed normal operations: logins have been reenabled & jobs are already running.

This month's maintenance actions were our standard fare: node image and firmware updates. We keep our maintenance all-clear emails as brief as possible, but here's the rundown:

### Node image updates

Our compute nodes are stateless: their operating system is loaded into memory over the network, so we keep the node images as small as possible. This means that when we update the images, we're actually rebuilding them from scratch. All the operating system packages we include in our template are installed as their latest versions.

Any software on the node image *beyond* system packages is managed separately, which brings me to the only major update this month:

We upgraded Apptainer from 1.1.8 to 1.2.2. The update from 1.1 to 1.2 implements quite a few new features, modifications to default behavior, and other changes. You can read about them in the [Apptainer 1.2.0 Patch Notes](https://github.com/apptainer/apptainer/releases/tag/v1.2.0).

### Node firmware updates

Since firmware updates shouldn't impact cluster users, we normally don't even mention them. That said, this was the main part of our work today. We updated the firmware (including BIOS & BMCs) for our backend nodes, login nodes, and all 400+ compute nodes.
