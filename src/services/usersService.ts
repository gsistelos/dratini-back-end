import { eq } from "drizzle-orm";
import db from "../db/db.js";
import { usersTable } from "../db/schema.js";
import NotFoundError from "../errors/NotFoundError.js";
import type { UserInput } from "../types/UserInput.js";
import { hashPassword } from "../utils/hashPassword.js";
import { validateEmailExists } from "../validators/usersValidator.js";

const selectFields = {
	id: usersTable.id,
	username: usersTable.username,
	email: usersTable.email,
	createdAt: usersTable.createdAt,
	updatedAt: usersTable.updatedAt,
};

export async function createUser(user: UserInput) {
	await validateEmailExists(user.email);

	user.password = hashPassword(user.password);

	const [ret] = await db
		.insert(usersTable)
		.values(user)
		.returning(selectFields);

	return ret;
}

export async function getUsers() {
	return await db.select(selectFields).from(usersTable);
}

export async function getUserById(id: string) {
	const [ret] = await db
		.select(selectFields)
		.from(usersTable)
		.where(eq(usersTable.id, id))
		.limit(1);

	return ret;
}

export async function getUserByEmail(email: string) {
	const [ret] = await db
		.select({
			...selectFields,
			password: usersTable.password,
		})
		.from(usersTable)
		.where(eq(usersTable.email, email))
		.limit(1);

	return ret;
}

export async function updateUser(id: string, updatedUser: UserInput) {
	const user = await getUserById(id);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	if (updatedUser.email && updatedUser.email !== user.email) {
		await validateEmailExists(updatedUser.email);
	}

	if (updatedUser.password) {
		updatedUser.password = hashPassword(updatedUser.password);
	}

	const [ret] = await db
		.update(usersTable)
		.set({
			...updatedUser,
			updatedAt: new Date(),
		})
		.where(eq(usersTable.id, id))
		.returning(selectFields);

	return ret;
}

export async function deleteUser(id: string) {
	const user = await getUserById(id);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	const [ret] = await db
		.delete(usersTable)
		.where(eq(usersTable.id, id))
		.returning(selectFields);

	return ret;
}
