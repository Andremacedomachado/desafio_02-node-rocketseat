import { FastifyInstance } from "../../node_modules/fastify/fastify";
import { knex } from "../database";

export function deitRoutes(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    const schema = await knex("diets").columnInfo();
    return reply
      .status(200)
      .send({ message: "server responding correctly", schema });
  });
}
