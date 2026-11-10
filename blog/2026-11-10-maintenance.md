---
slug: 2026-november-maintenance
title: November 2026 Maintenance Update
author: Kristen Finch
author_title: Director of Research Computing Solutions
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,tillicum,kopah,globus,updates,office hours,events]
---

November is a big month for Research Computing at UW! Tillicum is celebrating its first anniversary, we've completed maintenance across our services, and we have several opportunities coming up to connect with the research computing community.

Here's what's new across Hyak Klone, Tillicum, and Kopah.

## Tillicum Celebrates Its First Anniversary!

Tillicum is celebrating its first year of supporting research and innovation at UW! In its first year, Tillicum delivered more than 1 million GPU hours, supporting over 336,000 computing jobs and 940 users across 159 research groups.

We're proud of what the UW research community has accomplished with Tillicum and look forward to another year of discovery.

[**Read more about Tillicum's first year.**](https://it.uw.edu/tillicum-supercomputer-marks-first-anniversary/)

### Celebrate Tillicum's first anniversary with us at two events this week!

**Accelerating Research Day – November 12 | 12–4 PM | HUB 214**

Accelerating Research Day features strategy sessions and a hands-on workshop sponsored by Dell Technologies and NVIDIA.

[**Learn more and register.**](https://hyak.uw.edu/accelerating-research-day)

**Research Computing Symposium – November 13 | 9 AM–5 PM | HUB 334**

The inaugural Research Computing Symposium will bring together researchers, campus partners, and industry leaders to share discoveries and strengthen collaborations. The event is sponsored by the UW Office of Research, UW eScience Institute, Research Computing Club, Dell, and Redesign. Representatives from AWS, Microsoft Azure, and Google Cloud will also participate.

[**Learn more and register.**](https://hyak.uw.edu/symposium)

## November Maintenance Complete

Maintenance is complete across Hyak Klone, Tillicum, and Kopah, and all services have been restored. Along with routine updates and improvements, we've made several changes to resource management and data security.

### Hyak Klone: Job and Storage Limit Updates

Hyak Klone has experienced unprecedented job volumes recently. To help protect cluster reliability and ensure resources remain available to the research community, we've adjusted several Slurm job limits.

**Checkpoint (ckpt) jobs:**

* Per user: Maximum 250 running jobs and 500 queued jobs (previously 500/1,000).
* Per account: Maximum 500 running jobs and 1,000 queued jobs (previously 1,000/2,000).

**All other jobs:**

* Maximum 1,000 queued jobs per user (previously 10,000).
* Maximum 20,000 jobs across the entire Klone queue.

We've also reduced the maximum job array size from 10,000 to 1,000 tasks.

These limits help us manage exceptionally high job volumes and maintain a reliable service for everyone. Job limits will remain dynamic, and we will continue monitoring cluster usage and making adjustments as necessary, prioritizing overall cluster reliability and stability.

We've also reduced the individual limit for [**scrubbed storage**](https://hyak.uw.edu/docs/systems/klone/storage#scrubbed-storage) from 10 TB to 5 TB. Please review your usage and relocate data if you are above the new limit. Users exceeding 5 TB will be unable to write additional data until their usage is below the limit.

### Tillicum: CPU Allocation and CPU-Only Jobs

As announced ahead of maintenance, we've made two changes to how CPU resources are used on Tillicum:

* **Default CPU allocation for GPU jobs:** The default allocation when requesting one GPU without specifying CPUs has been reduced from four CPUs to one CPU per GPU. Users who need additional CPUs can continue to request them explicitly.
* **CPU-only jobs:** CPU-only jobs are now available on Tillicum for workloads that don't require GPUs. These jobs will be free for the remainder of 2026, with a new rate taking effect in 2027.

These changes provide additional flexibility while encouraging efficient use of shared computing resources.

### Globus: Enhanced Security for Data Sharing

We've upgraded our Globus subscription to include a Business Associate Agreement (BAA) and High Assurance capabilities. This provides additional security controls for managing sensitive research data, including stronger authentication requirements, enforced encryption during transfers, and enhanced access controls.

Learn more about [**Globus High Assurance**](https://docs.globus.org/high-assurance/) and its [**security features**](https://docs.globus.org/security/high-assurance-overview/).

We are now maintaining both standard collections and High Assurance gateways for our Globus endpoints. If possible, please migrate your workflows to use the High Assurance gateways (identified by the green lock icon and the words "(High Assurance)").  

<img src="/img/blog/globus_HA_collections.png" alt = "Image shows the UW Hyak gateways in the Globus File Manager Search. Each collection has a standard collection and a high assurance collection marked by the words High Assurance in parentheses and a green lock icon." /> 
 
Note that guest collections cannot be transferred, and they must be re-created on the new High Assurance storage gateways (see the image above). Over the coming weeks, we'll be working with Kopah users who share data with collaborators through guest collections to transition those guest collections. Once these transitions are complete, we'll retire the standard versions of those collections. Guest collections are not enabled for Hyak Klone, Tillicum, or our OneDrive connector, so nothing further is needed to transition on those systems. 

:::warning
Globus High Assurance **does not**, by itself, confer HIPAA compliance. Hyak Klone, Tillicum, and Kopah are not HIPAA-compliant services, and this upgrade does not change their HIPAA compliance status.
:::

## Upcoming Training and Events

In addition to our anniversary celebrations, there are more opportunities to build skills and connect with the research computing community.

November 18 | 10 AM | [**NVIDIA Office Hour — Virtual**](https://calendar.washington.edu/sea_uwit-rc/NVIDIA-Office-Hours-Virtual-Training-Adapting-Generative-Models/E207642678)  
*Training & Adapting Generative Models*

## Help Shape Our Winter and Spring Trainings

We're planning our upcoming training offerings and want to hear from you! Please take a few minutes to [**complete our training interest survey**](https://forms.cloud.microsoft/r/UAebfSwWyS).

Your feedback will help us prioritize the topics and hands-on workshops most valuable to the research community.

## Holiday Support

Our Research Computing team is small but mighty, and we remain committed to providing the best support possible. As we approach the holidays, some team members will be spending time with family, and our support capacity will be reduced.

We will continue to assist users throughout the holiday season, but responses to support requests may take longer than usual. We appreciate your patience and understanding.

## Need Help?

[Get Research Computing support](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3).
