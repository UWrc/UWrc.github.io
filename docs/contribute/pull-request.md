---
id: pull-request
title: Pull Requests
sidebar_label: Pull Requests
---

If you feel that you are doing something other Hyak users would benefit from knowing about we invite you contribute to this website! You can contribute anything you think might be helpful, such as a guide on a tool or program you learned for your project or just tips and tricks you would like to share. We have tried to make this process as streamlined as possible, so much so you can do it completely from your browser without having to install anything on your system.

## Setting Up the Environment

In order to make the process as streamlined as possible we take advantage of [Github Codespaces](https://github.com/features/codespaces) to provide a quick pre-configured development environment for contributors, which provides 60 hours of use and 15gb of storage a month to free github users. All you have to do is go the [UWrc github repo](https://github.com/UWrc/UWrc.github.io), select the green "Code" dropdown, go to the "Codespaces tab", and click "Create codespace on src". Github will automatically start setting up your codespace in another tab using the browser version of VisualStudio Code, which may take up to a couple of minutes. This should work out of the box on chromium based browsers but if you are on firefox you may need to disable the cookie blocker by clicking the shield icon near the search bar and toggling the "Enhanced Tracking Protection" option.

:::note
While github codespaces are the fastest option, they aren't the only one if you would like to setup your environment locally or just through a more flexible online environment since we use the open source [devcontainer](https://containers.dev/) format to build our development environment. If you would like to setup an environment locally you can of course install [VisualStudio Code](https://code.visualstudio.com/download) with the [Codespaces extension](https://code.visualstudio.com/docs/remote/codespaces), but I recommend looking into the open source project [Devpod](https://devpod.sh/docs/what-is-devpod), which will allow you to create a docker, kubernetes, or other online hosted environment using your preferred IDE just by copying and pasting the repo url. There are also other cloud providers, such as [Gitpod](https://www.gitpod.io/), that provide similar services. If you would prefer to setup the environment directly on your machine there are instructions on the [UWrc](https://github.com/UWrc/UWrc.github.io) readme
:::

## Writing your Webpage

Once your environment is up and running you have to actually write your new webpage, which we provide a couple of tools for. There is a built in spellchecker and markdown linter (style checker) set up for you so make sure to go to the "problems" tab in vscode to see all spelling and style errors and simply right click to select a fix. Some of the existing pages might not follow the guidelines perfectly but just make sure yours doesn't have any problems.

For actually writing your webpage, we have a [Markdown Guide](markdown-guide.md) you can read to learn some of the capabilities of markdown, and there are also countless guides online for anything you might want to do. To help you write your webpage there is also a markdown extension installed for you that provides helpful shortcuts detailed in their [Documentation](https://code.visualstudio.com/docs/languages/markdown). After you write the page you have to link it to the existing site structure (namely to the sidebar), which we detail in the [Linking Markdown](link-markdown.md) guide.

It's unlikely you'll get everything right first try though, so there are a couple of ways to preview your page while working on it. VScode has a built in preview that you can use by clicking the two pane icon with a magnifying glass on the top right of your window, or pressing Ctrl+K and then v. This will open a preview of your rendered webpage in another tab but unfortunately won't render some things that we render manually, like the admonition boxes. To view your fully rendered page, and check that the sidebar is configured right, you can run `yarn start` in the terminal (you may need to open one by pulling up the Command Palette with Ctrl+Shift+P and searching for "terminal") which will load up a preview of the entire website and automatically open it in a another browser tab for you. To restart the page just press Ctrl+C in the terminal and type `yarn start` again.

##
