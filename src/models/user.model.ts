import { model, MetodosEnum } from "../db/model";
import { userSchema, documentSchema as document } from "../schemas/User";

const METODOS_DISPONIVEIS = Object.values(MetodosEnum);

export const DbUsers: { inserir: (document: object, options: object) => {} } =
  model({
    collectionName: "users",
    documentSchema: userSchema,
    allowedMethods: METODOS_DISPONIVEIS,
  });
