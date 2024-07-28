import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const Persons = pgTable("persons", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    age: integer("age"),
});

export type Person = typeof Persons.$inferSelect;
export type PersonInsert = typeof Persons.$inferInsert;
export type PersonUpdate = Omit<Partial<Person> & Pick<Person, "id">, "">;
