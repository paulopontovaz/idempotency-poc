import {
    Button,
    HStack,
    Heading,
    List,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { signal } from "@preact/signals-react";
import type { Person } from "../../../../server/db/models/personsModel";
import { useGetAllPersons } from "../../services";
import { AddEditPersonModal } from "../AddEditPersonModal/AddEditPersonModal";
import { PersonListItem } from "./PersonListItem";

const selectedPerson = signal<Person | null>(null);

function PersonList() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { persons } = useGetAllPersons();

    const handleEditPerson = (person: Person) => {
        selectedPerson.value = person;
        onOpen();
    };

    const handleAddPerson = () => {
        selectedPerson.value = null;
        onOpen();
    };

    return (
        <VStack w="full" maxW="50vw" alignItems="flex-start" spacing={2}>
            <HStack w="full" justify="space-between">
                <Heading as="h2" fontSize="large">
                    People
                </Heading>
                <Button onClick={handleAddPerson}>Add New</Button>
            </HStack>

            <List spacing={2} w="full">
                {persons.map((person) => (
                    <PersonListItem
                        key={person.id}
                        person={person}
                        onEditButtonClick={handleEditPerson}
                    />
                ))}
            </List>

            <AddEditPersonModal
                isOpen={isOpen}
                onClose={onClose}
                person={selectedPerson.value}
            />
        </VStack>
    );
}

export { PersonList };
