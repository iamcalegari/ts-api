export interface IProperty {
  bsonType: string;
  description: string;
  properties?: IProperties;
  required?: Array<string>;
  enum?: Array<string>;
}

interface IProperties {
  [key: string]: IProperty;
}

export interface ISchema {
  bsonType: string;
  properties: IProperties;
  required: Array<string>;
}

export interface IJsonSchema {
  additionalProperties: boolean;
  bsonType: string;
  properties: IProperties;
  required: Array<string>;
}

export interface IValidador {
  $jsonSchema: IJsonSchema;
}

export interface IMongoSchema {
  validationAction: string;
  validationLevel: string;
  validator: IValidador;
}
