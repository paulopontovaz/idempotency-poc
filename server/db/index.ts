import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./models";

const pool = new Pool({
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASS ?? "postgres",
    database: process.env.DB_NAME ?? "idempotency_poc",
    ssl: process.env.DRIZZLE_SSL !== "false",
});

export const db = drizzle(pool, { schema });
