import { hashPassword } from "./hashPassword.js";

export function comparePasswords(rawPassword: string, hashedPassword: string) {
	return hashPassword(rawPassword) === hashedPassword;
}
