---
id: first-job
title: A First Job on Mox
---

In this example, we are going to use Tensorflow to train a Keras model on a MNIST dataset in a Conda environment with the following Python script:

```python title=tf_example.py
import tensorflow as tf
import tensorflow_datasets as tfds

tf._compat.enable_v2_behavior()

(ds_train, ds_test), ds_info = tfds.load(
    'mnist',
    split=['train', 'test'],
    shuffle_files=True,
    as_supervised=True,
    with_info=True
)

def normalize_img(img, label):
    """Normalizes images: `uint8` -> `float32`."""
    return tf.cast(img, tf.float32) / 255., label

ds_train = ds_train.map(normalize_img, num_parallel_calls=tf.data.experimental.AUTOTUNE)
ds_train = ds_train.cache()
ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
ds_train = ds_train.batch(128)
ds_train = ds_train.prefetch(tf.data.experimental.AUTOTUNE)

ds_test = ds_test.map(normalize_img, num_parallel_calls=tf.data.experimental.AUTOTUNE)
ds_test = ds_test.batch(128)
ds_test = ds_test.cache()
ds_test = ds_test.prefetch(tf.data.experimental.AUTOTUNE)

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28, 1)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=tf.keras.optimizers.Adam(0.001),
    metrics=['accuracy'],
)

model.fit(
    ds_train,
    epochs=12,
    validation_data=ds_test,
)

model.save('./')

```

## Transfer files from your local machine to Hyak

Transfer files from your local machine to Hyak using the `scp` command:

```shell 
scp <path/to/file> <netId>@mox.hyak.uw.edu:<path/to/file>
```

You can also transfer entire folders with the `-r` (recursive) flag:

```shell
scp -r <path/to/dir> <netId>@mox.hyak.uw.edu:<path/to/dir>
```

## Login to Hyak

Login with `ssh <netId>@mox.hyak.uw.edu`

## Request a build node

Get a build node with 20GB of memory for 1 hour with the command:
```shell
srun -p build --mem=20G --time=1:00:00 --pty /bin/bash
```

## Load Miniconda and create a Conda environment

Load Miniconda with `module load contrib/stf-workshop/miniconda2`

:::note
There is an inclination towards Miniconda due to its smaller size.  If you wish to use Anaconda, use `module load anaconda3_5.3`
:::

If you do not already have a work folder in `/gscratch`, make a folder `/gscratch/stf/<netId>`

Create a Conda environment in your `gscratch` work folder with `conda create --prefix <path/to/workdir/path/to/env>`.  For example, `conda create --prefix /gscratch/stf/<netId>/env` will create a conda environment in the `env` folder.

Activate this Conda environment with `conda activate <path/to/workdir/path/to/env>`

## Installing Dependencies

Install dependencies with `conda install`:

```shell
conda install tensorflow tensorflow-datasets
```

Download MNIST data using `tensorflow-datasets`:
```python load_data.py
import tensorflow_datasets as tfds
tfds.load("mnist")
```

:::note
Any necessary data needs to be downloaded on the build node, as the compute node the jobs run on do not have internet access
:::

## Create a Slurm script

Slurm is the job scheduler used by Hyak.  A Slurm script is required to submit jobs to the cluster.  In this example, we will use the following Slurm script:

```shell title="<script_name>.slurm" terminal=true
#!/bin/bash
#SBATCH --job-name=tf2-example      # create a short name for your job
#SBATCH --account=stf
#SBATCH --partition=stf-gpu
#SBATCH --nodes=1                   # node count
#SBATCH --ntasks=1                  # total number of tasks across all nodes
#SBATCH --cpus-per-task=1           # cpu-cores per task (>1 if multi-threaded tasks)
#SBATCH --mem=4G                    # total memory per node (4G per cpu-core is default)
#SBATCH --gres=gpu:P100:1           # type:number of gpus per node
#SBATCH --time=00:05:00             # total run time limit (HH:MM:SS)
#SBATCH --mail-type=ALL
#SBATCH --mail-user=<netId>@uw.edu
#SBATCH --chdir=<path/to/workdir>   # /gscratch/stf/<netId>
```

## Run Slurm job

Submit the job with `sbatch <script_name>.slurm`

After the job is done running, job artifacts such as `saved_model.pb` will be written to the working directory.

Console output is stored in `slurm-<jobId>.out`:
```title=slurm-<jobId>.out terminal=true
2020-12-17 09:50:29.739810: I tensorflow/core/platform/cpu_feature_guard.cc:142] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN)to use the following CPU instructions in performance-critical operations:  SSE4.1 SSE4.2 AVX AVX2 FMA
To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
2020-12-17 09:50:29.760113: I tensorflow/core/platform/profile_utils/cpu_utils.cc:104] CPU Frequency: 2399835000 Hz
2020-12-17 09:50:29.763272: I tensorflow/compiler/xla/service/service.cc:168] XLA service 0x55d628598420 initialized for platform Host (this does not guarantee that XLA will be used). Devices:
2020-12-17 09:50:29.763394: I tensorflow/compiler/xla/service/service.cc:176]   StreamExecutor device (0): Host, Default Version
Epoch 1/12
469/469 [==============================] - 2s 4ms/step - loss: 0.3524 - accuracy: 0.9023 - val_loss: 0.1892 - val_accuracy: 0.9460
Epoch 2/12
469/469 [==============================] - 1s 3ms/step - loss: 0.1611 - accuracy: 0.9544 - val_loss: 0.1331 - val_accuracy: 0.9610
Epoch 3/12
469/469 [==============================] - 1s 3ms/step - loss: 0.1142 - accuracy: 0.9672 - val_loss: 0.1082 - val_accuracy: 0.9695
Epoch 4/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0888 - accuracy: 0.9746 - val_loss: 0.0892 - val_accuracy: 0.9729
Epoch 5/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0715 - accuracy: 0.9793 - val_loss: 0.0850 - val_accuracy: 0.9740
Epoch 6/12
469/469 [==============================] - 1s 2ms/step - loss: 0.0598 - accuracy: 0.9825 - val_loss: 0.0837 - val_accuracy: 0.9749
Epoch 7/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0495 - accuracy: 0.9855 - val_loss: 0.0739 - val_accuracy: 0.9771
Epoch 8/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0427 - accuracy: 0.9879 - val_loss: 0.0754 - val_accuracy: 0.9772
Epoch 9/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0353 - accuracy: 0.9903 - val_loss: 0.0752 - val_accuracy: 0.9769
Epoch 10/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0307 - accuracy: 0.9916 - val_loss: 0.0675 - val_accuracy: 0.9797
Epoch 11/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0272 - accuracy: 0.9924 - val_loss: 0.0808 - val_accuracy: 0.9754
Epoch 12/12
469/469 [==============================] - 1s 3ms/step - loss: 0.0221 - accuracy: 0.9945 - val_loss: 0.0731 - val_accuracy: 0.9783
```
