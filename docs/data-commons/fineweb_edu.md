---
id: fineweb_edu
title: FineWeb-Edu
---

Sponsoring groups are Luke Zettlemoyer, Pang Wei Koh, and Yulia Tsvetkov. Student users are Jacqueline He, Rulin Shao, and Stella Li. Initial deployment of **June 2024**.

## What is this?
FineWeb-Edu is a textual dataset of 1.3T tokens from educational web pages filtered from FineWeb (a 15T token dataset derived from 96 CommonCrawl snapshots). 

You can learn more from [this introductory blogpost](https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1).

## How to prepare for use?
This serves as instructions for the research computing (i.e., HYAK) team to prepare this data for use on the cluster. It also serves a benefit for computational reproducibility later on.

```
import os
import requests
from tqdm import tqdm
from huggingface_hub import list_repo_tree


# Create a directory to save the dataset if it doesn't exist
save_dir = "/mmfs1/data/fineweb_edu"
os.makedirs(save_dir, exist_ok=True)

# Define the repository ID (dataset name) to download from, option for fineweb and fineweb-edu
repo_id = "HuggingFaceFW/fineweb-edu" # 8TB

# Get the list of files in the dataset repository using list_repo_tree
repo_tree = list_repo_tree(repo_id, repo_type="dataset", revision="main", path_in_repo="data")
repo_files = list(repo_tree)

# Filter for Parquet files
print([file.path for file in repo_files])
directories = [file.path for file in repo_files if not file.path.endswith('.parquet')]

# Construct URLs for the Parquet files
# Initialize a list to hold all Parquet file URLs
parquet_urls = []

# Get the list of Parquet files in each directory
for directory in directories:
    dir_tree = list_repo_tree(repo_id, repo_type="dataset", revision="main", path_in_repo=directory)
    parquet_files = [file.path for file in dir_tree if file.path.endswith('.parquet')]
    base_url = f"https://huggingface.co/datasets/{repo_id}/resolve/main/"
    parquet_urls.extend([base_url + file for file in parquet_files])


# Initialize progress bar
total_files = len(parquet_urls)
progress_bar = tqdm(total=total_files, unit='file', desc='Downloading')

# Function to download a single file
def download_file(url, save_path):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    with open(save_path, 'wb') as file, tqdm(
        desc=os.path.basename(save_path),
        total=total_size,
        unit='B',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for data in response.iter_content(chunk_size=1024):
            file.write(data)
            bar.update(len(data))

# Loop through the parquet files and save them to the local directory
for file_url in parquet_urls:
    # Get the folder name and file name (not the full path for dir name)
    folder_name = os.path.dirname(file_url).split("/")[-1]
    file_name = os.path.basename(file_url)
    save_path = os.path.join(save_dir, folder_name, file_name)
    
    # Create the directory if it doesn't exist
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    # Skip if the file already exists, to allow for checkpointing / start and stop
    if os.path.exists(save_path):
        progress_bar.update(1)
        continue
    else:
        # Download the file
        download_file(file_url, save_path)
        progress_bar.update(1)

progress_bar.close()
print(f"Dataset saved to {save_dir}")
```

## How to access?

FineWeb-Edu is released under the Open Data Commons Attribution License (ODC-By) v1.0 license. The use of this dataset is also subject to CommonCrawl's Terms of Use.

The file path on KLONE is `/data/fineweb_edu`.

## How to cite?

@software{lozhkov2024fineweb-edu,
  author = {Lozhkov, Anton and Ben Allal, Loubna and von Werra, Leandro and Wolf, Thomas},
  title = {FineWeb-Edu},
  month = May,
  year = 2024,
  doi = { 10.57967/hf/2497 },
  url = {https://huggingface.co/datasets/HuggingFaceFW/fineweb-edu}
}