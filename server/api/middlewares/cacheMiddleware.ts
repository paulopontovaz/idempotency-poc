import { createMiddleware } from "hono/factory";
import { redisClient } from "../../redis/redisClient";

const IDEMPOTENCY_KEY_HEADER = "Idempotency-Key";
const LOCK_EXPIRY = 10;
const RESPONSE_CACHE_EXPIRY = 10;

export const cacheMiddleware = createMiddleware(async (c, next) => {
    const idempotencyKey = c.req.header(IDEMPOTENCY_KEY_HEADER);

    if (idempotencyKey) {
        console.log("##### cacheMiddleware cacheKey:", { idempotencyKey });

        const lockAcquired = await redisClient.SET(idempotencyKey, "locked", {
            EX: LOCK_EXPIRY,
            NX: true,
        });

        if (!lockAcquired) {
            const cachedResponseString = await redisClient.GET(idempotencyKey);

            if (cachedResponseString) {
                const cachedResponse = JSON.parse(cachedResponseString);
                const { body, status } = cachedResponse;
                console.log(
                    "##### cacheMiddleware retrieving cached response",
                    { cachedResponse },
                );
                return c.json(body, status);
            }

            return c.json({ error: "Concurrent request" }, 409);
        }

        try {
            await next();

            const response = JSON.stringify({
                body: await c.res.json(),
                status: c.res.status,
            });
            console.log("##### cacheMiddleware caching response", { response });
            await redisClient.SET(idempotencyKey, response, {
                EX: RESPONSE_CACHE_EXPIRY,
            });
        } catch (error) {
            await redisClient.DEL(idempotencyKey);
            return c.json({ error: "Error while processing cache." }, 500);
        }
    } else {
        await next();
    }
});
