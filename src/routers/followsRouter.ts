import type { Response } from "express";
import { Router } from "express";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import { createFollow, getFollowById } from "../services/followsService.js";
import type AuthRequest from "../types/AuthRequest.js";
import type { FollowInput } from "../types/FollowInput.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateFollow } from "../validators/followsValidator.js";
import { getBlockByUsersId } from "../services/blocksService.js";
import BlockedByError from "../errors/BlockedByError.js";
import BlockingError from "../errors/BlockingError.js";

const router = Router();

router.post(
	"/follows",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const follow: FollowInput = req.body;

		validateFollow(follow);

		const { followerId, followedId } = follow;

		if (req.userId !== followerId) {
			throw new UnauthorizedError();
		}

		const blockedBy = await getBlockByUsersId(followedId, followerId);
		if (blockedBy) {
			throw new BlockedByError("follow");
		}

		const blocking = await getBlockByUsersId(followerId, followedId);
		if (blocking) {
			throw new BlockingError("follow");
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
