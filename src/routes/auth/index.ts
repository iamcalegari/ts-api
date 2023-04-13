import { FastifyPluginAsync } from "fastify";
import * as bcrypt from "bcrypt";

import { TRegisterBody, TRegisterOpts } from "./types";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: TRegisterBody }>(
    "/register",
    TRegisterOpts,
    async (request, reply) => {
      const { password } = request.body;
      const hPassword = bcrypt.hash(password, 10);

      await fastify.save.User.insert({
        ...request.body,
        password: hPassword,
      });

      return "Aroww!";
    }
  );

  fastify.post("/login", async (request, reply) => {
    return "Aroww!";
  });
};

export default example;
