import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
    Payment,
    PaymentInsert,
} from "../../../../server/db/models/paymentsModel";
import { PAYMENTS_API_URL, api } from "./_common";
import { getPaymentsQueryKey } from "./useGetAllPayments";
import { useIdempotencyKey } from "./useIdempotencyKey";

type AddPaymentResponse = { payment: Payment };

export const addPaymentRequest =
    (getIdempotencyKeyFunction: (body: unknown) => string) =>
    async (payment: PaymentInsert): Promise<AddPaymentResponse> =>
        (await api
            .post(PAYMENTS_API_URL, {
                json: payment,
                headers: {
                    "Idempotency-Key": getIdempotencyKeyFunction(payment),
                },
            })
            .json()) as AddPaymentResponse;

export const useAddPayment = () => {
    const { getIdempotencyKey } = useIdempotencyKey();
    const queryClient = useQueryClient();

    const { mutateAsync: addPayment } = useMutation({
        mutationFn: addPaymentRequest(getIdempotencyKey),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getPaymentsQueryKey(),
                refetchType: "active",
            });
        },
    });

    return { addPayment };
};
