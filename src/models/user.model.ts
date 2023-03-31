import { model, MetodosEnum } from "../db/model";
import { userSchema } from "../schemas/User";

const METODOS_DISPONIVEIS = Object.values(MetodosEnum);

export const DbUsers = model({
  collectionName: "users",
  documentSchema: userSchema,
  allowedMethods: METODOS_DISPONIVEIS,
});
