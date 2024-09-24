import type { Response } from "express";
import { Router } from "express";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { createFollow, getFollowById } from "../services/followsService.js";
import type AuthRequest from "../types/AuthRequest.js";
import type { FollowInput } from "../types/FollowInput.js";
import asyncHandler from "../utils/asyncHandler.js";
// import { validateFollow } from "../validators/followsValidator.js";

const router = Router();

router.post(
	"/follows",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const follow: FollowInput = req.body;

		// validateFollow(follow);

		if (req.userId !== follow.followerId) {
			throw new UnauthorizedError();
		}

		const ret = await createFollow(follow);
		res.json(ret);
	}),
);

router.get(
	"/follows/:id",
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const follow = await getFollowById(req.params.id);
		if (!follow) {
			throw new NotFoundError("Follow not found");
		}

		res.json(follow);
	}),
);

export default router;
