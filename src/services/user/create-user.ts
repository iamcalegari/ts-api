import { DbUsers } from "../../models";

export const insertUser = async (
  document: {
    name: string;
    email: string;
    password: string;
  },
  options?: object
) => DbUsers.inserir(document, options);
