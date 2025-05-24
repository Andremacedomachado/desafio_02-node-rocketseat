// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex";
declare module "knex/types/tables" {
  export interface Tables {
    diets: {
      id: string;
      name: string;
      description: string;
      type: boolean;
      date_diet: string;
      create_at: string;
    };
  }
}
