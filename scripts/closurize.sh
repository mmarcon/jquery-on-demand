INFILE=src/jquery.on.demand.js
OUTFILE_MIN=dist/jquery.on.demand.min.js

#Compress with Closure Compiler API
echo -n "Contacting Google Closure Compiler API and sending file... "
curl -o $OUTFILE_MIN -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_info=compiled_code -d output_format=text --data-urlencode "js_code@${INFILE}" http://closure-compiler.appspot.com/compile
echo "Done."