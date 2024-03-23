import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import "express-async-errors";

import bodyParser from "body-parser";
import mongoose from "mongoose";

import { CORS_OPTIONS } from "./constants/cors";
import { routes } from "./routes";
import { IApp } from "./interfaces/AppInterfaces";
import { errorMiddleware } from "./middlewares/errorMiddleware";

class App implements IApp {
	public express: Application;
	public isProduction: boolean;
	public formatError: boolean;

	public constructor() {
		this.config();

		this.express = express();
		this.isProduction = process.env.APP_ENV === "production" ? true : false;
		this.formatError = process.env.FORMAT_ERROR === "true" ? true : false;

		this.middlewarePreRoute();
		this.database();
		this.routes();
		this.middlewaresPosRoute();
	}

	private config() {
		dotenv.config();
	}

	private middlewarePreRoute() {
		this.express.use(cors(CORS_OPTIONS));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(express.json());

		this.express.disable("X-Powered-By");
	}

	private database(): void {
		const mongoUri = this.isProduction ? (process.env.MONGODB_URI as string) : `dev_${process.env.MONGODB_URI}`;
		const dbName = this.isProduction ? (process.env.MONGODB_DATABASE as string) : `dev_${process.env.MONGODB_DATABASE}`;
		mongoose
			.connect(mongoUri, { dbName })
			.then(() => console.log("Mongo connected"))
			.catch((error) => console.log(`Mongo error ${error}`));
	}

	private routes(): void {
		this.express.use(routes.router);
	}

	private middlewaresPosRoute(): void {
		if (process.env.APP_ENV === "production") {
			this.express.use(errorMiddleware);
		}
	}
}

export { App };
