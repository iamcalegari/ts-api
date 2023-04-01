import { ISchema } from "../global";
import { schemaBuilder } from "./helpers/builders";

const documentSchema: ISchema = {
  bsonType: "object",
  properties: {
    nome: {
      bsonType: "string",
      description: "Nome do usuário.",
    },
    idade: {
      bsonType: "number",
      description: "Idade do usuário",
    },
    email: {
      bsonType: "string",
      description: "Email do usuário",
    },
  },
  required: ["nome", "idade", "email"],
};

export const userSchema = schemaBuilder(documentSchema);
