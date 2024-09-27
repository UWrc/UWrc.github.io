---
slug: pytorch-cuda11
title: Pytorch and CUDA11
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [ai, ml, machine learning, pytorch, gpu, cuda, cuda11]
---

[pytorch-cuda10]: /img/blog/pytorch-cuda10.png 'Pytorch install instructions for pip with CUDA10'

:::info
During the January 12, 2021 mox maintenance period long overdue package updates will be applied. The most user impactful upgrade is the GPU driver from to 418.40.04 to 460.27.04 that will allow for CUDA11 support (up from CUDA10).
:::

The single biggest research use for GPUs on Hyak is for machine learning and artificial intelligence and the community has been clammoring for CUDA11 support for some time. Unfortunately, it's not easy to separate the GPU driver from the node images so it had to wait until the next maintenance window and some testing for non-ML GPU workflows on Hyak like our [gromacs](2021-01-09-gromacs-gpu.md) users in the molecular dynamics community.

**tl;dr** your existing Pytorch codes should work but if you wanted to use the new features in Pytorch that required CUDA11 you can upgrade Pytorch and it will work.

### Installing Pytorch with CUDA11

Since this is now the latest and greatest on Hyak I've taken the opportunity to update the Python documentation on how to install Pytorch with CUDA11 support within a miniconda3 environment, check out the step-by-step [here](/docs/tools/python).

### Reverse compatibility with CUDA10

Before the January 12, 2021 cluster maintenance every GPU on Hyak had a driver with CUDA10 and all of your codes were previously compiled against it. To test that the GPU driver update to CUDA11 wouldn't impact the most popular machine learning libraries we are compiling Pytorch against our pre-maintenance CUDA10 and testing it against a GPU with the newer CUDA11 installed.

```bash
conda create -p /gscratch/scrubbed/npho/pytorch-cuda10 python=3.8 -y
```

Activate your new `pytorch-cuda10` environment:

```bash
conda activate pytorch-cuda10
```

The Pytorch website [[www](https://pytorch.org/get-started/locally/)] has a nice getting started matrix that generates the requisite install commands against CUDA10.

![pytorch-cuda10]

The command shown above to copy-and-paste below:

```bash
pip install torch==1.7.1+cu101 torchvision==0.8.2+cu101 torchaudio==0.7.2 -f https://download.pytorch.org/whl/torch_stable.html
```

Now we can load the Python interpreter and confirm Pytorch is installed and the CUDA10 compiled library recognizes this GPU with CUDA11 [[www](https://pytorch.org/get-started/locally/#linux-verification)].

```shell-session terminal=true
(pytorch-cuda10) $ python3                                                                               Python 3.8.5 (default, Sep  4 2020, 07:30:14) 
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.__version__
'1.7.1+cu101'
>>> torch.cuda.is_available()
True
>>> 
```

Success! 

Previously compiled libraries against CUDA10 from pre-January 12, 2021 maintenance times should still work on the GPUs now with CUDA11. However, if you want to use the full features of libraries that take advantage of newer capabilities in CUDA11 then you should definitely upgrade your libraries.
