import {
	deletePersonService,
	getAllPersonsService,
	getPersonService,
	insertPersonService,
	updatePersonService,
} from "@/server/api/services";
import type { Context } from "hono";

export const getAllPersonsView = async (c: Context) => {
	try {
		const persons = await getAllPersonsService();
		return c.json({ persons }, 200);
	} catch (error) {
		c.json({ error: "Error while getting persons." }, 500);
	}
};

export const getPersonView = async (c: Context) => {
	try {
		const rawPersonId = c.req.param("id");
		const personId = Number(rawPersonId);
		const person = await getPersonService(personId);
		return c.json({ person }, 200);
	} catch (error) {
		c.json({ error: "Error while getting person." }, 500);
	}
};

export const insertPersonView = async (c: Context) => {
	try {
		const newPersonProperties = await c.req.json();
		const newPerson = await insertPersonService(newPersonProperties);
		return c.json({ newPerson }, 201);
	} catch (error) {
		c.json({ error: "Error while inserting new person." }, 500);
	}
};

export const updatePersonView = async (c: Context) => {
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
};

export const deletePersonView = async (c: Context) => {
	try {
		const rawDeletedPersonId = c.req.param("id");
		const deletedPersonId = Number(rawDeletedPersonId);
		await deletePersonService(deletedPersonId);
		return c.json({ deletedPersonId }, 200);
	} catch (error) {
		c.json({ error: "Error while deleting person." }, 500);
	}
};
