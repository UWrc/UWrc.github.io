---
id: modules
title: Modules
---

Modules are a method of modifying your environment that are unique to some software you're trying to run. It allows you to quickly switch between different programs or different versions of the same program.

## MOX

### What software is available?

```bash
module avail
```

It may take a while to return all the results. Any module with a "contrib" prefix is community generated, we can't provide any support if you use it and have questions. There is no record of the provenance so no guarantee it will be valid if you rely on it for your research results.

### How to (un)load a software?

Replace "software" below with a specific module you know exists or identified via `module avail` above.

```bash
module load <software>
```

You can verify what is currently loaded.

```bash
module list
```

Conversely, you can unload a specific module.

```bash
module unload <software>
```

### How do I create my own module?

TODO

## KLONE

TODO
