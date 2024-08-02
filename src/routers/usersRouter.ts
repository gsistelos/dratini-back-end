import type { Request, Response } from "express";
import { Router } from "express";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "../services/usersService.js";
import type AuthRequest from "../types/AuthRequest.js";
import type { UserInput } from "../types/user.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateUser } from "../validators/usersValidator.js";

const router = Router();

router.post(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const user: UserInput = req.body;

		validateUser(user);

		const ret = await createUser(user);
		res.json(ret);
	}),
);

router.get(
	"/users",
	asyncHandler(async (req: Request, res: Response) => {
		const users = await getUsers();
		if (users.length === 0) {
			throw new NotFoundError("No users found");
		}

		res.json(users);
	}),
);

router.get(
	"/users/:id",
	asyncHandler(async (req: Request, res: Response) => {
		const user = await getUserById(req.params.id);
		if (!user) {
			throw new NotFoundError("User not found");
		}

		res.json(user);
	}),
);

router.patch(
	"/users/:id",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const id = req.params.id;

		if (req.userId !== id) {
			throw new UnauthorizedError();
		}

		const updatedUser: UserInput = req.body;

		validateUser(updatedUser, true);

		const ret = await updateUser(id, updatedUser);
		res.json(ret);
	}),
);

router.delete(
	"/users/:id",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const id = req.params.id;

		if (req.userId !== id) {
			throw new UnauthorizedError();
		}

		const ret = await deleteUser(id);
		res.json(ret);
	}),
);

export default router;
