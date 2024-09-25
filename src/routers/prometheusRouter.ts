import type { Request, Response } from "express";
import { Router } from "express";
import { Registry, collectDefaultMetrics } from "prom-client";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

const register = new Registry();

collectDefaultMetrics({ register });

router.get(
	"/metrics",
	asyncHandler(async (req: Request, res: Response) => {
		res.set("Content-Type", register.contentType);
		res.end(await register.metrics());
	}),
);

export default router;
