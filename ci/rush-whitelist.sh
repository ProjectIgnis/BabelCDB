#!/usr/bin/env bash

# ./rush-whitelist.sh Rush 2020.04.27 Rush-Prerelease 2020.05.24

set -euxo pipefail

OUTPUT_OFFICIAL=$1.lflist.conf
DATE_OFFICIAL=$2
OUTPUT_PRERELEASE=$3.lflist.conf
DATE_PRERELEASE=$4
TEMPLATE_BANLIST=$5

function write_header {
	echo "#[$3 $1]" > $2
	echo "!$3 $1" >> $2
	echo "\$whitelist" >> $2
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

# Explicitely allow legend cards.
echo "# Legends" >> $OUTPUT_OFFICIAL
echo "# Legends" >> $OUTPUT_PRERELEASE

find . -type f -name '*.cdb' -exec sqlite3 {} \
    "SELECT (datas.id || ' ' || 3 || ' --' || name) FROM datas INNER JOIN texts ON datas.id=texts.id WHERE ot == 0x200|0x400 ORDER BY datas.id" \; \
    | tee -a $OUTPUT_OFFICIAL $OUTPUT_PRERELEASE

# Explicitely include prerelease legend cards from the official banlist.
echo "# Prerelease Legends" >> $OUTPUT_PRERELEASE
find . -type f -name '*.cdb' -exec sqlite3 {} \
    "SELECT (datas.id || ' ' || 3 || ' --' || name) FROM datas INNER JOIN texts ON datas.id=texts.id WHERE ot == 0x100|0x200|0x400 ORDER BY datas.id" \; \
    | tee -a $OUTPUT_PRERELEASE
#Attempt to make the hashes not collide
echo "1 -1" >> $OUTPUT_PRERELEASE
if [[ -f $TEMPLATE_BANLIST ]]; then
	cat $TEMPLATE_BANLIST >> $OUTPUT_OFFICIAL
	cat $TEMPLATE_BANLIST >> $OUTPUT_PRERELEASE
fi
