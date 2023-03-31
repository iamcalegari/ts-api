import { ClientSession } from "mongodb";
import * as db from "./database";
import { model, modelMap, MetodosEnum } from "./model";

export default ({
  afterConnect = async () => {},
  beforeDisconnect = async () => {},
}) => ({
  ...db,
  model,
  modelMap,
  MetodosEnum,
  connect: async (url: string, dbName: string) => {
    const isConnected = await db.connect(url, dbName);

    await afterConnect();

    return isConnected;
  },
  disconnect: async () => {
    await beforeDisconnect();

    return db.disconnect();
  },
  withTransaction: async (fn: Function) => {
    const clientSession = db.startSession();

    let resultadoOperacao;

    try {
      await clientSession.withTransaction(async (session: ClientSession) => {
        resultadoOperacao = await fn(session);
      });
      clientSession.endSession();
    } catch (err) {
      clientSession.endSession();
      throw err;
    }

    return resultadoOperacao;
  },
});
