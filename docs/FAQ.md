# FAQ 
## This section is geared for people who may be newer to Linux and/or the cluster. While some of the FAQs listed here may be rudimentary, more experienced users my find some new information here about the cluster.


### Cluster Related FAQ:
| Question | Answer |
| --- | --- |
| **What is the UW HYAK cluster?** | The UW HYAK cluster is a robust high-performance computing infrastructure available to University of Washington researchers and faculty. It offers substantial computational resources for data analysis, simulations, and scientific research. |
| **How do I access the HYAK cluster?** | Access the HYAK cluster by connecting through SSH using your UW NetID. Open your terminal and use the command `ssh your_netid@hyak.washington.edu` to log in. |
| **What is SLURM, and why is it important?** | SLURM (Simple Linux Utility for Resource Management) is the cluster's job scheduler. It manages job submission, resource allocation, and execution, optimizing the utilization of the cluster's computing power. |
| **How do I submit jobs to the cluster?** | Submit jobs using the `sbatch` command. Craft a job script detailing resource needs, commands, and settings. The scheduler then manages job execution based on these specifications. |
| **Can I run interactive sessions on the cluster?** | Yes, use the `srun` command to initiate interactive sessions on compute nodes. This allows real-time interaction and testing, useful for debugging and exploration. |
| **How can I monitor my job's progress?** | Utilize the `squeue` command to monitor job statuses, including positions in the queue, resource allocations, and execution stages. |
| **What are modules, and how do they work?** | Modules manage software dependencies. Use commands like `module load` and `module unload` to load and unload software packages, creating tailored environments for your jobs. |
| **Are there resource limits?** | Yes, each user has resource quotas to ensure fair allocation. Familiarize yourself with your account's limits to make optimal use of the resources. |
| **Where can I find documentation and support?** | Comprehensive documentation is available on the HYAK cluster website. If you encounter challenges or have queries, reach out to the HYAK support team for assistance. |
| **How do I optimize my job's performance?** | Optimize job performance by selecting appropriate resource configurations, efficient algorithms, and parallelization techniques. Experimentation and benchmarking can guide improvements. |
| **Can I transfer files to and from the cluster?** | Yes, use secure file transfer tools like `scp` (Secure Copy Protocol) or `rsync` to move files between your local machine and the cluster. |
| **Can I schedule recurring jobs?** | Yes, you can schedule recurring jobs using SLURM's job arrays or by setting up cron jobs within your scripts. |
| **How can I learn more about advanced features?** | Explore advanced features through the cluster's documentation, tutorials, and workshops offered by the HYAK team. |
| **Where should I put things like Conda?**| To conserve space in your home directory, it's recommended to place tools like Conda in your `gscratch` space.|
| **Why is it that when I updated .bashrc with the path to my executable, bash still says command not found?** | When adding executables to your PATH, ensure that the directory containing the executables is specified. For example, if your executable is in a `bin` directory, you should add `export PATH=$PATH:/path/to/bin` to your `.bashrc`. Additionally, make sure to reload the `.bashrc` file using `source ~/.bashrc`. |
| **Why is conda saying "ERROR: File or directory already exists: /targeted/directory/"?** | When specifying a custom directory for Conda installation, ensure that the target directory doesn't already exist. Conda will create the directory and install itself there. Use a path like `/randomDir1/randomDir2/TARGET_DIRECTORY` where `TARGET_DIRECTORY` doesn't exist. |
| **How do I SSH into a node I already have a job on?** | You can SSH into a node where you have a job running by using the command: `ssh netID@n####` where `n####` is the specific node's identifier. |
| **Why do I keep getting this: sbatch: error: Batch job submission failed: Invalid account or account/partition combination specified?** | In an sbatch script, the "account" parameter refers to the group you belong to, not your netID. Ensure that the account specified in the script matches the group you are associated with. |
| **How do I know if my job ran?** | After submitting a job using sbatch, you should see a file named `XXX.job.####`, where `####` represents your job number. |
| **What is port forwarding, and why do I need to do it?** | Port forwarding is a networking technique that redirects incoming network traffic from one port on a router or firewall to another port on a device within a local network. It's necessary on the cluster because nodes cannot be accessed directly from the internet. Port forwarding allows you to access services hosted on specific ports of a node from external devices. |
| **Why am I getting an error that says something like, "Invalid account or account/partition combination specified"?** | This error occurs when you specify an invalid account or partition combination in your sbatch script. Make sure the account corresponds to your group and that the partition exists. |
| **How do I send jobs to the cluster?** | You can submit jobs to the cluster using the `sbatch` command followed by the name of your job script. For example: `sbatch myjob.sh`. |
| **What is a batch job?** | A batch job is a task or process that is submitted to a batch processing system, like SLURM. Batch jobs are scheduled and executed without immediate user interaction, making them suitable for background processing and resource-intensive tasks. |
| **I’m trying to build a def file for a container and install programs on it like conda. However, it keeps quitting out and failing to build the sif file when it comes time for me to agree to terms/conditions and other things. Why?** | The process of apptainer building a sif file is non-interactive, so when you install programs like conda, which need user confirmation, the sif fails to build. To fix this you need to be downloading the sif in “silent” mode. Typically this can be fixed by adding the option “-y” to your command. However, always check the documentation for your command. |
| **I scheduled my job via sbatch, but nothing happened. Why?** | It’s possible that there were no available resources to run your job right away, and it may have been placed in the queue. Try running `hyakalloc` and see if the resources you need are currently open. You can also see if your job is in the queue by running `squeue`. |

