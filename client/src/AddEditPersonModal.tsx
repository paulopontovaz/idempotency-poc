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
import type { Person } from "../../server/db/models/personsModel";
import { useAddPerson, useEditPerson } from "./services";

const schema = yup.object({
    name: yup.string().required(),
    age: yup.number().positive().integer().nullable(),
});

type AddEditPersonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    person?: Person | null;
};

export const AddEditPersonModal = (props: AddEditPersonModalProps) => {
    const { isOpen, onClose, person } = props;

    const { register, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: person?.name ?? "",
            age: person?.age ?? null,
        },
    });
    const { addPerson } = useAddPerson();
    const { editPerson } = useEditPerson();

    const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async (
        data,
    ) => {
        try {
            if (person) {
                await editPerson({
                    id: person.id,
                    name: data.name,
                    age: data.age,
                });
            } else {
                await addPerson({
                    name: data.name,
                    age: data.age,
                });
            }
        } catch (error) {
            console.error(error);
        }

        reset();
        onClose();
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
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="John Doe"
                                    {...register("name")}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Age</FormLabel>
                                <Input placeholder="42" {...register("age")} />
                            </FormControl>
                        </VStack>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="blue"
                        type="submit"
                        form="add-person-form"
                    >
                        {person ? "Save New Person" : "Save Changes"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
