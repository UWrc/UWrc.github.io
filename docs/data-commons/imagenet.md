---
id: imagenet
title: ImageNet
---

Sponsoring groups are Erik Lundberg, Rob Fatland, and Xiaosong Li. Student users are Nam Pho and Brenden Pelkie. Initial deployment of **October 2023**.

## What is this?

Colloquially known as "ImageNet", this is the **Large Scale Visual Recognition Challenge (ILSVRC)** subset of ImageNet from 2012, which is the most highly-used subset and includes "1000 object classes and contains 1,281,167 training images, 50,000 validation images and 100,000 test images". This is a popular machine learning benchmark dataset.

You can learn more at their website [here](https://www.image-net.org/challenges/LSVRC/index.php) or from their paper [here](https://link.springer.com/article/10.1007/s11263-015-0816-y).

The verbatim description from their website is as follows.

:::info
The validation and test data for this competition will consist of 150,000 photographs, collected from flickr and other search engines, hand labeled with the presence or absence of 1000 object categories. The 1000 object categories contain both internal nodes and leaf nodes of ImageNet, but do not overlap with each other. A random subset of 50,000 of the images with labels will be released as validation data included in the development kit along with a list of the 1000 categories. The remaining images will be used for evaluation and will be released without labels at test time.

The training data, the subset of ImageNet containing the 1000 categories and 1.2 million images, will be packaged for easy downloading. The validation and test data for this competition are not contained in the ImageNet training data (we will remove any duplicates). 
:::

The first three images from the test set can be seen below.

<img src="/img/data-commons/ILSVRC2012_test_00000001.JPEG" width="180px" height="150px" />
<img src="/img/data-commons/ILSVRC2012_test_00000002.JPEG" width="180px" height="150px" />
<img src="/img/data-commons/ILSVRC2012_test_00000003.JPEG" width="180px" height="150px" />

## How to prepare for use?

This serves as instructions for the research computing (i.e., HYAK) team to prepare this data for use on the cluster. It also serves a benefit for computational reproducibility later on.

1. Register on the ImageNet website [here](https://www.image-net.org/challenges/LSVRC/2012/) to agree to terms of use and receive the download links.
2. The data should arrive as a tar file. Unpack the tar file to the desired location.

## How to access?

By accessing this data you agree to their terms of use provided on their website [here](https://www.image-net.org/download.php) and below in full. Data access is available in three formats: PyTorch, SquashFS, and Direct that follow the terms of use agreement.

:::caution
[RESEARCHER_FULLNAME] (the "Researcher") has requested permission to use the ImageNet database (the "Database") at Princeton University and Stanford University. In exchange for such permission, Researcher hereby agrees to the following terms and conditions:

1. Researcher shall use the Database only for non-commercial research and educational purposes.
2. Princeton University and Stanford University make no representations or warranties regarding the Database, including but not limited to warranties of non-infringement or fitness for a particular purpose.
3. Researcher accepts full responsibility for his or her use of the Database and shall defend and indemnify the ImageNet team, Princeton University, and Stanford University, including their employees, Trustees, officers and agents, against any and all claims arising from Researcher's use of the Database, including but not limited to Researcher's use of any copies of copyrighted images that he or she may create from the Database.
4. Researcher may provide research associates and colleagues with access to the Database provided that they first agree to be bound by these terms and conditions.
5. Princeton University and Stanford University reserve the right to terminate Researcher's access to the Database at any time.
6. If Researcher is employed by a for-profit, commercial entity, Researcher's employer shall also be bound by these terms and conditions, and Researcher hereby represents that he or she is fully authorized to enter into this agreement on behalf of such employer.
7. The law of the State of New Jersey shall apply to all disputes under this agreement.
:::

1. **PyTorch**: You can read instructions on the `ImageNet` function within PyTorch [here](https://pytorch.org/vision/stable/generated/torchvision.datasets.ImageNet.html). You can provide the cluster path to the function and it should present the data set for use within your Python code.
2. **SquashFS**: The testing, training, and validation data are also provided as SquashFS objects in the base `/data/imagenet` path. You can mount this and use directly in your code. This is preferred due to the large number of small files.
3. **Direct**: The file path on KLONE is `/data/imagenet`. It is not recommend to browse these folders directly that contain all the images due to the large number of files. This is why there are accompanyig `*_files.txt` files for each folder that contain all the file names within their respective folders for easier processing.

## How to cite?

Olga Russakovsky, Jia Deng, Hao Su, Jonathan Krause, Sanjeev Satheesh, Sean Ma, Zhiheng Huang, Andrej Karpathy, Aditya Khosla, Michael Bernstein, Alexander C. Berg and Li Fei-Fei. **ImageNet Large Scale Visual Recognition Challenge**. *IJCV, 2015*. [[www](https://www.image-net.org/challenges/LSVRC/index.php)] [[pdf](https://link.springer.com/article/10.1007/s11263-015-0816-y)]

```
@article{ILSVRC15,
Author = {Olga Russakovsky and Jia Deng and Hao Su and Jonathan Krause and Sanjeev Satheesh and Sean Ma and Zhiheng Huang and Andrej Karpathy and Aditya Khosla and Michael Bernstein and Alexander C. Berg and Li Fei-Fei},
Title = {{ImageNet Large Scale Visual Recognition Challenge}},
Year = {2015},
journal = {International Journal of Computer Vision (IJCV)},
doi = {10.1007/s11263-015-0816-y},
volume={115},
number={3},
pages={211-252}
}
```


