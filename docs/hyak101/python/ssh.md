---
id: ssh
title: Flexible Connections
---

:::note A note for Windows users:

Currently, these instructions only apply to MacOS and Linux. We are working
on a set of Windows instructions, and will send an announcement via the hyak-users mailing list
when they're complete.

:::

## Spending some time on SSH
All of your connections to Hyak are going to go through SSH, so it's worth customizing your
configurations to make this process as easy as possible. We're going to modify our main SSH
configuration, and create a sub-configuration that we can use for automation later in this guide.

This will be fairly quick, but please note we will be doing some additional work on these files in the next section, so don't skip past this.

## Your configuration on the cluster
There's really only one thing that needs to be set up on the cluster: your intracluster keys.
Like many other parts of this guide, we [already have instructions](../setup/ssh#intracluster-ssh-keys) on this, but since we're keeping this guide self-contained, we'll go through it again here:

If you haven't already done so, log in to the cluster & generate an intracluster SSH key:
```shell {1} terminal=true
$ ssh UWNetID@klone.hyak.uw.edu
(UWNetID@klone.hyak.uw.edu) Password:
###
### Truncated Duo 2-Factor Authentication
###
$ ssh-keygen -C klone -t rsa -b 2048 -f ~/.ssh/id_rsa -q -N ""
```

After that, add the key to your `authorized_keys` file and ensure the permissions are correct:
```shell terminal=true
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ chmod 600 ~/.ssh/authorized_keys
```

## A set of customized, local configurations
:::important

This entire next section is done on your local computer—your personal MacOS or Linux machine—**not** on the cluster.

:::

### Your primary SSH config

First up is our main SSH configuration file, located at `~/.ssh/config`.
You can use the following template, making sure to change out `UWNetID` for your UW Net ID that you use to log in:

```shell title="~/.ssh/config"
Host klone-login
//highlight-next-line
        User UWNetID
        Hostname klone.hyak.uw.edu
        ServerAliveInterval 30
        ServerAliveCountMax 1200
        ControlMaster auto
        ControlPersist 3600
        ControlPath ~/.ssh/%r@klone-login:%p

Host klone-node
    Include klone-node-config
```

Whether you're creating this file for the first time, or modifying an existing config, make sure the file has the correct permissions:
```shell terminal=true
$ chmod 600 ~/.ssh/config
```

Once this is in place, we can do the following to log in to klone:
```shell terminal=true
$ ssh klone-login
$ #Instead of:
$ #ssh UWNetID@klone.hyak.uw.edu
```

Here's a quick rundown of the options we're setting:
- `ServerAliveInterval 30`: every 30 seconds, send a packet to the server (the login node) to keep the connection open.
- `ServerAliveCountMax 1200`: don't close the connection unless we've sent 1200 server-alive messages
without a response from the login node.
- `ControlMaster auto`: enable SSH multiplexing, i.e. connection sharing. This means once we've established the first connection,
we won't have to reauthenticate for subsequent connections: the new connection will just use the already open socket.
- `ControlPersist 3600`: this keeps the control socket open for an hour after the initial connection has been closed.
- `ControlPath ~/.ssh/%r@klone-login:%p`: this is the path where the socket, appearing as a file, will actually be located. The `%r` is
an abbreviation for the remote username, i.e. your UW Net ID, and `%p` is an abbreviation for the port (normally 22 for SSH).

Finally, the last line will include the next file we're going to make: an additional configuration for our job node.

### A secondary config for the node

This is a short one: we're defining `klone-node` as a compute node (`n3000`, until we know what the node will be), and
using `ProxyJump` to connect to that node through the login node.

```shell title="~/.ssh/klone-node-config"
Host klone-node
  Hostname n3000
  ProxyJump klone-login
```

This file will also need the correct permissions:

```shell terminal=true
$ chmod 600 ~/.ssh/klone-node-config
```

Once we've requested a job, and we know what node its on, we'll swap out the `Hostname` line &
connecting directly to the node will be this simple:

```shell terminal=true
$ ssh klone-node
```
