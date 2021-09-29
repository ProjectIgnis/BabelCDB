#!/bin/env python3

from os import walk
import sqlite3
import sys

"""
merge-cdb.py - merge all CDBs together in a directory
=====================================================

TODO

"""

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
	print("Usage: {} [Directory] [Filename]".format(sys.argv[0]))
	print("[Directory] => Directory relative to working directory from where to get .cdb files")
	print("[Filename] => Final filename where all merged databases will be stored.")

if __name__ == '__main__':
	if len(sys.argv) <= 2:
		print_usage()
		sys.exit(1)
	connection = sqlite3.connect(sys.argv[2])
	connection.execute(DB_SCHEMA_1)
	connection.execute(DB_SCHEMA_2)
	for filename in next(walk(sys.argv[1]), (None, None, []))[2]:
		if not filename.endswith('.cdb'):
			continue
		print(filename)
		connection.execute(ATTACH_STMT, (filename,))
		connection.execute(MERGE_DATAS_STMT)
		connection.execute(MERGE_TEXTS_STMT)
		connection.commit()
		connection.execute(DETACH_STMT)
	connection.commit()
	connection.close()
