import type { NextFunction, Request, Response } from "express";
import express from "express";
import { WebSocketServer } from "ws";
import type HttpError from "./errors/HttpError.js";
import NotFoundError from "./errors/NotFoundError.js";
import { prometheusMiddleware } from "./middlewares/prometheusMiddleware.js";
import authRouter from "./routers/authRouter.js";
import blocksRouter from "./routers/blocksRouter.js";
import followsRouter from "./routers/followsRouter.js";
import prometheusRouter from "./routers/prometheusRouter.js";
import usersRouter from "./routers/usersRouter.js";
import { wssHandler } from "./wssHandler.js";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(prometheusMiddleware);

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", blocksRouter);
app.use("/api/v1", followsRouter);
app.use("/api/v1", prometheusRouter);
app.use("/api/v1", usersRouter);

// Not found endpoint
app.use("*", (req: Request, res: Response) => {
	throw new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
});

// Error-handling middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	err.status = err.status || 500;
	res.status(err.status).json({ status: err.status, error: err.message });
});

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", wssHandler);
