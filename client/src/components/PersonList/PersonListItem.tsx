import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, ListItem, Text } from "@chakra-ui/react";
import type { Person } from "../../../../server/db/models/personsModel";
import { useDeletePerson } from "../../services";

type PersonListItemProps = {
    person: Person;
    onEditButtonClick: (person: Person) => void;
};

function PersonListItem(props: PersonListItemProps) {
    const { onEditButtonClick, person } = props;

    const { deletePerson } = useDeletePerson();

    return (
        <ListItem borderWidth={1} borderRadius={6}>
            <HStack spacing={3} justify="space-between">
                <Text px={3}>
                    {person.name} ({person.age ?? "-"})
                </Text>

                <HStack spacing={1}>
                    <IconButton
                        variant="ghost"
                        icon={<DeleteIcon />}
                        aria-label={`Delete person '${person.name}'`}
                        onClick={() => deletePerson(person.id)}
                    />
                    <IconButton
                        variant="ghost"
                        icon={<EditIcon />}
                        aria-label={`Edit person '${person.name}'`}
                        onClick={() => onEditButtonClick(person)}
                    />
                </HStack>
            </HStack>
        </ListItem>
    );
}

export { PersonListItem };
