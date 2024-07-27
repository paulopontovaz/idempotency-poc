import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { PERSONS_API_URL } from "./_common";

export const deletePersonRequest = async (personId: number): Promise<number> =>
    (await ky.delete(`${PERSONS_API_URL}/${personId}`).json()) as number;

export const useDeletePerson = () => {

    const { mutateAsync: deletePerson } = useMutation({
        mutationFn: deletePersonRequest,
    });

    return { deletePerson };
};
