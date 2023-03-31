import { DbUsers } from "../../models";

export const updateUser = async (
  filter: object,
  update: object,
  options?: object
) => {
  return DbUsers.atualizar(filter, { $set: update }, options);
};
