import { Type, Static } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

const TRegisterRequest = Type.Object({
  name: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
});

const TRegisterResponse = Type.Object({
  token: Type.String(),
  name: Type.String(),
  email: Type.String(),
});

export const TRegisterOpts: RouteShorthandOptions = {
  schema: {
    body: TRegisterRequest,
    response: {
      201: TRegisterResponse,
    },
  },
};

export type TRegisterBody = Static<typeof TRegisterRequest>;
