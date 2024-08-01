import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { useAddPayment, useEditPayment } from "../../services";

const schema = yup.object({
    description: yup.string().required(),
    amount: yup.number().required(),
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
            description: payment?.description ?? "Gaming laptop",
            amount: payment?.amount ?? 1499.9,
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
            Using setTimeout in order to prevent the modal closing instantly.
            This way, we can execute the same request multiple times and test
            the idempotency functionality.
        */
        setTimeout(() => {
            reset();
            onClose();
        }, 3000);
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
                        <HStack>
                            <FormControl flex={3}>
                                <FormLabel>Description*</FormLabel>
                                <Input
                                    placeholder="Gaming laptop"
                                    {...register("description")}
                                />
                            </FormControl>
                            <FormControl flex={1}>
                                <FormLabel>Amount*</FormLabel>
                                <Input
                                    placeholder="1499.90"
                                    {...register("amount", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </FormControl>
                        </HStack>
                    </form>
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
