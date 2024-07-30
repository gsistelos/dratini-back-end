import HttpError from "./HttpError.js";

class FieldRequiredError extends HttpError {
	constructor(field: string) {
		super(400, `'${field}' is required`);
	}
}

export default FieldRequiredError;
