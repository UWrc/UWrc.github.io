---
id: faq
title: FAQ
---


## General Hyak FAQ:
| Question | Answer |
| --- | --- |
| **What is the UW Hyak cluster?** | The UW Hyak cluster is a robust high-performance computing infrastructure available to University of Washington faculty, researchers, students, and affiliates. It offers substantial computational resources for data analysis, simulations, and scientific research. |
| **How do I access the Hyak cluster?** | Access the Hyak cluster by connecting through SSH using your UW NetID. Once you have a user account, open a Terminal/Windows Powershell/PuTTy window and use the command `ssh your_netid@hyak.washington.edu` to log in. [**Need an account?**](https://hyak.uw.edu/docs/account-creation) |
| **Are there resource limits?** | Yes, each user has resource quotas to ensure fair allocation. Familiarize yourself with your account's limits to make optimal use of the resources. |
| **Where can I find documentation and support?** | Comprehensive documentation is available on the Hyak cluster website - this website. If you encounter challenges or have queries, reach out to the Hyak support team for assistance by sending an email to help@uw.edu with hyak in the subject line. |
| **Can I transfer files to and from the cluster?** | Yes, use secure file transfer tools like `scp` (Secure Copy Protocol) or `rsync` to move files between your local machine and the cluster. |
| **Why is it that when I updated .bashrc with the path to my executable, bash still says command not found?** | When adding executables to your PATH, ensure that the directory containing the executables is specified. For example, if your executable is in a `bin` directory, you should add `export PATH=$PATH:/path/to/bin` to your `.bashrc`. Additionally, make sure to reload the `.bashrc` file using `source ~/.bashrc`. |
| **What is port forwarding, and why do I need to do it?** | Port forwarding is a networking technique that redirects incoming network traffic from one port on a router or firewall to another port on a device within a local network. Port forwarding allows you to access services hosted on specific ports of a node from external devices. |
| **How do I SSH into a node I already have a job on?** | You can SSH into a node where you have a job running by using the command: `ssh UWnetID@n####` where `n####` is the specific node's identifier. |

## Slurm FAQ:
| Question | Answer |
| --- | --- |
| **What is Slurm, and why is it important?** | Slurm (Simple Linux Utility for Resource Management) is the cluster's job scheduler. It manages job submission, resource allocation, and execution, optimizing the utilization of the cluster's computing power. |
| **Can I run interactive sessions on the cluster?** | Yes, use the `salloc` command to initiate interactive sessions on compute nodes. This allows real-time interaction and testing, useful for debugging and exploration. |
| **How do I submit jobs to the cluster?** | Submit jobs using the `sbatch` command. Jobs can be submitted using a job script detailing resource needs as sbatch directives and the commands to execute. The scheduler then manages job execution based on these specifications. [**More about scheduling jobs on Hyak.**](https://hyak.uw.edu/docs/compute/scheduling-jobs) [**More about `sbatch`.**](https://slurm.schedmd.com/sbatch.html)|
| **How can I monitor my job's progress?** | Use the `squeue -u <UWNetID>` command with your UWNetID to monitor job status. |
| **How do I optimize my job's performance?** | Optimize job performance by selecting appropriate resource configurations, efficient algorithms, and parallelization techniques. Experimentation and benchmarking can guide improvements. |
| **Can I schedule recurring jobs?** | Yes, you can schedule recurring jobs using Slurm's job arrays or by setting up cron jobs within your scripts. |
| **Why do I keep getting this sbatch error: "Batch job submission failed: Invalid account or account/partition combination specified?"** | In an sbatch script, the sbatch directive `--account` refers to the group you belong to, not your UWnetID. Ensure that the account specified in the script matches the group you are associated with. To view accounts you are associated with use the command `hyakalloc`. |
| **How do I know if my job ran?** | Familiarize yourself with `sbatch` directives `-o` and `-e`. Using these directives or flags, you can designate a file for the standard output (`stdout`) messages usually printed to the screen while your software program is running and the standard error (`stderr`) messages also printed to the screen if your software program encounters an error. Output messages showing success and empty `stderr` files indicate successful jobs. These files will write to the directory from which you launched your `sbatch` command by default, but the location of these files and their file name can be changed. For example, `sbatch -o log/mytask_%j.out` will write a file called mytask_<JobID added with %j>.out to the log directory.|
| **What is a batch job?** | A batch job is a task or process that is submitted to a batch processing system, like Slurm. Batch jobs are scheduled and executed without immediate user interaction, making them suitable for background processing and resource-intensive tasks. |
| **I scheduled my job via sbatch, but nothing happened. Why?** | It’s possible that there were no available resources to run your job right away, and it may have been placed in the queue. Try running `hyakalloc` and see if the resources you requested are currently open. You can also see if your job is in the queue by running the `squeue -u <UWNetID>` command with your UWNetID. |

## Containers/Modules/Environments FAQ:
| Question | Answer |
| --- | --- |
| **What is the difference between Apptainer and Docker?** | Docker and Apptainer are both container run time technologies with distinct purposes. Docker is versatile for various applications and development, while Apptainer focuses on creating HPC-specific containers for scientific research. Docker uses Dockerfiles and is suitable for different use cases, while Apptainer streamlines container creation for researchers and ensures compatibility and security in HPC clusters. Docker containers might require root privileges and face compatibility issues, while Apptainer emphasizes security, user isolation, and portability across environments. |
| **What is a def file?** | A "def" file, short for definition file, is used in the context of containerization to define the specifications and configuration of a container image. It typically contains instructions on how to build the image, install software, and set up the runtime environment. |
| **What is a sif file?** | A "sif" file, also known as a **S**ingularity **I**mage **F**ormat file, is a container image format used by the Apptainer (a free version of Singularity from the Linux Foundation) container run time. It encapsulates an application and its dependencies, allowing for consistent and reproducible execution across different environments. |
| **What is an "environment," such as a Conda environment?** | An environment refers to a self-contained workspace with specific software packages and dependencies. In the context of Conda, it allows you to create isolated environments with different combinations of software, preventing conflicts and ensuring consistent software behavior across projects. |
| **Why is conda saying "ERROR: File or directory already exists: /targeted/directory/"?** | When specifying a custom directory for Conda installation, ensure that the target directory doesn't already exist. Conda will create the directory and install itself there, but it will not overwrite a directory. Use a path like `/randomDir1/randomDir2/TARGET_DIRECTORY` where `TARGET_DIRECTORY` doesn't exist. |
| **Where should I put things like Conda?**| To conserve space in your home directory, it's recommended to place tools like Conda in your `gscratch` space. Some software, like conda, install hidden files and directories in your home directory where you have limited disk storage (10GB). We wrote a [**blog post about configuring conda to conserve disk stroage**](https://hyak.uw.edu/blog/conda-disk-storage).|
| **What are modules, and how do they work?** | Modules manage software dependencies. Use commands like `module load` and `module unload` to load and unload software packages, creating tailored environments for your jobs. |

## Linux FAQ 


| Question | Answer |
| --- | --- |
| **I’m totally new to Linux. What resources should I check out?** |  There are plenty of YouTube tutorials out there, but one great book that will help you get around bash is called "The Linux Command Line" by William Shotts. |
| **What’s the difference between a VM and a container?** | Virtual Machines (VMs) and containers are both technologies for isolating and running applications, but they differ in their approach. VMs emulate an entire operating system and run multiple instances on a hypervisor. Containers, on the other hand, share the host OS kernel and are lightweight, allowing for efficient and consistent sharing of an application in the exact environment every time.|
| **What is the difference between the terminal and the shell?** | The terminal is a text-based interface that allows you to interact with the operating system through commands. The shell, on the other hand, is a program that interprets and executes those commands. The terminal provides the environment in which the shell operates. |
| **What is the kernel?** | The kernel is the core component of an operating system that manages system resources, such as memory, CPU, and hardware devices. It acts as an intermediary between software applications and the hardware, providing essential services for the OS to function. |







