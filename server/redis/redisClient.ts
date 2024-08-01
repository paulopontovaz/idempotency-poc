import { createClient } from "redis";

export const redisClient = await createClient(
    process.env.REDIS_HOST
        ? {
              url: `redis://${process.env.REDIS_HOST}:6379/0`,
          }
        : undefined,
)
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

process.on("exit", () => redisClient.quit());
