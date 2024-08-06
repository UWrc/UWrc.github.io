---
id: linux-2
title: Basic Linux Commands II
---

:::note

This documentation is under construction.

:::

### `head`, `tail`, `more`, `less`

Other ways to view file contents, great for viewing smaller chunks of longer files. 

```bash
head basilisk.dat # displays the first part of a file

tail basilisk.dat # displays the last part of a file

more basilisk.dat # displays file contents one page at a time
# exit the more command with Q

less basilisk.dat # displays file contents one page at a time
# exit the less command with Q
```

By default, the head and tail commands display the first and last 10 lines of a file. To view a specific number of lines use `-n` followed by the desired number of lines.
```bash
head -n 20 basilisk.dat
```
### `cp`
#### "copy" files with `cp` 

Move to top of working directory. 

```bash
cd /gscratch/scrubbed/UWNetID
pwd
```
Copy `animals.csv` to your current directory using the shorthand `.` to mean "here"
```bash
cp /mmfs1/sw/hyak101/basics/data/animals.csv .
```
Copy a directory with all its contents using recursive copy
```bash
cp -r /mmfs1/sw/hyak101/basics/data/ .
```

### `mv`
#### "move" file to a new name (rename) with `mv`

```bash
mv animals.csv dataset.csv
```

### `rm`
#### "remove" a file with `rm`

:::warning 
`rm` permanently deletes a file. This action is irreversible. 

:::
```bash
rm dataset.csv
```

Remove a directory with recursive rm.

```bash
cd shell-lesson-data/exercise-data/writing/
ls
rm -r thesis
```
### `touch`
#### Create an empty file with `touch`

```bash
cd ../../../ 
pwd 
# prints gscratch/scrubbed/UWNETID
touch file1.txt file2.txt file3.txt
ls # make sure the .txt files were created
```
#### `touch` is also useful for updating the timestamp of a file
``` bash
ls -l file1.txt # -l will list the current timestamp of a file
touch file1.txt # touch will update the timestamp
```
### `?` and `[]` 
#### Wildcards are special characters used as a shorthand

```bash
# ? represents any singular character
ls file?.txt  
# lists all file.txt files with a singular character where ? is
ls file[2-3].txt
# lists all file2.txt and file3.txt
rm file[1-3].txt
```
### `*`


```bash
cd shell-lesson-data/exercise-data/alkanes
ls
ls *.pdb # lists all files ending with .pdb
ls /sw/hyak101/basics/*.slurm
ls /sw/hyak101/basics/locator*
ls /sw/hyak101/basics/locator_NN*
```

### `wc`
#### apply "word count" with `wc`

```bash
cd alkanes
ls 
wc cubane.pdb
wc --help
wc *.pdb
```

#### `wc -l` counts lines
```bash
wc -l *.pdb
```

### `>`
#### "redirect" output to a file with `>`
```bash
wc -l *.pdb > lengths.txt
ls lengths.txt
ls
cat lengths.txt
```
:::caution 

If the file already exists, it will be overwritten. 

:::
### `>>`
#### "append" output to a file with `>>`

First, change to the `animal-counts/` directory and print the contents with the `cat` command
```bash
cd shell-lesson-data/exercise-data/animal-counts/
cat animals.csv
```
The espected output is as follows:
```bash
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,racoon,7
2012-11-06,rabbit,19
2012-11-06,deer,2
2012-11-06,fox,4
2012-11-07,rabbit,16
2012-11-07,bear,1
```
Using `wc -l` to count the lines of the above output
```bash
wc -l animals.csv
```
```bash
8 animals.csv
```
To create a subset of `animals.csv`, we can combine `head`, `tail`, `>`, and `>>` commands.
```bash
head -n 3 animals.csv > animals-subset.csv
cat animals-subset.csv
```
`animals-subset.csv` should now contain the first 3 lines of `animals.csv`:
```bash
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,racoon,7
```
Because we do not want to override `animals-subset.csv` file contents, use `>>` to append rather than `>`:
```bash
tail -n 2 animals.csv >> animals-subset.csv
cat animals-subset.csv
```
Now, the subset reads as follows:
```bash
2012-11-05,deer,5
2012-11-05,rabbit,22
2012-11-05,racoon,7
2012-11-07,rabbit,16
2012-11-07,bear,1
```
Counting the lines once more:
```bash
wc -l animals-subset.csv
```
Expected output:
```bash
5 animals-subset.csv
```

