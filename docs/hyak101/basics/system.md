---
id: system
title: Navigating klone
---

In this section we will discuss the `klone` file system and navigating through drectories. 

:::note Important Concept: CLI vs. GUI
The command-line interface (CLI) allows for faster and more precise control over tasks through direct text commands, reducing the overhead of navigating graphical elements that accompany Graphical User Interfaces (GUIs). It also supports **automation** and scripting, enabling complex, repetitive tasks to be executed efficiently with minimal user intervention.

Here are some examples of GUIs which you interact with on your local computer as a regular user: 
1. **Windows Explorer** - a file management tool for Windows that visually represents files, folders, and drives, translating the command-based operations of Command Prompt or PowerShell into intuitive, clickable icons and windows.
2. **MacOS Finder** - a file management tool for MacOS that visually organizes and allows navigation of files, folders, and applications, translating the command-based operations of the Terminal into an intuitive, icon-based environment.

That's right, everytime you click and icon or item in Windows Explorer or Finder, a program is running on the command line in the background to perform the action such as viewing a list of files, opening a file, or executing an application. 

Visualize your Windows Explorer or Finder. As you click on directory or folder icons, you move through your local computer's file system to view items (documents, scripts, photos) inside. In this section we will use the CLI to move through directories and view their content on `klone`. We will use commands to call programs that tell use "where we are" on `klone` and what items we can access. 
:::

## Location is Key

In this section, we will introduce three commands that you should get into the habit of using if you are brand new to `klone`. These commands will help you navigate around through `klone` directories, know  "where you are", and know what else is in the location or place in the `klone` filesystem. 

### `pwd`

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

### `cd`

#### "change directory" or `cd` to move into a different directory on klone. 

In this example, we will use `cd` and `pwd` to move to the directory where our data for this tutorial is stored on `klone` and then back to our Home directory. 

```bash
cd /mmfs1/sw/hyak101/basics/
# you have just moved into the directory called basics under the directory at /sw/hyak101/
```

Additionally, your new shell prompt will show your your new location in short form:

```bash
[UWNetID@klone-login01 basics/]$
```

Now use `pwd` to show your "address" or the absolute path to the directory with our tutorial data: 
```bash
pwd
/mmfs1/sw/hyak101/basics
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
```
In this case, `echo $HOME` does the same thing as `pwd` when you execute `pwd` from your Home directory.

:::

The concept of "location" is important because where you are on `klone` can determine what data you have access. 

### `ls`

#### "list" or `ls` to show the contents of your current directory or "location" in the filesystem. 

If you have just started as a HYAK user, your Home directory might be empty. 

```bash
ls
```
Executing the command above may produce no result if you haven't logged in before. However, we can use `ls` to explore the `klone` filesystem and help us batter understand how to navigate it. 

Let's use `cd` to go to the base of the `klone` filesystem, which is called the "root." Rather than being called "root" the root directory is referred to as `/`. Let's move to the root directory and list its contents. 

```bash
cd /

ls
```

`ls` in `/` should produce the following:

```
0    boot   data  etc   gscratch  lib    media  mmfs1  net  proc  run   scr  sw   tmp  var
bin  cvmfs  dev   gpfs  home      lib64  misc   mnt    opt  root  sbin  srv  sys  usr  xcatpost
```

You have just listed the contents of the root directory, and the items here are other directories or shortcuts. 
Within the root directory are the directories listed above, including `mmfs1/`. Use `ls` to list the contents of `mmfs1/`:

```bash
ls mmfs1/
# notice you don't have to be inside of a directory to list its contents. 
```

`ls` in `mmfs1` should produce the following:
```
admin  apsearch  data  encrypted  gscratch  home  slurmdata  ssg  sw
```
Some of these names might be familiar to you. For example, every user on HYAK has a Home directory, which, like yours, is inside of the directory called `mmfs1/` which has a directory inside of it called `home/` which has a directory for each HYAK user. Similarly, above we changed directory to a directory inside of `mmfs1/` called `sw/`.

Picture the `klone` filesystem as an upside down tree. The topmost directory is the root directory (`/`) that holds everything else. The picture is a truncated view of the filesystem showing the root directory `/`, a few directories within it, including `mmfs1` and a few directories within `mmfs1/`: `home/` where the Home directories are, `sw/` where we keep software and scripts, and `gscratch/` where the lab groups that contribute to HYAK have their storage directories. 

![](/img/docs/hyak101/basics/filesystem.png 'filesystem')

With Windows File Explorer and MacOS Finder, you can click on icons like those shown in the photo to navigate your filesystem, opening directories and listing contents, on `klone` and most CLIs, we navigate the filesystem with these commands. You'll get the hang of it fast. 

