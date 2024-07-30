import { useQuery } from "@tanstack/react-query";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { PAYMENTS_API_URL, api } from "./_common";

type FetchPaymentsResponse = {
    payments: Payment[];
};

export const fetchAllPaymentsRequest = async () => {
    const response = (await api
        .get(PAYMENTS_API_URL)
        .json()) as FetchPaymentsResponse;

    return response.payments ?? [];
};

export const getPaymentsQueryKey = () => ["payments"];

export const useGetAllPayments = () => {
    const { data } = useQuery({
        queryKey: getPaymentsQueryKey(),
        queryFn: fetchAllPaymentsRequest,
        retry: 0,
    });

    return { payments: data ?? [] };
};
