import AlreadyExistsError from "../errors/AlreadyExistsError.js";
import MustBeDiffError from "../errors/MustBeDiffError.js";
import { getBlockByUsersId } from "../services/blocksService.js";
import type { BlockInput } from "../types/BlockInput.js";

export function validateBlock({ blockerId, blockedId }: BlockInput) {
	if (blockerId === blockedId) {
		throw new MustBeDiffError("'blockerId' and 'blockedId'");
	}
}

export async function validateBlockExists(
	blockerId: string,
	blockedId: string,
) {
	const block = await getBlockByUsersId(blockerId, blockedId);
	if (block) {
		throw new AlreadyExistsError("Block");
	}
}
