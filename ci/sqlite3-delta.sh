#!/usr/bin/env bash

set -euxo pipefail

ORIGINAL=$1
CHANGED=$2
OUTPUT=$3

sqlite3 $ORIGINAL .dump | grep "INSERT INTO" | sort > $ORIGINAL.sql
sqlite3 $CHANGED .dump | grep "INSERT INTO" | sort > $CHANGED.sql
comm -13 $ORIGINAL.sql $CHANGED.sql > $CHANGED.comm2.sql
cat $(dirname $0)/prepend.sql $CHANGED.comm2.sql > $CHANGED.delta.sql
echo "COMMIT;" >> $CHANGED.delta.sql
sqlite3 $OUTPUT < $CHANGED.delta.sql

echo "BEGIN TRANSACTION; ATTACH DATABASE '$CHANGED' AS current;" > $CHANGED.cross-delta.sql
cat $(dirname $0)/cross-delta.sql >> $CHANGED.cross-delta.sql
sqlite3 $OUTPUT < $CHANGED.cross-delta.sql