Let's practice a little now. Start in the root directory if you aren't there already: 

```bash
cd /

# can you find your Home directory on the list?
ls mmfs1/home/

# does your lab group have a directory under gscratch?
ls mmfs1/gscratch

# list the datafiles we will use for the tutorial
ls mmfs1/sw/hyak101/basics/data
```

:::note
Notice that there are two meanings for the / character. When it appears at the front of a file or directory name, it refers to the root directory. When it appears inside a path, it’s just a separator.
:::

```bash
# list all files, including files that are hidden with the -a flag
# list the hidden files in your Home directory
ls -a ~
# files beginning with . are hidden from view with ls alone

# list directory contents in long form
ls -l

-rw-r--r--    1 root root      0 Jun 11 12:04 0
lrwxrwxrwx    1 root root      7 Oct 10  2021 bin -> usr/bin
dr-xr-xr-x    5 root root    400 Jun 11 12:05 boot
drwxr-xr-x    2 root root      0 Jun 11 12:07 cvmfs
lrwxrwxrwx    1 root root     11 Jun 11 12:06 data -> /mmfs1/data
drwxr-xr-x   19 root root   3360 Jun 11 12:06 dev
drwxr-xr-x  120 root root   5000 Jun 11 17:47 etc
drwxr-xr-x    3 root root     60 Jun 11 12:06 gpfs
lrwxrwxrwx    1 root root     15 Jun  7 16:18 gscratch -> /mmfs1/gscratch
drwxr-xr-x    4 root root     80 Jun  7 16:16 home
lrwxrwxrwx    1 root root      7 Oct 10  2021 lib -> usr/lib
lrwxrwxrwx    1 root root      9 Oct 10  2021 lib64 -> usr/lib64
drwxr-xr-x    2 root root     40 Oct 10  2021 media
drwxr-xr-x    2 root root      0 Jun 11 12:07 misc
drwxr-xr-x   17 root root 262144 Mar  4 08:52 mmfs1
drwxr-xr-x    2 root root     40 Oct 10  2021 mnt
drwxr-xr-x    2 root root      0 Jun 11 12:07 net
drwxr-xr-x   10 root root    200 Jun  7 16:18 opt
dr-xr-xr-x 5131 root root      0 Jun 11 12:02 proc
dr-xr-x---    7 root root    380 Jun 11 12:53 root
drwxr-xr-x   36 root root   1280 Jun 11 12:07 run
lrwxrwxrwx    1 root root      8 Oct 10  2021 sbin -> usr/sbin
drwxr-xrwx    8 root root    174 Jun 12 12:52 scr
drwxr-xr-x    2 root root     40 Oct 10  2021 srv
lrwxrwxrwx    1 root root      9 Jun  7 16:18 sw -> /mmfs1/sw
dr-xr-xr-x   13 root root      0 Jun 11 12:03 sys
drwxrwxrwt  104 root root   3040 Jun 12 14:51 tmp
drwxr-xr-x   14 root root    300 Jun  7 16:15 usr
drwxr-xr-x   22 root root    520 Jun 11 12:05 var
drwxr-xr-x    8 root root   4080 Jun 11 12:05 xcatpost
```

`ls -l` lists contents showing their permissions [**(Learn more about permissions here.)**](https://quickref.me/chmod.html), date of last edit, and their owner. Most items within the root directory are owned by "root" our name for our administrator. There are many flags for `ls` that can help you list contents in different ways, and many users have their favorite set of flags that they use regularly. Review all possible flags with the following command: 

```bash
man ls
# use the "q" key to exit the man command. 
```

The `man` command stands for manual pages and brings up the user guide for a command. Another way to learn what a command does is with the help pages. Activate `ls` help pages with: 

```bash
ls --help
```

As you use `cd` and `ls` to explore `klone` you might run into the message "Permission denied". Being a shared resource, not all locatations on `klone` are open to you listing contents, etc.


### Node vs. Directory Path

Another important aspect of location on `klone` is the node or computer that you are using at any given time. Your prompt also shows you this location. 

```bash
[UWNetID@klone-login01 ~]$
```

As mentioned in the last section, `@klone-login01` indicates I am logged into or using one of the login nodes HYAK. Later when we learn how to start interactive jobs, this part of our prompt will change, indicating we are on a different node. Importantly, just because you are on a different node, your Home directory and working directories (for example, directories under your lab group's `/gscratch` or under `/gscratch/scrubbed`) will have the same absolute path across all computers in the `klone` cluster.  

In the next section, we will learn more commands to help you get used to `klone`'s Linux CLI.