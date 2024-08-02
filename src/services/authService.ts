import { SignJWT } from "jose";
import type { User } from "../types/user.js";

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJwt(user: User) {
	const payload = {
		sub: user.id,
		username: user.username,
	};

	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(jwtSecret);
}
