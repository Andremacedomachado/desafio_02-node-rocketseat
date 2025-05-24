import { FastifyInstance } from "../../node_modules/fastify/fastify";

export function deitRoutes(app: FastifyInstance) {
  app.get("/", (req, reply) => {
    return reply.status(200).send({ message: "server responding correctly" });
  });
}
