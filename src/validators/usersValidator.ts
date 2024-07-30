import AlreadyExistsError from "../errors/AlreadyExistsError.js";
import db from "../db/db.js";
import { eq } from "drizzle-orm";
import FieldRequiredError from "../errors/FieldRequiredError.js";
import InvalidEmailError from "../errors/InvalidEmailError.js";
import MaxLengthError from "../errors/MaxLengthError.js";
import MinLengthError from "../errors/MinLengthError.js";
import type { UserInput } from "../types/user.js";
import { usersTable } from "../db/schema.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUsername(username: string, allowEmpty: boolean) {
	if (!username) {
		if (allowEmpty) return;
		throw new FieldRequiredError("username");
	}

	if (username.length < 2) {
		throw new MinLengthError("username", 2);
	}

	if (username.length > 16) {
		throw new MaxLengthError("username", 16);
	}
}

export function validateEmail(email: string, allowEmpty: boolean) {
	if (!email) {
		if (allowEmpty) return;
		throw new FieldRequiredError("email");
	}

	if (!emailRegex.test(email)) {
		throw new InvalidEmailError("email");
	}
}

export function validatePassword(password: string, allowEmpty: boolean) {
	if (!password) {
		if (allowEmpty) return;
		throw new FieldRequiredError("password");
	}

	if (password.length < 8) {
		throw new MinLengthError("password", 8);
	}

	if (password.length > 255) {
		throw new MaxLengthError("password", 255);
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
		throw new AlreadyExistsError("email");
	}
}
