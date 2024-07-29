import asyncHandler from "../utils/asyncHandler.js";
import db from "../db/db.js";
import type { Request, Response } from "express";
import { Router } from "express";
import type { UserInput } from "../types/user.js";
import { usersTable } from "../db/schema.js";
import {
	validateEmailExists,
	validateUser,
} from "../validators/usersValidator.js";

const router = Router();

router.post(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const user: UserInput = req.body;

		validateUser(user);
		await validateEmailExists(user.email);

		const ret = await db
			.insert(usersTable)
			.values(user)
			.returning({ username: usersTable.username, email: usersTable.email });
		res.json(ret);
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
