---
id: vscode
title: Using VS Code on Hyak
---

[**Visual Studio Code (VS Code)**](https://code.visualstudio.com/) is a versatile and lightweight source-code editor developed by Microsoft, known for its robustness, extensive customization options, and integration with various programming languages and tools. Connecting VS Code to Hyak's HPC environment enables seamless development and debugging of complex scientific or computational applications, leveraging version control integration and efficient code editing.

:::warning Be a good HPC-citizen - do not connect to a login node
While developing your code with connectivity Hyak is a great usage of our services, connecting directly to the login node via the `Remote-SSH` extension will result in VS Code server processes running silently in the background and leading to node instability. As a reminder, **we prohibit users running processes on the login node**. 
:::

Here we provide two solutions to connect VS Code to Hyak that will will help limit the possibility that your work would cause system instability on the login node: 
- [**VS Code via Code-server**](tools/vsc-code-server.md): a Docker container which uses a server to develop and execute your code reducing battery usage. `code-server` handles the VS Code background processes, preventing them from slowing down your local machine.
- [**VS Code via ProxyJump**](tools/vsc-proxy-jump.md): uses ProxyJump and the `Remote-SSH` VS Code extension to connect to a compute node. This option requires more from your local machine, more set up, and more authentication steps for Windows users. 

#### Additional Considerations

VS Code’s high usage is due to it silently installing its built in features into the user's home directory `~/.vscode` on `klone` enabling intelligent autocomplete features. This is a well known issue, and there is a solution that involves disabling the `@builtin TypeScript` plugin from the VS Code on your local machine. [**Here is a link to a blog post about the issue and the super-easy solution.**](https://medium.com/good-robot/use-visual-studio-code-remote-ssh-sftp-without-crashing-your-server-a1dc2ef0936d) Disabling @builtin TypeScript will reduce your usage of the shared resources and avoid problems. Disabling @builtin TypeScript is also recommended for our solution to connect [**VS Code via ProxyJump**](tools/vsc-proxy-jump.md).

Silent processes from VS Code will continue to run on `klone` even after you have logged off. Check which processes are running on the login node, especially if you have been receiving usage violations when you are not aware of jobs running. Look for `vscode-server` among the listed processes with the following command, replaceing `UWNetID` with **your UW Net ID**.

```bash
ps aux | grep <UWNetID>
``` 