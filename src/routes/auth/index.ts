import { FastifyPluginAsync } from "fastify";
import * as bcrypt from "bcrypt";

import { TRegisterBody, TRegisterOpts, TLoginBody, TLoginOpts } from "./types";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: TRegisterBody }>(
    "/register",
    TRegisterOpts,
    async (request, reply) => {
      const { password } = request.body;
      const hPassword = await bcrypt.hash(password, 10);

      try {
        const user = await fastify.store.User.insert({
          ...request.body,
          password: hPassword,
        });

        const token = fastify.generateJWT(user.email);

        return reply.status(201).send({ ...user, token });
      } catch (err) {
        return Error("User cannot be inserted!");
      }
    }
  );

  fastify.post<{ Body: TLoginBody }>(
    "/login",
    TLoginOpts,
    async (request, reply) => {
      const { email, password } = request.body;

      const user = await fastify.store.User.find({ email });

      if (!user) return reply.status(404).send();

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err || !isValid)
          return reply.getHttpError(401, "Invalid credentials");

        const token = fastify.generateJWT(user.email);

        reply.status(200).send({ token, ...user });
      });

      return reply;
    }
  );
};

export default example;
