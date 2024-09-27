---
id: ego4d
title: Ego4d and Ego-Exo4D Dataset
---

Sponsoring groups are Rajesh Rao, Abhishek Gupta, Ali Farhadi. Student users are Vishwas Sathish, Chuning Zhu, and Aditya Kusupati. Initial deployment of **April 2024**.

## What is this?
EGO4D is an egocentric (first person) video ML dataset and benchmark suite, with 3,600 hrs of densely narrated video and a wide range of annotations across five new benchmark tasks. It covers hundreds of scenarios (household, outdoor, workplace, leisure, etc.) of daily life activity captured in-the-wild by 926 camera wearers from 74 worldwide locations and 9 different countries.
You can learn more at their website [here](https://ego4d-data.org/docs/) or from their paper [here](https://arxiv.org/abs/2110.07058).

## How to prepare for use?

Install [decord](https://github.com/dmlc/decord) on your python environment to read the video files. You can also use other libraries to read video frames. Popular ones include [OpenCV](https://stackoverflow.com/questions/41441150/how-to-read-video-files-using-python-opencv), and [skvideo](https://www.scikit-video.org/stable/).

```python
from decord import VideoReader, cpu

# load a single file of the dataset
video_clip_path = "/<path>/<to>/<video_folder>/LABLE/IDX-start_time-end_time.mp4"
vr = VideoReader(file_path, num_threads=-1, ctx=cpu(0))

```

## How to access?

The license information for Ego4D can be found [here](https://ego4d-data.org/pdfs/Ego4D-Licenses-Draft.pdf) and Ego-Exo4D [here](https://ego4d-data.org/pdfs/Ego-Exo4D-Model-License.pdf)

The file path for ego4d dataset on `klone` is `/data/ego4d` and for ego-exo4D.

## How to cite?
If you use the Ego4d or the Ego4dx dataset or any of the components, please cite:
```
@article{DBLP:journals/corr/abs-2110-07058,
  author       = {Kristen Grauman and
                  Andrew Westbury and
                  Eugene Byrne and
                  Zachary Chavis and
                  Antonino Furnari and
                  Rohit Girdhar and
                  Jackson Hamburger and
                  Hao Jiang and
                  Miao Liu and
                  Xingyu Liu and
                  Miguel Martin and
                  Tushar Nagarajan and
                  Ilija Radosavovic and
                  Santhosh Kumar Ramakrishnan and
                  Fiona Ryan and
                  Jayant Sharma and
                  Michael Wray and
                  Mengmeng Xu and
                  Eric Zhongcong Xu and
                  Chen Zhao and
                  Siddhant Bansal and
                  Dhruv Batra and
                  Vincent Cartillier and
                  Sean Crane and
                  Tien Do and
                  Morrie Doulaty and
                  Akshay Erapalli and
                  Christoph Feichtenhofer and
                  Adriano Fragomeni and
                  Qichen Fu and
                  Christian Fuegen and
                  Abrham Gebreselasie and
                  Cristina Gonz{\'{a}}lez and
                  James Hillis and
                  Xuhua Huang and
                  Yifei Huang and
                  Wenqi Jia and
                  Weslie Khoo and
                  J{\'{a}}chym Kol{\'{a}}r and
                  Satwik Kottur and
                  Anurag Kumar and
                  Federico Landini and
                  Chao Li and
                  Yanghao Li and
                  Zhenqiang Li and
                  Karttikeya Mangalam and
                  Raghava Modhugu and
                  Jonathan Munro and
                  Tullie Murrell and
                  Takumi Nishiyasu and
                  Will Price and
                  Paola Ruiz Puentes and
                  Merey Ramazanova and
                  Leda Sari and
                  Kiran Somasundaram and
                  Audrey Southerland and
                  Yusuke Sugano and
                  Ruijie Tao and
                  Minh Vo and
                  Yuchen Wang and
                  Xindi Wu and
                  Takuma Yagi and
                  Yunyi Zhu and
                  Pablo Arbelaez and
                  David Crandall and
                  Dima Damen and
                  Giovanni Maria Farinella and
                  Bernard Ghanem and
                  Vamsi Krishna Ithapu and
                  C. V. Jawahar and
                  Hanbyul Joo and
                  Kris Kitani and
                  Haizhou Li and
                  Richard A. Newcombe and
                  Aude Oliva and
                  Hyun Soo Park and
                  James M. Rehg and
                  Yoichi Sato and
                  Jianbo Shi and
                  Mike Zheng Shou and
                  Antonio Torralba and
                  Lorenzo Torresani and
                  Mingfei Yan and
                  Jitendra Malik},
  title        = {Ego4D: Around the World in 3, 000 Hours of Egocentric Video},
  journal      = {CoRR},
  volume       = {abs/2110.07058},
  year         = {2021},
  url          = {https://arxiv.org/abs/2110.07058},
  eprinttype    = {arXiv},
  eprint       = {2110.07058},
  timestamp    = {Fri, 24 Mar 2023 16:31:06 +0100},
  biburl       = {https://dblp.org/rec/journals/corr/abs-2110-07058.bib},
  bibsource    = {dblp computer science bibliography, https://dblp.org}
}
```