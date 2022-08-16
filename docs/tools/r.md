---
id: r
title: R and Rstudio
---

R is a popular statistical programming language for data science and analytics. We rely on Apptainer (formerly Singularity) and Docker containers to deploy R and you can get a refresher on [modules](modules.md) and [containers](containers.md).

## R

We encourage users to employ the containerized versions of R instead of compiling from source and running bare-metal. We'll use Docker hub containers as that is where the most regular updates to R come from.

### User Environment

If you use a non-custom R container you'll likely want to run `install.packages()` at some point. Usually on a non-shared platform like your local setup (where you have full administrative privileges) R will install things into central paths. You don't want to do that on HYAK so you need to specify user paths.

```shell-session terminal=true
$ cat ~/.Renviron 
R_LIBS="/gscratch/scrubbed/npho/R/"
$
```

:::caution
If you plan on using multiple R versions you will want to set `R_LIBS` appropriately with each different container (i.e., R version) used so packages compiled against one version of R don't conflict with another. Using sub-folders with names matching that version of R is sufficient.
:::

You can set custom R environment variables with the `.Renviron` file. I set the `R_LIBS` environment variable to point to a folder I created in "scrubbed" as an example but you will want to use a shared lab space or other path unique to your environment.

:::info
If you set `R_LIBS` to your home directory you can quickly run out of inodes as R likes to create a lot of files. Use your lab directory instead.
:::

### Base Container

