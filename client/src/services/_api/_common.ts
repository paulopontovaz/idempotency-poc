import ky from "ky";
import { v4 as uuidv4 } from "uuid";

const BASE_API_URL =
    process.env.NODE_ENV === "dev"
        ? "http://localhost:9000/api"
        : import.meta.env.VITE_API_BASE_URL;

export const PERSONS_API_URL = `${BASE_API_URL}/persons`;

export const api = ky.extend({
    hooks: {
        beforeRequest: [
            (request) => {
                request.headers.set("Idempotency-Key", uuidv4());
            },
        ],
    },
});
