import { DbUsers } from "../../models";

export const findUser = async (filter: object, options?: object) => {
  return DbUsers.recuperar(filter, options);
};
