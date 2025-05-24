import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("diets");

  await knex.schema.createTable("diets", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description");
    table.string("type").notNullable();
    table.string("date_diet");
    table.string("create_at").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("diets");

  await knex.schema.createTable("diets", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description");
    table.string("type");
    table.timestamp("date_diet");
    table.timestamp("create_at").defaultTo(knex.fn.now()).notNullable();
  });
}
