# Project Ignis card databases for EDOPro

These databases are automatically synchronized with servers. Please keep all bug reports and questions on Discord; do NOT open an issue or pull request. External contributions are not allowed here.

If you are submitting a database for a new unofficial addition, please submit a single new database to [Larry's fork](https://github.com/larry126/BabelCDB), where they will eventually be combined and merged back upstream. To submit such a pull request, first follow the contributing guidelines for the [script collection](https://github.com/ProjectIgnis/CardScripts). The pull request title should be the same, and the description should simply link to the pull request to the script collection.

## Guidelines for SQLite3 CDB files

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

## Guidelines for passcodes

Announced OCG/TCG cards receive a nine-digit prerelease passcode until they are
released as official product, when the official passcode is used. Speed Duel has
[its own policy](https://github.com/ProjectIgnis/CardScripts/wiki/Skill-Documentation#cdb-handling)
with the `30ZYYYXXX` range and Rush Duel has its own policy in the `160ZYYXXX` range.

- `XXX` is the card index within its set
- `Y` or `YY` is the set index, incremented by one for each chronological set of that product type
- Main set: `10ZZYYXXX`
	- Series `ZZ`: currently 11
- Side set: `1002YYXXX`
	- All VJMP-JP (V Jump) promos are considered part of set 200
	- All WJMP-JP (Weekly Shounen Jump) promos are considered part of set 203
	- All SJMP-JP (Saikyou Jump) promos are considered part of set 204
- Structure Deck R: `10030YXXX`
- Starter Deck: `10031YXXX`
- Structure Deck (other): `10033YXXX`
- Deck Build Pack and Duelist Pack: `1004YYXXX`
- Rush Duel sets: `160ZYYXXX`
	- `Z` product type (0 - booster, 1 - starter, 2 - promo)

Unofficial cards fall under numerous ranges due to historical reasons but are
slowly being reworked and reorganized to the `511YYYXXX` range.

Cards with passcodes aliased to a passcode within 10 are treated as alternate
artworks.

### Upcoming sets
Release date | Set | Prefix | Prerelease passcode
--- | --- | --- | ---
2020-04-04 | [Starter Deck Yuga - Cut Through! Sevens Road!!][RD/ST01-JP]      | RD/ST01-JP | 160301XXX
2020-04-04 | [Starter Deck Luke - Explosive Supremacy! Dragears!!][RD/ST02-JP] | RD/ST02-JP | 160302XXX
2020-04-04 | [Starter Deck Set - Yuga vs. Luke][RD/VS01-JP]                    | RD/VS01-JP | 160401XXX
2020-04-11 | [Deck Modification Pack - Hyperspeed Rush Road!!][RD/KP01-JP]     | RD/KP01-JP | 160001XXX
2020-04-18 | [Rise of the Duelist][ROTD-JP]                                    | ROTD-JP | 101101XXX
2020-04-24 | [The Valuable Book 22 promotional cards][VB22-JP]                 | VB22-JP | 100264XXX
2020-05-30 | [Duelist Pack: Duelists of Gloom][DP24-JP]                        | DP24-JP | 100424XXX
2020-06-18 | [Toon Chaos][TOCH-EN]                                             | TOCH-EN | 100268XXX
2020-06-20 | [Collection Pack 2020][CP20-JP]                                   | CP20-JP | 100266XXX
2020-07-04 | [Structure Deck: Masters of the Spiritual Arts][SD39-JP]          | SD39-JP | 100339XXX
2020-07-24 | [Battles of Legend: Armageddon][BLAR-EN]                          | BLAR-EN |
2020-08-?? | [Prismatic Special Pack][VP20-JP]                                  | VP20-JP | 100267XXX
2020-08-08 | [Phantom Rage][PHRA]                                              | ????-JP | | 101102XXX
2020-08-27 | [Tin of Lost Memories][LOME]                                      | ????-EN | 100268XXX
2020-08-29 | [Structure Deck R: Dragunity Drive][SR11-JP]                      | SR11-JP | 100340XXX
2020-09-12 | [Deck Build Pack: Genesis Impactors][DBGI]                        | | 100269XXX
2020-09-19 | [Character Pack - Gakuto/Roa/Romin][CPGR]                         | RD/????-JP | 160003XXX
2020-09-21 | [V Jump Fall 2020 subscription bonus][VJMP9]                     | VJMP-JP1?? | 100200XXX
2020-10-03 | [World Premiere Pack 2020][WP2020]                                | | 100270XXX

[RD/ST01-JP]: https://yugipedia.com/wiki/Starter_Deck_Yuga_-_Cut_Through!_Sevens_Road!!
[RD/ST02-JP]: https://yugipedia.com/wiki/Starter_Deck_Rook_-_Explosive_Supremacy!_Dragears!!
[RD/VS01-JP]: https://yugipedia.com/wiki/Starter_Deck_Set_-_Yuga_vs._Rook
[RD/KP01-JP]: https://yugipedia.com/wiki/Deck_Modification_Pack_-_Hyperspeed_Rush_Road!!
[ROTD-JP]: https://yugipedia.com/wiki/Rise_of_the_Duelist
[VB22-JP]: https://yugipedia.com/wiki/The_Valuable_Book_22_promotional_cards
[DP24-JP]: https://yugipedia.com/wiki/Duelist_Pack:_Duelists_of_Gloom
[TOCH-EN]: https://yugipedia.com/wiki/Toon_Chaos
[CP20-JP]: https://yugipedia.com/wiki/Collection_Pack_2020
[SD39-JP]: https://yugipedia.com/wiki/Structure_Deck:_Masters_of_the_Spiritual_Arts
[BLAR-EN]: https://yugipedia.com/wiki/Battles_of_Legend:_Armageddon
[VP20-JP]: https://yugipedia.com/wiki/Prismatic_Special_Pack
[PHRA]: https://yugipedia.com/wiki/Phantom_Rage
[LOME]: https://yugipedia.com/wiki/Tin_of_Lost_Memories
[SR11-JP]: https://yugipedia.com/wiki/Structure_Deck_R:_Dragunity_Drive
[DBGI]: https://yugipedia.com/wiki/Deck_Build_Pack:_Genesis_Impactors
[CPGR]: https://yugipedia.com/wiki/Character_Pack_-_Gakuto/Roa/Romin
[VJMP9]: https://yugipedia.com/wiki/V_Jump_Fall_2020_subscription_bonus
[WP2020]: https://yugipedia.com/wiki/World_Premiere_Pack_2020
