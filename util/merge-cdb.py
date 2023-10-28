#!/bin/env python3
"""
merge-cdb.py
=====================================================

Merge all CDBs together in a directory, following the same semantics that
a client or server would do.
"""
import os
import sqlite3
import sys

# Yoinked from Multirole/YGOPro/CardDatabase.cpp
DB_SCHEMA_1 = '''
CREATE TABLE "datas" (
	"id"        INTEGER,
	"ot"        INTEGER,
	"alias"     INTEGER,
	"setcode"   INTEGER,
	"type"      INTEGER,
	"atk"       INTEGER,
	"def"       INTEGER,
	"level"     INTEGER,
	"race"      INTEGER,
	"attribute" INTEGER,
	"category"  INTEGER,
	PRIMARY KEY("id")
);
'''
DB_SCHEMA_2 = '''
CREATE TABLE "texts" (
	"id"    INTEGER,
	"name"  TEXT,
	"desc"  TEXT,
	"str1"  TEXT,
	"str2"  TEXT,
	"str3"  TEXT,
	"str4"  TEXT,
	"str5"  TEXT,
	"str6"  TEXT,
	"str7"  TEXT,
	"str8"  TEXT,
	"str9"  TEXT,
	"str10" TEXT,
	"str11" TEXT,
	"str12" TEXT,
	"str13" TEXT,
	"str14" TEXT,
	"str15" TEXT,
	"str16" TEXT,
	PRIMARY KEY("id")
);
'''
ATTACH_STMT = '''
ATTACH ? AS toMerge;
'''
MERGE_DATAS_STMT = '''
INSERT OR REPLACE INTO datas SELECT * FROM toMerge.datas;
'''
MERGE_TEXTS_STMT = '''
INSERT OR REPLACE INTO texts SELECT * FROM toMerge.texts;
'''
DETACH_STMT = '''
DETACH toMerge;
'''

def print_usage():
	print(
	f"""Usage: {sys.argv[0]} [Directory] [Filename]
	[Directory] => Directory from where to get .cdb files
	[Filename] => Final filename where all merged databases will be stored.
	Example: ./merge-cdb.py .. merged.cdb"""
	)

def main() -> int:
	if len(sys.argv) <= 2:
		print_usage()
		return 1

	db_directory = os.path.abspath(sys.argv[1])

	filtered_filenames = []
	for filename in next(os.walk(db_directory), (None, None, []))[2]:
		if not filename.endswith('.cdb'):
			continue
		filtered_filenames.append(f"{db_directory}/{filename}")

	if len(filtered_filenames) == 0:
		print(f"No databases to be merged found in '{db_directory}'", file=sys.stderr)
		return 2

	filtered_filenames.sort()

	merged_db_filename = os.path.abspath(sys.argv[2])
	overriden = False

	if os.path.isfile(merged_db_filename):
		os.remove(merged_db_filename)
		overriden = True

	print(f"Merging the following into '{merged_db_filename}' {'(Overriden)' if overriden else ''}")

	conn = sqlite3.connect(merged_db_filename)
	conn.execute(DB_SCHEMA_1)
	conn.execute(DB_SCHEMA_2)
	for filename in filtered_filenames:
		print(f"... '{filename}'")
		conn.execute(ATTACH_STMT, (filename,))
		conn.execute(MERGE_DATAS_STMT)
		conn.execute(MERGE_TEXTS_STMT)
		conn.commit()
		conn.execute(DETACH_STMT)
	conn.commit()
	conn.close()

	return 0

if __name__ == '__main__':
	sys.exit(main())
