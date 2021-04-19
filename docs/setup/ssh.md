---
id: ssh
title: SSH
---

The most common method of logging into the cluster is using the command-line interface (CLI). If you're using any Linux or Linux-like system (e.g., MacOS, BSD) you probably already have a terminal installed by default. Newer versions of Windows also have a new Linux sub-system so there are also native options to bring up a local terminal.

### Logging into KLONE

```
ssh netID@klone.hyak.uw.edu
```

You log into the `klone.hyak.uw.edu` cluster above at the terminal using your netID. You will be prompted for your password and 2FA (DUO) authentication. We don't allow ssh keys to the login node since it would be bypassing one of the factors (of 2-factor authentication).

### Intracluster SSH Keys

Once you're logged into the login node (e.g., `klone-login01` or `klone-login02`) you'll use this as a host to submit jobs, transfer data, or navigate your environment. However, you may find yourself needing to either submit multi-node (i.e., MPI) jobs or log into a node after you have a job running there to check its progress. For this you need SSH keys set up for intra cluster access. You can generate an SSH key from the login node using the command below.

```
ssh-keygen -C klone -t rsa -b 2048 -f ~/.ssh/id_rsa -q -N ""
```

The command creates a 2048-bit RSA key with "klone" in the comment field. You'll want to also add it to your `authorized_keys` file using the command below.

```
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

It also ensures the file has appropriate permissions.
