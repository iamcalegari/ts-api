// External Dependencies
import { MongoClient, ObjectId, Db } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

// Global Variables
let client: MongoClient | any, db: Db | any;

export const connect = async (url: string, dbName: string) => {
  if (db) {
    return true;
  }

  const { mongoUrl, mongoDbName } = getDatabaseUrlAndDbName(url, dbName);

  client = await MongoClient.connect(mongoUrl);

  db = client.db(mongoDbName);

  return true;
};

export const disconnect = async () => {
  if (!db) {
    return false;
  }

  await client.close();

  client = false;
  db = false;

  return false;
};

export const objectId = (objId?: string) => {
  return new ObjectId(objId);
};

export const getDb = () => {
  return db;
};

export const startSession = () => {
  return client.startSession({});
};

const getDatabaseUrlAndDbName = (url: string, dbName: string) => {
  const mongoDbName = process.env.MONGODB_DB_NAME
    ? `${process.env.MONGODB_DB_NAME}`
    : dbName;
  const mongoUrl = process.env.MONGODB_URI ? gerarUrl() : url;

  return { mongoUrl, mongoDbName };
};

const gerarUrl = () => {
  const urlBase = `${process.env.MONGODB_URI}`;
  const urlVariables = [
    ["<cluster>", process.env.MONGODB_CLUSTER || ""],
    ["<defaultauthdb>", process.env.MONGODB_AUTHDB || ""],
    ["<host>", process.env.MONGODB_HOST || ""],
    ["<options>", process.env.MONGODB_OPTIONS || ""],
    ["<password>", process.env.MONGODB_PWD || ""],
    ["<user>", process.env.MONGODB_USER || ""],
  ];

  return urlVariables.reduce(
    (str, [strVar, envVar]) => str.replace(strVar, envVar),
    urlBase
  );
};
