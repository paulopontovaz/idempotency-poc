import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Person,
    PersonUpdate,
} from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";
import { getPersonsQueryKey } from "./useGetAllPersons";

type EditPersonResponse = {
    person: Person;
};

export const editPersonRequest = async (
    person: PersonUpdate,
): Promise<EditPersonResponse> =>
    (await api
        .patch(`${PERSONS_API_URL}/${person.id}`, {
            json: person,
        })
        .json()) as EditPersonResponse;

export const useEditPerson = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editPerson } = useMutation({
        mutationFn: editPersonRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPersonsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editPerson };
};
