import { Type, Static, TSchema } from "@sinclair/typebox";
import { TypeSystem } from "@sinclair/typebox/system";
import { IProperty, ISchema } from "../global";
import { schemaBuilder } from "./helpers/builders";

export const documentSchema: ISchema = {
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

// interface IDocument {}
const fn = () => {
  const props = [];
  for (const [name, { bsonType }] of Object.entries(
    documentSchema.properties
  )) {
    if (documentSchema.required.includes(name)) {
      props.push(
        Type.Object({
          [name]: Type.Symbol({ title: bsonType }),
        })
      );
    } else {
      props.push(
        Type.Object({
          [name]: Type.Optional(Type.Symbol({ title: bsonType })),
        })
      );
    }
  }

  return Type.Composite(props);
};

export const docType = fn();

export const userSchema = schemaBuilder(documentSchema);
