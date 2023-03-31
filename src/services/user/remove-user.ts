import { DbUsers } from "../../models";

export const removeUser = async (filter: object, options?: object) => {
  return DbUsers.remover(filter, options);
};
