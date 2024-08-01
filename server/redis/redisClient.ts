import { createClient } from "redis";

export const redisClient = await createClient({
    url: `redis://${process.env.REDIS_HOST ?? "localhost"}:6379}/0`,
})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

process.on("exit", () => redisClient.quit());
