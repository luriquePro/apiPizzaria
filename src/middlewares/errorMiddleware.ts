import { NextFunction, Request, Response } from "express";
import { ApiError, CustomError } from "../helpers/ApiErrors";

export const errorMiddleware = (error: Error & Partial<ApiError> & Partial<CustomError>, req: Request, res: Response, next: NextFunction) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : "Internal Server Error";

	if (error.customError) {
		return res.status(statusCode).json(JSON.parse(message));
	} else {
		return res.status(statusCode).json({ message });
	}
};
