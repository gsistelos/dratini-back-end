import type { Request, Response } from "express";
import { Router } from "express";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import redisClient from "../redisClient.js";
import { generateToken, signJwt } from "../services/authService.js";
import { getUserByEmail } from "../services/usersService.js";
import type AuthRequest from "../types/AuthRequest.js";
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

router.get(
	"/ws-token",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const key = `ws-token-${req.userId}`;

		let token = await redisClient.get(key);
		if (!token) {
			token = generateToken();
			await redisClient.set(key, token);
		}

		res.json({
			token: token,
		});
	}),
);

export default router;
