import type { Response } from "express";
import { Router } from "express";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";
import {
	createBlock,
	deleteBlock,
	getBlockById,
} from "../services/blocksService.js";
import {
	deleteFollow,
	getFollowByUsersId,
} from "../services/followsService.js";
import type AuthRequest from "../types/AuthRequest.js";
import type { BlockInput } from "../types/BlockInput.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBlock } from "../validators/blocksValidator.js";

const router = Router();

router.post(
	"/blocks",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const block: BlockInput = req.body;

		validateBlock(block);

		const { blockerId, blockedId } = block;

		if (req.userId !== blockerId) {
			throw new UnauthorizedError();
		}

		const following = await getFollowByUsersId(blockerId, blockedId);
		if (following) {
			await deleteFollow(following.id);
		}

		const follower = await getFollowByUsersId(blockedId, blockerId);
		if (follower) {
			await deleteFollow(follower.id);
		}

		const ret = await createBlock(block);
		res.json(ret);
	}),
);

router.get(
	"/blocks/:id",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const block = await getBlockById(req.params.id);
		if (!block) {
			throw new NotFoundError("Block not found");
		}

		if (block.blockerId !== req.userId) {
			throw new UnauthorizedError();
		}

		res.json(block);
	}),
);

router.delete(
	"/blocks/:id",
	jwtMiddleware,
	asyncHandler(async (req: AuthRequest, res: Response) => {
		const id = req.params.id;

		const block = await getBlockById(id);
		if (!block) {
			throw new NotFoundError("Block not found");
		}

		if (req.userId !== block.blockerId) {
			throw new UnauthorizedError();
		}

		const ret = await deleteBlock(id);
		res.json(ret);
	}),
);

export default router;
