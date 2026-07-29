---
title: Desktop
---

[desktop-form]: /img/docs/ood/desktop-form.jpg 'Example Klone Desktop form submission'
[desktop-running]: /img/docs/ood/desktop-running.jpg 'Example Klone Desktop running'

Desktop on Hyak's Open OnDemand (OOD) provides a virtual Linux desktop in your web browser. The desktop runs on an allocated compute node and is displayed through VNC, making it useful for graphical user interface (GUI) applications that need Hyak compute resources.

Use a desktop session when you need to run GUI software that is not available as a dedicated OOD app, or when you want a more general interactive desktop environment for launching graphical tools.

## Launching a Desktop Session

1. From the `Interactive Apps` menu, select the Desktop app.
2. Fill out the submission form for Desktop session.
3. Click `Launch`.

A form submission for a desktop session may look like this:

![Desktop form][desktop-form]

The session will appear on the `My Interactive Sessions` page. Allocation of resources might take a few minutes, depending on the queue and requested resources.

![Desktop running][desktop-running]

## Connecting with VNC

Once the session is running, click `Launch Desktop` to open the virtual desktop in your browser. OOD displays the session through VNC, and the desktop is running on the compute node.

Within the desktop, you can open a terminal or application menu and launch GUI programs available in the session environment. If your application requires a software module, open a terminal inside the desktop and load the module before starting the application. For example,

```bash
module load matlab
matlab
```

If prompted for matlab license, please find instructions [here](/docs/guides/applications/matlab).

## Session Tips

- Closing the browser tab does not stop the desktop session. Return to `My Interactive Sessions` to reconnect.
- When finished, click `Delete` on the `My Interactive Sessions` page to stop the job and release the allocated resources.
