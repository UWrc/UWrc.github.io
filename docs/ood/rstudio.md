---
id: rstudio
title: Rstudio
---

R is a language used for statistical computing and data analysis. For ease of use, R can be used via Rstudio, an integrated development environment (IDE) that supports both R and Python languages. For more information, refer to the documentation pages for **[R](https://www.r-project.org/about.html)** and **[Rstudio](https://docs.posit.co/ide/user/)**. The following section will provide a walkthrough for using R and Rstudio on Hyak via Open Ondemand (OOD).

## Rstudio Interactive App

To access the Rstudio interactive app, navigate to the OOD portal **[HERE](https://ondemand.hyak.uw.edu/pun/sys/dashboard)** and select Rstudio from the drop down menu of interactive apps from the dashboard at the top of the page. 

![](/img/docs/ood/rstudio-interactive-app.JPG 'Sample Rstudio form on Hyak's OOD.')
Once you click Launch, you should see your job under the "My Interactive Sessions" tab. It may take some time for your job to move through the queue depending on the amount of resources requested. Once your job has the requested resources, you will be able to connect to the Rstudio server:

![](/img/docs/ood/rstudio-connect.JPG 'Connecting to the Rstudio server on Hyak's OOD.')

![](/img/docs/ood/rstudio-interactive-session.JPG 'Sample Rstudio interface on Hyak's OOD.')

## Custom R Containers

The `install.packages()` command can be used to install most packages during your Rstudio interactive session as long as the container has all the dependencies required by the package. Using the `install.packages()` command, the package library along with all of its dependencies will be installed in the directory specified with the User R Library path (R_LIBS_USER) field. This path defines the library location where R stores packages. If your container environment is properly set up, `install.packages()` will run without issues.

Some packages may require changes to the operating system. To install these packages, you will need to build a custom container. Because R is open source and the dependencies are constantly changing, using custom R containers will help maintain the R version and all dependencies in an isolated environment. This way, you can maintain access to tools you rely on if packages and versions become unsupported. Because R can take up a large amount of file storage, containers are also useful for reducing your storage usage. The following section will provide a walkthrough of building a custom container to run R in.

To start off, create a definition file to build your container. This may look something like the following:

```bash
Bootstrap: docker
From: rocker/tidyverse

%post
    # Update Ubuntu packages
    apt-get update -y

    # Installing Ubuntu system libraries
    # Listed below are common examples of Ubuntu OS libraries that may be missing
    apt-get install -y libglpk40
    apt-get install -y \
        libxml2 \
        libxt6 \
        zlib1g-dev \
        libbz2-dev \
        liblzma-dev \
        libpcre3-dev \
        libicu-dev \
        libjpeg-dev \
        libpng-dev \
        libxml2-dev \
        libglpk-dev \
        libz-dev

    # Installing CRAN packages via Rscript into the container
    Rscript -e 'install.packages("RColorBrewer")'
    
    # Installing Bioconductor packages
    # The BiocManager package is required to install Bioconductor packages
    if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
    BiocManager::install(version = "3.20")

    # You can now install any Bioconductor packages using BiocManager
    Rscript -e 'BiocManager::install("regioneR")'
    Rscript -e 'BiocManager::install("regioneReloaded")'


```
:::note
The above example serves as a template and should be edited to fit your R environment needs.
:::

Once your definition file is created, you can build the container:
```
apptainer build customR.sif customR.def
```
:::note Specifying an R version
In this example, the latest version of `rocker/tidyverse` is being pulled.
If you would like to use a specific version of R, you can 
change `From: rocker/tidyverse` at the start of your `.def` file to something like `From: rocker/tidyverse:4.3.2`.
:::

Because the `tidyverse` package includes a large collection of R packages that 
would be time consuming to install from scratch,
using a prebuilt `rocker/tidyverse` image is generally a good choice for a 
base container. 

:::tip Useful Resources

Some prebuilt containers are tailored for specific types of workflows and can save time setting up complex environments:

1. **[Rstudio server container](https://hub.docker.com/r/tuftsttsrt/rserver)** from Tufts University HPC.
This container has various **[CRAN](https://github.com/TuftsHPCbioinfo/rstudio_server/blob/main/cran_package_list.txt)** and
 **[Bioconductor](https://github.com/TuftsHPCbioinfo/rstudio_server/blob/main/bioc_package_list.txt)** packages installed.

2. **[Single Cell RNA-seq container](https://hub.docker.com/r/yzhangtufts/r-scrnaseq)** from Tufts University HPC.
This container has a large range of **[bioinformatics packages](https://github.com/TuftsHPCbioinfo/r-scrnaseq/blob/main/Dockerfile)** that are
useful for scRNseq analysis.
:::