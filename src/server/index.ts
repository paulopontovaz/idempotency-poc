import { server } from "@/server/api";

console.log(`Server started listening on ${process.env.API_PORT}`);
Bun.serve({
    fetch: server.fetch,
    port: process.env.API_PORT,
});
