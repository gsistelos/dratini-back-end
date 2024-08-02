import type { NextFunction, Response } from "express";
import { jwtVerify } from "jose";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtSecret } from "../services/authService.js";
import type AuthRequest from "../types/AuthRequest.js";

export async function jwtMiddleware(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new UnauthorizedError();
	}

	const [scheme, token] = authHeader.split(" ");
	if (scheme !== "Bearer" || !token) {
		throw new UnauthorizedError();
	}

	const { payload } = await jwtVerify(token, jwtSecret, {
		algorithms: ["HS256"],
	});

	req.userId = payload.sub;
	next();
}
