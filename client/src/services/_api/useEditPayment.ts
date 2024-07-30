import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Payment,
    PaymentUpdate,
} from "../../../../server/db/models/paymentsModel";
import { PAYMENTS_API_URL, api } from "./_common";
import { getPaymentsQueryKey } from "./useGetAllPayments";

type EditPaymentResponse = {
    payment: Payment;
};

export const editPaymentRequest = async (
    payment: PaymentUpdate,
): Promise<EditPaymentResponse> =>
    (await api
        .patch(`${PAYMENTS_API_URL}/${payment.id}`, {
            json: payment,
        })
        .json()) as EditPaymentResponse;

export const useEditPayment = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: editPayment } = useMutation({
        mutationFn: editPaymentRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPaymentsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { editPayment };
};
