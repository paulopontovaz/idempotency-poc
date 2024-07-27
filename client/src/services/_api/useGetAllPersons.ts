import { signal } from "@preact/signals-react";
import { useEffect } from "react";
import type { Person } from "../../../../server/db/models/personsModel";
import { PERSONS_API_URL, api } from "./_common";

const persons = signal<Person[]>([]);

type FetchPersonsResponse = {
    persons: Person[];
};

export const fetchAllPersonsRequest = async (): Promise<FetchPersonsResponse> =>
    (await api
        .get(PERSONS_API_URL, { retry: 0 })
        .json()) as FetchPersonsResponse;

export const useGetAllPersons = () => {
    useEffect(() => {
        fetchAllPersonsRequest().then((response) => {
            persons.value = response.persons;
        });
    }, []);

    return { persons: persons.value };
};
