import ky from "ky";

const BASE_API_URL =
    process.env.NODE_ENV === "dev"
        ? "http://localhost:9000/api"
        : import.meta.env.VITE_API_BASE_URL;

export const PAYMENTS_API_URL = `${BASE_API_URL}/payments`;

export const api = ky.extend({ retry: 0 });
