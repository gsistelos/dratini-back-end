import type { Request, Response } from "express";
import { Router } from "express";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { signJwt } from "../services/authService.js";
import { getUserByEmail } from "../services/usersService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { comparePasswords } from "../utils/comparePasswords.js";

const router = Router();

router.post(
	"/login",
	asyncHandler(async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const user = await getUserByEmail(email);
		if (!user) {
			throw new UnauthorizedError();
		}

		if (!comparePasswords(password, user.password)) {
			throw new UnauthorizedError();
		}

		const token = await signJwt(user);
		res.json({
			token: token,
		});
	}),
);

export default router;
