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
import type { Person } from "../../../../server/db/models/personsModel";
import { useAddPerson, useEditPerson } from "../../services";

const schema = yup.object({
    name: yup.string().required(),
    age: yup.number().positive().integer().nullable(),
});

type AddEditPersonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    person: Person | null;
};

export const AddEditPersonModal = (props: AddEditPersonModalProps) => {
    const { isOpen, onClose, person } = props;

    const { addPerson } = useAddPerson();
    const { editPerson } = useEditPerson();
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        values: {
            name: person?.name ?? "",
            age: person?.age,
        },
    });

    const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async (
        data,
    ) => {
        try {
            person
                ? await editPerson({ ...data, id: person.id })
                : await addPerson(data);
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Person</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form
                        id="add-person-form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Name*</FormLabel>
                                <Input
                                    placeholder="John Doe"
                                    {...register("name", {
                                        value: person?.name ?? undefined,
                                    })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Age</FormLabel>
                                <Input
                                    placeholder="42"
                                    {...register("age", {
                                        value: person?.age ?? undefined,
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
                        form="add-person-form"
                    >
                        {person ? "Save Changes" : "Save New Person"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
