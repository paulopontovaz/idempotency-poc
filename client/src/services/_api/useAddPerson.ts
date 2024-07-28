import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Person,
    PersonInsert,
} from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";
import { getPersonsQueryKey } from "./useGetAllPersons";
import { useIdempotencyKey } from "./useIdempotencyKey";

type AddPersonResponse = { person: Person };

export const addPersonRequest =
    (getIdempotencyKeyFunction: (body: unknown) => string) =>
    async (person: PersonInsert): Promise<AddPersonResponse> => {
        const idempotencyKey = getIdempotencyKeyFunction(person);

        return (await api
            .post(PERSONS_API_URL, {
                json: person,
                headers: {
                    "Idempotency-Key": idempotencyKey,
                },
            })
            .json()) as AddPersonResponse;
    };

export const useAddPerson = () => {
    const { getIdempotencyKey } = useIdempotencyKey();
    const queryClient = useQueryClient();

    const { mutateAsync: addPerson } = useMutation({
        mutationFn: addPersonRequest(getIdempotencyKey),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPersonsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addPerson };
};
