import HttpError from "./HttpError.js";

class MustBeDiffError extends HttpError {
	constructor(fields: string) {
		super(403, `${fields} must be different values`);
	}
}

export default MustBeDiffError;
