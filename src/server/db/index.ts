import * as schema from "@/server/db/models";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "postgres",
	database: "idempotency_poc",
	ssl: false,
});

export const db = drizzle(pool, { schema });
