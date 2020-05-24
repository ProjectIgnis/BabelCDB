#!/usr/bin/env bash

# ./rush-whitelist.sh Rush 2020.04.27 Rush-Prerelease 2020.05.24

set -euxo pipefail

OUTPUT_OFFICIAL=$1.lflist.conf
DATE_OFFICIAL=$2
OUTPUT_PRERELEASE=$3.lflist.conf
DATE_PRERELEASE=$4

function write_header {
	echo "#[$3 $1]" > $2
	echo "!$3 $1" >> $2
	echo "\$whitelist" >> $2
	echo "160000000 1 --Legend" >> $2
	# All Legend cards must be aliased to this ID and hold the 0x400 scope flag.
	# They are ignored by this script. This is a workaround.
}

write_header "Rush Duel" $OUTPUT_OFFICIAL $DATE_OFFICIAL
write_header "Rush Prereleases" $OUTPUT_PRERELEASE $DATE_PRERELEASE

find . -type f -name '*.cdb' -exec sqlite3 {} \
	"SELECT (datas.id || ' ' || 3 || ' --' || name) FROM datas INNER JOIN texts ON datas.id=texts.id WHERE ot == 0x200 ORDER BY datas.id" \; \
	| tee -a $OUTPUT_OFFICIAL $OUTPUT_PRERELEASE

echo "# Prereleases" >> $OUTPUT_PRERELEASE
find . -type f -name '*.cdb' -exec sqlite3 {} \
	"SELECT (datas.id || ' ' || 3 || ' --' || name) FROM datas INNER JOIN texts ON datas.id=texts.id WHERE ot == 0x100|0x200 ORDER BY datas.id" \; \
	| tee -a $OUTPUT_PRERELEASE



