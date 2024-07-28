import { Heading, VStack } from "@chakra-ui/react";
import { PersonList } from "./components/PersonList/PersonList";

function App() {
    return (
        <VStack spacing={4} p={4}>
            <Heading as="h1" w="full" textAlign="center" fontSize="xx-large">
                Idempotency PoC
            </Heading>

            <PersonList />
        </VStack>
    );
}

export default App;
