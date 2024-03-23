import moment from "moment";
import { ObjectId } from "mongoose";
import { ISession, ISessionRepository, ISessionSearch } from "../interfaces/SessionInterfaces";
import { Session } from "../models/Session";

class MongoSessionRepository implements ISessionRepository {
	async create(dataCreate: ISession): Promise<ISession> {
		const result = await new Session(dataCreate).save();
		return result;
	}

	async findOneByObj(dataFindOneByObj: ISessionSearch): Promise<ISession | null> {
		const result = await Session.findOne(dataFindOneByObj).sort({ datetime: -1 }).lean();
		return result;
	}

	async inactivateAll(userId: ObjectId): Promise<void> {
		await Session.updateOne(
			{
				user: userId,
				status: 1,
			},
			{
				$set: {
					status: 2,
					end_session: moment().utc().toDate(),
				},
			},
		)
			.sort({ start_session: -1 })
			.lean();
	}
}

export { MongoSessionRepository };
