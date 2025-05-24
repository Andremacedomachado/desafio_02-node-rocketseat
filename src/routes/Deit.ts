import { z } from "zod";
import { FastifyInstance } from "../../node_modules/fastify/fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export function deitRoutes(app: FastifyInstance) {
  app.get("/", async (req, reply) => {
    const diets = await knex("diets").select("*");

    return reply.status(200).send({ diets });
  });

  app.get("/:id", async (req, reply) => {
    const GetDietRequestParams = z.object({
      id: z.string(),
    });

    const { id } = GetDietRequestParams.parse(req.params);
    const [diet] = await knex("diets").select("*").where({
      id,
    });

    return reply.status(200).send({ diets: diet ?? {} });
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

  app.put("/:id", async (req, reply) => {
    const PutDietRequestBody = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      type: z.boolean().optional(),
      date_diet: z.coerce.date().optional(),
    });

    type UpdateDietData = z.infer<typeof PutDietRequestBody>;

    const PutDietRequestParams = z.object({
      id: z.string().uuid(),
    });

    const { name, type, date_diet, description } = PutDietRequestBody.parse(
      req.body
    );
    const { id } = PutDietRequestParams.parse(req.params);

    const [dietExists] = await knex("diets").select("*").where({
      id,
    });

    if (!dietExists) {
      return reply.status(400).send({ message: "Diet is not exists" });
    }

    const dataToUpdate = {
      name,
      description,
      type,
      date_diet: date_diet ? date_diet.toISOString() : undefined,
    };

    Object.entries(dataToUpdate).forEach(([key, value]) => {
      if (typeof value === "undefined") {
        delete dataToUpdate[key as keyof UpdateDietData];
      }
    });

    await knex("diets")
      .update({
        ...dataToUpdate,
      })
      .where({
        id,
      });
    return reply.status(204).send();
  });
}
