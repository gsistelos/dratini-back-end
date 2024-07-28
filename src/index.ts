import db from "./db/db.js";
import express from "express";
import type { Request, Response } from "express";
import { usersTable } from "./db/schema.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
	const user = await db.insert(usersTable).values(req.body).returning();
	res.json(user);
});

app.get("/users", async (req: Request, res: Response) => {
	const users = await db.select().from(usersTable);
	res.json(users);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
