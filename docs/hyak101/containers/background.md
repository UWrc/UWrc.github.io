---
id: background
title: Introduction
---

:::caution

This documentation is under construction.

:::

### Hyak Software Usage Policy

TODO

### What is a Container?

TODO: more in depth information about containers and their benefits. 

### Containers on Hyak

TODO: discussion of apptainer 

:::note Relevant Vocabulary for this section

**Apptainer**: Apptainer is a container program that facilitates the ability to create and run portable and reproducible containers, especially in an HPC environment like `klone`.

**Apptainer Definition File**: a recipe file for an Apptainer container which contains install instructions for sftware to be containerized. The file extension for an Apptainer definition file is `.def`.

:::

### Apptainer vs. Docker

TODO: Docker is always in the conversation about containers because of DockerHub. However, docker in not used on Hyak because it is a shared environment and users don't have root access. This section to explain that and give a little more information about docker. 

:::note Relevant Vocabulary for this section

**Docker**: An open-source platform that automates the deployment, scaling, and management of applications through containerization, enabling consistent environments across development, testing, and production. It allows developers to package applications and their dependencies into lightweight, portable containers that can run anywhere, ensuring reliability and efficiency.

**Docker Hub**: A cloud-based registry service for storing and sharing Docker images, providing access to a vast repository of pre-built container images. It enables developers to easily find, distribute, and collaborate on containerized applications.

**Dockefile**: a recipe file for a Docker container which contains install instructions for sftware to be containerized. 

:::

### Container Repositories

TODO: mostly to focus on DockerHub, but mention the others, especially Nvidia Catalog, breifly the other options as well. Link to some popular tools that have docker containers: python, ubuntu, R (rocker project), tensorflow (on docker hub and Nvidia), pytorch (on docker hub and Nvidia). 