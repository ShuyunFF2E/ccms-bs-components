#!/bin/bash

set -e

npm run build

cp package.json dist/package.json

npm publish dist
