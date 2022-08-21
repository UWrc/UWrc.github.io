---
id: modules-containers
title: Modules with Containers
---

Modules can also be setup in such a way they will utilize apptainer containers. This can be useful for codes which prerequisits are difficult to meet if not sudo user.

An example is given here for the application [ffmpeg](https://ffmpeg.org/) but it can be easily modified to run with whatever other container from any library. This code is used to produce high quality video from simulation files obtained with ParaView.
The ufficial guide to compile on centos is given [here](https://trac.ffmpeg.org/wiki/CompilationGuide/Centos/). It can be noticed right away how complex such compilation would be to simply be able to run the ffmpeg executable as many prerequisites are needed (nasm, yasm, etc...).

By using a docker container [ffmpeg-docker](https://hub.docker.com/r/linuxserver/ffmpeg) this task can be easily done.
However, setting un a module for everybody to use involving containers necessitates a few extra steps.

## `ffmpeg` Example Usage
The ffmpeg module can be laoded using the following command:
```bash
module load mamslab/ffmpeg/4.4
```
As soon as it is loaded the following message gets displayed:

```shell-session terminal=true
$ module load mamslab/ffmpeg/4.4
------------------------------------------------------------
Available Commands: ffmpeg, ffprobe
------------------------------------------------------------
The following package will be loaded using a container.
If the container is not in cache, it will downloaded
at the very first time; otherwise, it will be loaded from cache.
------------------------------------------------------------
To change the cache directory, modify as following:
export APPTAINER_CACHEDIR=/folder/you/want/to/save/cache
If you want to delete the cache: apptainer cache clean
------------------------------------------------------------
Current Cache Size and Location: 306M   /mmfs1/home/adeleo/.apptainer/
$
```
What this means is that the container will be downloaded into the user apptainer cache folder which usually resides in `/mmfs1/home/myName/.apptainer`.
This folder can be changed by exporting the proper environment variable:
```bash
export APPTAINER_CACHEDIR=/folder/you/want/to/use
```
and as a reminder, the last message will say how big is the cache folder (remember there is a 10gb limit on user home directories) and where the cache folder is currently located. In the above example, the folder size is 306mb and it resides in `/mmfs1/home/adeleo/.apptainer/`. The cache folder can be cleaned by running the command `apptainer cache clean`.

:::caution
The only available commands to use with the containers are noted in the message! In this example, only the commands `ffmpeg` and `ffprobe` can be used!
:::

By running the `ffmpeg` command, if the container is not in cache, apptainer will download the docker and then it will run the command followed the arguments needed.

This is great because now every user can load these modules and use commands that run directly out of containers! 

## Module Creation and Setup
In this section a more in-details example of how create modules that utilize containers will be given.

The .lua module file (located in `/sw/contrib/modulefiles/mamslab/ffmpeg/4.4.lua`) of the containerized ffmpeg package is the following:

```bash
help([[
ffmpeg-4.4 (loaded via apptainer)
]])

-- The apptainer module is required
depends_on("apptainer")

-- This variable will find the apptainer cache directory
local cache_dir = os.getenv("APPTAINER_CACHEDIR") or os.getenv("HOME") ..  "/.apptainer/"

-- This if statement makes sure to display the message only during module loading
if (mode() == "load") then
    LmodMessage("------------------------------------------------------------")
    LmodMessage("Available Commands: ffmpeg, ffprobe")
    LmodMessage("------------------------------------------------------------")
    LmodMessage("The following package will be loaded using a container.")
    LmodMessage("If the container is not in cache, it will downloaded")
    LmodMessage("at the very first time; otherwise, it will be loaded from cache")
    LmodMessage("------------------------------------------------------------")
    LmodMessage("To change the cache directory, modify as following:")
    LmodMessage("export APPTAINER_CACHEDIR=/folder/you/want/to/save/cache")
    LmodMessage("If you want to delete the cache: apptainer cache clean")
    LmodMessage("------------------------------------------------------------")
    LmodMessage("Current Cache Size and Location: " .. capture("du -sh " .. cache_dir) )
end

-- These are the links and executables of the containers
local image = "ffmpeg_4.4.sif"
local uri = "docker://linuxserver/ffmpeg"
local programs = {"ffmpeg"}
local entrypoint_args = ""

-- In this case the sif is not saved as a file but just in cache
-- Future modifications can allow the user to actually save by pulling the container
-- instead of saving it in the cache directory
image = uri

local container_launch = "apptainer exec --home $PWD --bind /mmfs1/home/ --bind /mmfs1/gscratch/ " .. image .. " " .. entrypoint_args

for i,program in pairs(programs) do
    set_shell_function(program, container_launch .. " " .. program .. " \"$@\"",
                                container_launch .. " " .. program .. " $*")
end

whatis("        Name: ffmpeg")
whatis("     Version: 4.4")
whatis(" Description: This version is loaded via apptainer")
```

By following the above example, other modules can be easily created. It is important to properly document links, changes, and which commands can be execute by the container.
The last for loop creates shell functions which can be run in your compute node.
In this example, if you look up the function `ffmpeg` this is what you will get:

```shell-session terminal=true
$ which ffmpeg
ffmpeg ()
{
    apptainer exec \
    --home $PWD \
    --bind /mmfs1/home/ \
    --bind /mmfs1/gscratch/ \
    docker://linuxserver/ffmpeg ffmpeg "$@"
}
$
```

What this means is that instead of using an executable called ffmpeg, you will actually call a function which runs:
 1. `apptainer exec`: is calling apptainer and requesting to perform an "action" via the `exec` command.
 2. `--home \folder`: is setting up the working directory as the home directory in the container.
 3. `--bind \folder`: it binds the folder to the container. `\gscratch` is recommended.
 4. `docker://address`: is the address of the container.
 5. `"%@"`: the arguments following the function call.

:::tip
The command `--home $PWD` means that wherever you are running the function from, it will match as working directory in the container. This is because whenever the container is run, it automatically goes to the home folder.
:::

## Run the container as shell (advanced)
With a bit of familiarity of containers, after loading the module is also possible to run the container as an interactive shell.
This is done by copying the shell function and replacing `exec` with `shell` and removing the explicit `ffmpeg` function and the shell bash arguments `"%@"`. Doing so leads to the following:

```shell-session terminal=true
$ apptainer shell \
    --home $PWD \
    --bind /mmfs1/home/ \
    --bind /mmfs1/gscratch/ \
    docker://linuxserver/ffmpeg
INFO:       Using cached SIF image
Apptainer>
Apptainer> pwd
/gscratch/mamslab/adeleo
Apptainer>
```

Now the container can be run as if it were a proper interactive session!
