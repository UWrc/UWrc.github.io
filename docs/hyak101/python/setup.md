---
id: setup
title: Getting Started
---

### Prerequisites

You must be able to access the Klone Hyak cluster. If you don't already have an account, [**start here**](https://hyak.uw.edu/docs/join-group).

This Tutorial has distinct instructions for Windows and Mac users. Please go directly to the section that matches your operating system (OS). 

:::note

Parts of this guide will be challenging for novices. There is a small amount of Bash programming involved, and while most can be copy & pasted, you may run into difficulties
when you need to make modifications. You got this, and we are here to **help@uw.edu**. 

:::

### Selecting your Working Directory

During this Tutorial, you should be mindful of your long term usage of these tools and customize the set up to fit your needs. Customizing your set up include selecting a directory where you will store the files we will generate as we walk through the steps. However, you should be mindful that **Disk storage in your Home directory is limited to 10GB**. While setting this up in your Home Directory is an option, we **don't recommend it** because of the small storage quota [**click here to learn more**](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory). Instead, we recommend following this tutorial in a different part of the file structure where you have access to disk storage with a larger quota, such as a directory within your lab's `/gscratch` directory or a directory you create in the community storage directory `/gscratch/scrubbed`. 

For this tutorial, we will work in `/gscratch/scrubbed`. Remember storage on `/gscratch/scrubbed` is not permanent and these files will be deleted after a few weeks if they are not used regularly, but the quota is larger and useful for our learning objectives [**click here to learn more**](https://hyak.uw.edu/docs/storage/gscratch#scrubbed). If you don't have a directory for yourself in `/gscratch/scrubbed` you can make one with the following command named after **your UWNetID**: 

```bash
//highlight-next-line
mkdir /gscratch/scrubbed/UWNetID
# above replace "UWNetID" with your UWNetID
```

### Initial Set Up vs. Start Up Sequence

This tutorial will walk through the steps to set up Jupyter Notebooks usage. However, after the initial set up, the start up sequence will be different (and more concise). For this reason, we have included a page that details the start up sequence for regular usage, and we encourage you to follow the entire set up to ensure proper set up andavoid errors.

:::warning HOT OFFER
### Using our pre-built container for this tutorial

The next section called "Building a Container" is **OPTIONAL** and will describe how the main container we prepared for this tutorial was developed. We highly encourage you to read and understand the development of this container because it will help you adapt this tutorial to fit the needs of your research project. However, if you are interested in completing this tutorial to set up Jupyter Notebooks on HYAK, complete this following step, and skip to the section titled **Flexible Connections** under the instructions for your OS. This saves you an hour (you're welcome).

The main container for this tutorial is called `hyak-container.sif` and is ready for you to use. The full path is `/mmfs1/sw/hyak101/python/hyak-container.sif`.

The best way to use the container for the rest of the tutorial is to make a symbolic link to it (kind of link a short cut). First navigate to your working directory, which you set up above. Then issue the following command. 
```bash
ln --symbolic /mmfs1/sw/hyak101/python/hyak-container.sif hyak-container.sif
```
:::

#### Done. If you do not need to build a custom container right now, move onto the next section: Flexible Connections for your OS (Mac/Linux or Windows)
Don't worry, you can come back later when you are ready. 

### Additional Resources

We have curated a list of [**Additional Resources**](https://hyak.uw.edu/docs/resources) and you will find many are relevant for this tutorial. 