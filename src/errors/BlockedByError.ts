import HttpError from "./HttpError.js";

class BlockedByError extends HttpError {
	constructor(action: string) {
		super(403, `You cannot ${action} a user that has you blocked`);
	}
}

export default BlockedByError;
