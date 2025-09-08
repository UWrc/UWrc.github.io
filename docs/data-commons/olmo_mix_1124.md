---
id: olmo-mix-1124
sidebar_label: Olmo-mix-1124
title: olmo-mix-1124 Dataset
---

:::warning 
This dataset is only available on **Tillicum**. 
:::

Sponsoring groups are Noah A. Smith, Luke Zettlemoyer, and Jeffrey Heer. Student users are Rahul Nadkarni, Luiza Pozzobon, and Emily Reif. Initial deployment of **May 2025**.

## What is this?
This is a collection of data used to train the OLMo-2-1124 language models. You can find more information on the dataset at the [<ins>**Hugging Face datasets link**</ins>](https://huggingface.co/datasets/allenai/olmo-mix-1124) or in the [<ins>**OLMo 2 tech report**</ins>](https://arxiv.org/pdf/2501.00656). The original dataset was released on November 2024 under the Open Data Commons Attribution License (ODC-By) v1.0 [<ins>**license**</ins>](https://opendatacommons.org/licenses/by/1-0/), and its use is also subject to [<ins>**Common Crawl's Terms of Use**</ins>](https://commoncrawl.org/terms-of-use).

## How to prepare for use?
This serves as instructions for the research computing team to prepare this data for use on the cluster. It also serves a benefit for computational reproducibility later on.

The format of this dataset is a series of memory-mapped Numpy arrays containing integer token IDs corresponding to the OLMo 2 tokenizer (e.g., [<ins>**allenai/OLMo-2-1124-7B**</ins>](https://huggingface.co/allenai/OLMo-2-1124-7B) on Hugging Face). The following BASH script downloads the config file for an OLMo 2 model that was trained using this data and extracts the URLs pointing to the Numpy arrays, saving the URLs to a file:

```bash
#!/bin/bash

# create and change to dataset directory
mkdir -p /gpfs/datasets/olmo-mix-1124
cd /gpfs/datasets/olmo-mix-1124

# get config file for OLMo-2-1124-7B to get URLs for data files
wget https://raw.githubusercontent.com/allenai/OLMo/refs/heads/main/configs/official-1124/OLMo2-7B-stage1.yaml

# get URLs of .npy files, write to new file
grep "http://olmo-data.org/preprocessed" OLMo2-7B-stage1.yaml | cut -d" " -f 6 | sort | uniq > urls.txt

# remove config file
rm OLMo2-7B-stage1.yaml
```

The following Slurm script then uses the file of URLs to download the Numpy data files, using an array job to download them in parallel (to be run from the `/gpfs/datasets/olmo-mix-1124` directory):

```bash
#!/bin/bash

#SBATCH --partition=ckpt
#SBATCH --job-name=download
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --mem-per-cpu=100M
#SBATCH --time=5:00:00
#SBATCH --array=1-1117
#SBATCH --output=slurm/download-%A-%a.log
#SBATCH --error=slurm/download-%A-%a.log
#SBATCH --export=all

# get URL from URLs file
URL=$(sed -n ${SLURM_ARRAY_TASK_ID}p urls.txt)

# get file path from URL
FILEPATH=$(echo $URL | cut -d"/" -f 4-)

# create nested directory for file
mkdir -p $(dirname $FILEPATH)

# download file into directory
wget -O $FILEPATH $URL
```

## How to access?
The path to all data files on `tillicum` is `/gpfs/datasets/olmo-mix-1124`. To load the files into a single dataset, first clone the [<ins>**OLMo Github repo**</ins>](https://github.com/allenai/OLMo/) and follow the instructions for setting it up. Then, modify the URLs in the `data` section of the config file you wish to use (e.g., `configs/official-1124/OLMo2-7B-stage1.yaml`) to point to the files located on `tillicum` (this should just require replacing `http://olmo-data.org` with `/gpfs/datasets/olmo-mix-1124`). Finally, you can load the dataset with the following Python code:

```python
from olmo.config import TrainConfig
from olmo.data import build_memmap_dataset

# replace with path to config file you want to use
train_config_path = "configs/official-1124/OLMo2-7B-stage1.yaml"

cfg = TrainConfig.load(train_config_path)
dataset = build_memmap_dataset(cfg, cfg.data)
```

Note that this does not construct the dataset such that the data batches are in the same order as was used to train the OLMo-2-1124 models. For more details on that, refer to the training code in the OLMo Github repo.

The following snippet of code shows how to load each file individually and convert from the token IDs to the original raw text using a Hugging Face tokenizer:

```python
import os
import numpy as np
from transformers import AutoTokenizer

# load token IDs as memory-mapped Numpy array
file_path = "/gpfs/datasets/olmo-mix-1124/preprocessed/dclm/text_openhermes_reddit_eli5_vs_rw_v2_bigram_200k_train/allenai/dolma2-tokenizer/part-000-00000.npy"
size = os.path.getsize(file_path)
token_ids = np.memmap(file_path, mode="r+", dtype=np.uint32, shape=(size,))

# decode token IDs into text
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-2-1124-7B")
text = tokenizer.decode(token_ids)
```

## How to cite?
If you use this dataset or any of the components, please cite:

```
@article{OLMo20242O2,
  title={2 OLMo 2 Furious},
  author={Team OLMo and Pete Walsh and Luca Soldaini and Dirk Groeneveld and Kyle Lo and Shane Arora and Akshita Bhagia and Yuling Gu and Shengyi Huang and Matt Jordan and Nathan Lambert and Dustin Schwenk and Oyvind Tafjord and Taira Anderson and David Atkinson and Faeze Brahman and Christopher Clark and Pradeep Dasigi and Nouha Dziri and Michal Guerquin and Hamish Ivison and Pang Wei Koh and Jiacheng Liu and Saumya Malik and William Merrill and Lester James Validad Miranda and Jacob Daniel Morrison and Tyler C. Murray and Crystal Nam and Valentina Pyatkin and Aman Rangapur and Michael Schmitz and Sam Skjonsberg and David Wadden and Chris Wilhelm and Michael Wilson and Luke S. Zettlemoyer and Ali Farhadi and Noah A. Smith and Hanna Hajishirzi},
  journal={ArXiv},
  year={2024},
  volume={abs/2501.00656}
}
```
