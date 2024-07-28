import { useQuery } from "@tanstack/react-query";
import type { Person } from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";

type FetchPersonsResponse = {
    persons: Person[];
};

export const fetchAllPersonsRequest = async () => {
    const response = (await api
        .get(PERSONS_API_URL)
        .json()) as FetchPersonsResponse;

    return response.persons ?? [];
};

export const getPersonsQueryKey = () => ["persons"];

export const useGetAllPersons = () => {
    const { data, refetch } = useQuery({
        queryKey: getPersonsQueryKey(),
        queryFn: fetchAllPersonsRequest,
        retry: 0,
    });

    return { persons: data ?? [], getAllPersons: refetch };
};
