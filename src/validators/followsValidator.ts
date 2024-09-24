import AlreadyExistsError from "../errors/AlreadyExistsError.js";
import MustBeDiffError from "../errors/MustBeDiffError.js";
import { getFollowByUsersId } from "../services/followsService.js";
import type { FollowInput } from "../types/FollowInput.js";

export function validateFollow({ followerId, followedId }: FollowInput) {
	if (followerId === followedId) {
		throw new MustBeDiffError("'followerId' and 'followedId'");
	}
}

export async function validateFollowExists(
	followerId: string,
	followedId: string,
) {
	const follow = await getFollowByUsersId(followerId, followedId);
	if (follow) {
		throw new AlreadyExistsError("Follow");
	}
}
