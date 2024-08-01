import { FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { useAddPayment, useEditPayment } from "../../services";

const schema = yup.object({
    description: yup.string().required(),
    amount: yup.number().required(),
});

type AddEditPaymentModalFormProps = {
    onAfterSubmit: () => void;
    payment: Payment | null;
};

export const AddEditPaymentModalForm = (
    props: AddEditPaymentModalFormProps,
) => {
    const { onAfterSubmit, payment } = props;

    const { addPayment } = useAddPayment();
    const { editPayment } = useEditPayment();
    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        values: {
            description: payment?.description ?? "Gaming laptop",
            amount: payment?.amount ?? 1499.9,
        },
    });

    useEffect(() => () => reset(), [reset]);

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

        onAfterSubmit();
    };

    return (
        <form id="add-payment-form" onSubmit={handleSubmit(onSubmit)}>
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
                    <Input placeholder="1499.90" {...register("amount")} />
                </FormControl>
            </HStack>
        </form>
    );
};
