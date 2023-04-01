import { FastifyPluginAsync } from "fastify";
import services from "../../services";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const document = await services.user.insert({
      nome: "Alan",
      idade: 23,
      email: "alan@email.com",
    });

    return { request: await services.user.find({ _id: document._id }) };
  });
};

export default example;
