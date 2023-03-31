import { IMongoSchema, ISchema } from "../../../global";

export const schemaBuilder = (schema: ISchema): IMongoSchema => {
  return {
    validationAction: "error",
    validationLevel: "strict",
    validator: {
      $jsonSchema: {
        bsonType: schema.bsonType,
        properties: schema.properties,
        required: schema.required,
      },
    },
  };
};
