import { NextFunction, Request, Response } from "express";
import { GlobalAppVariable } from "../constants/GLOBALS";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
	GlobalAppVariable.requestAgent = req.headers["user-agent"] || "Não identificado";
	GlobalAppVariable.remoteAddress = req.socket.localAddress || "Não identificado";

	return next();
};

export { logMiddleware };
