import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { debounce } from "../../utils/debounce";
import { AddEditPaymentModalForm } from "./AddEditPaymentModalForm";

type AddEditPaymentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    payment: Payment | null;
};

export const AddEditPaymentModal = (props: AddEditPaymentModalProps) => {
    const { isOpen, onClose, payment } = props;

    const onAfterSubmit = () => {
        /*
            Setting a debounce in order to prevent the modal closing instantly.
            This way, we can execute the same request multiple times and test
            the idempotency functionality.
        */
        debounce(onClose, 3000)();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <AddEditPaymentModalForm
                        onAfterSubmit={onAfterSubmit}
                        payment={payment}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        form="add-payment-form"
                    >
                        {payment ? "Save Changes" : "Complete Purchase"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
