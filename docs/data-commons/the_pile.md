---
id: the_pile
title: The Pile
---

Sponsoring groups are Luke Zettlemoyer, Pang Wei Koh, and Hannaneh Hajishirzi. Student users are Rulin Shao, Sewon Min, and Jacqueline He. Initial deployment of **October 2023**.

## What is this?
The Pile is a 825 GiB diverse, open source language modelling data set that consists of 22 smaller, high-quality datasets combined together.

You can learn more at their website [here](https://pile.eleuther.ai/) or from their paper [here](https://arxiv.org/abs/2101.00027).

## How to prepare for use?
This serves as instructions for the research computing (i.e., HYAK) team to prepare this data for use on the cluster. It also serves a benefit for computational reproducibility later on.

The format of the Pile is jsonlines data compressed using zstandard.

## How to access?

By accessing this data you agree to their terms of use provided on their website [here](https://pile.eleuther.ai/) and [MIT License](https://github.com/EleutherAI/the-pile/blob/master/LICENSE). 

The file path on KLONE is `/data/pile`.

## How to cite?
If you use the Pile or any of the components, please cite:

@article{pile,
  title={The {P}ile: An 800GB Dataset of Diverse Text for Language Modeling},
  author={Gao, Leo and Biderman, Stella and Black, Sid and Golding, Laurence and Hoppe, Travis and Foster, Charles and Phang, Jason and He, Horace and Thite, Anish and Nabeshima, Noa and Presser, Shawn and Leahy, Connor},
  journal={arXiv preprint arXiv:2101.00027},
  year={2020}
}