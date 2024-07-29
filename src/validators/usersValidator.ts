import db from "../db/db.js";
import { eq } from "drizzle-orm";
import HttpError from "../utils/HttpError.js";
import { usersTable } from "../db/schema.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(username: string) {
	if (!username) {
		throw new HttpError(400, "'username' is required");
	}

	if (username.length < 2) {
		throw new HttpError(400, "'username' must be at least 2 characters long");
	}
}

export function validateEmail(email: string) {
	if (!email) {
		throw new HttpError(400, "'email' is required");
	}

	if (!emailRegex.test(email)) {
		throw new HttpError(400, "'email' must be a valid email address");
	}
}

export function validatePassword(password: string) {
	if (!password) {
		throw new HttpError(400, "'password' is required");
	}

	if (password.length < 8) {
		throw new HttpError(400, "'password' must be at least 8 characters long");
	}
}

export function validateUser(
	username: string,
	email: string,
	password: string,
) {
	validateUsername(username);
	validateEmail(email);
	validatePassword(password);
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
