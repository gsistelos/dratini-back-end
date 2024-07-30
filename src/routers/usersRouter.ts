import asyncHandler from "../utils/asyncHandler.js";
import db from "../db/db.js";
import { eq } from "drizzle-orm";
import { hashPassword } from "../utils/hashPassword.js";
import NotFoundError from "../errors/NotFoundError.js";
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

		user.password = hashPassword(user.password);

		const ret = await db.insert(usersTable).values(user).returning({
			id: usersTable.id,
			username: usersTable.username,
			email: usersTable.email,
		});
		res.json(ret);
	}),
);

router.get(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const users = await db
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				createdAt: usersTable.createdAt,
				updatedAt: usersTable.updatedAt,
			})
			.from(usersTable);

		if (users.length === 0) {
			throw new NotFoundError("No users found");
		}

		res.json(users);
	}),
);

router.get(
	"/users/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const [user] = await db
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
				createdAt: usersTable.createdAt,
				updatedAt: usersTable.updatedAt,
			})
			.from(usersTable)
			.where(eq(usersTable.id, req.params.id))
			.limit(1);

		if (!user) {
			throw new NotFoundError("User not found");
		}

		res.json(user);
	}),
);

router.patch(
	"/users/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const [user] = await db
			.select({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
			})
			.from(usersTable)
			.where(eq(usersTable.id, req.params.id))
			.limit(1);

		if (!user) {
			throw new NotFoundError("User not found");
		}

		const updatedUser: UserInput = req.body;

		validateUser(updatedUser, true);

		if (updatedUser.email && updatedUser.email !== user.email) {
			await validateEmailExists(updatedUser.email);
		}

		if (updatedUser.password) {
			updatedUser.password = hashPassword(updatedUser.password);
		}

		const [ret] = await db
			.update(usersTable)
			.set({
				...updatedUser,
				updatedAt: new Date(),
			})
			.where(eq(usersTable.id, req.params.id))
			.returning({
				id: usersTable.id,
				username: usersTable.username,
				email: usersTable.email,
			});

		res.json(ret);
	}),
);

export default router;
