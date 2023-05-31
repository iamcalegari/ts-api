import { model, MetodosEnum } from "../db/model";
import { userSchema } from "../schemas/User";

const METODOS_DISPONIVEIS = Object.values(MetodosEnum);

export const DbUsers: {
  inserir: (
    document: object,
    options?: object
  ) => {
    _id: "object";
    name: "string";
    email: "string";
    password: "string";
  };

  recuperar: (
    filter?: object,
    options?: object
  ) => {
    name: "string";
    email: "string";
    password: "string";
  };
} = model({
  collectionName: "users",
  documentSchema: userSchema,
  allowedMethods: METODOS_DISPONIVEIS,
});
