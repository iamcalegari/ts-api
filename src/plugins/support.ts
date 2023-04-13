import fp from "fastify-plugin";

import services from "../services";

export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });

  fastify.decorate("save", {
    User: services.user,
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    save: {
      User: typeof services.user;
    };
  }
}
