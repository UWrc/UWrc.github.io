---
id: redpajama_v2
title: RedPajama-V2
---

Sponsoring groups are Baris Kasikci, Luis Ceze, and Luke Zettlemoyer. Student users are Keisuke Kamahori, Michael Gu, Chien-Yu Lin, and Rulin Shao. Initial deployment of **January 2024**.

## What is this?
RedPajama-V2 is an open dataset for training large language models. The dataset includes over 100B text documents coming from 84 CommonCrawl snapshots and processed using the CCNet pipeline.
You can learn more at their GitHub repository [here](https://github.com/togethercomputer/RedPajama-Data) or HuggingFace repository [here](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2).

## How to prepare for use?

The format of the RedPajama-V2 is json data compressed using gzip.
The detailed instructions to download the data are provided in the README file of HuggingFace repository [here](https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2/blob/main/README.md).

## How to access?

By accessing this data you agree to Common Crawl Foundation Terms of Use provided on the website [here](https://commoncrawl.org/terms-of-use) and [Apache License 2.0](https://github.com/togethercomputer/RedPajama-Data/blob/main/LICENSE). 

The file path on KLONE is `/data/redpajama_v2`.

## How to cite?
If you use RedPajama-V2 or any of the components, please cite:

```
@software{together2023redpajama,
  author = {Together Computer},
  title = {RedPajama: an Open Dataset for Training Large Language Models},
  month = October,
  year = 2023,
  url = {https://github.com/togethercomputer/RedPajama-Data}
}
```
