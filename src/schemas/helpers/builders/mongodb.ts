import { IMongoSchema, ISchema } from "../../../global";

export const schemaBuilder = (schema: ISchema): IMongoSchema => {
  return {
    validator: {
      $jsonSchema: {
        bsonType: schema.bsonType,
        properties: schema.properties,
        required: schema.required,
      },
    },
  };
};
