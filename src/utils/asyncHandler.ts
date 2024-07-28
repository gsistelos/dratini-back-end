import type { NextFunction, Request, Response } from "express";

type AsyncHandlerFunction = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>;

type HandlerFunction = (
	req: Request,
	res: Response,
	next: NextFunction,
) => void;

function asyncHandler(fn: AsyncHandlerFunction): HandlerFunction {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
}

export default asyncHandler;
