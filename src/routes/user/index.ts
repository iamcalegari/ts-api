import { FastifyPluginAsync } from "fastify";
import services from "../../services";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    // const document = await services.user.insert({
    //   name: "Alan",
    //   password: "senha123",
    //   email: "alan@email.com",
    // });

    return { request: await services.user.find({ email: "alan@email.com" }) };
  });
};

export default example;
