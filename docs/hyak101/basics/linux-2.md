---
id: linux-2
title: Basic Linux Commands II
---

:::note

This documentation is under construction.

Specifically here, the formatting is not complete. Use the pwd command and ls if something isn't working for you, or if you can't find the file specified.

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

Wraning: permanent - delete a file (will not come back)
```bash
rm dataset.csv
```

Remove a directory with recursive rm.

```bash
cd shell-lesson-data/exercise-data/writing/
ls
rm -r thesis
```

### `*`
#### Use wildcards as a shorthand 

```bash
cd ../alkanes
ls
list all ending with *.pdb
ls *.pdb
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

### `>>`
#### "append" output to a file with `>>`
append with >>
```bash
cd shell-lesson-data/exercise-data/animal-counts/
cat animals.csv
wc -l animals.csv
head -n 3 animals.csv > animals-subset.csv
tail -n 2 animals.csv >> animals-subset.csv
cat animals-subset.csv
wc -l animals-subset.csv
```

### `sort`
#### "sort" numbers with `sort`
```bash
cd ../
cat numbers.txt
shell-lesson-data/exercise-data/numbers.txt
sort numbers.txt
sort -n numbers.txt

sort -n lengths.txt
sort -n lengths.txt > sorted-lengths.txt

head -n 1 sorted-lengths.txt

sort -n lengths.txt > lengths.txt
```

### `|`
#### Use a "pipe" to string commands together

```bash
wc -l *.pdb | sort -n

wc -l *.pdb | sort -n > sorted_lengths_v2.txt
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

-r (recursive) option, grep
grep -r Yesterday .
```

### `history`
#### View your history of commands with `history`
```bash
history
```

Use `history`, `|`, and `grep` together to find all toime the `cat` command was used. 
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
#### From your local computer
```bash
scp UWNetID@klone.hyak.uw.edu:/gscratch/scrubbed/UWNetID/text.txt .
```
