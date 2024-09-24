import HttpError from "./HttpError.js";

class BlockingError extends HttpError {
	constructor(action: string) {
		super(403, `You cannot ${action} a user that you have blocked`);
	}
}

export default BlockingError;
