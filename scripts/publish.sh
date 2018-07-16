#!/bin/bash

set -e

npm run build

cp package.json dist/package.json
cp README.md dist/README.md

npm publish dist

git add .
git commit -m 'chore(release)'


# cnpm sync ccms-components
curl -X PUT https://npm.taobao.org/sync/ccms-selector-components
