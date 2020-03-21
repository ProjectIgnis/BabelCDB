# Project Ignis card databases for EDOPro

These databases are automatically synchronized with servers.
- `cards.cdb` is automatically-generated with itself as a baseline and adding contents from Live2017Links
- `cards-unofficial.cdb` is automatically-generated with `cards-tf.cdb` as a baseline and contents from LiveanimeLinks
- `prerelease*.cdb` is automatically-generated from Live2017Links

GitHub Actions
- commits new CDBs since the last tag directly to the delta repository
- computes delta CDBs for CDBs modified since the last tag and commits these to the delta repository
