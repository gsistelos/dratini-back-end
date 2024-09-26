import type { NextFunction, Request, Response } from "express";
import { Counter, register } from "prom-client";

const requestCounter = new Counter({
	name: "http_requests_total",
	help: "Total number of HTTP requests",
	labelNames: ["method", "route"],
});

register.registerMetric(requestCounter);

export function prometheusMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		requestCounter.inc({ method: req.method, route: req.path });
		next();
	} catch (err) {
		next(err);
	}
}
