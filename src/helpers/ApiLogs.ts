import moment from "moment";
import { ObjectId } from "mongoose";
import { Logger, createLogger, format, transports } from "winston";
import { GlobalAppVariable } from "../constants/GLOBALS";
import { ILogLevel } from "../interfaces/LogInterfaces";

export class ApiLogger {
	private readonly entity: string;
	public logger: Logger;
	private level: string;

	constructor(entity: string) {
		this.entity = entity;
		this.logger = this.loggerStart(this.entity);
		this.level = process.env.NODE_ENV === "dev" ? "debug" : "info";
	}
	private loggerStart(entity: string): Logger {
		return createLogger({
			level: this.level,
			exitOnError: false,
			format: format.json(),
			transports: [
				new transports.File({
					filename: `${process.env.APP_ENV === "production" ? `./log/${entity}Logger.log` : `./src/log/${entity}Logger.log`}`,
				}),
			],
		});
	}

	private log(level: string, data: ILogLevel) {
		this.logger.log(level, {
			trace_id: new Date().getTime(),
			date: moment().format("DD-MM-YYYY hh:mm:ss"),
			remoteAddress: GlobalAppVariable.remoteAddress,
			requestAgent: GlobalAppVariable.requestAgent,
			...data,
		});
	}

	public debug(error: string, message: string, statusCode: number = 100, entityId: string | ObjectId = "0") {
		this.log("debug", { entityId, statusCode, error, message });
	}

	public info(error: string, message: string, statusCode: number = 200, entityId: string | ObjectId = "0") {
		this.log("info", { entityId, statusCode, error, message });
	}

	public error(error: string, message: string, statusCode: number = 400, entityId: string | ObjectId = "0") {
		this.log("error", { entityId, statusCode, error, message });
	}
}
