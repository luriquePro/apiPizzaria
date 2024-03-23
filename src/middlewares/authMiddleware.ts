import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import moment from "moment";

import { UnauthorizedError } from "../helpers/ApiErrors";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { MongoSessionRepository } from "../repositories/MongoSessionRepository";
import { STATUS } from "../constants/STATUS";
import { IToken } from "../interfaces/SessionInterface";
import { GlobalAppVariable } from "../constants/GLOBALS";

const UserRepository = new MongoUserRepository();
const SessionRepository = new MongoSessionRepository();

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers["x-access-token"] as string;
	if (!token) {
		throw new UnauthorizedError("Restrict Access");
	}

	const { user_id, session_id } = jwt.verify(token, process.env.SECRET ?? "") as IToken;

	const user = await UserRepository.findOneByObj({ id: user_id });
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
		_id: session_id,
	});

	if (!session) {
		throw new UnauthorizedError("Sessão expirada, faça login novamente");
	}

	const { password: _, ...loggedUser } = user;
	const { _id, status, user: __, ...loggedUserSession } = session;

	GlobalAppVariable.roles = loggedUser.roles;

	req.user = loggedUser;
	req.user_session = loggedUserSession;

	next();
};

export { authMiddleware };
