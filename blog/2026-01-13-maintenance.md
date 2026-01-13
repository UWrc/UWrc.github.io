---
slug: 2026-january-maintenance
title: January 2026 Maintenance Update
author: Kristen Finch
author_title: Director of Research Computing Solutions
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,tillicum,arbitor,policy,enforcement,Duo,Slurm,hours,help,events,workshops,training]
---

During this month’s scheduled maintenance window, we completed several system upgrades and routine updates across Klone and Tillicum to improve stability, performance, and security. The next maintenance is scheduled for **Tuesday, February 10, 2026** (the second Tuesday of the month).

### Notable Updates
In addition to routine image updates and security patches, we upgraded:  
* Klone login node process enforcement to [<ins>**Arbiter 3**</ins>](https://github.com/chpc-uofu/arbiter) and paused user notifications and Klone and Tillicum ([<ins>**read more below**</ins>](#login-node-usage--arbiter-enforcement-important-reminder)).
* Klone has been upgraded from cgroups v1 to cgroups v2. This upgrade shouldn't be a noticeable for most users, but in some cases memory accounting under cgroups v2 is unified and includes all file-backed page cache. This difference may make memory usage appear higher or "inflated" compared to v1 in niche cases and some specific Java-based applications.
* Slurm [<ins>**version 25.11.1**</ins>](https://slurm.schedmd.com/release_notes.html) on both clusters.
* Duo 2FA on Klone (Tillicum already up to date). This change aligns with ongoing UW security upgrades.  

:::caution Action Required
All University of Washington technology users must update Duo Mobile to version 4.85.0 or later on all registered devices by February 2, 2026. Users who cannot update their devices must register [<ins>**a platform authenticator**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0033886),  [<ins>**a new phone/tablet**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0033872), or [<ins>**request a hardware token from UWIT**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0033879). 

[<ins>**Check your device’s Duo Mobile application version**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0033889). 
:::

### Login Node Usage & Arbiter Enforcement (Important Reminder) 
**Login nodes are shared community resources intended for:**
* Transferring data 
* Navigating the filesystem 
* Editing and developing code 
* Submitting jobs to the scheduler 

As part of this maintenance, Klone was upgraded to [<ins>**Arbiter 3**</ins>](https://github.com/chpc-uofu/arbiter), a tool which automates login node monitoring and enforces usage limits to ensure stability and ensure fair access.

**Arbiter monitors resource usage on login nodes and will:**
* Slow or halt processes that exceed permitted thresholds.
* Terminate processes outright if necessary.

### Arbitor email notifications halted
Previously, users received email notifications for each offending process when Arbiter thresholds were exceeded. *We have found these notifications are not an effective way to communicate our policies.* To avoid notification fatigue, we have stopped sending these emails. 

***This does not mean enforcement has stopped.*** Arbiter continues to actively limit, halt, or kill processes on login nodes as needed. 

:::tip Be a good HPC-citizen - do not connect to a login node
Connecting directly to the login node using tools like **VS Code Remote-SSH** frequently leads to Arbiter intervention and could cause login node instability since background server processes persist beyond an active session.  

Instead, ***follow our recommended best practices*** and set up your [<ins>**ProxyJump**</ins>](https://hyak.uw.edu/docs/tools/vsc-proxy-jump) to connect your local VS Code to Klone or use the streamlined option offered by our [<ins>**Open OnDemand interactive application for VS Code**</ins>](https://hyak.uw.edu/docs/ood/vscode).  
::: 

### Winter 2026 Computing Workshops
* [<ins>**Linux Command Line Fundamentals Workshop**</ins>](https://calendar.washington.edu/sea_uwit-rc/Linux-Command-Line-Fundamentals-Workshop/E194852866) Thursday January 22 10am-12pm
* [<ins>**Using R and RStudio on Hyak Klone Workshop**</ins>](https://calendar.washington.edu/sea_uwit-rc/Using-R-and-RStudio-on-Hyak-Klone-Workshop/E194892792) Thursday February 5 10am-12pm
* [<ins>**Managing Python Environments with Conda and Jupyter**</ins>](https://calendar.washington.edu/sea_uwit-rc/Managing-Python-Environments-with-Conda-and-Jupyter/E194893518) Thursday March 5 1-3pm
* All workshop have an in person and remote attendance option. 

Stay informed by subscribing to our [<ins>**mailing list**</ins>](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) and the [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

### Office Hours 
* **Hyak and Tillicum Office Hours:**
    * Wednesdays at 2pm on **Zoom**. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email. [<ins>**Click here to Register for Wednesday Zoom Office Hours**</ins>](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu).
    * Thursdays at 2pm **in person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).
* **Winter AWS Office hours** – AWS solutions architects will be on Zoom to answer your questions and help you troubleshoot. 
    * [<ins>**Tuesday January 20, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249437)
    * [<ins>**Thursday February 12, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249438)
    * [<ins>**Thursday March 12, 2025**</ins>](https://calendar.washington.edu/sea_uwit-rc/AWS-Office-Hours-Virtual/E194249439)
* See our office hours schedule, subscribe to event updates, and bookmark our [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

### Additional Training Opportunities

* [<ins>**Applications for the eScience Winter School are due Wednesday, February 4th**</ins>](https://escience.washington.edu/data-science-learning/formal-curriculum/winter-school/). This introductory program is for students and researchers from domains such as public and global health, public policy, social sciences, social work, international relations, and business management interested in developing basic skills and knowledge of data science tools like Python, R, and Jupyter. 
* [<ins>**COMPLECS: Parallel Computing Concepts**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=859768&) 01/15/26 - 11:00am – 12:30pm 
* [<ins>**Batch Computing: Working with the Linux Scheduler**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=860471&) 02/12/26 - Time: 11:00am – 12:30pm 
* [<ins>**Architecting Reproducible Science: A Practical Path Beyond the Notebook**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=864413&) 03/10/26 - 11:00am – 12:00pm 
* [<ins>**COMPLECS: Data Transfer**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=860650&) 03/12/26 - 11:00 a.m. – 12:30 p.m. 
* [<ins>**Automate Data and Compute Management Tasks with Globus and ACCESS Resources**</ins>](https://uchicago.zoom.us/meeting/register/4zBIxj37QK-GsE2p4Qhbig#/registration) Mar 19, 2026 11:00 AM 
* [<ins>**COMPLECS: Linux Shell Scripting**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=859782&) 04/09/26 - 11:00am – 12:30pm 
* [<ins>**Fine Tuning Large Language Models (LLMs) with Domain Specific Datasets**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=863761&) 04/14/26 - 11:00am – 12:00pm 
* [<ins>**COMPLECS: Data Storage and File Systems**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=860475&) 04/30/26 - 11:00 a.m. – 12:30 p.m. 
* [<ins>**From Atoms to Algorithms: GPU Acceleration of Molecular Dynamics, DFT, and QM/MM Simulations**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=863774&) 05/12/26 - 11:00am – 12:00pm 


Having trouble? [<ins>**Get Research Computing support**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3).  

Happy Computing, 

Hyak Team
