import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("diets", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description");
    table.string("type");
    table.timestamp("date_diet");
    table.timestamp("create_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("diets");
}
