import { asc, eq } from "drizzle-orm";
import { db } from "../../db";
import { Persons } from "../../db/models";
import type { PersonInsert, PersonUpdate } from "../../db/models/personsModel";

export const getAllPersonsService = async () =>
    await db.query.Persons.findMany({
        orderBy: asc(Persons.id),
    });

export const getPersonService = async (id: number) =>
    await db.query.Persons.findFirst({
        where: eq(Persons.id, id),
    });

export const insertPersonService = async (newPerson: PersonInsert) =>
    await db.insert(Persons).values(newPerson).returning({ id: Persons.id });

export const updatePersonService = async (updatedPerson: PersonUpdate) =>
    await db
        .update(Persons)
        .set(updatedPerson)
        .where(eq(Persons.id, updatedPerson.id))
        .returning({ id: Persons.id, name: Persons.name, age: Persons.age });

export const deletePersonService = async (id: number) =>
    await db
        .delete(Persons)
        .where(eq(Persons.id, id))
        .returning({ id: Persons.id });
