import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HStack, IconButton, ListItem, Text } from "@chakra-ui/react";
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
        <ListItem borderWidth={1} borderRadius={6}>
            <HStack spacing={3} justify="space-between">
                <Text px={3}>
                    {payment.description} ({payment.transactionId ?? "-"})
                </Text>

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
            </HStack>
        </ListItem>
    );
}

export { PaymentListItem };
