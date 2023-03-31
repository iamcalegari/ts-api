import { DbUsers } from "../../models";

export const insertUser = async (document: object, options?: object) => {
  return DbUsers.inserir(document, options);
};
