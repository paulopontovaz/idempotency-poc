import { createClient } from "redis";

export const redisClient = await createClient().connect();

process.on("exit", () => redisClient.quit());
