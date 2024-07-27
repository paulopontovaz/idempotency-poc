import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./db/models/index.ts",
    out: "./db/migrations",
    dbCredentials: {
        database: "idempotency_poc",
        host: "localhost",
        password: "postgres",
        port: 5432,
        user: "postgres",
        ssl: process.env.DRIZZLE_SSL !== "false",
    },
});
