import { DbUsers } from "../../models";

export const insertUser = async (
  document: {
    nome: string;
    idade: number;
    email: string;
  },
  options?: object
) => {
  return DbUsers.inserir(document, options);
};
