# Project Ignis card databases for EDOPro

These databases are automatically synchronized with servers. Please keep all bug reports and questions on Discord; do NOT open an issue or pull request. External contributions are not allowed here.

If you are submitting a database for a new unofficial addition, please submit a single new database to [Larry's fork](https://github.com/larry126/BabelCDB), where they will eventually be combined and merged back upstream. To submit such a pull request, first follow the contributing guidelines for the [script collection](https://github.com/ProjectIgnis/CardScripts). The pull request title should be the same, and the description should simply link to the pull request to the script collection.

## Guidelines for SQLite3 CDB files:

* For new cards:
	* for each new set, add a `preRelease` cdb with its name
		* when that set is released, update the cards ID and remove the pre-release OT, then move the cards to `official.cdb`.

* For fixes to existing cards:
	* for official cards:
		* if the card is already in a cdb in [the repository the users get updates from]( https://github.com/ProjectIgnis/DeltaHopeHarbinger), edit the entry in the corresponding file here, so it gets committed over there.

		* if not, add it to one of the following files here:
			* `fixSetcode.cdb`: for changes in the setcodes of the card.
			* `fixString.cdb`: for changes in the strings used by the card, including card text.
			* `fixOT.cdb`: for changes in the OTs of the card.
			* `fixMisc.cdb`: for changes not listed above. Please describe what you have changed.

	* for unofficial cards:
		* same as above, but add `-unofficial` to the file name. Example: `fixMisc-unofficial.cdb`

* New products are not longer called "beta". They are "pre-release". As such, they take a corresponding OT, (hex= 0x100, dec=256).

* We have replaced the categories used as filter in the "Effect" button in Deck edit for 32 different categories.

* If you use DataEditorX, use this [English file](https://github.com/NaimSantos/DataEditorX/blob/master/DataEditorX/data/cardinfo_english.txt) with the updated archetype names/setcodes, the new OTs, and the new categories already mapped.

## GitHub Actions

Responsible for pushing database updates to [the repository the users get updates from]( https://github.com/ProjectIgnis/DeltaHopeHarbinger)
- new CDBs since [the last tag](https://github.com/ProjectIgnis/BabelCDB/tree/20200403) are directly committed
- delta databases are computed for databases already present and committed
  - a delta database is a database containing only new or changed rows compared to the previous version
- files that were deleted since the last Actions run are also deleted in the other repository
- if a pushed HEAD commit title contains `[ci skip]`, `[skip ci]`, `[actions skip]`, or `[skip actions]`, this is skipped.

## Guidelines for passcodes/IDs for new sets:

* Cards from new products receive a nine-digit passcode, until they are offially released, when the official passcode is used. See list below.
	* 2020-04-04 - Starter Deck Yuga - Cut Through! Sevens Road!! (RD/ST01-JP): 160301000
	* 2020-04-04 - Starter Deck Luke - Explosive Supremacy! Dragears!! (RD/ST02-JP): 160302000
	* 2020-04-04 - Starter Deck Set - Yuga vs. Luke (RD/VS01-JP): 160401000
	* 2020-04-11 - Deck Modification Pack - Hyperspeed Rush Road!! (RD/KP01-JP): 160001000
	* 2020-04-18 - Rise of the Duelist (ROTD-JP): 101101000
	* 2020-04-24 - The Valuable Book 22 promotional cards (VB22-JP): 100264000
	* 2020-05-16 - Duelist Pack: Duelists of Gloom (DP24-JP): 100424000
	* 2020-06-06 - Collectors Pack 2020 (CP20-JP): 100266000
	* 2020-06-20 - Structure Deck: Masters of the Spiritual Arts (SD39-JP): 100339000
