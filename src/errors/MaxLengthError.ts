import HttpError from "./HttpError.js";

class MaxLengthError extends HttpError {
	constructor(field: string, maxLength: number) {
		super(400, `'${field}' must have at most ${maxLength} characters`);
	}
}

export default MaxLengthError;
