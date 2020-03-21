#!/usr/bin/env bash

set -euxo pipefail

BASE_REF=$1
TARGET=$2
BASENAME="${TARGET%.*}"
EXTENSION="${TARGET##*.}"

cp $TARGET $BASENAME.current.$EXTENSION
git checkout $BASE_REF -- $TARGET
$(dirname $0)/sqlite3-delta.sh $TARGET $BASENAME.current.$EXTENSION $BASENAME.delta.$EXTENSION
