import { Collection } from "mongodb";
import { IMongoSchema, IValidador } from "../global";
import { getDb } from "./database";

export const modelMap = new Map();

export const MetodosEnum = {
  AGGREGATE: "aggregate",
  ATUALIZAR: "atualizar",
  CONSULTAR: "consultar",
  INSERIR: "inserir",
  RECUPERAR: "recuperar",
  RECUPERAR_POR_ID: "recuperarPorId",
  REMOVER: "remover",
  TOTAL: "total",
};

export class Model {
  collectionName: string;
  documentIndexes?: Array<any>;
  allowedMethods: Array<string>;

  validator: IValidador;
  validationAction: string;
  validationLevel: string;

  methods: Array<string>;

  collection!: Collection;

  constructor(
    collectionName: string,
    documentSchema: IMongoSchema,
    allowedMethods: Array<string>,
    documentIndexes?: Array<any>
  ) {
    this.collectionName = collectionName;
    this.documentIndexes = documentIndexes;
    this.allowedMethods = allowedMethods;

    this.validator = documentSchema.validator;
    this.validationAction = documentSchema.validationAction;
    this.validationLevel = documentSchema.validationLevel;

    this.methods = [
      "aggregate",
      "atualizar",
      "consultar",
      "inserir",
      "recuperar",
      "recuperarPorId",
      "remover",
      "total",
    ];
  }

  getCollection(): Collection {
    this.collection = getDb().collection(this.collectionName);

    return this.collection;
  }

  aggregate(pipeline: Array<any>, options?: object) {
    return this.getCollection().aggregate(pipeline, options).toArray();
  }

  async atualizar(filter: object, update: object, options?: object) {
    const { value: doc } = await this.getCollection().findOneAndUpdate(
      filter,
      update,
      { ...options, returnDocument: "after" }
    );
    return doc;
  }

  consultar(
    filter: object,
    {
      limit = 0,
      skip = 0,
      options,
    }: { limit: number; skip: number; options?: object }
  ) {
    return this.getCollection()
      .find(filter, options)
      .limit(limit)
      .skip(skip)
      .toArray();
  }

  async inserir(document: object, options?: object) {
    const { insertedId } = await this.getCollection().insertOne(
      { ...document },
      options
    );
    return { _id: insertedId, ...document };
  }

  recuperar(filter: object, options?: object) {
    return this.getCollection().findOne(filter, options);
  }

  recuperarPorId(documentId: object, options?: object) {
    return this.getCollection().findOne({ _id: documentId }, options);
  }

  async remover(filter: object, options?: object) {
    const { value: doc } = await this.getCollection().findOneAndDelete(
      filter,
      options
    );
    return doc;
  }

  total(filter: object, options?: object) {
    return this.getCollection().countDocuments(filter, options);
  }
}

export const modelHandler = {
  get(target: Model, prop: string) {
    if (
      target.methods.includes(prop) &&
      !target.allowedMethods.includes(prop)
    ) {
      throw new Error(
        `o método [${prop}] não está disponível para essa collection.`
      );
    }

    const args: [Model, string, Model] = [
      arguments[0],
      arguments[1],
      arguments[2],
    ];

    return Reflect.get(...args);
  },
};

export const model = ({
  allowedMethods,
  documentIndexes,
  documentSchema,
  collectionName,
}: {
  allowedMethods: Array<string>;
  documentIndexes?: Array<any>;
  documentSchema: IMongoSchema;
  collectionName: string;
}) => {
  if (modelMap.has(collectionName)) {
    return modelMap.get(collectionName);
  }

  const newModel = new Model(
    collectionName,
    documentSchema,
    allowedMethods,
    documentIndexes
  );

  const newModelProxy = new Proxy(newModel, modelHandler);

  modelMap.set(collectionName, newModelProxy);

  return modelMap.get(collectionName);
};
