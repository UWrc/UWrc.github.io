---
slug: 2025-july-maintenance
title: July 2025 Maintenance Update
author: Kristen Finch
author_title: Director of Research Computing Solutions
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,hours,help,tools,storage,videos]
---

During June's maintenance, we've refreshed the operating system images for both login and compute nodes including the newest version of Slurm, and we have implemented some changes critical to provisioning our new GPU system, Tillicum (launching in Fall 2025). Stay informed by subscribing to our [<ins>**mailing list**</ins>](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) and the [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). The next maintenance is scheduled for **Tuesday August 12, 2025** (AKA the 2nd Tuesday of the month).

### Notable Updates
* **Routine package updates** – images for both the login and compute nodes have been refreshed to incorporate the latest Linux OS security updates and system patches.  
* **Slurm Upgrade to version 25.05** – Slurm 25.05 introduces encrypted job communication, improved support for complex network topologies, and new features like optional TLS, job start events in Kafka, and better license request handling. While you won’t notice major changes in your day-to-day workflow, this upgrade improves security, enables more flexible job scheduling, and lays the groundwork for new features in the future. [<ins>**Learn more from Slurm's release notes**</ins>](https://slurm.schedmd.com/release_notes.html). 
* **SSHD changes** – We’ve updated some behind-the-scenes SSH settings to improve login handling. These changes help ensure account access stays consistent across Klone and Tillicum, but you won’t need to do anything differently when connecting. 

### New Training Videos
This month we uploaded several training videos to our [<ins>**YouTube Playlist**</ins>](https://www.youtube.com/playlist?list=PL-uLiqrTav1omqc7omKsLzRg2ng3nKCtj) that may be of interest: 
* **Short-Format Basics** 
    * [<ins>**Logging in**</ins>](https://youtu.be/uHMPkHqigeg)
    * [<ins>**Home directories**</ins>](https://youtu.be/h--muyCPFHs)
* **GPU in EDU Series**
    * [<ins>**Userspace Package Management and Reproducible Software Pipelines**</ins>](https://youtu.be/ejas1s2rnKk) - Chris Simmons, Cambridge Computer
    * [<ins>**Empowering Research with GPU Computing: Services & Support from UW-IT RC**</ins>](https://youtu.be/0C1-s1d_bq0) - Kristen Finch, UW-IT Research Computing
    * [<ins>**Open Source GPU Accelerated Data Science with NVIDIA RAPIDS**</ins>](https://youtu.be/ujImFQydq9U) - Melisa Alkan, NVIDIA
    * [<ins>**Computing in Curricula: Integrating High-Performance Acceleration into Ed**</ins>](https://youtu.be/86U7U-1YHt8) - Chris Simmons, Cambridge Computer
    * Please follow this link to download the PDF versions of the presentations and the datasets and Notebook presented by Melisa: [<ins>**Link to Materials**</ins>](https://drive.google.com/drive/folders/1fGzc3dde-Im_eT4H3H29BMlak_GIALw6?usp=sharing)
    * Please share your thoughts on the GPU in EDU series via our [<ins>**Short Feedback Survey**</ins>](https://forms.office.com/r/kswG3Q9hNE). Additionally, respond to the survey to let us know you are interested in Tillicum GPU Cluster early user access. Help us assess our new cluster and get some free compute time in return!
* **MEM-C REU Python Series**
    * [<ins>**Introduction to Open OnDemand and Jupyter Notebooks**</ins>](https://youtu.be/ztGz4I_EMq8)
    * Python Basics - COMING SOON
    * [<ins>**Dataframes and Arrays in Python**</ins>](https://youtu.be/e0oecJ_j87Y)
    * [<ins>**Data visualization and Plotting in Python**</ins>](https://youtu.be/lfOIbEjKZQg)
    * Linear Regression and Machine Learning - COMING SOON

### Summer Office Hours 
* Wednesdays at 2pm on **Zoom**. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email. [<ins>**Click here to Register for Zoom Office Hours**</ins>](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu).
* Thursdays at 2pm **in person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).
* See our office hours schedule, subscribe to event updates, and bookmark our [<ins>**UW-IT Research Computing Events Calendar**</ins>](https://calendar.washington.edu/sea_uwit-rc). 

If you would like to request 1 on 1 help, please send an email to <ins>**help@uw.edu**</ins> with "Hyak Office Hour" in the subject line to coordinate a meeting.

### External Training Opportunities

* **NVIDIA Workshop: Building Transformer-Based Natural Language Processing Applications** - 07/09/25 - 10:00 AM - 6:00 PM EDT Learn how to apply and fine-tune a Transformer-based Deep Learning model to Natural Language Processing (NLP) tasks. In this course, you'll: · Construct a Transformer neural network in PyTorch · Build a named-entity recognition (NER) application with BERT · Deploy the NER application with ONNX and TensorRT to a Triton inference server Upon completion, you’ll be proficient in task-agnostic applications of Transformer-based models. [<ins>**Learn More and Register**</ins>](https://events.nvidia.com/NAIRRNLPAPP).

* **COMPLECS: Intermediate Linux** - 07/10/25 - 2:00 PM - 3:30 PM EDT Knowledge of Linux is indispensable for using advanced CI. While GUIs are becoming more prevalent, being able to work at the command line interface (CLI) provides the greatest power and flexibility. In this session, we assume that participants are already comfortable with basic Linux operations such as creating, deleting and renaming files, and navigating between directories. Topics covered include the filesystem hierarchy, file permissions, symbolic and hard links, wildcards and file globbing, finding commands and files, environment variables and modules, configuration files, aliases, and history. [<ins>**Learn More and Register**</ins>](https://support.access-ci.org/events/8040).

* **Codee for Beginners: Automatic Code Optimization with Codee** - July 29, 2025, 9 - 10:30 a.m. PDT This is an introductory webinar showing how Codee’s AutoFix feature can automatically accelerate computational kernels, representing performance hotspots, on both CPUs and GPUs. With AutoFix, developers can simply instruct Codee to insert OpenMP, OpenACC, and compiler-specific directives, as well as language-specific constructs (e.g., Fortran’s “do concurrent”) to vectorize, parallelize, and offload compute-intensive loops. AutoFix can even combine optimization techniques, such as multithreading and vectorization for nested loops, or OpenACC alongside OpenMP to maximize compatibility, allowing even novice programmers to write expert-level parallel code. [<ins>**Learn More and Register**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/codee-beginners-2025).

* **NUG Community Call: A Birds-Eye View of Using Cuda with C/C++ on Perlmutter (Part 1)** - July 30, 2025, 11 a.m. - 12:30 p.m. PDT NERSC will be hosting a 2-part event series that focuses on using learning introductory GPU Programming concepts with CUDA on Perlmutter at NERSC. In this two-part training series, users will be introduced to the basics of using CUDA on Perlmutter at NERSC.  The training will focus on the basics of the Perlmutter architecture and NVIDIA GPUs, programming concepts with CUDA using C/C++. This training is also open to non-NERSC users. [<ins>**Learn More and Register**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/nug-community-calls/nug-community-call-a-birds-eye-view-of-using-cuda-with-cc-on-perlmutter-part-1).

* **Accelerating and Scaling Python for HPC** - August 8, 2025, 9 a.m. - 5 p.m. PDT In this interactive tutorial you’ll learn how to write, debug, profile, and optimize high-performance, multi-node GPU applications in Python. You'll learn and master: CuPy for drop-in GPU acceleration of NumPy workflows; Nvmath-python for high level API for integrating Python with NVIDIA math libraries; Numba for writing custom kernels that match the performance of C++ and Fortran; and mpi4py for scaling across thousands of nodes. Along the way we’ll learn how to profile our code, debug tricky kernels, and leverage foundational and domain-specific accelerated libraries. [<ins>**Learn More and Register**</ins>](https://www.nersc.gov/news-and-events/calendar-of-events/python-for-hpc-aug2025).

* **Automating Research with Globus: The Modern Research IT Platform** - Aug. 18, 2025, 9 a.m. – 12 p.m. (Pacific Time) This workshop introduces Globus Flows and its role in automating research workflows. Participants will explore data portals, science gateways, and commons, enabling seamless data discovery and access. [<ins>**Enroll here**</ins>](https://internet2.edu/cloud/cloud-learning-and-skills-sessions/automating-research-with-globus-the-modern-research-it-platform/?utm_source=CLASS+Spring+2025+Training+Campaign+-+May+2025&utm_medium=email&utm_campaign=class).

Questions about Hyak Klone, Tillicum, or any other UW-IT Research Computing Service? [<ins>**Fill out our Research Computing Consulting intake form**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=47d23c5d87bd6a50e385333e3fbb356b). We are here to help!

Happy Computing, 

Hyak Team
