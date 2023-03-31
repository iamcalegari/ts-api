export interface IProperty {
  bsontype: String;
  description: String;
  properties?: IProperties;
  required?: Array<String>;
  enum?: Array<String>;
}

interface IProperties {
  [key: string]: IProperty;
}

export interface ISchema {
  bsonType: String;
  properties: IProperties;
  required: Array<String>;
}

export interface IJsonSchema {
  bsonType: String;
  properties: IProperties;
  required: Array<String>;
}

export interface IValidador {
  $jsonSchema: IJsonSchema;
}

export interface IMongoSchema {
  validator: IValidador;
}
