import { ObjectId } from "mongoose";

// Geral
interface ISession {
	_id: ObjectId;
	id: string;
	status: number;
	user: ObjectId;
	start_session: Date;
	end_session: Date;
	ip: string;
	request_agent: string;
}
interface ISessionCreate {
	status: number;
	user: ObjectId;
	start_session: Date;
	end_session: Date;
	ip: string;
	request_agent: string;
}

interface ITokenCreate {
	sessionId: string;
	userId: string;
	login: string;
}

interface IToken extends ITokenCreate {}

export { ISession, ISessionCreate, IToken, ITokenCreate };

// Services
interface ISessionService {
	create(userId: ObjectId): Promise<ISession>;
	inactivateAll(userId: ObjectId): Promise<void>;
	getLastLogin(userId: ObjectId): Promise<Date>;
	getAllSessionsOpened(userId: ObjectId): Promise<ISession | null>;
}

export { ISessionService };

// Repositorios
interface ISessionRepository {
	create(dataSession: ISessionCreate): Promise<ISession>;
	inactivateAll(userId: ObjectId): Promise<void>;
	findOneByObj(dataSession: ISessionSearch): Promise<ISession | null>;
}

interface ISessionSearch {
	status?: number;
	user?: ObjectId;
	id?: string;
	end_session?: { $gt: Date };
	start_session?: { $lte: Date };
	_id?: ObjectId;
}

export { ISessionRepository, ISessionSearch };
