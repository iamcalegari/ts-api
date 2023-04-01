import { IMongoSchema, ISchema } from "../../../global";

export const schemaBuilder = (schema: ISchema): IMongoSchema => {
  return {
    validationAction: "error",
    validationLevel: "strict",
    validator: {
      $jsonSchema: {
        additionalProperties: false,
        bsonType: "object",
        properties: {
          ...schema.properties,
          _id: {
            bsonType: "objectId",
            description: "Identificador único do registro no MongoDB",
          },
        },
        required: [...schema.required],
      },
    },
  };
};
