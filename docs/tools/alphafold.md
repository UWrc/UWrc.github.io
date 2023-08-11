---
id: alphafold
title: AlphaFold2
---

AlphaFold2 Application and Data Available on Klone
----------------------------------------------------------

AlphaFold2 is a deep learning system that predicts protein structure from sequence. It was developed by DeepMind and is described in this [paper](https://www.nature.com/articles/s41586-021-03819-2). The program is resource intensive and requires a large background dataset to function. These have been made available on Klone and can be accessed by following the instructions below.

__BEFORE BEGINNING__: You will need a `python` environment activated to use this tool. See [here](/docs/tools/python). Ensure that you have a [compute node allocated](/docs/hyak101/python/jobs) before using this tool. 

## Data

AlphaFold needs to be pointed towards a directory containing the data it needs to run. It can run using two data presets: `full_dbs` and `reduced_dbs`. The `full_dbs` preset contains the full databases used in the AlphaFold2 paper. The `reduced_dbs` preset contains a reduced set of databases which results in a significant speedup in runtime at a loss of accuracy. See their [github](https://github.com/deepmind/alphafold) for benchmarking of runtime.

The full databases are available at `/data/alphafold/full_dbs/` and the reduced databases are available at `/data/alphafold/reduced_dbs/`. To use one or the other, two parameters need to be passed to the program:

- `--db_preset` - either `full_dbs` or `reduced_dbs`
- `--data_dir` - the path to the directory containing the databases. __THESE TWO PARAMETERS MUST BE USED TOGETHER,__ eg. if you use the `full_dbs` preset, that path should be `/data/alphafold/full_dbs/`

See below for a full list of parameters.

## Usage

### Context
The recommended usage documents creating a docker environment with GPU access, and running a python script that calls that docker image to run AF. Docker is not supported on Klone, so this process has been lightly modified:

1. An apptainer image was created
2. A script that runs the apptainer image with the proper arguments was created
3. An LMOD module was created to load the script into your path.

__Important__: These changes mean that some of the command line parameters have changed from the original AF documentation. See below for a full list of parameters.

### Running AlphaFold2

The program can be run on CPU but it is highly recommended to request a job with 1-4 GPUs available.

Load the module
```bash
module load escience/alphafold-2.3.0
```
Install dependancies and ensure the executable is available. You only need to do this once. __Make sure you have a python environment activated before running this command__, and activate the same environment before running the main program.
```bash
install_alphafold
which run_alphafold # should not error
```
Run the main program on your protein sequences. If you're here, I assume you know how to create a fasta file of your sequences...
```bash
run_alphafold \
  --fasta_paths=/path/to/my/protein/T1050.fasta \
  --max_template_date=2020-05-14 \
  --model_preset=monomer \
  --db_preset=reduced_dbs \
  --data_dir=/data/alphafold/reduced_dbs/ \
  --output_dir=/home/user/absolute_path_to_the_output_dir
```
The path specified by `--output_dir` will contain the model outsputs. See DeepMind's [documentation](https://github.com/deepmind/alphafold) for more information on the output files.

### Parameters

1. **`use_gpu`**: (boolean, default: `True`)
   - Enable NVIDIA runtime to run with GPUs.

2. **`models_to_relax`**: (enum, default: `'best'`, options: `['best', 'all', 'none']`)
   - The models to run the final relaxation step on.
   - `'all'`: all models are relaxed, which may be time-consuming.
   - `'best'`: only the most confident model is relaxed.
   - `'none'`: relaxation is not run. Turning off relaxation might result in predictions with distracting stereochemical violations but might help in case you are having issues with the relaxation stage.

3. **`enable_gpu_relax`**: (boolean, default: `True`)
   - Run relax on GPU if GPU is enabled.

4. **`gpu_devices`**: (string, default: `'all'`)
   - Comma separated list of devices to pass to NVIDIA_VISIBLE_DEVICES.

5. **`fasta_paths`**: (list)
   - Paths to FASTA files, each containing a prediction target that will be folded one after another. If a FASTA file contains multiple sequences, then it will be folded as a multimer. Paths should be separated by commas. All FASTA paths must have a unique basename as the basename is used to name the output directories for each prediction.

6. **`output_dir`**: (string)
   - Path to a directory that will store the results.

7. **`data_dir`**: (string)
   - Path to directory with supporting data: AlphaFold parameters and genetic and template databases. Set to the target of download_all_databases.sh.

8. **`docker_image_name`**: (string, default: `'alphafold'`)
   - Name of the AlphaFold Docker image.

9. **`max_template_date`**: (string)
   - Maximum template release date to consider (ISO-8601 format: YYYY-MM-DD). Important if folding historical test sets.

10. **`db_preset`**: (enum, default: `'full_dbs'`, options: `['full_dbs', 'reduced_dbs']`)
    - Choose preset MSA database configuration - smaller genetic database config (`reduced_dbs`) or full genetic database config (`full_dbs`).

11. **`model_preset`**: (enum, default: `'monomer'`, options: `['monomer', 'monomer_casp14', 'monomer_ptm', 'multimer', 'model_1', 'model_2', 'model_3', 'model_4', 'model_5']`)
    - Choose preset model configuration - the monomer model, the monomer model with extra ensembling, monomer model with pTM head, or multimer model.

12. **`num_multimer_predictions_per_model`**: (integer, default: `5`)
    - How many predictions (each with a different random seed) will be generated per model. E.g. if this is 2 and there are 5 models then there will be 10 predictions per input. Note: this FLAG only applies if `model_preset=multimer`.

13. **`benchmark`**: (boolean, default: `False`)
    - Run multiple JAX model evaluations to obtain a timing that excludes the compilation time, which should be more indicative of the time required for inferencing many proteins.

14. **`use_precomputed_msas`**: (boolean, default: `False`)
    - Whether to read MSAs that have been written to disk instead of running the MSA tools. The MSA files are looked up in the output directory, so it must stay the same between multiple runs that are to reuse the MSAs. WARNING: This will not check if the sequence, database, or configuration have changed.

15. **`docker_user`**: (string)
    - UID:GID with which to run the Docker container. The output directories will be owned by this user:group. By default, this is the current user. Valid options are: uid or uid:gid, non-numeric values are not recognized by Docker unless that user has been created within the container.


Happy folding!

