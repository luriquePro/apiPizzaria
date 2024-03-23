import { Application } from "express";

interface IApp extends IAppParams {}

interface IAppParams {
	express: Application;
	isProduction: boolean;
	formatError: boolean;
}

export { IApp };
