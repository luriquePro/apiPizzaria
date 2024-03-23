import { ClientSession } from "mongoose";
import { IHelperErrors } from "../interfaces/HelpersInterfaces";

export class ApiError extends Error implements IHelperErrors {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number, session?: ClientSession) {
		if (session) {
			session.abortTransaction().then(() => {
				session.endSession();
			});
		}
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends ApiError {
	constructor(message: string, session?: ClientSession) {
		super(message, 400, session);
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string, session?: ClientSession) {
		super(message, 401, session);
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string, session?: ClientSession) {
		super(message, 404, session);
	}
}

export class ValidationError extends ApiError {
	constructor(message: string, session?: ClientSession) {
		super(message, 422, session);
	}
}

export class CustomError extends Error {
	public readonly statusCode: number;
	public readonly customError: boolean;
	constructor(message: object, statusCode: number, session?: ClientSession) {
		if (session) {
			session.abortTransaction().then(() => {
				session.endSession();
			});
		}

		super(JSON.stringify(message));
		this.statusCode = statusCode;
		this.customError = true;
	}
}
