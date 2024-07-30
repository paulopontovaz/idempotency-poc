import {
    Button,
    HStack,
    Heading,
    List,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { signal } from "@preact/signals-react";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { useGetAllPayments } from "../../services";
import { AddEditPaymentModal } from "../AddEditPaymentModal/AddEditPaymentModal";
import { PaymentListItem } from "./PaymentListItem";

const selectedPayment = signal<Payment | null>(null);

function PaymentList() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { payments } = useGetAllPayments();

    const handleEditPayment = (payment: Payment) => {
        selectedPayment.value = payment;
        onOpen();
    };

    const handleAddPayment = () => {
        selectedPayment.value = null;
        onOpen();
    };

    return (
        <VStack w="full" maxW="50vw" alignItems="flex-start" spacing={2}>
            <HStack w="full" justify="space-between">
                <Heading as="h2" fontSize="large">
                    People
                </Heading>
                <Button onClick={handleAddPayment}>Add New</Button>
            </HStack>

            <List spacing={2} w="full">
                {payments.map((payment) => (
                    <PaymentListItem
                        key={payment.id}
                        payment={payment}
                        onEditButtonClick={handleEditPayment}
                    />
                ))}
            </List>

            <AddEditPaymentModal
                isOpen={isOpen}
                onClose={onClose}
                payment={selectedPayment.value}
            />
        </VStack>
    );
}

export { PaymentList };
