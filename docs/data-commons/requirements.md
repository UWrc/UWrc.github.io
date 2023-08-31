---
id: requirements
title: Start Here
---

## The Klone Data Commons

The Klone Data Commons is our cluster-wide, shared dataset storage located at `/gscratch/data`. The purpose of the Data Commons is to provide a single location for datasets being used by multiple groups, to avoid hosting the same dataset multiple times in separate group directories.

Historically, we've addressed requests to add datasets to the Data Commons on a case-by-case basis. We've seen a growing number of these types of requests, so we've decided to formalize & publish our expectations.

## Requirements

In order for a dataset to be approved, the following criteria must be met:

1. The requester must create a new page of documentation (in this folder, `/docs/data-commons`), and submit a pull request, describing the dataset:
    - A full description of the dataset, publication date, licenses, etc.
    - Instrutions for using the dataset, i.e. any required modules, the structure of the data, etc.
    - Contact information for dataset maintainers (typically, the group/user submitting the request) and the intended audience or discipline of the data.

2. The requester must name a minimum of 3 separate groups/labs & 3 specific users who will be using the data.

3. The requester emails help@uw.edu with:
    - A link to the documentation PR.
    - The following people CC'd: the lab/group owners & all initial users. This will be *at least* 6 people.

4. Every person included in the request (again, at least 6), must indivudally attest that the dataset has been vetted: that, to the best of their knowledge, the dataset contains no material where its download/storage/use violates any State or Federal law and/or the rules/policies of UW, including intellectual property laws.

:::note Documentation Contributions
The GitHub repository for this documentation site, with instructions for cloning & local development, is here: https://github.com/UWrc/UWrc.github.io.

We have a few additional resources on documentation formatting here: https://hyak.uw.edu/docs/contribute/markdown-guide
:::

## Additional considerations for datasets

Datasets in the Data Commons don't contribute to purchased storage quotas, but they still need to be optimized for size & inode usage. This will be handled on a case-by-case basis, since dataset composition is so varied. For instance, if the submitted dataset is comprised of 200,000,000 small files, we will expect this to be combined somehow—i.e. with HDF5 or SquashFS—to keep inode usage down.
