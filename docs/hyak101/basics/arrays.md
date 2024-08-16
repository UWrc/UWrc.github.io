---
id: arrays
title: Job Arrays
---

:::note

This documentation is under construction.

:::

Imagine you have a giant pile of letters that need to be put into envelopes. Each letter is already written, and each envelope is ready to be sealed. To speed things up, you gather a group of friends, and each person gets their own stack of letters and envelopes. Everyone can work independently, putting letters into envelopes without needing to talk to each other or wait for someone else to finish.

In HPC, an **"embarrassingly parallel" problem** is like this task. It's a big job that can be broken down into many small, separate tasks that don’t need to interact with each other. Each small task can be handled by a different computer (or processor), all working at the same time. This makes it really easy to speed up the overall job by just adding more computers to work on it in parallel. 

In this section of the tutorial, we have an embarassingly parallel problem. We want to train the locator neural network on multiple test sets to get a more complete understanding of the distribution of error for predicting the origin of our *Populus trichocarpa* trees. We have multiple independent tasks that can be executed as separate processes simultaneously. 

### Array Jobs

TODO - breif explanation of when this might be used. 

TODO - explain and demonstrate useage of loop_array.slurm
