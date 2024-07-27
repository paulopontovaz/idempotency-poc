import { Hono } from "hono";
import {
    deletePersonService,
    getAllPersonsService,
    getPersonService,
    insertPersonService,
    updatePersonService,
} from "../services";

const personsRouter = new Hono();

personsRouter.get("/", async (c) => {
    try {
        const persons = await getAllPersonsService();
        return c.json({ persons }, 200);
    } catch (error) {
        c.json({ error: "Error while getting persons." }, 500);
    }
});

personsRouter.get("/:id", async (c) => {
    try {
        const rawPersonId = c.req.param("id");
        const personId = Number(rawPersonId);
        const person = await getPersonService(personId);
        return c.json({ person }, 200);
    } catch (error) {
        c.json({ error: "Error while getting person." }, 500);
    }
});

personsRouter.post("/", async (c) => {
    try {
        const newPersonProperties = await c.req.json();
        const newPerson = await insertPersonService(newPersonProperties);
        return c.json({ newPerson }, 201);
    } catch (error) {
        c.json({ error: "Error while inserting new person." }, 500);
    }
});

personsRouter.patch("/:id", async (c) => {
    try {
        const updatedPersonId = c.req.param("id");
        const updatedFields = await c.req.json();
        const updatedPerson = await updatePersonService({
            id: updatedPersonId,
            ...updatedFields,
        });
        return c.json({ updatedPerson }, 200);
    } catch (error) {
        c.json({ error: "Error while updating task." }, 500);
    }
});

personsRouter.delete("/:id", async (c) => {
    try {
        const rawDeletedPersonId = c.req.param("id");
        const deletedPersonId = Number(rawDeletedPersonId);
        await deletePersonService(deletedPersonId);
        return c.json({ deletedPersonId }, 200);
    } catch (error) {
        c.json({ error: "Error while deleting person." }, 500);
    }
});

export { personsRouter };
