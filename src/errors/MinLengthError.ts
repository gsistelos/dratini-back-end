import HttpError from "./HttpError.js";

class MinLengthError extends HttpError {
	constructor(field: string, minLength: number) {
		super(400, `'${field}' must have at least ${minLength} characters`);
	}
}

export default MinLengthError;
