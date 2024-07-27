import { Heading, VStack } from "@chakra-ui/react";
import { PersonList } from "./PersonList";

function App() {
    return (
        <VStack spacing={4} p={4}>
            <Heading as="h1" w="full" textAlign="center" fontSize="xx-large">
                Idempotency PoC
            </Heading>

            <VStack w="full" alignItems="flex-start" spacing={2}>
                <Heading as="h2" fontSize="large">
                    People
                </Heading>

                <PersonList />
            </VStack>
        </VStack>
    );
}

export default App;
