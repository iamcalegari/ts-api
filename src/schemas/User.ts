import { ISchema } from "../global";
import { schemaBuilder } from "./helpers/builders";

const documentSchema: ISchema = {
  bsonType: "object",
  properties: {
    nome: {
      bsontype: "string",
      description: "Nome do usuário.",
    },
    idade: {
      bsontype: "number",
      description: "Idade do usuário",
    },
    email: {
      bsontype: "string",
      description: "Email do usuário",
    },
  },
  required: ["nome", "idade", "email"],
};

export const userSchema = schemaBuilder(documentSchema);
