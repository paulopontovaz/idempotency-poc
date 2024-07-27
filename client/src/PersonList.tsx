import { useGetAllPersons } from "./services";

function PersonList() {
    const { persons } = useGetAllPersons();

    console.log("rendered");

    return persons.map((person) => (
        <li key={person.id}>
            {person.name} ({person.age ?? "-"})
        </li>
    ));
}

export { PersonList };
