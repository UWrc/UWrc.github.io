---
id: system
title: Navigating klone
---

:::note

This documentation is under construction.

:::

In this section we will discuss the `klone` file system and navigating through drectories. 

:::note Important Concept: CLI vs. GUI
The command-line interface (CLI) allows for faster and more precise control over tasks through direct text commands, reducing the overhead of navigating graphical elements that accompany Graphical User Interfaces (GUIs). It also supports **automation** and scripting, enabling complex, repetitive tasks to be executed efficiently with minimal user intervention.

Here are some examples of GUIs which you interact with on your local computer as a regular user: 
1. **Windows Explorer** - a file management tool for Windows that visually represents files, folders, and drives, translating the command-based operations of Command Prompt or PowerShell into intuitive, clickable icons and windows.
2. **MacOS Finder** - a file management tool for MacOS that visually organizes and allows navigation of files, folders, and applications, translating the command-based operations of the Terminal into an intuitive, icon-based environment.

That's right, everytime you click and icon or item in Windows Explorer or Finder, a program is running on the command line in the background to perform the action such as viewing a list of files, opening a file, or executing an application. 

Visualize your Windows Explorer or Finder view. As you click on directory or folder icons, you move through your local computer's file system to view items (documents, scripts, photos) inside. In this section we will use the CLI to move through directories and view their content. We will use commands to call programs that tell use "where we are" on `klone` and what items we can access. 
:::

### Location is Key

In this section, we will introduce two commands that you should get into the habit of using if you are brand new to `klone`. These commands will help you navigate around through `klone` directories and know  "where you are". 

#### "print working directory" or `pwd` shows you "where you are" or more specifically which directory your shell is inside of on `klone`. 

```bash
pwd
```
For example, as the author of this documentation (username `finchkn`), when I use `pwd` after I login, I see: 
```bash
pwd
//highlight-next-line
/mmfs1/home/finchkn
```

`/mmfs1/home/finchkn` is the "address" or **absolute path** of my Home directory on `klone`. If you just logged in, yours will be `/mmfs1/home/UWNetID` but showing your UW Net ID. 

#### "change directory" or `cd` to move into a different directory on klone. 

In this example, we will use `cd` and `pwd` to move to the directory where our data for this tutorial is stored on `klone` and then back to our Home directory. 

```bash
cd /sw/hyak101/basics/
# you have just moved into the directory called basics under the directory at /sw/hyak101/
```

Additionally, your new shell prompt will show your your new location in short form:

```bash
[UWNetID@klone-login01 basics/]$
```

Now use `pwd` to show your "address" or the absolute path to the directory with our tutorial data: 
```bash
pwd
/sw/hyak101/basics/
```

Now let's go back to our Home directory to complete this exercise. 
```bash
cd ~ 
pwd 
/mmfs1/home/UWNetID
```

And your prompt should once again show `~` as your location: 

```bash
[UWNetID@klone-login01 ~]$
```

The concept of "location" is important because where you are on `klone` can determine what data you have access. In the next section we will learn more command to show us what data we have access to from any given "location" and expand more upon "location."

:::tip PRO TRIP - FYI
There are many shortcuts to get back to your Home directory from anywhere on `klone` with `cd`. 
```bash
# All of the following will take me to my Home Directory:
# the ~ symbol is a shorthand for the Home Directory
cd ~ 
# cd followed by nothing will take you to the home directory
cd
# $HOME is an environmental variable is synonymous with the absolute path of your Home Directory
cd $HOME
# print the variable $HOME to see what it assigned to in your shell
echo $HOME
# in this case, `echo $HOME` does the same thing as `pwd` when you execute `pwd` from your Home directory
```
:::

### Node vs. Directory Path

Another important aspect of location on `klone` is the node or computer that you are using at any given time. Your prompt also shows you this location. 

```bash
[UWNetID@klone-login01 ~]$
```

As mentioned in the last section, `@klone-login01` indicates I am logged into or using one of the login nodes HYAK. Later when we learn how to start interactive jobs, this part of our prompt will change, indicating we are on a different node. Importantly, just because you are on a different node, your Home directory and working directories (for example, directories under your lab group's `/gscratch` or under `/gscratch/scrubbed`) will have the same absolute path across all computers in the `klone` cluster.  