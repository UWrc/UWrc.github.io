---
title: Getting Started with Open OnDemand
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[**Open OnDemand**](https://openondemand.org/) (OOD) is a web-based portal that provides an integrated, single access point for remote HPC clusters. OOD provides a graphical user interface (GUI) as an alternative to the command line that simplifies the process of submitting jobs, managing files, launching applications, and monitoring job status.

It enables you to perform many common tasks without CLI, including:

- Managing files (upload, download, edit)
- Monitoring running jobs and resource usage
- Launching interactive jobs (e.g., Jupyter, VS Code)
- Displaying remote desktop for software graphical interfaces (e.g., MATLAB, COMSOL)

## Accessing OOD

In order to access OOD you need to have an account on the Hyak cluster. If you don't have an account, check out our documentation [**here**](https://hyak.uw.edu/docs/getting-started/account-creation).

:::info
UW VPN is required to access OOD if you are off-campus. You can find instructions on how to connect to the UW VPN [**here**](https://itconnect.uw.edu/tools-services-support/networks-connectivity/husky-onnet/installing-configuring-and-using-husky-onnet/).
:::

:::info Select your system
Klone and Tillicum have separate OOD portals with different URLs and configurations. Use the tabs below to view instructions for the system you're working on. Your selection applies to the entire page.
:::

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

Access Klone's Open OnDemand at [**https://ondemand.hyak.uw.edu/**](https://ondemand.hyak.uw.edu/). You will be prompted to log in with your UW NetID, password, and verify your identity with Duo. Once you have successfully logged in, you will be taken to Hyak's OOD dashboard.

</TabItem>
<TabItem value="tillicum" label="Tillicum">

Access Tillicum's Open OnDemand at [**https://tillicum-ood.hyak.uw.edu/**](https://tillicum-ood.hyak.uw.edu/). You will be prompted to log in with your UW NetID, password, and verify your identity with Duo.

</TabItem>
</Tabs>

## Configuring OOD

<Tabs groupId="cluster">
<TabItem value="klone" label="Klone" default>

Interactive apps bind to your home directory by default, making it difficult to navigate to other directories and possibly filling your [**home directory quota**](https://hyak.uw.edu/docs/systems/klone/storage#user-home-directory). To set up temporary storage, create a directory in a lab space or `/gscratch/scrubbed/`. Then, use:

```bash
ln -s <path_to_storage> ~
```

to create a symbolic link to the new directory. Now, apps spawned in the home directory can easily access the new storage location.

</TabItem>
<TabItem value="tillicum" label="Tillicum">

No additional configuration is required for Tillicum's OOD. Once logged in, you can begin launching interactive apps from the dashboard.

</TabItem>
</Tabs>

## Video Walkthrough (Klone)

:::tip Video available
<iframe width="560" height="315" src="https://www.youtube.com/embed/y6BzuqaxyWc?si=OHzgC8AFwPrnAO37" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

## Troubleshooting

Select the `</>` icon in the top right corner of the navbar and "Restart Web Server" to get the latest updates.
