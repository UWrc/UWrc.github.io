---
id: tcga
title: TCGA
---

Sponsoring groups are Su-In Lee, Linda Shapiro, Sheng Wang. Student users are Chanwoo Kim, Rustin Soraki, and Zucks Liu. Initial deployment of **March 2025**.

## What is this?
<!-- ![TCGA Infographic](https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_infographic/2021-02/tcga-infographic-enlarge.png?itok=r6HLN-Ex) -->


The Cancer Genome Atlas (TCGA) is a landmark cancer genomics program that molecularly characterized over 20,000 primary cancer samples across [33 cancer types](https://gdc.cancer.gov/resources-tcga-users/tcga-code-tables/tcga-study-abbreviations). TCGA, established in 2016 as a collaboration between the National Cancer Institute (NCI) and the National Human Genome Research Institute (NHGRI), provides a vast dataset for cancer research. The dataset encompasses [a wide range of data types](https://www.cancer.gov/ccg/research/genome-sequencing/tcga/using-tcga-data/types). It includes tissue whole slide image and multiple genomic data types, such as whole-exome sequencing, gene expression, copy number variations, and methylation data.

You can learn more at their official website [here](https://www.cancer.gov/ccg/research/genome-sequencing/tcga) or from their primary publication [here](https://www.nature.com/articles/ng.2764). 


:::important Available Data in the Data Commons
* Diagnostic whole slide image (11TB)

The entire TCGA data is extremely large, totaling approximately 2.5 petabytes. Currently, only a subset—diagnostic whole slide images (~11TB)—used by the initial contributors has been deposited in the data commons.
:::



## How to prepare for use?

These instructions are intended to support future reproducibility and assist those who may wish to download data types beyond what is currently available in hyak data commons.

TCGA organizes different cancer types as separate projects. We store data for each project as a separate folder under the main `/data/TCGA` directory.

Below is an example of how to set up TCGA-LUSC (Lung squamous cell carcinoma) project.

### Step 1. Download project metadata
   1. Go to [GDC portal](https://portal.gdc.cancer.gov/analysis_page?app=Projects)
   2. Select the project. Click on `TCGA-LUSC`
   3. Click `biospecimen–tsv` and `clinical–tsv` to download the compressed files: `clinical.project-tcga-lusc.*.tar.gz` and `biospecimen.project-tcga-lusc.*.tar.gz`
       1.  Clinical data: Includes patient metadata clinical data (e.g., `clinical.tsv`, `exposure.tsv`, `family_history.tsv`, `follow_up.tsv`, `pathology_detail.tsv`)
       2. Biospecimen Data: Contains details on available biospecimen sample (e.g., `aliquot.tsv`,  `analyte.tsv`,  `portion.tsv`, `sample.tsv`, `slide.tsv`)
   4. Extract and store them under `/data/tcga/TCGA_LUSC/clinical` and `/data/tcga/TCGA_LUSC/biospecimen` respectively.
   5. Finally, download the manifest file, which is a table linking each filename to its corresponding file ID. The file ID can be used to download the file via an FTP client using the URL: `https://api.gdc.cancer.gov/data/{file_id}`
      1. Click `manifest` to download `gdc_manifest.*.txt`. Store it in `/data/tcga/TCGA_LUSC/gdc_manifest.txt`
   
### Step 2. Download specific biospecimen data you are interested in. 
Below is an example of filtering and retrieving diagnostic whole slide images:
1. Get a list of URLs for biospecimen data files to download.
```python
import pandas as pd

slide_df = pd.read_csv("/data/tcga/TCGA_LUSC/biospecimen/slide.tsv", sep="\t")
slide_df_diagnostic = slide_df[
    slide_df["slide_submitter_id"]
    .map(lambda x: x.split("-")[-1][:2])
    .map(lambda x: {"DX": True, "BS": False, "TS": False, "MS": False}[x])
]

manifest_df = pd.read_csv("/data/tcga/TCGA_LUSC/gdc_manifest.txt", sep="\t")
manifest_df["slide_submitter_id"] = manifest_df["filename"].map(
    lambda x: x.split(".")[0]
)

data_df = slide_df_diagnostic.merge(
    right=manifest_df,
    left_on="slide_submitter_id",
    right_on="slide_submitter_id",
    how="inner",
)

url_list = data_df["id"].map(lambda x: f"https://api.gdc.cancer.gov/data/{x}").tolist()
md5_list = data_df["md5"]
```
1. Download the files iteratively and save them to `/data/tcga/TCGA_LUSC/gdc_manifest`. After downloading, we recommend verifying the MD5 checksum to ensure data integrity. 

## How to access?

The data path for TCGA data on `klone` is `/data/tcga`.

Data from TCGA projects are organized into two tiers: Open Access and Controlled Access. We only deposit open access data in the Hyak Data Commons.
* Open Access data tier contains data that cannot be attributed to an individual research participant. The Open Access data tier does not require user certification. Data in Open Access tier are available in the [Genomic Data Commons Data Portal](https://portal.gdc.cancer.gov/) and it can be downloaded via public FTP. 
* Controlled Access data tier contains individual-level genotype data that are unique to an individual. Access to data in the Controlled Access data tier requires user certification through dbGaP Authorized Access. 

More information is available [here](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000178.v9.p8#:~:text=Data%20from%20TCGA%20projects%20are,in%20the%20TCGA%20Data%20Portal).

## How to cite?

Please refer to the TCGA citation guidelines [here](https://www.cancer.gov/ccg/research/genome-sequencing/tcga/using-tcga-data/citing).