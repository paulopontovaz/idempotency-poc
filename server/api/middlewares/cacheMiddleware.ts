import { createMiddleware } from "hono/factory";
import { redisClient } from "../../redis/redisClient";

const IDEMPOTENCY_KEY_HEADER = "Idempotency-Key";

export const cacheMiddleware = createMiddleware(async (c, next) => {
    const cacheKey = c.req.header(IDEMPOTENCY_KEY_HEADER);

    console.log("##### cacheMiddleware cacheKey:", { cacheKey });

    if (cacheKey) {
        const cachedResponseString = await redisClient.GET(cacheKey);

        if (cachedResponseString) {
            const { body, status } = JSON.parse(cachedResponseString);
            return c.json(body, status);
        }
    }

    await next();

    if (cacheKey) {
        const response = JSON.stringify({
            body: await c.res.json(),
            status: c.res.status,
        });
        await redisClient.SET(cacheKey, response, { EX: 10 });
    }
});
