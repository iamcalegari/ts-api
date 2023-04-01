import { Db } from "mongodb";
import * as database from "./database";
import { modelMap, Model } from "./model";

export const collectionsSetup = async () => {
  const db = database.getDb();

  const modelArray = modelMap.values();

  for (const model of modelArray) {
    await setValidators(db, model);

    await setIndexes();
  }
};

const setValidators = async (db: Db, model: Model) => {
  await getCollectionInfo(db, model.collectionName);

  await db.command({
    collMod: model.collectionName,
    validator: { ...model.validator },
  });
};

const setIndexes = async () => {};

const getCollectionInfo = async (db: Db, collectionName: string) => {
  const [collection] = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collection) return collection;

  await db.createCollection(collectionName);

  const [newCollection] = await db
    .listCollections({ name: collectionName })
    .toArray();

  return newCollection;
};
