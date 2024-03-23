import { ClientSession } from "mongoose";
import { UserModel } from "../models/User";
import { IUser, IUserCreateRepository, IUserRepository, IUserFind, IUserUpdate } from "../interfaces/UserInterfaces";

class MongoUserRepository implements IUserRepository {
	public async create(dataCreate: IUserCreateRepository, session?: ClientSession): Promise<IUser> {
		const result = await new UserModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: IUserFind): Promise<IUser[] | null> {
		const result = await UserModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: IUserFind): Promise<IUser | null> {
		const result = await UserModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: IUserFind, dataUpdate: IUserUpdate, session?: ClientSession): Promise<IUser | null> {
		const result = await UserModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}
}

export { MongoUserRepository };
