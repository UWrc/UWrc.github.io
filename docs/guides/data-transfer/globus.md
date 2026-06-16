---
title: Globus
---

As of Spring 2025, we're excited to announce that Globus has been added to Hyak `klone` and Kopah S3. Globus makes it easy to transfer large datasets reliably and securely between systems, whether across campus or around the world. With features like automated transfers, fault tolerance, and a simple web interface, it's a powerful tool for streamlining data movement in research workflows.

:::caution `klone` sharing not yet enabled
This service is still new to our environment, and we're actively working to understand how Globus integrates with our current and future security posture. As a result, Globus public sharing is not yet enabled on `klone`, but we'll provide updates as we continue evaluating and expanding its capabilities.

Globus public sharing is available with [**Kopah S3 storage**](https://hyak.uw.edu/docs/systems/kopah/storage#globus), which we recommend as a compliment for your research storage portfolio if you anticipate requiring regular sharing and collaboration. 
:::

### Getting Started with Globus

Logging into Globus is straight forward:

* Go to [**globus.org**](https://www.globus.org/) and "LOG IN" with University of Washington. Sign in will include Duo 2-Factor Authentication. 
* Using the **File Manager - Collection Search** tab look for "UW Hyak Klone" for `/gscratch/`
* Once you click on the "UW Hyak Klone" collection, be sure to Bookmark the collection so that it appears in the **Bookmarks** tab for future searches and operations as shown below. 

<img src="/img/docs/globus/0_find_collections.png" alt = "Image shows the two Hyak collections - Klone and Kopah - in the Bookmarks tab on Globus." /> 

* Your Home directory will be the default filesystem path when you start Globus. Your path on the filesystem and be entered manually to change directory, allowing you to see directories that you have permission to access. The three-lines menu can be revealed to show helpful features. 

<img src="/img/docs/globus/1_file_manager.png" alt = "Image shows the user's home directory by default and indicates the three-lines menu with helpful features. The path can be edited." /> 

### Setting Up you Local Endpoint

Setting up **Globus Connect Personal** on your local computer lets you create a personal endpoint, making it easy to transfer files between your computer and other Globus collections—including our cluster—using a simple, secure interface.

* [**Install Globus Connect Personal**](https://www.globus.org/globus-connect-personal) for your operating system. 

:::important 
HTTPS uploads and downloads are limited to 10 GB per file. Files under 10 GB can be transferred by dragging and dropping or by using the upload/download buttons in Globus. For larger uploads, use Globus Connect Personal.
:::

:::tip Video tutorial available
[**Video guide**](https://www.youtube.com/watch?v=bpnVcAN99WY) from the Globus Team. 

*Note: the Endpoints Menu Tool appears to be deprecated and now "Endpoint" and "Collection" are synonymous. Your personal endpoint can be found by searching Collections.*
:::
* While configuring your Globus Connect Personal endpoint, be sure to select a unique name for your device (e.g., User-MacBook-Pro or Lab-Desktop), you will use this name again when you start transferring data. 
* Once you have Globus Connect Personal installed and configured, you can start transferring data between your personal device and Hyak `klone`. There are many ways to use Globus. Below, we provide some examples: 

Globus has a two-pane view option which can allow you to see two collections in the same window and perform transfers between them. With UW Hyak Klone (`/gscratch/`) in one pane, click search in the other to select a different collection. 

<img src="/img/docs/globus/2_side_side.png" alt = "Image shows file manager two pane view where another collection can be viewed and used to perform transfers." /> 

Using the **File Manager - Collection Search** and the **Collections** tab find the personal endpoint you configured for yourself. 

<img src="/img/docs/globus/3_gcp_endpoint.png" alt = "Image shows collections tab where personal endpoint should be if configured correctly." /> 

Once your Globus Connect Personal collection is loaded on the second pane, you can navigate to the files you wish to transfer. Select files to transfer with the check box and press start. Once a transfer has started, a green box will show that your transfer request has been successfully submitted and you have the option to "View details." For small transfers, speeds are fast and results are complete quickly; you can "refresh list" on the receiving collection to see newly transferred files. Larger transfers can occur unsupervised and with minimal interruptions. Globus will send you an email when your transfer is completed. 

<img src="/img/docs/globus/4_start_transfer.png" alt = "Image shows how to select a file with the check box, start the transfer with the start button, and view transfer details as needed." />

Globus offers many options for transferring data, shown below. Options include scheduled and repeated transfers. 

<img src="/img/docs/globus/5_transfer_options.png" alt = "Image shows how to view and select transfer options." />

Globus is a great tools and we will continue to bring you tips and tricks for using it. 

Learn More: 
* Please explore Globus' extensive [**user documentation**](https://docs.globus.org/?_gl=1*s0ry7u*_ga*MTE2MzI4NzMxNi4xNzQyMzQxMTg3*_ga_7ZB89HGG0P*MTc0NDA3MjY1Ny4xNy4xLjE3NDQwNzI2NTcuMC4wLjA.) 
* Including [**video tutorials**](https://www.youtube.com/@GlobusOnline/featured). 
    * We found [**Introduction to Globus for Researchers and New Users**](https://www.youtube.com/watch?v=-j7Mp3FN1zo&list=PLLCSx-IFoBeu2F-HF-DMoc5_AUsvYft8c&index=2) informative. 
