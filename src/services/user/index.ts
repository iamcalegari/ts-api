import { findUser } from "./find-user";
import { insertUser } from "./create-user";
import { removeUser } from "./remove-user";
import { updateUser } from "./update-user";

export default {
  find: findUser,
  insert: insertUser,
  remove: removeUser,
  update: updateUser,
};
