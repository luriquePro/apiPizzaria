import { ObjectId } from "mongoose";

interface ILog {
	trace_id: number;
	entity_id: string | ObjectId;
	entity: string;
	message: string;
	statusCode: number;
}

interface ILogLevel {
	entityId: string | ObjectId;
	error: string;
	message: string;
	statusCode: number;
	remoteAddress?: string;
	requestAgent?: string;
}

export { ILog, ILogLevel };
