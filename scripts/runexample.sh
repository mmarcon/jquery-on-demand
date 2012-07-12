#!/bin/bash

cp src/jquery.on.demand.js examples/$1

cd examples/$1
trap "{ rm -f jquery.on.demand.js; exit 0; }" EXIT
echo "Example is running at http://localhost:8000"
echo "^C to stop"
python -m SimpleHTTPServer &> /dev/null
exit 0
cd ..