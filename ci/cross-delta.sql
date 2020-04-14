REPLACE INTO texts SELECT texts.* FROM current.texts INNER JOIN datas ON current.texts.id = datas.id;
REPLACE INTO datas SELECT datas.* FROM current.datas INNER JOIN texts ON current.datas.id = texts.id;
COMMIT;
