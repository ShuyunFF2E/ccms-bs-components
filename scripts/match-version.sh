#!/bin/bash

set -e



function match_version(){
    line=`grep 'version' package.json`

    version=${line#*\"\:}

    version=${version#*\"}
    version=${version%\"*}
    echo $version
}

echo match_version $@

