import db from "../db/db.js";
import { eq } from "drizzle-orm";
import HttpError from "../utils/HttpError.js";
import type { UserInput } from "../types/user.js";
import { usersTable } from "../db/schema.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(username: string, allowEmpty: boolean) {
	if (!username) {
		if (allowEmpty) return;
		throw new HttpError(400, "'username' is required");
	}

	if (username.length < 2) {
		throw new HttpError(400, "'username' must be at least 2 characters long");
	}
}

export function validateEmail(email: string, allowEmpty: boolean) {
	if (!email) {
		if (allowEmpty) return;
		throw new HttpError(400, "'email' is required");
	}

	if (!emailRegex.test(email)) {
		throw new HttpError(400, "'email' must be a valid email address");
	}
}

export function validatePassword(password: string, allowEmpty: boolean) {
	if (!password) {
		if (allowEmpty) return;
		throw new HttpError(400, "'password' is required");
	}

	if (password.length < 8) {
		throw new HttpError(400, "'password' must be at least 8 characters long");
	}
}

export function validateUser(
	{ username, email, password }: UserInput,
	allowEmptyFields = false,
) {
	validateUsername(username, allowEmptyFields);
	validateEmail(email, allowEmptyFields);
	validatePassword(password, allowEmptyFields);
}

export async function validateEmailExists(email: string) {
	const user = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));
	if (user.length > 0) {
		throw new HttpError(400, "'email' already exists");
	}
}
