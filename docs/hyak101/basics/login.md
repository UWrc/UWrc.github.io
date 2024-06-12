---
id: login
title: Logging In
---

### Accounts on Hyak

To log into any HYAK cluster you need an account created. Please review our documentation around accounts and get an account before moving forward with this tutorial. [**Click here for account documentation.**](https://hyak.uw.edu/docs/account-creation)

### Two Factor Authentication

UW policy is that all services (of which HYAK is one) require 2 factor authentication (2FA) by default as a security posture. Please go to [**this 2FA page**](https://identity.uw.edu/2fa/) and ensure you have it enabled and configured before proceeding with this tutorial.

:::important
You need 2FA to log onto any HYAK cluster.
:::

### Logging in with SSH

Once you have your account and 2FA set up, you can use `ssh` to log into `klone`. `ssh` is the most common method of logging into the cluster is using the command-line interface (CLI). If you're using any Linux or Linux-like system (e.g., MacOS, BSD) you probably already have a Terminal installed by default. Locate Terminal in your Applications directory on your Mac. 

Newer versions of Windows also have a new Linux sub-system so there are also native options to bring up a local terminal. Alternatively, you can login to `klone` using Command Prompt or Windows Powershell. Other options include [**PuTTY**](https://www.putty.org/) and [**Git Bash - use "The Bash Shell" Windows from this link for a video with install instructions.**](https://carpentries.github.io/workshop-template/install_instructions/#shell). 

Once you have a shell open in Terminal or any of the Windows options, you can login with the following command replacing the word `UWNetID` with your UW Net ID. You'll know it worked when you see the "klone hyak" welcome message printed to your screen. 

```bash
ssh UWNetID@klone.hyak.uw.edu
Password: ***********
Duo two-factor login for UWNetID

    Enter a passcode or select one of the following options:

    1. Duo Push to XXX-XXX-XXXX
    2. Phone call to XXX-XXX-XXXX

    Passcode or option (1-2): 1
    Success. Logging you in...
     _    _                    _                 _
    | | _| | ___  _ __   ___  | |__  _   _  __ _| | __
    | |/ / |/ _ \| '_ \ / _ \ | '_ \| | | |/ _` | |/ /
    |   <| | (_) | | | |  __/ | | | | |_| | (_| |   <
    |_|\_\_|\___/|_| |_|\___| |_| |_|\__, |\__,_|_|\_\
                                     |___/
```

:::warning
Too many incorrect login attempts will result in a IP ban, which could last up to an hour. 
:::

### What's a shell?

The shell is a program where users can type commands. With the shell, it’s possible to invoke complicated programs like climate modeling software or simple commands that create an empty directory with only one line of code. When you use `ssh` to log into `klone`, you are using a shell called Bash (the Bourne Again SHell — so-called because it’s derived from a shell written by Stephen Bourne) to interact with `klone`. If you were successful logging into `klone` you are looking at a shell. I like to this of it as my "view" into `klone`. This is where you will execute commands (i.e., other programs to perform various activities like viewing documents, listing the contents of a directory, etc.)

When the shell is first opened, you are presented with a prompt, indicating that the shell is waiting for input. 

```bash
[UWNetID@klone-login01 ~]$
```
Let's breakdown the pieces of our prompt: 
* You will see you UW Net ID in place of the word UWNetID above, indicating you are logged in under your username for `klone`. 
* `@klone-login01` or `@klone-login03` indicates you have logged into the login node or the "front door" of HYAK. This is where all users start. Please review our list of [**Acceptable Uses of the Login Node**](https://hyak.uw.edu/docs/setup/ssh#acceptable-uses-of-the-login-node). We will discuss how to perform all other activities later on in this tutorial. 
* The `~` symbol is shorthand for your Home directory. This is your default login "location" on `klone`. Please review our 
[**Storage Documentation**](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory) to learn about Disk Storage in your Home directory.

In the next section, we will discuss you "location" on the `klone` file system and how to navigate from directory to directory. 

