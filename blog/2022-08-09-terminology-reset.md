---
slug: terms-reset
title: Terminology Reset
author: Nam Pho
author_title: Director for Research Computing
author_url: https://github.com/npho
author_image_url: https://avatars3.githubusercontent.com/u/1252858?s=400&v=4
tags: [hyak, hpc, supercomputer, node, slice]
---

:::note
There is no operational change, this is an administrative clarification of HYAK specific terminology.
:::

The HYAK community has grown substantially over the past year, including the administrative teams that work with us to support the service. Some terms (e.g., nodes, servers) have been loosely used in communication but have specific meanings to different backend teams. Beginning today we are harmonizing all the terms so that there’s no confusion when different teams supporting the HYAK community communicate with each other and with you as the end user. **There is no change to how HYAK operates**, although you may notice some language changes going forward.

At the physical layer we have nodes (or servers) that are the smallest individual physical units that the HYAK engineering team will procure from vendors or suppliers to build the cluster. Historically each physical unit or node was the same physical unit that a lab would buy into the cluster with. However, as computers grew more resource dense it made more financial sense to buy these denser nodes but not all groups continued to need the full resources that denser compute nodes provided. The ideal situation is that the HYAK team would still buy the denser node and pass along any financial savings of a denser form factor to the researchers by dividing up the node into smaller resource units that could be sold to groups commensurate to their needs. Today, these logical compute units that constitute a node are called “slices”. These are the units that you, as the end user, will most likely determine how much you need to procure as on-demand compute capacity. 

An added benefit is that since slices being procured by groups represent resource limits and are not tied to any physical barriers like specific nodes, it greatly improves resource scheduling on the cluster. This is returned to the entire community by greater efficiency and depth in the checkpoint partition and with faster scheduling for all non-checkpoint jobs since there are less rigid job scheduling requirements. One common misnomer we would like to address is that this has been called “virtualization” by some. It can more accurately be called software defined compute since you can summon an ephemeral compute resource per your specifications using the SLURM scheduler. However, whatever your resources requested, they very much run on the bare-metal server subject to those constraints. There is no virtualization happening.

While this may seem like a minor change in language, it will greatly ease the coordination among many groups working behind the scenes to support the HYAK service. As always, we appreciate your understanding and patience as we continue to refine and improve the support provided.

**See also:**
* [Glossary of HYAK specific terms](/docs/glossary).
