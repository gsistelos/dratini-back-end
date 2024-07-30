import HttpError from "./HttpError.js";

class AlreadyExistsError extends HttpError {
	constructor(field: string) {
		super(400, `'${field}' already exists`);
	}
}

export default AlreadyExistsError;