### Linux Related FAQ for new users


| Question | Answer |
| --- | --- |
| **I’m totally new to Linux. What resources should I check out** |  There are plenty of YouTube tutorials out there, but one great book that will help you get around bash is called "The Linux Command Line" by William Shotts. It’s a great book that is easy to read. |
| **What’s the difference between a VM and a container?** | Virtual Machines (VMs) and containers are both technologies for isolating and running applications, but they differ in their approach. VMs emulate an entire operating system and run multiple instances on a hypervisor. Containers, on the other hand, share the host OS kernel and are lightweight, allowing for efficient and consistent sharing of an application in the exact environment every time.|
| **What is a def file?** | A "def" file, short for definition file, is used in the context of containerization to define the specifications and configuration of a container image. It typically contains instructions on how to build the image, install software, and set up the runtime environment. |
| **What is a sif file?** | A "sif" file, also known as a Singularity Image Format file, is a container image format used by the Singularity (now Apptainer) containerization platform. It encapsulates an application and its dependencies, allowing for consistent and reproducible execution across different environments. |
| **What is the difference between the terminal and the shell?** | The terminal is a text-based interface that allows you to interact with the operating system through commands. The shell, on the other hand, is a program that interprets and executes those commands. The terminal provides the environment in which the shell operates. |
| **What is the kernel?** | The kernel is the core component of an operating system that manages system resources, such as memory, CPU, and hardware devices. It acts as an intermediary between software applications and the hardware, providing essential services for the OS to function. |
| **What is an "environment," such as a Conda environment?** | An environment refers to a self-contained workspace with specific software packages and dependencies. In the context of Conda, it allows you to create isolated environments with different combinations of software, preventing conflicts and ensuring consistent software behavior across projects. |
| **What is the difference between Apptainer and Docker?** | Docker and Apptainer are containerization technologies with distinct purposes. Docker is versatile for various applications and development, while Apptainer focuses on creating HPC-specific containers for scientific research. Docker uses Dockerfiles and is suitable for different use cases, while Apptainer streamlines container creation for researchers and ensures compatibility and security in HPC clusters. Docker containers might require root privileges and face compatibility issues, while Apptainer emphasizes security, user isolation, and portability across environments. |





