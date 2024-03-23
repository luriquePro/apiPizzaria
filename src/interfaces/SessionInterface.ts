import { ObjectId } from "mongoose";

// Geral
interface ISession {
	_id: ObjectId;
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
	session_id: ObjectId;
	user_id: string;
	name: string;
}

interface IToken {
	session_id: ObjectId;
	user_id: string;
	name: string;
}

export { ISession, ISessionCreate, ITokenCreate, IToken };

// Services
interface ISessionService {
	create(userId: ObjectId): Promise<ISession>;
	inactivateAll(userId: ObjectId): Promise<void>;
	getLastLogin(userId: ObjectId): Promise<Date>;
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
	end_session?: { $gt: Date };
	start_session?: { $lte: Date };
	_id?: ObjectId;
}

export { ISessionSearch, ISessionRepository };
