#!/bin/bash

set -e

npm run build

cp package.json dist/package.json
cp README.md dist/README.md

npm publish dist
