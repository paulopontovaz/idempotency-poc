import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { useAddPayment, useEditPayment } from "../../services";

const schema = yup.object({
    description: yup.string().required(),
});

type AddEditPaymentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    payment: Payment | null;
};

export const AddEditPaymentModal = (props: AddEditPaymentModalProps) => {
    const { isOpen, onClose, payment } = props;

    const { addPayment } = useAddPayment();
    const { editPayment } = useEditPayment();
    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        values: {
            description: payment?.description ?? "",
        },
    });

    const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async (
        data,
    ) => {
        try {
            payment
                ? await editPayment({ ...data, id: payment.id })
                : await addPayment(data);
        } catch (error) {
            console.error(error);
        }

        /*
            Commenting the following lines in order
            to prevent the modal from being closed automatically.
            This way, we can execute the same request multiple times
            and test the idempotency functionality.
        */
        // reset();
        // onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                reset();
                onClose();
            }}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form
                        id="add-payment-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Description*</FormLabel>
                                <Input
                                    placeholder="Gaming laptop"
                                    {...register("description", {
                                        value:
                                            payment?.description ?? undefined,
                                    })}
                                />
                            </FormControl>
                        </VStack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        form="add-payment-form"
                    >
                        {payment ? "Save Changes" : "Save New Payment"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
