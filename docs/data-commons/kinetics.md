---
id: kinetics
title: Kinetics Dataset
---

Sponsoring groups are Rajesh Rao, Abhishek Gupta, Ali Farhadi. Student users are Vishwas Sathish, Chuning Zhu, and Aditya Kusupati. Initial deployment of **April 2024**.

## What is this?
Kinetics is a collection of large-scale, high-quality datasets of URL links of up to 650,000 video clips that cover 400/600/700 human action classes, depending on the dataset version. 
You can learn more at their github [here](https://github.com/cvdfoundation/kinetics-dataset) or from their paper [here](https://arxiv.org/abs/1705.06950).

## How to prepare for use?

Install [decord](https://github.com/dmlc/decord) on your python environment to read the video files. 
You can also use other libraries to read video frames. Popular ones include [OpenCV](https://stackoverflow.com/questions/41441150/how-to-read-video-files-using-python-opencv), python bindings for [ffmpeg](https://github.com/kkroening/ffmpeg-python) and [skvideo](https://www.scikit-video.org/stable/).

```python
from decord import VideoReader, cpu

# load a single file of the dataset
video_clip_path = "/<path>/<to>/<video_folder>/LABLE/IDX-start_time-end_time.mp4"
vr = VideoReader(file_path, num_threads=-1, ctx=cpu(0))

```

## How to access?

The file path for kinetics dataset on KLONE is `/data/kinetics`.

The kinetics dataset is licensed by Google Inc. under a Creative Commons Attribution 4.0 International License. Published. May 22, 2017.

## How to cite?
If you use the Kinetics dataset or any of the components, please cite:

@article{DBLP:journals/corr/KayCSZHVVGBNSZ17,
  author       = {Will Kay and
                  Jo{\~{a}}o Carreira and
                  Karen Simonyan and
                  Brian Zhang and
                  Chloe Hillier and
                  Sudheendra Vijayanarasimhan and
                  Fabio Viola and
                  Tim Green and
                  Trevor Back and
                  Paul Natsev and
                  Mustafa Suleyman and
                  Andrew Zisserman},
  title        = {The Kinetics Human Action Video Dataset},
  journal      = {CoRR},
  volume       = {abs/1705.06950},
  year         = {2017},
  url          = {http://arxiv.org/abs/1705.06950},
  eprinttype    = {arXiv},
  eprint       = {1705.06950},
  timestamp    = {Thu, 14 Oct 2021 09:15:04 +0200},
  biburl       = {https://dblp.org/rec/journals/corr/KayCSZHVVGBNSZ17.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}