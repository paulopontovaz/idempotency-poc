import { Hono } from "hono";
import {
    deletePaymentService,
    getAllPaymentsService,
    getPaymentService,
    insertPaymentService,
    updatePaymentService,
} from "../services";

const paymentsRouter = new Hono();

paymentsRouter.get("/", async (c) => {
    try {
        const payments = await getAllPaymentsService();
        return c.json({ payments }, 200);
    } catch (error) {
        c.json({ error: "Error while getting payments." }, 500);
    }
});

paymentsRouter.get("/:id", async (c) => {
    try {
        const rawPaymentId = c.req.param("id");
        const paymentId = Number(rawPaymentId);
        const payment = await getPaymentService(paymentId);
        return c.json({ payment }, 200);
    } catch (error) {
        c.json({ error: "Error while getting payment." }, 500);
    }
});

paymentsRouter.post("/", async (c) => {
    try {
        const newPaymentProperties = await c.req.json();
        const newPayment = await insertPaymentService(newPaymentProperties);
        console.log("##### paymentsRouter called POST", { newPayment });
        return c.json({ newPayment }, 201);
    } catch (error) {
        c.json({ error: "Error while inserting new payment." }, 500);
    }
});

paymentsRouter.patch("/:id", async (c) => {
    try {
        const updatedPaymentId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedPayment = await updatePaymentService({
            id: updatedPaymentId,
            ...updatedFields,
        });
        return c.json({ updatedPayment }, 200);
    } catch (error) {
        c.json({ error: "Error while updating task." }, 500);
    }
});

paymentsRouter.delete("/:id", async (c) => {
    try {
        const rawDeletedPaymentId = c.req.param("id");
        const deletedPaymentId = Number(rawDeletedPaymentId);
        await deletePaymentService(deletedPaymentId);
        return c.json({ deletedPaymentId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting payment." }, 500);
    }
});

export { paymentsRouter };
