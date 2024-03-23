import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";

import { GlobalAppVariable } from "../constants/GLOBALS";
import { STATUS } from "../constants/STATUS";
import { UnauthorizedError } from "../helpers/ApiErrors";
import { IToken } from "../interfaces/SessionInterfaces";
import { IUser } from "../interfaces/UserInterfaces";
import { MongoSessionRepository } from "../repositories/MongoSessionRepository";
import { MongoUserRepository } from "../repositories/MongoUserRepository";

const UserRepository = new MongoUserRepository();
const SessionRepository = new MongoSessionRepository();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["x-access-token"] as string;
	if (!token) {
		throw new UnauthorizedError("Restrict Access");
	}

	const { userId, sessionId } = jwt.verify(token, process.env.SECRET as string) as IToken;

	const user = await UserRepository.findOneByObj({ id: userId });
	if (!user || user.status != STATUS.ATIVO) {
		throw new UnauthorizedError("Invalid Request");
	}

	// Buscar as sessões em aberto
	// Permitir acesso somente se o token for correspondente a essa mesma sessão.
	// E se a sessão tiver em aberto(Status e EndSession)

	const session = await SessionRepository.findOneByObj({
		user: user._id,
		status: STATUS.ATIVO,
		end_session: { $gt: moment().utc().toDate() },
		id: sessionId,
	});

	if (!session) {
		throw new UnauthorizedError("Sessão expirada, faça login novamente");
	}

	const loggedUser = user as Partial<IUser>;
	delete loggedUser.password;

	GlobalAppVariable.roles = user.roles;
	req.user = loggedUser;
	req.user_session = session;

	return next();
};

export { authMiddleware };
