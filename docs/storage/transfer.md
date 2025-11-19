---
id: transfer
title: scp & rsync
---

### Using `scp` and `rsync` to transfer data

#### Transfer data from `klone` to your local computer with "server copy" or `scp`
```js
scp UWNetID@klone.hyak.uw.edu:/path/to/data_to_transfer .
# The `.` specifies the current directory at the destination for the transferred files.
```
#### Transfer data from your local computer to `klone` with "server copy" or `scp`
```js
scp data_to_transfer UWNetID@klone.hyak.uw.edu:/path/to/directory
```
#### Similarly, data can be transferred using the `rysnc` command

```js
# From klone to your local computer
rysnc UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
# use -a to preserve original file permissions, timestamp, etc
rysnc -a UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
```
`rsync` and `scp` can be paired with other options such as `-v` (verbose) which provides a detailed output of the transfer process or `-z` ( `-c` for `scp` ) to compress data during transfers.

:::note important concept: `scp` vs `rsync`
`rsync` is generally used for larger file transfers and file synchronization. Unlike `scp` which always transfers the entire file, `rsync` will only transfer the parts of the file that changed. `rsync` can also resume aborted transfers from lost internet connections. `scp` works well for quick file transfers that do not require the additional features rsync provides.
:::
### For Large Files: Compression prior to transfer
#### For larger data files, you can compress them into tar files to facilitate transfer.

First, identify which files or directories you would like to transfer **on your local device** and compress them into tar archives:
```js
# compressing an entire directory
tar -cvf data.tar data_directory
```
```js
# compressing a single file
tar -cvf data.tar data_file
```
The `-c` flag creates the tar archive, `-v` prints out all the files being processed, and `-f` allows you to name the archive. Once the files are compressed, transfer the tar file to `klone` from your local device with `scp` or `rsync`:
```js
scp data.tar UWNetID@klone.hyak.uw.edu:/path/to/directory
```
`data.tar` will save to the specified `/path/to/directory`. To check if it transferred, log into Hyak and navigate to the target directory:
```js
ssh UWNetID@klone.hyak.uw.edu
[UWNetID@klone-login03 ~] cd /path/to/directory
[UWNetID@klone-login03 ~] ls
# output
data.tar
```
On `klone` under default user profile settings, `data.tar` should be color coded red, indiciating that is it an archive file. From here, you can unzip the tar file with the command:
```js
tar -xvf data.tar
```
:::note Tar Options

**tar -c**: Creates a new tar archive.

**tar -x**: Extract files from a tar archive.

**tar -v**: Stands for "verbose". Displays the list of files being archived or extracted.

**tar -f**: Allows you to specify the name of your archive file.

**Use tar --help for a detailed list of tar options** 
:::

Alternatively, you can create a tar archive **and** copy it to `klone` from your local device in one step:
```js
tar cvf - data_directory/ | ssh UWNetID@hyak.klone.uw.edu "cat > /path/to/file/data.tar"
    Password:
    ...
```
This will create an archive of `data_directory` and send it directly to `klone`. This directory will be saved under the name `data.tar` and will be located at the `/path/to/directory` that you specifiy where it can then be extracted and used. 

Check if it transferred to `klone` by navigating to the directory it saved to:
``` bash
[UWNetID@klone-login03 ~] cd /path/to/directory
[UWNetID@klone-login03 ~] ls

# output
data.tar
```
If it successfully transferred, unzip it using `tar` and the `-xvf` flag:
``` bash
tar -xvf data.tar
```

