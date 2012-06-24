#!/bin/bash

cp dist/jquery.on.demand.min.js examples

cd examples
trap "{ rm -f jquery.on.demand.min.js; exit 0; }" EXIT
echo "Example is running at http://localhost:8000"
echo "^C to stop"
python -m SimpleHTTPServer &> /dev/null
exit 0
cd ..