### `sort`
#### "sort" numbers with `sort`
```bash
cd ../
# You should now be in the exercise-data directory
pwd
# /gscratch/scrubbed/NETID/shell-lesson-data/exercise-data
cat numbers.txt
```
The expected output:
```bash
10
2
19
22
6
```
The `sort` command by itself will sort a text file's contents in ascending order:

```bash
sort numbers.txt
```
Notice how the output is sorted in lexicographical order:
```bash
10
19
2
22
6
```

To sort the numbers based on their numerical value, use the `-n` option
```bash
sort -n numbers.txt
```
Now, the file contents will be interpreted as numbers rather than strings and `numbers.txt` will be sorted in ascending numerical order:
```bash
2
6
10
19
22
```
:::tip 
The `sort` command will sort lines alphabetically or numerically. Lines with numbers and letters are sorted as follows:
1. Numbers 
2. Capital letters 
3. Lowercase letters 

Other sorting options include `-r` which sorts lines in reverse order and `-u` which removes duplicate lines.
:::

Going back to the `alkanes` directory
```bash
cd alkanes
cat lengths.txt
sort -n lengths.txt
```
Expected output:
```bash
9 methane.pdb
12 ethane.pdb
15 propane.pdb
20 cubane.pdb
21 pentane.pdb
30 octane.pdb
107 total
```

Create a sorted list of the alkane lengths and check the first output line:
```bash
sort -n lengths.txt > sorted-lengths.txt
head -n 1 sorted-lengths.txt
```
```bash
9 methane.pdb
```


:::caution
Empty file resulting from `>`. The following code will cause the contents of `lengths.txt` to be deleted:

```bash
sort -n lengths.txt > lengths.txt
cat lengths.txt
```
Notice how `lengths.txt` is now an empty file. To get `lengths.txt` back, backtrack to the original command:
```bash 
 wc -l *.pdb > lengths.txt
 ```

:::



### `|`
#### Use a "pipe" to string commands together
Alternatively, the alkane lengths can sorted by using one line of code:
```bash
wc -l *.pdb | sort -n

wc -l *.pdb | sort -n > sorted_lengths_v2.txt

cat sorted_lengths_v2.txt
```
The output should be the same at `sorted-lengths.txt`:
```bash
9 methane.pdb
12 ethane.pdb
15 propane.pdb
20 cubane.pdb
21 pentane.pdb
30 octane.pdb
107 total
```

### `grep`
#### Search for a PATTERN in a FILE with `grep`

`grep` finds and prints lines in files that match a pattern

```bash
cd shell-lesson-data/exercise-data/writing
cat haiku.txt
grep not haiku.txt

grep The haiku.txt
grep -w The haiku.txt

grep -w "is not" haiku.txt

grep -n "it" haiku.txt

grep -n -w "the" haiku.txt

# -r (recursive) option, grep
grep -r Yesterday .
```

### `history`
#### View your history of commands with `history`
```bash
history
```

Use `history`, `|`, and `grep` together to find all times the `cat` command was used. 
```bash
history |grep cat
```

### `find`
#### "find" files or files matching a pattern with `file`

```bash
cd shell-lesson-data/exercise-data/
find . -name numbers.txt
find . -name "*.txt"

grep "searching" $(find . -name "*.txt")
```
### `scp`
#### Transfer your data to `klone` with "server copy" or `scp`

#### From your local computer
Find a file you would like to transfer. Let's say it is called text.txt. Use the following to transfer text.txt from your local computer to `klone`. We will transfer it to our working directory in `gscratch/scrubbed`

```bash
scp text.txt UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID
```

#### Transfer data from `klone` to your local computer with "server copy" or `scp`
#### To your local computer
```bash
scp UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
```

### `rsync`
Similarly, data can be transferred using the `rysnc` command

```bash
# From Klone to your local computer
rysnc UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
# use -a to preserve original file permissions, timestamp, etc
rysnc -a UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
```
`rsync` and `scp` can be paired with other options such as `-v` (verbose) which provides a detailed output of the transfer process or `-z` ( `-c` for `scp` ) to compress data during transfers.

:::note important concept: `scp` vs `rsync`
`rsync` is generally used for larger file transfers and file synchronization. Unlike `scp` which always transfers the entire file, `rsync` will only transfer the parts of the file that changed. `rsync` can also resume aborted transfers from lost internet connections. `scp` works well for quick file transfers that do not require the additional features rsync provides.
:::

