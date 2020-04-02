# Project Ignis card databases for EDOPro

These databases are automatically synchronized with servers.



## Guidelines for SQLite3 CDB files:

* For new cards:
	* for each new set, add a `preRelease` cdb with its name
		* when that set is released, update the cards ID and remove the pre-release OT, then move the cards to `official.cdb`.

* For fixes to existing cards:
	* if the card is already in a cdb in this repository, edit it in that file.

	* if the card is not in this repository, add it to one of the following files:
		* `fixSetcode.cdb`: for changes in the setcodes of the card.
		* `fixString.cdb`: for changes in the strings used by the card, including card text.
		* `fixOT.cdb`: for changes in the OTs of the card.
		* `fixMisc.cdb`: for changes not listed above. Please describe what you have changed.

* New products are not longer called "beta". They are "pre-release". As such, they take a corresponding OT, (hex= 0x100, dec=256).

* We have replaced the categories used as filter in the "Effect" button in Deck edit for 32 different categories.

* If you use DataeditorX, use this [English file](https://github.com/NaimSantos/DataEditorX/blob/master/DataEditorX/data/cardinfo_english.txt) with the updated archetype names/setcodes, the new OTs and the new categories already mapped.

## GitHub Actions

- commits new CDBs since the last tag directly to the delta repository.
- computes delta CDBs for CDBs modified since the last tag and commits these to the delta repository.
- deletes files that were deleted here since the last Actions run.

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
