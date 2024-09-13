---
id: squashfs
title: Squash Fuse
---

Due to the large number of small files contained in most datasets, it is recommended to pack them in a Squash filesystem. Similar to containers which packages and runs all applications needed in an isolated enviroment, SquashFS packages all files you wish to use and creates a read-only, compressed filesystem with them. Squash filesystems act as a single file, which allows the server mounting it to read the entirity of the filesystem's metadata at once as it is not able to change. This saves a considerable amount of in metadata calls allowing for a massive increase in performance with little-to-no downsides. This performance increase is also felt server-side, as fewer metadata calls means reduced load on the storage system as a whole and more open throughput for other storage calls to take place.

## Creating a SquashFS dataset

1. Place all of the files you wish to be contained in your .sqsh file in a directory. Note that once created, the .sqsh cannot easily be edited.
2. Run the following command to generate the squashfs file:
   ```bash
   mksquashfs /path/to/files my_files.sqsh
   ```
   Duplicate files are detected and deleted in this process. You should also be able to see information such as the filesystem size and the number of files and directories used in the output. To manually check the size of the newly compressed file:
   ```bash
   ls -lh my_files.sqsh
   ```
3. Cleanup the directory containing the files as needed. 
    ```bash
    rm -r path/to/files
    ```
    Note that the `rm` command permanently deletes files and directories. Ensure that the directory is no longer needed and the squashfs file was sucessfully created before proceeding.

## Mounting using SquashFuse
:::note SLURM with Squash Fuse
It is useful to utilize job/array numbers and/or your user name to avoid the risk of colliding with other users. Log into a compute node using `salloc` or create a SLURM job or SLURM job array script to run the commands in this section. Remember to submit the script using `sbatch` and monitor it using `squeue` once all the necessary commands are in the SLURM script.
:::

1. Create a directory for the mount. 

    ```bash
    mkdir -p /tmp/${USER}/${SLURM_JOB_ID}/my_squash_mnt_1
    ```
    The `-p` option ensures that each intermediate directory in the path above are created if they do not exist already. The directory `my_squash_mnt_1` will be your mount point.

2. Mount the fileset using squashfuse.
    ```bash
    squashfuse /path/to/my_files.sqsh /tmp/${USER}/${SLURM_JOB_ID}/my_squash_mnt_1
    ```

3. You are now able to access the files through the mount point.
    ```bash
    ls /tmp/${USER}/${SLURM_JOB_ID}/my_squash_mnt_1
    ```
    If the mount was sucessful, the output will show all the squash filesystem contents. You are able to run any additional operations on the mounted filesystem now.

4. Unmount the fileset when done.
    ```bash
    fusermount -u /tmp/${USER}/${SLURM_JOB_ID}/my_squash_mnt_1
    ```
    The `-u` option stands for unmount. After unmounting, `my_squash_mnt_1` should be an empty directory.
