import { ISchema } from "../global";
import { schemaBuilder } from "./helpers/builders";

export const documentSchema: ISchema = {
  bsonType: "object",
  properties: {
    name: {
      bsonType: "string",
      description: "Nome do usuário.",
    },
    password: {
      bsonType: "string",
      description: "Senha do usuário",
    },
    email: {
      bsonType: "string",
      description: "Email do usuário",
    },
  },
  required: ["name", "password", "email"],
};

export const userSchema = schemaBuilder(documentSchema);
