---
id: lolo
title: Lolo Information
---

Lolo is UW's dedicated archival storage service designed for research data that needs to be retained long-term and accessed infrequently. It offers cost-effective, high-integrity storage with built-in redundancy, and is ideal for safeguarding valuable research outputs over time. 

### Key Capabilities
* Tape based using LTO-8 tape drives
* Optimized for larger, infrequently accessed files
* Fast access via SSH, ideal for files 100GB+
* Redundant storage across distinct data centers in distinct geographic zones (4545 Building UW Seattle and TierPoint Spokane, WA)
* Connected to Hyak and campus via 10Gbps network
* Compatible with scripting and automation for bulk transfers

### Example Use Cases
* Archiving project data post-publication
* Backing up HPC output from Hyak or Kopah
* Grant-compliant long-term storage
* Retention of datasets for reproducibility

### Cost

- $3.45 per TB per month
- Billed in 1TB increments
- Exempt from [<ins>**F&A**</ins>](https://uwconnect.uw.edu/it?id=kb_article_view&sysparm_article=KB0035504) costs
- New allocations under 10TB are typically provisioned same-day

If you are unsure if Lolo is right for you, use the [<ins>**Research Computing Consulting Intake Form**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=47d23c5d87bd6a50e385333e3fbb356b) to connect with the UW-IT Research Computing team for guidance on selecting the right computing service.

### Eligibility, Access, and Restrictions

- **Eligibility**: Lolo is available to UW faculty, staff, and affiliates with a valid UW NetID and appropriate worktags.
- **Requesting Access**: Eligible users can request access through the [<ins>**Lolo Archive Intake Form**</ins>](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=d307c0cadb5e73c037ae9ec6db961963).
- Lolo is **not HIPAA compliant**, it is "HIPAA aligned", which means that it offers the tools, such as unix file permissions, encryption tools like GPG, and SSH for secure transmission. It is the ***customer's sole responsibility*** to maintain their data in HIPAA compliance on Lolo, not the responsibility of UWIT.

### Storage Limits
- Not optimized for small files. Use archival formats like .tar to bundle data before upload (e.g., combine multiple small files into `.tar` or `.zip` archives before upload to comply with inode quotas). 
- The inode quota is **1,000 files per 1 TB of storage purchased**

### Support
- Subscribe to the [<ins>**Lolo-announce mailing list**</ins>](https://mailman21.u.washington.edu/mailman/listinfo/lolo-announce) for updates on outages and maintenance.
- [<ins>**Request technical help with Lolo**</ins>]([https://mailman21.u.washington.edu/mailman/listinfo/lolo-announce](https://uwconnect.uw.edu/sp?id=sc_cat_item&sys_id=9e0fe8b58718fa906f1997dd3fbb35f3))
- [<ins>**Lolo User Guide**</ins>](/docs/lolo/lolo-usage)
