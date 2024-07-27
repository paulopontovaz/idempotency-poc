import { useMutation } from "@tanstack/react-query";
import type {
    Person,
    PersonUpdate,
} from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";

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
    const { mutateAsync: editPerson } = useMutation({
        mutationFn: editPersonRequest,
    });

    return { editPerson };
};
