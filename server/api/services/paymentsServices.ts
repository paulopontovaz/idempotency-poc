import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { Payments } from "../../db/models";
import type {
    PaymentInsert,
    PaymentUpdate,
} from "../../db/models/paymentsModel";

export const getAllPaymentsService = async () =>
    await db.query.Payments.findMany({
        orderBy: asc(Payments.id),
    });

export const getPaymentService = async (id: number) =>
    await db.query.Payments.findFirst({
        where: eq(Payments.id, id),
    });

export const insertPaymentService = async (newPayment: PaymentInsert) =>
    await db.insert(Payments).values(newPayment).returning({ id: Payments.id });

export const updatePaymentService = async (updatedPayment: PaymentUpdate) =>
    await db
        .update(Payments)
        .set(updatedPayment)
        .where(eq(Payments.id, updatedPayment.id))
        .returning({
            id: Payments.id,
            description: Payments.description,
            transactionId: Payments.transactionId,
        });

export const deletePaymentService = async (id: number) =>
    await db
        .delete(Payments)
        .where(eq(Payments.id, id))
        .returning({ id: Payments.id });
