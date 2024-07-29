import asyncHandler from "../utils/asyncHandler.js";
import db from "../db/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import { usersTable } from "../db/schema.js";
import {
	validateEmailExists,
	validateUser,
} from "../validators/usersValidator.js";

const router = Router();

router.post(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const { username, email, password } = req.body;

		validateUser(username, email, password);
		await validateEmailExists(email);

		const user = await db
			.insert(usersTable)
			.values({ username, email, password })
			.returning({ username: usersTable.username, email: usersTable.email });
		res.json(user);
	}),
);

router.get(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const users = await db
			.select({ username: usersTable.username, email: usersTable.email })
			.from(usersTable);
		res.json(users);
	}),
);

export default router;
