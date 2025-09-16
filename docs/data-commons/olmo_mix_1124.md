---
id: olmo-mix-1124
sidebar_label: Olmo-mix-1124
title: olmo-mix-1124 Dataset
---

:::warning 
This dataset is only available on **Tillicum**. 
:::

Sponsoring groups are Noah A. Smith, Luke Zettlemoyer, and Jeffrey Heer. Student users are Rahul Nadkarni, Luiza Pozzobon, and Emily Reif. Initial deployment of **Sep 2025**.

## What is this?
This is a collection of data used to train the OLMo-2-1124 language models. You can find more information on the dataset at the [<ins>**Hugging Face datasets link**</ins>](https://huggingface.co/datasets/allenai/olmo-mix-1124) or in the [<ins>**OLMo 2 tech report**</ins>](https://arxiv.org/pdf/2501.00656). The original dataset was released on November 2024 under the Open Data Commons Attribution License (ODC-By) v1.0 [<ins>**license**</ins>](https://opendatacommons.org/licenses/by/1-0/), and its use is also subject to [<ins>**Common Crawl's Terms of Use**</ins>](https://commoncrawl.org/terms-of-use).

## How to prepare for use?
This serves as instructions for the research computing team to prepare this data for use on the cluster. It also serves a benefit for computational reproducibility later on.

Download data from Hugging Face datasets repo [<ins>**allenai/olmo-mix-1124**</ins>](https://huggingface.co/datasets/allenai/olmo-mix-1124).

The format of the dataset is json files compressed using gzip.

## How to access?
The path to all data files on `tillicum` is `/gpfs/datasets/olmo-mix-1124`. 

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
