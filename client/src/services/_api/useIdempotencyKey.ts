import hash from "hash.js";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export const useIdempotencyKey = () => {
    const idempotencyKeyUuidRef = useRef(uuidv4());

    const getIdempotencyKey = (parameters: unknown) => {
        const dataToHash =
            JSON.stringify(parameters) + idempotencyKeyUuidRef.current;
        const idempotencyKey = hash.sha256().update(dataToHash).digest("hex");

        return idempotencyKey;
    };

    return { getIdempotencyKey };
};
