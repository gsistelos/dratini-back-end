import express from "express";
import type { NextFunction, Request, Response } from "express";
import type HttpError from "./errors/HttpError.js";
import NotFoundError from "./errors/NotFoundError.js";
import usersRouter from "./routers/usersRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", usersRouter);

app.use("*", (req: Request, res: Response) => {
	throw new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	err.status = err.status || 500;
	res.status(err.status).json({ status: err.status, error: err.message });
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
