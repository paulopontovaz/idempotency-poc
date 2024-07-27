import { Hono } from "hono";
import { cors } from "hono/cors";
import { personsRouter } from "./routes";

const server = new Hono().basePath("/api");

if (process.env.NODE_ENV === "dev") {
    server.use(cors());
}

server.route("/persons", personsRouter);

export { server };
