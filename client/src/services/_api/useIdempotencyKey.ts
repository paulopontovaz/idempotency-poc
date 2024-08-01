import hash from "hash.js";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export const useIdempotencyKey = () => {
    const idempotencyKeyUuid = useMemo(() => uuidv4(), []);

    const getIdempotencyKey = (parameters: unknown) => {
        const dataToHash = JSON.stringify(parameters) + idempotencyKeyUuid;
        const idempotencyKey = hash.sha256().update(dataToHash).digest("hex");

        return idempotencyKey;
    };

    return { getIdempotencyKey, idempotencyKeyUuid };
};
