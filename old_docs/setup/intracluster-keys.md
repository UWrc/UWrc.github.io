---
id: intracluster-keys
title: Intracluster SSH Keys
---

### Creating intracluster keys

Once you're logged into the login node (i.e., `klone-login01` or `klone.hyak.uw.edu`) you'll use this as a host to submit jobs, transfer data, or navigate your environment. However, you may find yourself needing to either submit multi-node (i.e., MPI) jobs or log into a node after you have a job running there to check its progress. For this you need SSH keys set up for intra cluster access. You can generate an SSH key from the login node using the command below.

```
ssh-keygen -C klone -t rsa -b 2048 -f ~/.ssh/id_rsa -q -N ""
```

This command creates a 2048-bit RSA key with "klone" in the comment field.

### Authorizing the keys

You will also need to add the contents of your public key to the `authorized_keys` file in your home directory with the follow commands:

```
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

This also also ensures the `authorized_keys` file has appropriate permissions.
