# Project Ignis card databases for EDOPro

These databases are automatically synchronized with servers. Please keep all bug reports and questions on Discord; do NOT open an issue or pull request. External contributions are not allowed here.

If you are submitting a database for a new unofficial addition, please submit a single new database to [Larry's fork](https://github.com/larry126/BabelCDB), where they will eventually be combined and merged back upstream. To submit such a pull request, first follow the contributing guidelines for the [script collection](https://github.com/ProjectIgnis/CardScripts). The pull request title should be the same, and the description should simply link to the pull request to the script collection.

## Guidelines for SQLite3 CDB files

* For new cards:
	* for each new set, add a `preRelease` cdb with its name
		* when that set is released, update the cards ID and remove the pre-release OT.
    		* if the cards are available in both TCG and OCG, move the cards to `official.cdb`. If they are limited to only one region, they can be kept in their current file, which should be renamed to `release`+setname.

* For fixes to existing cards:
	* changes made to the files in this repository are automatically imported to [the repository the users get updates from](https://github.com/ProjectIgnis/DeltaPuppetOfStrings).

* New products are not longer called "beta". They are "pre-release". As such, they take a corresponding OT, (hex= 0x100, dec=256).

* We have replaced the categories used as filter in the "Effect" button in Deck edit for 32 different categories.

* If you use DataEditorX, use this [English file](https://github.com/NaimSantos/DataEditorX/blob/master/DataEditorX/data/cardinfo_english.txt) with the updated archetype names/setcodes, the new OTs, and the new categories already mapped.

## GitHub Actions

Responsible for pushing database updates to [the repository the users get updates from]( https://github.com/DeltaPuppetOfStrings)
- new CDBs since [the last tag](https://github.com/ProjectIgnis/BabelCDB/tree/20200403) are directly committed
- delta databases are computed for databases already present and committed
	- a delta database is a database containing only new or changed rows compared to the previous version
- files that were deleted since the last Actions run are also deleted in the other repository
- if a pushed HEAD commit title contains `[ci skip]`, `[skip ci]`, `[actions skip]`, or `[skip actions]`, this is skipped.

## Guidelines for passcodes

Announced OCG/TCG cards receive a nine-digit prerelease passcode until they are
released as official product, when the official passcode is used. Speed Duel has
[its own policy](https://github.com/ProjectIgnis/CardScripts/wiki/Skill-Documentation#cdb-handling)
with the `30ZYYYXXX` range and Rush Duel has its own policy in the `160ZYYXXX` range.

- `XXX` is the card index within its set
- `Y` or `YY` is the set index, incremented by one for each chronological set of that product type
	- For Structure Decks, `YY` comes from the prefix, e.g. SD38, ST18, SR10
	- For Structure Deck Enhancement Packs, they share `YY` with the Deck and add 50 to `XXX`
	- For Deck Build Packs, `YY` counts up from the previous one
	- For Duelist Packs, `YY` comes the prefix
	- TODO: there is potential overlap with this above scheme, to be eventually reworked
- Main set: `10ZZYYXXX`
	- Series `ZZ`: currently 11
- Side set: `1002YYXXX`
	- All VJMP-JP (V Jump) promos are considered part of set 200
	- All WJMP-JP (Weekly Shounen Jump) promos are considered part of set 203
	- All SJMP-JP (Saikyou Jump) promos are considered part of set 204
- Structure Deck and Starter Deck: `1003YYXXX`
- Deck Build Pack and Duelist Pack: `1004YYXXX`
- Rush Duel sets: `160ZYYXXX`
	- `Z` product type
	- 0: KP Deck Modification Pack "main booster"
	- 2: CP Character Pack "side booster"
	- 3: ST Starter Deck
	- 4: Promos

Unofficial cards fall under numerous ranges due to historical reasons but are
slowly being reworked and reorganized to the `511YYYXXX` range.

Cards with passcodes aliased to a passcode within 10 are treated as alternate
artworks.

### Upcoming sets

Release date | Set | Prefix | Prerelease passcode
--- | --- | --- | ---

