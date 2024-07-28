import {
    Button,
    HStack,
    Heading,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { AddEditPersonModal } from "./AddEditPersonModal";
import { PersonList } from "./PersonList";
import { useGetAllPersons } from "./services";

function App() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { persons, getAllPersons } = useGetAllPersons();

    const handleOnClose = () => {
        onClose();
        getAllPersons();
    };

    console.log("##### persons", persons);

    return (
        <VStack spacing={4} p={4}>
            <Heading as="h1" w="full" textAlign="center" fontSize="xx-large">
                Idempotency PoC
            </Heading>

            <VStack w="full" alignItems="flex-start" spacing={2}>
                <HStack w="full" justify="space-between">
                    <Heading as="h2" fontSize="large">
                        People
                    </Heading>
                    <Button onClick={onOpen}>Add New</Button>
                </HStack>

                <PersonList persons={persons} />
                <AddEditPersonModal isOpen={isOpen} onClose={handleOnClose} />
            </VStack>
        </VStack>
    );
}

export default App;
