---
slug: klone-storage-update
title: An update on KLONE storage 
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [klone, hyak, hpc, supercomputer, storage, storagegate, gpfs, spectrum scale, mmfs1, gscratch]
---

:::note
KLONE has experienced exponential growth over the first year of its launch, necessitating long-standing storage ugprades to occur. The current estimate is between June and July 2022 for deployment of this hardware.
:::

The 3rd generation HYAK cluster, KLONE, launched in spring 2021 with 144 HPC nodes and 192 GPUs. In just a single year, we’ve grown to over 384 HPC nodes (a 166% increase) and 448 GPUs (a 133% increase). KLONE has more than doubled in size, and while some of this growth comes from long-standing HYAK members migrating to the new cluster, much of our increased capacity comes from hundreds of new researchers joining the HYAK community. We’ve seen existing sponsors such as the College of Engineering increase their already substantial footprints by 60%, we’ve welcomed [new sponsors such as UW Bothell, UW Tacoma, and the Puget Sound Institute](https://www.washington.edu/uwit/partnerships/partnerships-2021/hyak-supercomputer/), and seen over 1000% growth–seriously–in our new self-sponsored tier for investigators and faculty without an existing HYAK sponsor affiliation. As with any large project, during KLONE’s initial planning stages we made assumptions about our growth rate & the types of research we would be supporting: assumptions that have been shattered by our growth over the past year. It was never a question of if we would need to upgrade our support infrastructure–like storage–but when, and our rapid growth significantly accelerated our upgrade timeline.

Monitoring – and developing more monitoring for – the HYAK clusters is a central responsibility of our team. The status quo at the beginning of 2022 was to track down errant jobs or workflows when storage issues came up. In almost every instance, we were able to pinpoint the problematic job and work with the researcher to shape their code into a normal IO profile. Pausing jobs and providing best practices was sufficient to keep the storage performance solid for everyone. However, starting around the last week of March 2022, we started having trouble finding an obvious job, or even a set of jobs, impacting storage performance.

The truth is that our baseline load had shifted. Due to our tremendous growth, things researchers had previously been doing without issue were now causing problems. We also noticed an evolution of the types of research happening on KLONE. The HYAK community diversified from traditional HPC workflows (e.g., simulations) into more data-intensive areas like data science (e.g., R jobs), deep learning, and artificial intelligence research. We accelerated our discussions with storage vendors: in a few short months, an expansion went from an eventuality to an immediate and pressing need. Still, we tried several last-minute optimizations to see if we could prevent spending all that money. We are serious about our fiduciary duty, as stewards of this research platform, to provide the most value for the HYAK community with the dollars we are entrusted with. We knew a storage upgrade for KLONE would cost hundreds of thousands of dollars and we needed absolute certainty that we couldn’t engineer a way around that expense.

<center>
	<img src="/img/blog/2022-klone-storage-policy.png" alt="KLONE storage policy" width="90%" />
</center>

The storage on KLONE (i.e., `mmfs1` or `gscratch`) might pretend to be a mere folder or directory, but in truth it’s an abstraction of a highly complex system. To provide cost-effective, high-performance storage, a small high-speed NVMe "flash" layer acts both as a write buffer for the slower spinning disks–which make up the vast majority of cluster’s capacity–and as a high-speed "cache" for recently & frequently accessed small files. While presented as a single folder to the researcher, behind the scenes the storage cluster moves data between these tiers to balance performance. As seen in the figure above, when the flash layer reaches 80% capacity, a process begins to drain it by moving less frequently used files to the spinning-disk layer until the flash layer reaches 65% capacity. You might also notice that despite our precautions and monitoring, as of April 9, 2022, we were no longer able to migrate data from flash to spinning disks faster than our users were writing. This was the final deciding factor for us, and we initiated our long-standing plan to upgrade the storage for KLONE. 

This necessary investment to upgrade storage will double both the maximum input-output operations-per-second (IOPS) and throughput (storage bandwidth), providing much needed overhead for current workflows as well as accommodating future growth. We are excited for this upgrade – and are doing everything we can to expedite its deployment – but due to the sheer amount of hardware we’re purchasing, we’ve been swept up in the pandemic-induced global supply chain crunch. Our vendors have predicted that the end of July is the worst-case scenario, but that a June delivery is also possible. We will update the HYAK community as we know more. As always, we welcome any questions: if you want to speak with us about something, send an email to the HYAK team via help@uw.edu and we’ll follow up with you.

**See also:**
* [Things the HYAK team has done (and currently doing) to optimize the storage environment](https://hyak.uw.edu/blog/hyak-team-storage-optimizations/).
* [Things you as a researcher using KLONE can do to optimize your storage use](https://hyak.uw.edu/blog/klone-users-storage-optimizations).
