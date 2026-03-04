---
id: start
title: Start Here
---
:::tip Video available
<iframe width="560" height="315" src="https://www.youtube.com/embed/U_LlktlDyI4?si=g3BIgH2YnI0mvVS0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
:::

## What is Open OnDemand?

[**Open OnDemand**](https://openondemand.org/) (OOD) is a web-based portal that provides an integrated, single access point for access to the Klone HPC Cluster. OOD provides a graphical user interface (GUI) as an alternative to the command line that simplifies the process of submitting jobs, managing files, launching applications, and monitoring job status. Access our implementation at [**https://ondemand.hyak.uw.edu/**](https://ondemand.hyak.uw.edu/).

## Accessing OOD

In order to access OOD you need to have an account on the Hyak cluster. If you don't have an account, check out our documentation [**here**](https://hyak.uw.edu/docs/account-creation).


:::info

If you access OOD from off campus, you will need to connect to the UW VPN. You can find instructions on how to connect to the UW VPN [**here**](https://itconnect.uw.edu/tools-services-support/networks-connectivity/husky-onnet/installing-configuring-and-using-husky-onnet/).

:::

## Configuring OOD

1. To access Hyak's Open OnDemand, open a web browser and navigate to [**https://ondemand.hyak.uw.edu/**](https://ondemand.hyak.uw.edu/). You will be prompted to log in with your UW NetID, password, and verify your identity with Duo. Once you have successfully logged in, you will be taken to Hyak's OOD dashboard.
2. Interactive apps bind to your home directory by default, making it difficult to navigate to other directories and possibly filling your [**home directory quota**](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory). To set up temporary storage, create a directory in a lab space or `/gscratch/scrubbed/`. Then, use 
```js
ln -s <path_to_storage> ~
``` 
to create a symbolic link to the new directory. Now, apps spawned in the home directory can easily access the new storage location.


## Troubleshooting

1. Select the `</>` icon in the top right corner of the navbar and "Restart Web Server" to get the latest updates. 