Let's say we wanted to use R-4.0.3 from Docker hub
[[www](https://hub.docker.com/_/r-base?tab=tags&page=1&ordering=last_updated)].

```bash
apptainer pull docker://r-base:4.0.3
```

Be sure to do this from a build node, you need to be routed to the internet to resolve Dockerhub so you can download and have compute resources to do the image conversion from a Docker to Apptainer container.

```shell-session terminal=true
$ module load apptainer
$ apptainer pull docker://r-base:4.0.3
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Getting image source signatures
Skipping fetch of repeat blob sha256:ecd924c7226f314c16de965258f37da4aa990c07e494be1116af512706138401
Skipping fetch of repeat blob sha256:4fec22ce03e6be2d27efb3e9a90be68b14183859abf0864518e2581aa49fb8f5
Skipping fetch of repeat blob sha256:69d900227a8f4d4d2647927b9fa8da77f0f535ca497bc771c5f8a72b0cc971df
Skipping fetch of repeat blob sha256:45c9ad96a035ae2a5bda28a6e666ed7e1bbe5d945180faafd1c2ed611473e728
Skipping fetch of repeat blob sha256:f6f2416c67056dd5c3a5948858ab4578631e13cc36ee43bd8d44dea4ec4693f7
Skipping fetch of repeat blob sha256:0079bdf52f600362737f2c00e7e7ae11458844ef1d06265caf24115be990c4ab
Copying config sha256:729e7d1e2a8b59f2e885f4c7586be463050a70c00cc06bdef306e93a5bf88922
 4.11 KiB / 4.11 KiB [======================================================] 0s
Writing manifest to image destination
Storing signatures
2021/01/10 11:41:34  info unpack layer: sha256:ecd924c7226f314c16de965258f37da4aa990c07e494be1116af512706138401
2021/01/10 11:41:37  info unpack layer: sha256:4fec22ce03e6be2d27efb3e9a90be68b14183859abf0864518e2581aa49fb8f5
2021/01/10 11:41:37  info unpack layer: sha256:69d900227a8f4d4d2647927b9fa8da77f0f535ca497bc771c5f8a72b0cc971df
2021/01/10 11:41:38  info unpack layer: sha256:45c9ad96a035ae2a5bda28a6e666ed7e1bbe5d945180faafd1c2ed611473e728
2021/01/10 11:41:38  info unpack layer: sha256:f6f2416c67056dd5c3a5948858ab4578631e13cc36ee43bd8d44dea4ec4693f7
2021/01/10 11:41:38  info unpack layer: sha256:0079bdf52f600362737f2c00e7e7ae11458844ef1d06265caf24115be990c4ab
INFO:    Creating SIF file...
INFO:    Build complete: r-base_4.0.3.sif
$
```

The command will take a minute and create the SIF file in your current directory.

```shell-session terminal=true
$ ls -alh r-base_4.0.3.sif 
474M r-base_4.0.3.sif
$
```

You can run the R binary within the container like below.

```shell-session terminal=true
$ apptainer run r-base_4.0.3.sif R

R version 4.0.3 (2020-10-10) -- "Bunny-Wunnies Freak Out"
Copyright (C) 2020 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

> library(tidyverse)
Error in library(tidyverse) : there is no package called ‘tidyverse’
> 
```

You can run `install.packages()` as you normally would if you were working with R locally and it will install all the files to whatever path you set `R_LIBS` to in the [user environment](#user-environment) instructions.

### Tidyverse Container

The most popular library for R is the Tidyverse [[www](https://www.tidyverse.org)], which includes packages like `ggplot2`, `dplyr`, and others. As you can see in the [previous section](#base-container), it doesn't exist if we use the `r-base` Docker hub container.

Your options are to: 
1. run `install.packages("tidyverse")` or
2. use a Docker container with it pre-installed.
 
Option 1, while ok, uses a lot (and I mean a lot) of inodes as well as taking a long time to compile. It's much leaner on the cluster and faster to use a pre-built container if you know you'll use the Tidyverse.

The Rocker Project [[www](https://www.rocker-project.org)] manages popular Docker containers for R, including a pre-built one with Tidyverse so you can grab the latest tagged container from Docker hub [[www](https://hub.docker.com/r/rocker/tidyverse/tags?page=1&ordering=last_updated)].

```bash
apptainer pull docker://rocker/tidyverse:4.0.1
```

Prior instructions on R [user environment](#user-environment) apply but once downloaded (the Docker to Apptainer conversion will take a few minutes), it will create a separate SIF file as shown below.

```shell-session terminal=true
$ apptainer pull docker://rocker/tidyverse:4.0.1
INFO:    Converting OCI blobs to SIF format
INFO:    Starting build...
Getting image source signatures
Skipping fetch of repeat blob sha256:a4a2a29f9ba48efd3d2075f395538b2eec56fb1bedfb7aecf5e54174446f9e2a
Skipping fetch of repeat blob sha256:127c9761dcbaa288abc58fc56437c2f2ffbe611b9f7f30e0b5b43cd348bb2094
Skipping fetch of repeat blob sha256:d13bf203e905463e64d89b14509aafa983fb8baf7c1931fe0a65652aeb6c838f
Skipping fetch of repeat blob sha256:4039240d2e0b4bcb42ccbce75bc54570e471ad81457478de35fbeef63536e9c0
Copying blob sha256:0ccb9f239bc673ecea30ef11ce2c495bbb85abdd96d675d44f60324c7c45d387
 20.56 KiB / 20.56 KiB [====================================================] 0s
Copying blob sha256:c01d69634a9de92ab364afa9d6da377ba923131a4e170c3983a9243acafb0879
 278.52 MiB / 278.52 MiB [=================================================] 11s
Copying blob sha256:d6e983dd45f0e15594336e5aabbcd004fbbb7efd8355ebd5e07f916837659fd6
 225.42 MiB / 225.42 MiB [==================================================] 9s
Copying blob sha256:0d19f4c62fe952f2cec37dbde49decc2a787df40d87eecd7a8a657c04335c20b
 190.84 KiB / 190.84 KiB [==================================================] 0s
Copying blob sha256:c4186f33a14ce3205196906179b6d17db22a3e9dfc9f34fedbb1f38bf2e715c9
 190.39 MiB / 190.39 MiB [==================================================] 7s
Copying config sha256:22b3bdc99b5be46467e695d3639022d344d0fc4daf239a6da1f6b478ed1ee695
 6.38 KiB / 6.38 KiB [======================================================] 0s
Writing manifest to image destination
Storing signatures
2021/01/10 12:28:57  info unpack layer: sha256:a4a2a29f9ba48efd3d2075f395538b2eec56fb1bedfb7aecf5e54174446f9e2a
2021/01/10 12:28:59  info unpack layer: sha256:127c9761dcbaa288abc58fc56437c2f2ffbe611b9f7f30e0b5b43cd348bb2094
2021/01/10 12:28:59  info unpack layer: sha256:d13bf203e905463e64d89b14509aafa983fb8baf7c1931fe0a65652aeb6c838f
2021/01/10 12:28:59  info unpack layer: sha256:4039240d2e0b4bcb42ccbce75bc54570e471ad81457478de35fbeef63536e9c0
2021/01/10 12:28:59  info unpack layer: sha256:0ccb9f239bc673ecea30ef11ce2c495bbb85abdd96d675d44f60324c7c45d387
2021/01/10 12:28:59  info unpack layer: sha256:c01d69634a9de92ab364afa9d6da377ba923131a4e170c3983a9243acafb0879
2021/01/10 12:29:10  info unpack layer: sha256:d6e983dd45f0e15594336e5aabbcd004fbbb7efd8355ebd5e07f916837659fd6
2021/01/10 12:29:22  info unpack layer: sha256:0d19f4c62fe952f2cec37dbde49decc2a787df40d87eecd7a8a657c04335c20b
2021/01/10 12:29:22  info unpack layer: sha256:c4186f33a14ce3205196906179b6d17db22a3e9dfc9f34fedbb1f38bf2e715c9
INFO:    Creating SIF file...
INFO:    Build complete: tidyverse_4.0.1.sif
$ ls -alh tidyverse_4.0.1.sif
675M tidyverse_4.0.1.sif
$
```

Now when you run this container's R binary you can successfully load the Tidyverse.

```shell-session terminal=true
$ apptainer run tidyverse_4.0.1.sif R

R version 4.0.1 (2020-06-06) -- "See Things Now"
Copyright (C) 2020 The R Foundation for Statistical Computing
Platform: x86_64-pc-linux-gnu (64-bit)

> library(tidyverse)
── Attaching packages ─────────────────────────────────────── tidyverse 1.3.0 ──
✔ ggplot2 3.3.2     ✔ purrr   0.3.4
✔ tibble  3.0.1     ✔ dplyr   1.0.0
✔ tidyr   1.1.0     ✔ stringr 1.4.0
✔ readr   1.3.1     ✔ forcats 0.5.0
── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
✖ dplyr::filter() masks stats::filter()
✖ dplyr::lag()    masks stats::lag()
Warning messages:
1: replacing previous import ‘vctrs::data_frame’ by ‘tibble::data_frame’ when loading ‘dplyr’ 
2: package ‘purrr’ was built under R version 4.0.3 
> 
```

Success!

### Module

We've since migrated from bare-metal R binaries compiled from source and provided as a module to leveraging containers. However, there are still some version 3 variants of R still available.

```shell-session terminal=true
$ module avail r_3 contrib/r/
----- /sw/modules-1.775/modulefiles -----
r_3.3.3  r_3.5.1  r_3.6.0  r_3.6.0+Rmpi-impi_2019  
----- /sw/modules-1.775/modulefiles -----
contrib/r/3.4.3  contrib/r/3.5.1  contrib/r/3.6.1 
```

As a reminder all "contrib" prefixed modules are user community created and maintained (i.e., not supported by the HYAK team).

## Rstudio

Rstudio is an integrated development environment (IDE) for R. It's a front-end interface, historically a desktop application but it will be delivered through your browser in this instance.

Rstudio will run in a Apptainer container on a compute node then be directed through the login node back to your local computer via port forwarding.

#### Step 1: Download Rstudio Container

First you need to get the Rocker Rstudio container. 
1. Get an interactive session (e.g., `salloc -A uwit -p ckpt`). 
2. Load Apptainer (i.e., `module load apptainer`).
3. Pull a version of Rocker Rstudio (e.g., `apptainer pull docker://rocker/rstudio:4.1.0`).

#### Step 2: Prepare SLURM Job File

You will need to get our SLURM job file [[www](https://hyak.uw.edu/files/rstudio-server.job)] which was adopted for KLONE from the tutorial by Rocker [[www](https://www.rocker-project.org/use/singularity/)]. The command below will download the file to your current directory.

```
wget https://hyak.uw.edu/files/rstudio-server.job
```

You will need to modify a few environment variables in `rstudio-server.job` related to `R`:
1. The `RSTUDIO_CWD` path, I set it to my scrubbed directory on KLONE but if you have a persitent lab folder you should use that instead. This is the folder where the container is located and downloaded to using the `apptainer pull` command above.
2. Set your `RSTUDIO_SIF` variable, this is name of the container file.
3. (Optional) Set your `R_LIBS_USER` path, I set it to my scrubbed directory on KLONE as well. Note that if you have a `R` folder in your home directory then it will supercede this other path to install R packages. Your home directory is limited and can't be expanded so you will almost certainly fill it up. The SLURM job file sets `RSTUDIO_CWD` as the default folder where all `R` packages will be installed associated with this container.

You will need to modify a few things in `rstudio-server.job` related to SLURM directives. For example, fill in your specific account and partition (check your options with `hyakalloc`). Also set your job run limits, cores (i.e., `ntasks`), memory, etc.

```
#SBATCH --account=uwit
#SBATCH --partition=compute
#SBATCH --time=02:00:00

#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --mem=20G
```

#### Step 3: Start the Rstudio Server

```shell-session terminal=true
npho@klone-login01:~ $ sbatch rstudio-server.job
Submitted batch job 177885
npho@klone-login01:~ $ 
```

If you're successful a file named `rstudio-server.job.177885` will pop up in your home directory. The suffix matches the job number you see. Check out its contents like below for instructions on how to connect to your Rstudio session.

```
npho@klone-login01:~ $ cat rstudio-server.job.177885
1. SSH tunnel from your workstation using the following command:

   ssh -N -L 8787:n3164:47101 npho@klone.hyak.uw.edu

   and point your web browser to http://localhost:8787

2. log in to RStudio Server using the following credentials:

   user: npho
   password: 410lzxMwV9EObv7aDEjm

When done using RStudio Server, terminate the job by:

1. Exit the RStudio Session ("power" button in the top right corner of the RStudio window)
2. Issue the following command on the login node:

      scancel -f 177885
npho@klone-login01:~ $ 
```

In a new terminal prompt on your laptop copy and paste the other SSH command from the SLURM output. You will get your 2FA prompt and after logging in the system will appear to hang. It's fine, leave this window open and it is your connection to the Rstudio session running on KLONE. If you are disconnected and reconnect you can resume your Rstudio session. 

To close out the Rstudio session it will either hit the job runtime limit and self-terminate or you can (preferably) manually close it out using the `scancel` command provided with the specific jobID. If this file is accidentally deleted you can always see all your running jobs with a `sacct -X` command on your active KLONE login prompt to get the jobID.

The credentials are randomly generated for each `sbatch` job but once you log in you should see an environment similar to that as below. Both your KLONE home directory and gscratch folders will be mounted.

[rstudio]: /img/docs/rstudio-singularity.png 'rstudio'

![rstudio]
