import { Hono } from "hono";
import { cors } from "hono/cors";
import { cacheMiddleware } from "./middlewares/cacheMiddleware";
import { paymentsRouter } from "./routes";

const server = new Hono().basePath("/api");

if (process.env.NODE_ENV === "dev") {
    server.use(cors());
}
server.use("*", cacheMiddleware);
server.route("/payments", paymentsRouter);

export { server };
