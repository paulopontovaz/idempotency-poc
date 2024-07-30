import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PAYMENTS_API_URL, api } from "./_common";
import { getPaymentsQueryKey } from "./useGetAllPayments";

export const deletePaymentRequest = async (
    paymentId: number,
): Promise<number> =>
    (await api.delete(`${PAYMENTS_API_URL}/${paymentId}`).json()) as number;

export const useDeletePayment = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: deletePayment } = useMutation({
        mutationFn: deletePaymentRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPaymentsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { deletePayment };
};
