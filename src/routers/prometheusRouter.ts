import type { Request, Response } from "express";
import { Router } from "express";
import { collectDefaultMetrics, register } from "prom-client";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

collectDefaultMetrics({ register });

router.get(
	"/metrics",
	asyncHandler(async (req: Request, res: Response) => {
		res.set("Content-Type", register.contentType);
		res.end(await register.metrics());
	}),
);

export default router;
