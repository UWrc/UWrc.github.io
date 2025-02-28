---
id: start
title: Start Here
---
:::tip Video tutorial available
On January 31, 2025, we delivered a tutorial live. [**Follow this link to watch the live demonstration.**](https://www.youtube.com/watch?v=U_LlktlDyI4)
:::

## What is Open OnDemand?

[Open OnDemand](https://openondemand.org/) (OOD) is a web-based portal that provides an integrated, single access point for access to the Klone HPC Cluster. OOD provides a graphical user interface (GUI) as an alternative to the command line that simplifies the process of submitting jobs, managing files, launching applications, and monitoring job status. Access our implementation at [<u>https://ondemand.hyak.uw.edu/</u>](https://ondemand.hyak.uw.edu/).

## Accessing OOD

In order to access OOD you need to have an account on the Hyak cluster. If you don't have an account, check out our documentation [<u>here</u>](https://hyak.uw.edu/docs/account-creation).


:::info

If you access OOD from off campus, you will need to connect to the UW VPN. You can find instructions on how to connect to the UW VPN [<u>here</u>](https://itconnect.uw.edu/tools-services-support/networks-connectivity/husky-onnet/installing-configuring-and-using-husky-onnet/).

:::

## Configuring OOD

1. To access Hyak's Open OnDemand, open a web browser and navigate to [<u>https://ondemand.hyak.uw.edu/</u>](https://ondemand.hyak.uw.edu/). You will be prompted to log in with your UW NetID, password, and verify your identity with Duo. Once you have successfully logged in, you will be taken to our OOD dashboard.
2. Interactive apps can quickly fill up your [<u>home directory quota</u>](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory). To set up temporary storage, create a directory in a lab space or `/gscratch/scrubbed/`. Then, use `ln -s <path_to_storage> ~` to create a symbolic link to the new directory in your home directory. Now, apps spawned in the home directory can easily access the new storage location.


## Troubleshooting

1. Select the `</>` icon in the top right corner of the navbar and "Restart Web Server" to get the latest updates. 