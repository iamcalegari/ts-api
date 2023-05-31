import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import services from "../services";
import { fastifyRequestContext } from "@fastify/request-context";

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });

  fastify.register(fastifyRequestContext);

  fastify.register(fastifyJwt, {
    secret: "secret",
    sign: {
      expiresIn: "15 minutes",
    },
  });

  fastify.decorate("generateJWT", (email: string) => {
    return fastify.jwt.sign({ email });
  });

  fastify.decorate("store", {
    User: services.user,
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    generateJWT: (email: string) => string;
    store: {
      User: typeof services.user;
    };
  }
}

declare module "@fastify/request-context" {
  interface RequestContextData {
    user: typeof services.user;
  }
}
