import { personsRouter } from "@/server/api/routes";
import { Hono } from "hono";
import { cors } from "hono/cors";

const server = new Hono().basePath("/api");

if (process.env.NODE_ENV === "dev") {
    server.use("/api/*", cors());
}

server.route("/persons", personsRouter);

export { server };
