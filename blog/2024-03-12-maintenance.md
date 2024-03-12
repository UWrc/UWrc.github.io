---
slug: 2024-march-maintenance
title: March 2024 Maintenance Details
author: Kristen Finch
author_title: HPC Staff Scientist
author_url: https://github.com/finchnsnps
author_image_url: https://avatars.githubusercontent.com/u/22206944?v=4
tags: [klone,hyak,hpc,supercomputer,storage,gpfs,training,proxyjump,vscode-server,remote-ssh]
---

Hello HYAK Users,

For our March maintenance we had some notable changes we wanted to share with the community.

### Login Node 

Over the last several months the login node has been crashing on occasion. We have been monitoring and dissecting the kernel dumps from each crash and this behavior seems to be highly correlated with VS Code `Remote-SSH` extension activity. To prevent node instability, we have upgraded the storage drivers to the latest version. If you are a **VS Code user** and connect to klone via `Remote-SSH`, we have some recommendations to help limit the possibility that your work would cause system instability on the login node. 

### Responsible Usage of VS Code Extension `Remote-SSH` 

While developing your code with connectivity to the server is a great usage of our services, connecting directly to the login node via the `Remote-SSH` extension will result in VS Code server processes running silently in the background and leading to node instability. As a reminder, *we prohibit users running processes on the login node*. 

1. Check which processes are running on the login node, especially if you have been receiving klone usage violations when you are not aware of jobs running. Look for `vscode-server` among the listed processes. 

    ```shell terminal=true
    $ ps aux | grep UWNetID
    ``` 

2. If you need to develop your code with connectivity to VS Code, use a `ProxyJump` to open a connection directly to a compute node. [Step 1 documentation.](/docs/hyak101/python/ssh) and then use the `Remote-SSH` extension to connect to that node through VS Code on your local machine, preserving the login node for the rest of the community. [Step 2 documentation.](/docs/hyak101/python/jobs#using-vscode-on-a-compute-node)

3. Lastly, VS Code’s high usage is due to it silently installing its built in features into the user's home directory `~/.vscode` on klone enabling intelligent autocomplete features. This is a well known issue, and there is a solution that involves disabling the `@builtin TypeScript` plugin from the VS Code on your local machine. [Here is a link to a blog post about the issue and the super-easy solution.](https://medium.com/good-robot/use-visual-studio-code-remote-ssh-sftp-without-crashing-your-server-a1dc2ef0936d) Disabling `@builtin TypeScript` will reduce your usage of the shared resources and avoid problems. 

In addition to the upgrade of the storage driver, we performed updates to security packages. 

### Training Opportunities

We wanted to make you aware of two training opportunities with the San Diego Supercomputer Center. If you are interested in picking up some additional skills and experience in HPC, [check this blog post](/blog/2024-sdsc-training).

### Questions?

If you have any questions for us, please reach out to the team by emailing `help@uw.edu` with Hyak in the subject line. 
