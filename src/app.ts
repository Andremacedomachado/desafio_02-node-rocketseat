import fastify from "../node_modules/fastify/fastify";
import { deitRoutes } from "./routes/Deit";

export const app = fastify();

app.register(deitRoutes, {
  prefix: "/deits",
});
