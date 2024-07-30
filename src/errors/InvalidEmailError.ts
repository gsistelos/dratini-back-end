import HttpError from "./HttpError.js";

class InvalidEmailError extends HttpError {
	constructor(field: string) {
		super(400, `'${field}' must be a valid email address`);
	}
}

export default InvalidEmailError;
