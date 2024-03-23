import moment from "moment";
import { ObjectId } from "mongoose";

import { GlobalAppVariable } from "../constants/GLOBALS";
import { UnauthorizedError } from "../helpers/ApiErrors";
import { ISession, ISessionCreate, ISessionRepository, ISessionService } from "../interfaces/SessionInterfaces";

class SessionServices implements ISessionService {
	constructor(private readonly sessionRepository: ISessionRepository) {}
	public async create(userId: ObjectId): Promise<ISession> {
		const dataSession: ISessionCreate = {
			status: 1,
			user: userId,
			start_session: moment().utc().toDate(),
			end_session: moment().utc().add(GlobalAppVariable.sessionTime, "day").toDate(),
			ip: GlobalAppVariable.remoteAddress,
			request_agent: GlobalAppVariable.requestAgent,
		};

		const session = await this.sessionRepository.create(dataSession);
		return session;
	}

	public async inactivateAll(userId: ObjectId): Promise<void> {
		await this.sessionRepository.inactivateAll(userId);
	}

	public async getLastLogin(userId: ObjectId): Promise<Date> {
		const session = await this.sessionRepository.findOneByObj({
			user: userId,
			status: 1,
			end_session: { $gt: moment().utc().toDate() },
		});

		if (!session) {
			throw new UnauthorizedError("Sessão expirada!");
		}

		return session.start_session;
	}
}

export { SessionServices };
