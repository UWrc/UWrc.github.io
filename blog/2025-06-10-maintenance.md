---
slug: 2025-june-maintenance
title: June 2025 Maintenance Update
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,hours,help,tools,stroage,videos]
---

During June's maintenance, we've refreshed the operating system images for both login and compute nodes, and we've responded to user feedback with a solution to make Cron jobs persistent. Good news: we are holding office hours all summer to support your research grind. Stay informed by subscribing to our [<ins>**mailing list**</ins>](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) and the [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). The next maintenance is scheduled for **Tuesday July 8, 2025** (AKA the 2nd Tuesday of the month).

### Notable Updates
* **Routine package updates** - images for both the login and compute nodes have been refreshed to incorporate the latest Linux OS security updates and system patches.  
* **Slurm database lock timeout** settings adjusted to match documentation best practices. 
* **Cron job system improvements** – our users provided feedback that their Cron jobs were being lost after monthly maintenance. We resolve this:  
	* User crontabs moved to GPFS (/gscratch) for persistence across maintenance 
	* Only one login node will now run user cron jobs (preventing duplication) 
	* Users will need to **re-create their crontabs** one more time after this maintenance 
	* This is intended to be a **permanent fix**—no more resets in future maintenance 
	* FYI - *Cron jobs* are recurring scheduled tasks run by the system using each user's `crontab`. 
	* We recommend `scrontab` for routine operations. [<ins>**Learn more from Slurm**</ins>](https://slurm.schedmd.com/scrontab.html). [<ins>**Learn more from NERSC**</ins>](https://docs.nersc.gov/jobs/workflow/scrontab/).  

### Action Required: Research Computing Club (stf account) Members 
To <ins>***keep your access to RCC-supported Hyak accounts***</ins>, please fill out the following form by <ins>***Friday, June 13, 2025***</ins>: 

[<ins>**2025 RCC Usage Check-In Form**</ins>](https://forms.office.com/r/z48tU08YQU)

This short form is required for Student Technology Fee reporting and ensures the RCC can continue offering free computing resources to UW students. It only takes a few minutes, just tell us how you’ve used RCC resources this past year. Thanks for helping us keep RCC resources funded and accessible! 

### Spotlight: Kopah Object Storage 
Our Kopah S3-compatible storage service is available to all campus researchers and staff. It’s a flexible, scalable storage solution to complement your research computing portfolio.  

If you missed our recent Data Storage Day on May 5, we’ve published the full set of demonstration videos on our [<ins>**YouTube Playlist**</ins>](https://www.youtube.com/playlist?list=PL-uLiqrTav1omqc7omKsLzRg2ng3nKCtj). Topics covered and relevant links: 

* [<ins>**Introduction to Kopah: What It Is and Why It Matters**</ins>](https://youtu.be/9UyGFIN_kn8)
    * [<ins>**Kopah documentation**</ins>](https://hyak.uw.edu/docs/storage/kopah/)
* [<ins>**Kopah Eligibility and Access**</ins>](https://youtu.be/lPdiV2SkIGw)
    * [<ins>**Kopah Service Catalog and Link to Cost Calculator**</ins>](https://uw.service-now.com/it?id=sc_entry&amp;sys_id=f617c851935e565086a27b847aba1018&amp;sysparm_category=d103f865dba2bf40d6a77a8eaf9619b2)
* [<ins>**Working with s3cmd and s5cmd**</ins>](https://youtu.be/xT2RcNrvTPw)
    * [<ins>**s3/s5cmd walk though**</ins>](https://hyak.uw.edu/docs/storage/cli)
* [<ins>**Using Globus with Kopah**</ins>](https://youtu.be/bheKdLOvSs4)
    * [<ins>**Globus instructions**</ins>](https://hyak.uw.edu/docs/storage/gui)
* [<ins>**Mounting Kopah with JuiceFS**</ins>](https://youtu.be/0Bsk9-Bpp0c)
    * [<ins>**JuiceFS info**</ins>](https://hyak.uw.edu/docs/storage/juicefs)
* [<ins>**Accessing Kopah with Python and boto3**</ins>](https://youtu.be/yBgZAU_qyRg)
    * [<ins>**Boto3 guide**</ins>](https://hyak.uw.edu/docs/storage/boto3)

Whether you're just getting started or looking to expand your use of campus storage resources, this is a great place to learn more. 

### Summer Office Hours 
* Wednesdays at 2pm on **Zoom**. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email. [<ins>**Click here to Register for Zoom Office Hours**</ins>](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu).
* Thursdays at 2pm **in person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).
* See our office hours schedule, subscribe to event updates, and bookmark our [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

If you would like to request 1 on 1 help, please send an email to <ins>**help@uw.edu**</ins> with "Hyak Office Hour" in the subject line to coordinate a meeting.

### Opportunities

#### Computing Training from [<ins>**eScience**</ins>](https://escience.washington.edu/) and more

<img src="/img/logos/escience-logo-768x193.png" alt="eScience logo." width="400"/>

**Introduction to Text Mining** - Friday, June 27, 2025, 2 – 3 p.m. Open Scholarship Commons Presentation Space, 	
Discover the power of text mining in this interactive workshop, where you will learn techniques for collecting, cleaning, and analyzing textual data through hands-on exercises using Python and Jupyter Notebooks. In this session, you will:
Learn methods for scraping and extracting text from web sources.
* Gain skills in preprocessing textual data, such as removing HTML tags, tokenization, and handling stop words.
* Explore techniques for visualizing and analyzing word frequencies to uncover hidden themes and trends.
* Use deep learning models to identify relevant text by analyzing semantic similarity.
* [<ins>**Register here**</ins>](https://artsci.washington.edu/news/events?_gl=1*xft39z*_ga*NjEyOTczOTkxLjE3MzY1NDg1NTg.*_ga_3T65WK0BM8*czE3NDg5ODU2ODckbzg0JGcxJHQxNzQ4OTg1OTc5JGo2MCRsMCRoMA..*_gcl_au*ODExMjgwMzkuMTc0NDM5NjY4NQ..*_ga_JLHM9WH4JV*czE3NDg5ODU2ODckbzg0JGcxJHQxNzQ4OTg1OTc5JGo2MCRsMCRoMA&trumbaEmbed=view%3Devent%26eventid%3D182996705)

#### External Training Opportunities

* **COMPLECS: Code Migration** - Thursday, June 12, 2025 - 11:00 a.m. – 12:30 p.m. (Pacific Time) We will cover typical approaches to moving your computations to HPC resources: using applications/software packages already available on the system through Linux environment modules; compiling code from source with information on compilers, libraries, and optimization flags to use; setting up Python and R environments; using conda-based environments; managing workflows; and using containerized solutions via Singularity. [<ins>**Register here!**</ins>](https://na.eventscloud.com/ereg/newreg.php?eventid=834402&)
* **Automating Research with Globus: The Modern Research IT Platform** - Aug. 18, 2025, 9 a.m. – 12 p.m. (Pacific Time) This workshop introduces Globus Flows and its role in automating research workflows. Participants will explore data portals, science gateways, and commons, enabling seamless data discovery and access. [<ins>**Enroll here**</ins>](https://internet2.edu/cloud/cloud-learning-and-skills-sessions/automating-research-with-globus-the-modern-research-it-platform/?utm_source=CLASS+Spring+2025+Training+Campaign+-+May+2025&utm_medium=email&utm_campaign=class).
* **HPC Fundamentals**: June 11, 9 am – 4 pm PDT & June 12, 9 am – 12 pm PDT - This 1.5-day hybrid training, provided in collaboration with HPC Carpentries, is for novice HPC users to learn the basic skills they will need to start using an HPC resource. Capacity is limited to 40 learners; application and registration are required. [<ins>**Register here**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/hpc-fundamentals-jun2025).
* **OLCF Julia for Science**: June 19, 10 am – 1 pm PDT; also June 26, 10 am – 1 pm PDT - The Oak Ridge Leadership Computing Facility (OLCF), in conjunction with the Oak Ridge National Laboratory Computer Science and Mathematics Division (CSMD), will host Julia for Science, a 3-hour tutorial focused on introductory aspects of the Julia programming language, and ecosystem for computation and data analysis. This training provides a hands-on way to learn more about using Julia and parallel code in scientific computing. [<ins>**Register here**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/olcf-julia-for-science-2025).
* **Crash Course in Supercomputing**: June 23, 9 am – 4 pm PDT - In this course, students will learn to write parallel programs that can be run on a supercomputer. We begin by discussing the concepts of parallelization before introducing MPI and OpenMP, the two leading parallel programming libraries. Finally, the students will put together all the concepts from the class by programming, compiling, and running a parallel code on one of the NERSC supercomputers. Training accounts will be provided for students who have not yet set up a NERSC account. This hybrid training, as part of the 2025 Berkeley Lab Computational Sciences Summer Student Program, is also open to NERSC, ALCF, LANL, OLCF, and TACC users. This training is geared towards novice parallel programmers. [<ins>**Register here**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/hpc-crash-course-jun2025).

If you have any questions about using Hyak, please start a help request by emailing <ins>**help@uw.edu**</ins> with "Hyak" in the subject line. 

Happy Computing, 

Hyak Team
