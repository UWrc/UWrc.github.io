---
id: pull-request
title: Pull Requests
sidebar_label: Pull Requests
---

If you feel that you are doing something other Hyak users would benefit from knowing about we invite you contribute to this website! You can contribute anything you think might be helpful, such as a guide on a tool or program you learned for your project or just tips and tricks you would like to share. We have tried to make this process as streamlined as possible, so much so you can do it completely from your browser without having to install anything on your system.

## Setting up the environment

In order to make the process as streamlined as possible we take advantage of [Github Codespaces](https://github.com/features/codespaces) to provide a quick pre-configured development environment for contributors, which provides 60 hours of use and 15gb of storage a month to free github users. All you have to do is go the [UWrc github repo](https://github.com/UWrc/UWrc.github.io), select the green "Code" dropdown, go to the "Codespaces tab", and click "Create codespace on src". Github will automatically start setting up your codespace in a another tab using the browser version of VisualStudio Code, which may take up to a couple of minutes. This should work out of the box on chromium based browsers but if you are on firefox you may need to disable the cookie blocker by clicking the shield icon near the search bar and toggle the "Enhanced Tracking Protection" option.

:::note
While github codespaces are the fastest option, they aren't the only one if you would like to setup your environment locally or just through a more flexible online environment since we use the open source [devcontainer](https://containers.dev/) format to build our development environment. If you would like to setup an environment locally you can of course install [VisualStudio Code](https://code.visualstudio.com/download) with the [Codespaces extension](https://code.visualstudio.com/docs/remote/codespaces), but I recommend looking into the open source project [Devpod](https://devpod.sh/docs/what-is-devpod), which will allow you to create a docker, kubernetes, or other online hosted environment using your preferred IDE just by copying and pasting the repo url. There are also other cloud providers, such as [Gitpod](https://www.gitpod.io/), that provide similar services.
:::
