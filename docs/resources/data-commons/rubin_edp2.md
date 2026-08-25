---
sidebar_label: Rubin EDP2
title: Rubin Observatory EDP2 Dataset
---

:::warning
This dataset is only available on **Tillicum**.
:::

Sponsoring groups are Željko Ivezić, James Davenport, Nora Shipp, and Mario Jurić. Users are Audrey Budlong, Anastasios Tzanidakis, Peter Ferguson, Ian Chow, Jake Kurlander, and Ryder Strauss. Initial deployment of **Aug 2026**.

## What is this?

The Vera C. Rubin Observatory [**Early Data Preview 2 (EDP2)**](https://dp2.lsst.io/) contains image and catalog products from Rubin Science Pipelines processing of observations obtained with the Rubin Observatory. EDP2 is the early release of [**Data Preview 2**](https://dp2.lsst.io/), providing the complete catalog suite and a subset of imaging data.

The Data Commons hosts two components of EDP2:

- **LSDB HATS Catalogs (~5 TB)**: Object catalogs, difference-image analysis (DIA) object catalogs, and photometric redshift catalogs in [**HATS (Hierarchical Adaptive Tiling Scheme)**](https://docs.lsdb.io/) format. These include multi-band forced-source photometry and time-series data stored as nested lightcurves per object.

- **Deep Coadd Images (~25 TB)**: Combined, calibrated, background-subtracted images for patches of sky across the six LSST filters (ugrizy) in FITS format. Each image contains science (nJy flux), variance, and mask planes. Produced via cell-based coaddition across 925,460 Butler datasets.

You can learn more at the [**DP2 documentation site**](https://dp2.lsst.io/) or from the [**data release paper**](https://doi.org/10.71929/rubin/3377440).

:::important Available Data in the Data Commons
EDP2 contains the full catalog suite but only a subset of imaging products (deep coadd images). The full DP2 release, expected late 2026, will include additional image products.
:::

## How to prepare for use?

### LSDB HATS Catalogs

The HATS catalogs are accessed using [**LSDB**](https://docs.lsdb.io/), a Python tool for scalable analysis of large catalogs built on top of Dask. Install it via pip or conda:

```bash
pip install lsdb
```

LSDB opens catalogs lazily — only the schema is read at first, and data are read on demand. A Dask client is recommended for parallel computation:

```python
from dask.distributed import Client
client = Client(n_workers=4, threads_per_worker=1, memory_limit="auto")
```

### Deep Coadd Images

The deep coadd images are accessed using the Rubin [**Butler**](https://pipelines.lsst.io/) data management software. Butler is part of the LSST Science Pipelines, which must be installed before you can work with this data. There are two ways to set up LSST pipelines

#### 1) Use lsst-distrib conda package.

This dataset ships with a conda channel containing a single megapackage of all the lsst pipelines software. Once you create a python 3.13 environment, you can install the megapackage with the following command run inside your conda environment.
```bash
conda install -c file:///gpfs/datasets/rubin_edp2/conda_channel -c conda-forge lsst-distrib
```

#### 2) Use Eups to install lsst software

To install the LSST Science Pipelines, download the `lsstinstall` script and follow the [**LSST Pipelines installation guide**](https://pipelines.lsst.io/install/index.html):

```bash
curl -OL https://ls.st/lsstinstall
```

Once you have an LSST pipelines environment set up, the Butler will be available for accessing the deep coadd images.

## How to access?

:::caution Data Rights
Access to Rubin DP2 data products is restricted to Rubin data rights holders. Among others, all scientists and students at US and Chilean institutions qualify as data rights holders. By accessing this data on Hyak, you confirm that you are a Rubin data rights holder. See the [**Rubin data access documentation**](https://dp2.lsst.io/access/index.html) for full details.
:::

### HATS Catalogs

The file path on `tillicum` is `/gpfs/datasets/rubin_edp2/hats/`.

Three catalog collections are available:

| Collection | Description |
|---|---|
| `object_collection` | Object catalog with multi-band (ugrizy) forced-source photometry and nested lightcurves |
| `dia_object_collection` | Difference-image analysis object catalog with forced photometry time-series |
| `object_photoz` | Photometric redshift estimates from multiple algorithms |

```python
import lsdb
from upath import UPath

base_path = UPath("/gpfs/datasets/rubin_edp2/hats")

object_cat = lsdb.open_catalog(base_path / "object_collection")
dia_cat = lsdb.open_catalog(base_path / "dia_object_collection")
photoz_cat = lsdb.open_catalog(base_path / "object_photoz")
```

See the [**LSDB DP2 tutorial**](https://docs.lsdb.io/en/latest/tutorials/pre_executed/rubin_dp2.html) for detailed usage examples.

### Deep Coadd Images

The file path on `tillicum` is `/gpfs/datasets/rubin_edp2/deep_coadd/`.

The images are organized by the LSST sky map: tracts (~1.66 square degrees) subdivided into 100 overlapping patches, with one deep coadd per patch per filter. With your LSST Science Pipelines environment active (see "How to prepare for use?" above), access them via the Butler:

```python
from lsst.daf.butler import Butler

butler = Butler("/gpfs/datasets/rubin_edp2/deep_coadd", collections="LSSTCam/runs/DRP/DP2")

# Retrieve a specific deep coadd
coadd = butler.get("deep_coadd", band="i", skymap="lsst_cells_v2", tract=12351, patch=0)
```

See the [**deep coadd documentation**](https://dp2.lsst.io/products/images/deep_coadd.html) for details on the image planes, metadata, and additional access methods.

## How to cite?

If you use the EDP2 data, please cite both the data release paper and the dataset:

**Data Release Paper:**

NSF-DOE Vera C. Rubin Observatory (2026). *The Vera C. Rubin Observatory Data Preview 2.* [https://doi.org/10.71929/rubin/3377440](https://doi.org/10.71929/rubin/3377440)

**Dataset:**

NSF-DOE Vera C. Rubin Observatory (2026). *Legacy Survey of Space and Time Data Preview 2.* [https://doi.org/10.71929/rubin/3382528](https://doi.org/10.71929/rubin/3382528)

**Science Pipelines:**

[https://doi.org/10.71929/rubin/2570545](https://doi.org/10.71929/rubin/2570545)

BibTeX entries for all Rubin DOIs are available in the [**lsst-texmf package**](https://github.com/lsst/lsst-texmf).

See the full [**DP2 citation guide**](https://dp2.lsst.io/cite/index.html) for additional requirements.
