import HttpError from "./HttpError.js";

class UnauthorizedError extends HttpError {
	constructor() {
		super(401, "Unauthorized");
	}
}

export default UnauthorizedError;
