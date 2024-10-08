---
slug: 2024-october-maintenance
title: October 2024 Maintenance Details
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,hours,help,tools,training,rcc]
---

Hello Hyak Community,

Our October maintenance is complete. Thank you for your patience while we make package updates to node images, ensuring the security and behavior you expect from Hyak `klone`.

The next maintenance will be **Tuesday November 12, 2024**. 

### New Tools Documentation

Our research computing interns have been hard at work adding documentation for new user tools that might help optimize your research computing. Click the links below to review the docs for these tools. 

[**Squash Fuse**](https://hyak.uw.edu/docs/tools/squashfs) - SquashFS packages multiple small files into a single read-only, compressed filesystem, reducing metadata calls and improving performance. This minimizes server load, enhancing throughput and efficiency in handling storage requests.

Use case on Hyak:
In HPC, datasets often consist of numerous small files, which can lead to performance bottlenecks due to excessive metadata operations. By utilizing SquashFS, HPC applications can significantly reduce metadata overhead, improving data access speeds and enhancing overall system performance, particularly in large-scale distributed storage systems.

[**Checkpointing with DMTCP**](https://hyak.uw.edu/docs/tools/dmtcp) - DMTCP is a tool to transparently checkpoint and restart jobs, saving it to disk to be resumed at a later time. It requires no changes to application code, allowing easy use. Using DMTCP with your code allows checkpointing at regular intervals so if your job is pre-empted or reaches the time limit, it will resume from its last checkpoint.  

Use case on Hyak:
DMTCP offers a solution for folks who would like to use Hyak's `ckpt` partitions, but have jobs that exceed the `ckpt` time limits of 5 hours for CPU-noly jobs and 8 hours for GPU-only jobs. Checkpointing with DMTCP facilitates efficient use of ckpt resources, allowing higher throughput for your jobs. 

[**Tools for Kopah Storage Users**](https://hyak.uw.edu/docs/storage/kopah) - We have installed [**Command Line Interface tools**](https://hyak.uw.edu/docs/storage/cli) like `s3cmd` and `s5cmd` on `klone` and provide insctructions for using [**Python library `boto3` for Kopah interaction and retreival**](https://hyak.uw.edu/docs/storage/boto3) to build Kopah S3 storage usage into your research computing applciations on Hyak. 

If you have any issue using these tools, please open a ticket by emailing help@uw.edu with "Hyak" in the subject line. We appreciate any feedback about how to improve ease of use for tools presented in our documentation.

### Upcoming Training

We have planned 3 Hyak-specific trainings for this Fall (more to come, stay tuned). These trainings will be held in person and will not be recorded since recorded materials are already publicly accessible. Capacity is limited, follow the links below to register today to guarantee your spot. 

[**Hyak: Containers are your friend - Monday October 28 10am - 12pm**](https://form.jotform.com/finchkn/hyak-containers-are-your-friend). 

[**Hyak: Scheduling Jobs with Slurm - Thursday November 14 10am - 12pm**](https://form.jotform.com/finchkn/hyak-scheduling-jobs-with-slurm) 

In the first hour and a half, we will go over content. The last 30 minutes will be reserved for questions.  

Location: eScience Classroom; WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor; 3910 15th Ave NE, Seattle, WA 98195

Keep an eye on your inbox for updates about additional trainings this fall. 

### Fall Office Hours

Hyak HPC Staff Scientist and Facilitator, Kristen Finch, will be holding office hours fall term. 

**Zoom office hours** will be held on Wednesdays at 2pm. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email.

[**Click here to Register for Zoom Office Hours**](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu)

**In-person office hours** will be held on Thursdays at 2pm at the eScience Institute (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195). 
[**Click here to RSVP for in-person Office Hours**](https://docs.google.com/spreadsheets/d/e/2PACX-1vTHNxjZuAIPACn6DxOL_QzKFx9CjE7036SrOhn382JnJ74v62QtJNHUQEMSg6GEd0HomFQXu8WvWP79/pubhtml).

[**Click here to visit the eScience Office Hours page to see additional eScience office hours including AI/ML, R, Earth Data, and Python**](https://escience.washington.edu/using-data-science/office-hours#office-hour-schedule) (not available to help with Homework).
 
The Research Computing Club will be holding office hours fall term. **In-person office hours** will be held at the eScience Institute (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).

| Officer        |      Date      |   Time|
| ------------- | :-----------: | -----: |
| Brenden Pelkie |   16 Oct    |  1pm |
| Nels Schimek |   23 Oct    |    ipm |
| Nels Schimek |   6 Nov    |    1pm |
| Sam Shin      | 19 Nov | 2pm |
| Teerth Mehta      | 3 Dec | 2pm |

If you would like to request 1 on 1 help, please send a ticket to **help@uw.edu** with "Hyak Office Hour" in the subject line to coordinate a meeting with Kristen.

Please don't hesitate to reach out to the Hyak team with issues and feedback by opening a tickey by emailing **help@uw.edu** with "Hyak" in the subject. 

Have a great October! 

Happy computing, 

Hyak Team
