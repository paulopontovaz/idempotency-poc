import { pgTable, real, serial, text, uuid } from "drizzle-orm/pg-core";

export const Payments = pgTable("payments", {
    id: serial("id").primaryKey(),
    description: text("name").notNull(),
    amount: real("amount").notNull().default(0.0),
    transactionId: uuid("transaction_id").defaultRandom().notNull(),
});

export type Payment = typeof Payments.$inferSelect;
export type PaymentInsert = typeof Payments.$inferInsert;
export type PaymentUpdate = Omit<Partial<Payment> & Pick<Payment, "id">, "">;
