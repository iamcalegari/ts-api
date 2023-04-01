import { FastifyPluginAsync } from "fastify";
import services from "../../services";

// import db from "../../db";
// import { config } from "../../config";

// const Db = db();

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    await services.user.insert({
      nome: "Alan",
      idade: 23,
      email: "alan@email.com",
    });

    await services.user.insert({
      nome: "Lari",
      idade: 23,
    });

    return { request: await services.user.find() };
  });
};

export default example;
