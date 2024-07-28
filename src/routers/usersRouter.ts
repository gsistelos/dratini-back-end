import db from "../db/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import { usersTable } from "../db/schema.js";

const router = Router();

router.post("/users", async (req: Request, res: Response) => {
	const user = await db.insert(usersTable).values(req.body).returning();
	res.json(user);
});

router.get("/users", async (req: Request, res: Response) => {
	const users = await db.select().from(usersTable);
	res.json(users);
});

export default router;
