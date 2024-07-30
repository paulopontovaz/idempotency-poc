import { Heading, VStack } from "@chakra-ui/react";
import { PaymentList } from "./components/PaymentList/PaymentList";

function App() {
    return (
        <VStack spacing={4} p={4}>
            <Heading as="h1" w="full" textAlign="center" fontSize="xx-large">
                Idempotency PoC
            </Heading>

            <PaymentList />
        </VStack>
    );
}

export default App;
