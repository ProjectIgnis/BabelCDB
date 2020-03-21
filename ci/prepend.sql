PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "datas" (
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
CREATE TABLE IF NOT EXISTS "texts" (
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
