Sponsoring groups are Ludwig Schmidt, Tim Althoff, and Pang Wei Koh. Student users are Josh Gardner, Mike Merrill, and Vinayak Gupta.

# What is this?

TablLib ([paper](https://arxiv.org/abs/2310.07875), [blog](https://www.approximatelabs.com/blog/tablib)) is a dataset consisting of 627M tables and 867B tokens of context. The data is extracted from the Common Crawl and public repositories on GitHub, and is extracted from web pages, Excel spreadsheets, CSV files, SQLite databases, and more. Beyond solely including tables themselves, TabLib also includes context from the surrounding content related to a table, such as filenames, source URLs, and text surrounding the table. This makes TabLib one of the largest and most diverse tabular datasets ever publically released.

Some more figures:

* TabLib contains nearly 7 trillion cells of data.
* TabLib contains ~650 billion rows and ~8 billion columns.

# How to prepare for use?

Tables are stored as parquet files. The parquet files contain serialized Arrow bytes in the arrow_bytes column. Each parquet file contains potentially many individual serialized tables. To read these, you will need to deserialize the bytes:

```python
import datasets
import pyarrow as pa

# load a single file of the dataset
ds = datasets.load_dataset(
    'approximatelabs/tablib-v1-full',
    data_files='/path/to/tablib/job=github_000005/batch=000001/part=000001/manifest.parquet',
)

df = ds['train'].to_pandas()

tables = [pa.RecordBatchStreamReader(b).read_all() for b in df['arrow_bytes']]

```
# How to access?

Users who access the data should also apply for public, open credentialized access to the dataset on Hugging Face DAtasets [here](https://huggingface.co/datasets/approximatelabs/tablib-v1-full).

TabLib is a collection of publicly available data. As noted in the TabLib preprint, it is noteworthy to mention that under U.S. copyright law, facts and data are not subject to copyright protection (see [Feist v. Rural Telephone]](https://www.law.cornell.edu/supremecourt/text/499/340)). 

# How to cite?

```
@misc{eggert2023tablib,
      title={TabLib: A Dataset of 627M Tables with Context}, 
      author={Gus Eggert and Kevin Huo and Mike Biven and Justin Waugh},
      year={2023},
      eprint={2310.07875},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}
```
