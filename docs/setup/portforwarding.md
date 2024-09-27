---
id: portforwarding
title: SSH Port Forwarding
---

Configuring SSH Single-Port Forwarding
--------------------------------------

Single port forwarding allows you make a port on your machine behave as though it aimed at another machine on the same port. This allows you to forward a hosted port for a service like RStudio or Jupyter-Notebook on a node inside the `klone` network onto your local machine for access via browser. If properly configured, you should be able to access (per the example below) an HTTP service running on http://z3003.hyak.local:9591 by opening a browser and navigating to http://localhost:9591

Before beginnning this work, you will need to know the node the web service is being run on and port that it can accessed at. The port number should be provided to you when you start the service and the node's hostname is available by typing `hostname` on the terminal after starting an interactive session.

Putty (Windows)
---------------

After adding `klone.hyak.uw.edu` to the `Hostname` section on the Putty Connection page, navigate to Connection > SSH > Tunnels. Set source port to the port mentioned at job start (in my case, 9195) and the destination to the node and the port, seperated by a colon (eg. z3003.hyak.local:9195). Leave the destination options for `Local` and `Auto` set.

OpenSSH Client (Linux/Mac/ConEmu)
---------------------------------

In your SSH Connection string, include the `-L` flag followed by `PORT:HOSTNAME:PORT` where the hostname is the one for the node running the service in the `klone` network and the port is the one provided at service start.
```bash
ssh klone.hyak.uw.edu -L 8555:z3003.hyak.local:8555
```
