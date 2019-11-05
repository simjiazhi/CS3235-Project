#!/bin/sh

# create 'html_files.txt' like this:
# find . -type f -name "*.html" > html_files.txt

for file in `find . -name \*.js`
do
   sed -i.bak -e's/lect/topic/' $file
done
