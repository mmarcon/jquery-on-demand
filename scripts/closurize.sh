#
# Copyright (C) 2012 Massimiliano Marcon
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software
# and associated documentation files (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
# PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
# FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
# TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
# OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#

INFILE=src/jquery.on.demand.js
TMPFILE=/tmp/jquery.on.demand.$$.js
OUTFILE_MIN=dist/jquery.on.demand.min.js

#Remove testing code
 sed '/\/\/@forTest/,/\/\/@endForTest/d' $INFILE > $TMPFILE

#Compress with Closure Compiler API
echo -n "Contacting Google Closure Compiler API and sending file... "
curl -o $OUTFILE_MIN -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_info=compiled_code -d output_format=text --data-urlencode "js_code@${TMPFILE}" http://closure-compiler.appspot.com/compile
echo "Done."

rm $TMPFILE