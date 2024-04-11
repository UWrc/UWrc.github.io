---
id: glossary
title: Glossary
---

<a name="account" /> <br /><br /><br />

[**Account**](#account): In the context of using SLURM, "account" refers to the groups you belong to, not your UWnetID. `hyakalloc` will display accounts you can submit jobs with (i.e., under the SLURM `sbatch` directive `--account`). 

<a name="apptainer" /> <br /><br /><br />

[**Apptainer**](#apptainer): Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers.

<a name="checkpoint" /> <br /><br /><br />

[**Checkpoint partition**](#checkpoint): Abbreviated `ckpt`, represents idle resources across the cluster at any moment. All cluster users are eligible to submit jobs to this partition and they will run subject to availability. To provide some regular churn in pending checkpoint jobs, jobs running for >4 hours are re-queued (i.e., re-submitted to the checkpoint partition queue). The jobs will continue in this manner until the job exits or the requested runtime is fulfilled. For more information see [**Compute > Using Idle Resources**](https://hyak.uw.edu/docs/compute/checkpoint#the-checkpoint-partition)

<a name="Containers" /> <br /><br /><br />

[**Containers**](#port_forwarding): Containers are lightweight, isolated software environments that encapsulate an application, along with its dependencies and runtime settings. Containers are useful because they provide a consistent and reproducible way to package, distribute, and run software across different computing environments. 

<a name="gpu" /> <br /><br /><br />

[**GPU**](#gpu): Graphical Processing Unit or GPU are cards historically used for rendering video for computer screens. Over the past decade they have been repurposed for scientific workflows that rely on lots of matrix math since those operations are fundamentally the same as required to generate computer graphics. The vast majority of GPU workflows are for machine learning and artificial intelligence applications. However, there are many non-ML workflows as well. 

<a name="hpc" /> <br /><br /><br />

[**HPC**](#hpc): High-Performance Computing or HPC is the integration of multiple servers (or nodes) together through a high-bandwidth and low-latency interconnect (sometimes called fabric). Traditional HPC scientific codes are typically programmed to take advantage of simultaneously running on several nodes and passing data between them over this fabric. However, in recent years most codes rely on the increasing number of CPU cores on a single node to scale instead (so called “embarrassingly parallel” jobs) has the programming overhead to make a code multi-node can be substantial.

<a name="idle" /> <br /><br /><br />

[**Idle Resource**](#idle): A cluster resource is "idle" when it currently has no running jobs. Requested idle resources are not guaranteed. For more information see [**Compute > Using Idle Resources**](https://hyak.uw.edu/docs/compute/checkpoint).

<a name="interactive" /> <br /><br /><br />

[**Interactive Session**](#interactive): An interactive session on the cluster allows users to access a computing node in real time for tasks that require direct interaction, exploration, or debugging. Request an interactive job with the `salloc` command.

<a name="module" /> <br /><br /><br />

[**Module**](#module): Pieces of code that can be loaded or unloaded into the kernel that extend its functinality. See [**Tools & Software > Modules**](https://hyak.uw.edu/docs/tools/modules).

<a name="node" /> <br /><br /><br />

[**Node**](#node): In the HPC world, a server is synonymous with a node. 1 server = 1 node so it is OK to use those two terms interchangeably.
- **HPC Node**: A standard compute node with no additional components and variable amounts of memory at time of procurement.
- **GPU Node**: A standard node with GPU cards added in at time of procurement. GPUs are typically used for ML workflows and in rarer cases for applications that have been specifically ported over to GPUs to speed up the runtime.

<a name="Partition" /> <br /><br /><br />

[**Partition**](#partition): A partition is a logical subdivision of the HYAK cluster resources. Specifically, each partition represents a class of node. For example, the partitions on the cluster are compute, ckpt,interactive, and GPU nodes.

<a name="Port_Forwarding" /> <br /><br /><br />

[**Port Forwarding**](#port_forwarding): Port forwarding, also known as port mapping, is a networking technique that redirects network traffic from one port on a local machine to another port on a remote machine. It serves as a way to facilitate communication between devices across networks, enabling services hosted on specific ports to be accessed securely and efficiently. Instructions to set up Port Forwarding: [**Setup > SSH Port forwarding**](https://hyak.uw.edu/docs/setup/portforwarding).

<a name="queue" /> <br /><br /><br />

[**Queue**](#queue): A queue is a waiting area for jobs that have been submitted to the cluster but are not yet executing. The scheduler manages the order in which jobs are taken from the queue for execution.

<a name="scheduler" /> <br /><br /><br />

[**Scheduler**](#scheduler): The scheduler is a component or software system responsible for managing and optimizing the allocation of computing resources and tasks within a distributed computing environment. It orchestrates the execution of jobs, tasks, or processes across available resources such as CPUs, memory, and storage.

<a name="server" /> <br /><br /><br />

[**Server**](#server): The smallest physical unit of compute. Typically only the HYAK engineering team will work in terms of servers. Servers can be thought of as desktop computer equivalents that are specialized to live in a data center environment in a rack mounted form factor. These are the smallest individual units of compute that the HYAK team will source from suppliers and vendors to build the cluster.

<a name="slice" /> <br /><br /><br />

[**Slice**](#slice): The smallest logical unit of compute purchased. Typically researchers, investigators, faculty, etc. will work in terms of slices. Slices are a HYAK-specific administrative term to represent a maximum amount of compute cores, memory, and maybe GPU(s) in a unit that are purchased on behalf of a researcher. This resource slice can be divided into as many jobs among as many users associated with that group as possible to the smallest schedulable resource (e.g., 1-compute core, 1MB of memory, 1-GPU). 

<a name="slot" /> <br /><br /><br />

[**Slot**](#slot): 1 resource slice can fill 1 slot. This is a UW administration specific (at the level of HYAK sponsor) term for a unit of accounting. Tier-1 sponsors (100+slots), tier-2 (50+ slots), and self-sponsors (1+ slots) will support a certain capacity for their investigators based on a maximum number of slots. Self-sponsored slots are for individual faculty who don’t hold appointments in sponsoring entities (e.g., College of Engineering) yet are interested in being part of the cluster. For more information about slot sponsorship and annual slot support fees, see [**Pricing**](https://hyak.uw.edu/pricing). 

<a name="slurm" /> <br /><br /><br />

[**SLURM**](#slurm): The job scheduler used on HYAK. SLURM stands for **S**imple **L**inux **U**tility (for) **R**esource **M**anagement. See "Scheduler" on this page to learn what a scheduler is. See [**SLURM documentation**](https://slurm.schedmd.com/man_index.html) for help using the job scheduler.

<a name="SSH" /> <br /><br /><br />

[**SSH**](#ssh): **S**ecure **Sh**ell, commonly known as SSH, employs cryptographic techniques to establish a secure and encrypted connection between a client and a remote server via the use of SSH Keys. This technology safeguards data transmission and allows secure remote system management.

<a name="SSH_Keys" /> <br /><br /><br />

[**SSH Keys**](#ssh_keys): SSH keys are cryptographic pairs that enhance the security of Secure Shell (SSH) protocol. Each pair consists of a public key, which is shared with remote servers, and a private key, which is securely stored on your local machine. When connecting to a server, your local private key encrypts data that only the corresponding public key on the server can decrypt, enabling secure and authenticated communication without transmitting sensitive credentials over the network. 




