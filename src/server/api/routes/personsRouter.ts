import {
	deletePersonView,
	getAllPersonsView,
	getPersonView,
	insertPersonView,
	updatePersonView,
} from "@/server/api/views";
import { Hono } from "hono";

const personsRouter = new Hono();

personsRouter.get("/", getAllPersonsView);
personsRouter.get("/:id", getPersonView);
personsRouter.post("/", insertPersonView);
personsRouter.patch("/:id", updatePersonView);
personsRouter.delete("/:id", deletePersonView);

export { personsRouter };
