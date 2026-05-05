---
slug: 2026-may-maintenance
title: May 2026 Maintenance Update
author: Kristen Finch
author_title: Director of Research Computing Solutions
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,tillicum,security,communications,storage,hours,events,workshops,training]
---

### May Maintenance Schedule

Our monthly scheduled maintenance will take place on **Tuesday, May 12, 2026** (2nd Tuesday of the month). 

#### Scheduled Downtime: 
* **Klone: Yes - 9:00 AM-5:00 PM**
* **Tillicum: Yes - 10:30 AM-5:00 PM**

Maintenance reservations are in place. Jobs whose `--time` limit would extend into the maintenance window will not start. Adjust your jobs accordingly! Additionally, work will include login nodes, so any active SSH, `screen`, or `tmux` sessions will be closed at the start of maintenance. 

### Update: New Maintenance Communication Approach 

Starting this month, we are updating how maintenance notifications are sent: 
* **Week-out reminder - Sent to *hyak-users* and includes:** 
    * Maintenance schedule overview 
    * Announcements and events 
* **Day-before and day-of reminders:**
    * Sent separately to *klone-users* and *tillicum-users* 
    * More targeted and system-specific 
* **Maintenance complete notifications:**
    * Sent separately per system with relevant updates 

#### Why this change? 
* More targeted communication for users of each system 
* Flexibility when maintenance differs between Klone and Tillicum 
* Reduced noise for users who only rely on one system 

#### About the mailing lists: 
* *klone-users* and *tillicum-users* are **automatically managed** based on login access 
* *hyak-users* remains a [voluntary list](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) for broad announcements 

:::warning
### Important Storage Reminder for Hyak Klone

***Hyak Klone does not provide backup, persistent storage, or archival storage. All data on Klone exists as a single copy*** and is therefore vulnerable to loss due to hardware failure, filesystem issues, facility damage, or natural disasters. Users are solely responsible for transferring important results to external systems (for example, [**Kopah S3**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036083) or [**Lolo Archive**](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0036084)) during the course of their project if persistent or long-term storage is required. ***Retaining long-term or archival data on Klone is against administrative guidance.***
::: 

### Upcoming Events & Workshops
* [**Webinar: Google’s Agent Platform (formerly Gemini Vertex AI)**](https://calendar.washington.edu/sea_uwit-rc/Webinar-Googles-Agent-Platform/E202227898) - Join us on **Thursday, May 7, at 10:30am on Zoom** to discover the future of academic research with Google's Agent Platform! Learn how to deploy from 200+ foundation models, process massive literature reviews with Gemini Enterprise, and ground your AI using RAG services to eliminate hallucinations.  
* Last chance to sign up for our [**Quantum Hackathon with IBM Quantum**](https://calendar.washington.edu/sea_uwit-rc/Quantum-Hackathon-with-IBM-Quantum/E198129321) on **Thursday, May 14, from 10:00 AM–5 PM** in the UW Tower South Cafeteria. 
* [**AWS Kiro - Getting Started from Build to Operate**](https://calendar.washington.edu/sea_uwit-rc/AWS-Kiro-Getting-Started-from-Build-to-Operate/E197466618) – Join us on **Tuesday, May 19, from 10:00 AM–4 PM in CSE2/Gates Hall Room 371** for a hands-on session where you'll explore the capabilities of Kiro, an AI-powered assistant designed to accelerate software development and cloud operations. **Lunch will be provided for participants.**

Stay informed by subscribing to our [**mailing list**](https://mailman1.u.washington.edu/mailman/listinfo/hyak-users) and the [**UWIT Research Computing Events Calendar**](https://calendar.washington.edu/sea_uwit-rc). 

### Office Hours 
* **Cloud Computing Office Hours** – Every other Tuesday at 10am on Zoom. [**Check our events Calendar**](https://calendar.washington.edu/sea_uwit-rc).
* **Hyak and Tillicum Office Hours:**
    * Wednesdays at 2pm on **Zoom**. Attendees need only register once and can attend any of the occurrences with the Zoom link that will arrive via email. [**Click here to Register for Wednesday Zoom Office Hours**](https://washington.zoom.us/meeting/register/tJMpce6vrz8sEtR5miKvhsQiXANt6lBORFTu).
    * Thursdays at 2pm **in person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195).
* **Research Computing Club Office Hours** – **In person** in eScience. (address: WRF Data Science Studio, UW Physics/Astronomy Tower, 6th Floor, 3910 15th Ave NE, Seattle, WA 98195). Times may vary. [**Check our events Calendar**](https://calendar.washington.edu/sea_uwit-rc).

### External Training Opportunities
* [**From Atoms to Algorithms: GPU Acceleration of Molecular Dynamics, DFT, and QM/MM Simulations**](https://na.eventscloud.com/ereg/newreg.php?eventid=863774&) May 12, 2026, 11:00 am – 12:00 pm 
* [**National AI Workshop**](https://www.colorado.edu/rc/national-ai-workshop) June 2–3, 2026 Denver, Colorado 

Having trouble? [**Get Research Computing support**](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3).  

Happy Computing, 

Hyak Team
