import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PERSONS_API_URL, api } from "./_common";
import { getPersonsQueryKey } from "./useGetAllPersons";

export const deletePersonRequest = async (personId: number): Promise<number> =>
    (await api.delete(`${PERSONS_API_URL}/${personId}`).json()) as number;

export const useDeletePerson = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deletePerson } = useMutation({
        mutationFn: deletePersonRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPersonsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deletePerson };
};
