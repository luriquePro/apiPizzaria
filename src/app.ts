import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import "express-async-errors";

import bodyParser from "body-parser";
import mongoose from "mongoose";

import { CORS_OPTIONS } from "./constants/CORS";
import { IApp } from "./interfaces/AppInterfaces";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { logMiddleware } from "./middlewares/logMiddleware";
import { routes } from "./routes";

class App implements IApp {
	public express: Application;
	public isProduction: boolean;
	public formatError: boolean;

	public constructor() {
		dotenv.config();

		this.express = express();
		this.isProduction = process.env.APP_ENV === "production" ? true : false;
		this.formatError = process.env.FORMAT_ERROR === "true" ? true : false;

		this.express.use("/tmp", express.static(__dirname + "/tmp"));

		this.middlewarePreRoute();
		this.database();
		this.routes();
		this.middlewaresPosRoute();
	}

	private middlewarePreRoute() {
		this.express.use(cors(CORS_OPTIONS));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(express.json());
		this.express.use(logMiddleware);

		this.express.disable("X-Powered-By");
	}

	private database(): void {
		const mongoUri = process.env.MONGODB_URI as string;
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
		if (this.formatError) {
			this.express.use(errorMiddleware);
		}
	}
}

export { App };
