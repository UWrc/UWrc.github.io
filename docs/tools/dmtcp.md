---
id: dmtcp
title: DMTCP (Checkpointing)
---

:::caution
DMTCP is still being tested on HYAK. The module name may change after testing. Please report any issues to [help@uw.edu](mailto:help@uw.edu) with "HYAK" in the subject.
:::

[**DMTCP**](https://github.com/dmtcp/dmtcp) is a tool to transparently checkpoint and restart jobs, saving it to disk to be resumed at a later time. It requires no changes to application code, allowing easy use. Using checkpointing allows for shorter job times using requeing and better use of `ckpt` resources, allowing higher throughput for your jobs. More extensive documentation can be found [**here**](https://docs.nersc.gov/development/checkpoint-restart/dmtcp/) or via relevant `man` pages.

:::info
DMTCP currently does not support the following:
- Jobs using GPUs
- Jobs using Apptainer without [**built-in checkpointing**](https://apptainer.org/docs/user/1.2/checkpoint.html) enabled
- Jobs using MPI. We hope to provide support through [**MANA**](https://github.com/mpickpt/mana) in the future.
:::

## DMTCP Usage

We provide some opinionated examples of DMTCP usage on HYAK here, for more information see more general documentation [**here**](https://docs.nersc.gov/development/checkpoint-restart/dmtcp/) or the `man` pages.

To use DMTCP on HYAK, first load the module using `module load testing/dmtcp/3.0.0`.

Set the directory checkpoints will be stored at with the environment variable: `DMTCP_CHECKPOINT_DIR`. For example:

```bash
export DMTCP_CHECKPOINT_DIR=/gscratch/scrubbed/mycheckpoints/
```

To start a job, use the `dmtcp_launch` command, e.g.:

```bash
dmtcp_launch --interval <NUM> <COMMANDS TO RUN>
```

Where `<NUM>` is the number of seconds between checkpoints and `<COMMANDS TO RUN>` is your application (e.g. `python3 do_research.py`). The application will be checkpointed in the `DMTCP_CHECKPOINT_DIR` directory every `<NUM>` seconds.

To restart a stopped job, use the `dmtcp_restart` command, e.g.:

```bash
dmtcp_restart --interval <NUM> $DMTCP_CHECKPOINT_DIR/*.dmtcp
```

This will reload a job from a saved checkpoint. The restarted job will also be checkpointed every `<NUM>` seconds.

DMTCP can also be used in a batch script which automatically resumes from a prior checkpoint if it exists. A brief outline is as follows:

```bash
#!/bin/bash

#SBATCH -p ckpt-all
# More SBATCH directives ...


# setup script for checkpointing
checkpoint_interval=300 # number of seconds between checkpoints
module load testing/dmtcp/3.0.0
export DMTCP_CHECKPOINT_DIR=/gscratch/scrubbed/mycheckpoints/
export DMTCP_DL_PLUGIN=0 # silences some errors

# check if checkpoint directory exists
if [ -d "$DMTCP_CHECKPOINT_DIR" ]; then
  # directory exists, restart from a checkpoint
  dmtcp_restart --interval $checkpoint_interval $DMTCP_CHECKPOINT_DIR/*.dmtcp
else
  # directory doesn't exist, create it and start the job
  mkdir "$DMTCP_CHECKPOINT_DIR"

  # replace with your research program!
  dmtcp_launch --interval $checkpoint_interval python3 do_research.py
fi
```

This batch script runs the application `python3 do_research.py` and checkpoints it every five minutes. It makes the assumption that `DMTCP_CHECKPOINT_DIR` doesn't exist prior to the job starting.

Jobs utilizing checkpointing can be requeued (either with the `--requeue` SLURM flag or `ckpt` partition automatically requeuing). This allows for better usage of the `ckpt` partition and shorter request times, both of which get your jobs done quicker!

:::info Acknowledgements
This documentation is inspired by [Clemson's DMTCP documentation](https://docs.rcd.clemson.edu/palmetto/software/checkpointing/dmtcp/) and [NERSC's DMTCP documentation](https://docs.nersc.gov/development/checkpoint-restart/dmtcp/).
:::
