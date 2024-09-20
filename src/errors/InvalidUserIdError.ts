import HttpError from "./HttpError.js";

class InvalidUserIdError extends HttpError {
	constructor(field: string) {
		super(400, `'${field}' must be a valid user id`);
	}
}

export default InvalidUserIdError;
