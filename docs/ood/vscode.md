---
id: vscode
title: VS Code
---
Visual Studio Code (VS Code) is a popular open-source code editor that supports a range of languages and extensions. We offer VS Code through [code-server](https://github.com/coder/code-server) as a tool for developing code on Hyak. Our OnDemand application allows users to connect to allocated compute nodes without a complicated ProxyJump setup.

## Setup
1. Ensure you have set up [<u>intracluster keys</u>](https://hyak.uw.edu/docs/setup/intracluster-keys) to SSH between klone nodes without a password.

## Accessing VS Code
1. Navigate to `Interactive Apps` and select VS Code.
2. Select a VS Code-Server container.
3. Optionally specify a working directory and data directory (see below).
5. Click `Launch` to start the VS Code-Server container.

## Working Directory vs. Data Directory

When launching VS Code through Open OnDemand, you can specify both a _working_ and _data_ directory. Most users will not need to specify a data directory. These serve different purposes:

- **Working Directory:**  
  - This is the root directory of your VS Code workspace.  
  - The files and code you work on will be located here.  
  - You should set this to the project folder or the location where your source code resides.  

- **Data Directory:**  
  - This is where VS Code extensions and settings are stored. If you change this directory after installing extensions, you may need to reinstall or migrate them.
  - Keeping this separate from your working directory helps preserve your [**home directory quota**](https://hyak.uw.edu/docs/storage/gscratch#user-home-directory) since extensions and cache files can consume a lot of space.  
  - Choosing a location with ample storage (such as personal scratch/lab space) can help prevent running out of space in your home directory.  

## FAQ

### Why can't I find an extension?
- VS Code-Server supports extensions from the [Open-VSX extension gallery](https://open-vsx.org). Because of this, you may not find all available extensions on Microsoft's marketplace.
### How can I install my own extensions?
- You can install your own .VSIX extension files by uploading them and installing them manually with Right Click -> Install Extension VSIX.
### How can I reuse my VS Code configuration?
- You can sync your VS Code settings, extensions, and preferences across sessions by using the Settings Sync extension.