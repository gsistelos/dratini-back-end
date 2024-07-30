import HttpError from "./HttpError.js";

class NotFoundError extends HttpError {
	constructor(message?: string) {
		super(404, message ? message : "Not found");
	}
}

export default NotFoundError;
