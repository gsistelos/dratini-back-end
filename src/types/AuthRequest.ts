import type { Request } from "express";

interface AuthRequest extends Request {
	userId?: string;
}

export default AuthRequest;
