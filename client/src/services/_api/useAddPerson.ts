import { useMutation } from "@tanstack/react-query";
import type { Person } from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";

type AddPersonResponse = {
    person: Person;
};

export const addPersonRequest = async (
    description: string,
): Promise<AddPersonResponse> =>
    (await api
        .post(PERSONS_API_URL, {
            json: description,
        })
        .json()) as AddPersonResponse;

export const useAddPerson = () => {
    const { mutateAsync: addPerson } = useMutation({
        mutationFn: addPersonRequest,
    });

    return { addPerson };
};
