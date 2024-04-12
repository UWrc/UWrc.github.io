---
id: kitchens
title: Epic Kitchens Dataset
---

Sponsoring groups are Rajesh Rao, Abhishek Gupta, Ali Farhadi. Student users are Vishwas Sathish, Chuning Zhu, and Aditya Kusupati. Initial deployment of **April 2024**.

## What is this?
Epic kitchens is a large-scale dataset in first-person (egocentric) vision; multi-faceted, audio-visual, non-scripted recordings in native environments - i.e. the wearers' homes, capturing all daily activities in the kitchen over multiple days. Annotations are collected using a 'Pause-and-Talk' narration interface.
You can learn more at their website [here](https://epic-kitchens.github.io/2024) or from their paper [here](https://openaccess.thecvf.com/content_ECCV_2018/html/Dima_Damen_Scaling_Egocentric_Vision_ECCV_2018_paper.html).

## How to prepare for use?

Install [decord](https://github.com/dmlc/decord) on your python environment to read the video files. You can also use other libraries to read video frames. Popular ones include [OpenCV](https://stackoverflow.com/questions/41441150/how-to-read-video-files-using-python-opencv), and [skvideo](https://www.scikit-video.org/stable/).

```python
from decord import VideoReader, cpu

# load a single file of the dataset
video_clip_path = "/<path>/<to>/<video_folder>/LABLE/IDX-start_time-end_time.mp4"
vr = VideoReader(file_path, num_threads=-1, ctx=cpu(0))

```

## How to access?

The epic kitchens dataset and benchmarks on this page are copyright by us and published under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).
The file path for kitchens dataset on KLONE is `/data/epic_kitchens`.

## How to cite?
If you use the Epic Kitchens dataset or any of the components, please cite the following papers:

@ARTICLE{Damen2022RESCALING,
           title={Rescaling Egocentric Vision: Collection, Pipeline and Challenges for EPIC-KITCHENS-100},
           author={Damen, Dima and Doughty, Hazel and Farinella, Giovanni Maria and Furnari, Antonino 
           and Ma, Jian and Kazakos, Evangelos and Moltisanti, Davide and Munro, Jonathan 
           and Perrett, Toby and Price, Will and Wray, Michael},
           journal   = {International Journal of Computer Vision (IJCV)},
           year      = {2022},
           volume = {130},
           pages = {33–55},
           Url       = {https://doi.org/10.1007/s11263-021-01531-2}
} 


@INPROCEEDINGS{Damen2018EPICKITCHENS,
title={Scaling Egocentric Vision: The EPIC-KITCHENS Dataset},
author={Damen, Dima and Doughty, Hazel and Farinella, Giovanni Maria  and Fidler, Sanja and 
        Furnari, Antonino and Kazakos, Evangelos and Moltisanti, Davide and Munro, Jonathan 
        and Perrett, Toby and Price, Will and Wray, Michael},
booktitle={European Conference on Computer Vision (ECCV)},
year={2018}
} 