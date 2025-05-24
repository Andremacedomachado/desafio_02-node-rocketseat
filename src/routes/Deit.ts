import { z } from "zod";
import { FastifyInstance } from "../../node_modules/fastify/fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export function deitRoutes(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    const schema = await knex("diets").columnInfo();
    return reply
      .status(200)
      .send({ message: "server responding correctly", schema });
  });

  app.post("/", async (req, reply) => {
    const DietRequestSchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      date_diet: z.coerce.date().optional(),
      type: z.boolean(),
    });

    const { name, type, date_diet, description } = DietRequestSchema.parse(
      req.body
    );

    await knex("diets").insert({
      id: randomUUID(),
      name,
      description,
      type,
      date_diet: date_diet ? new Date(date_diet).toISOString() : undefined,
      create_at: new Date().toISOString(),
    });

    return reply.status(201).send();
  });
}
