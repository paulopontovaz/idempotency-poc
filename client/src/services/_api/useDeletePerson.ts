import { useMutation } from "@tanstack/react-query";
import { PERSONS_API_URL, api } from "./_common";

export const deletePersonRequest = async (personId: number): Promise<number> =>
    (await api.delete(`${PERSONS_API_URL}/${personId}`).json()) as number;

export const useDeletePerson = () => {
    const { mutateAsync: deletePerson } = useMutation({
        mutationFn: deletePersonRequest,
    });

    return { deletePerson };
};
