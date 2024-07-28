import { HStack, List, ListItem, Text } from "@chakra-ui/react";
import type { Person } from "../../server/db/models/personsModel";

type PersonListProps = {
    persons: Person[];
};

function PersonList(props: PersonListProps) {
    const { persons } = props;

    return (
        <List>
            {persons.map((person) => (
                <ListItem key={person.id}>
                    <HStack>
                        <Text>
                            {person.name} ({person.age ?? "-"})
                        </Text>
                    </HStack>
                </ListItem>
            ))}
        </List>
    );
}

export { PersonList };
