import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, ListItem, Text, VStack } from "@chakra-ui/react";
import type { Payment } from "../../../../server/db/models/paymentsModel";
import { useDeletePayment } from "../../services";

type PaymentListItemProps = {
    payment: Payment;
    onEditButtonClick: (payment: Payment) => void;
};

function PaymentListItem(props: PaymentListItemProps) {
    const { onEditButtonClick, payment } = props;

    const { deletePayment } = useDeletePayment();

    return (
        <ListItem
            as={HStack}
            borderWidth={1}
            borderRadius={6}
            spacing={3}
            p={2}
        >
            <VStack flex={1} alignItems="flex-start">
                <HStack spacing={1}>
                    <Text flex={1}>
                        {payment.amount ? `$${payment.amount}` : "-"}
                    </Text>
                    <Text>{payment.description}</Text>
                </HStack>
                <Text fontSize="small" opacity={0.5}>
                    ({payment.transactionId ?? "-"})
                </Text>
            </VStack>

            <HStack spacing={1}>
                <IconButton
                    variant="ghost"
                    icon={<DeleteIcon />}
                    aria-label={`Delete payment '${payment.description}'`}
                    onClick={() => deletePayment(payment.id)}
                />
                <IconButton
                    variant="ghost"
                    icon={<EditIcon />}
                    aria-label={`Edit payment '${payment.description}'`}
                    onClick={() => onEditButtonClick(payment)}
                />
            </HStack>
        </ListItem>
    );
}

export { PaymentListItem };
