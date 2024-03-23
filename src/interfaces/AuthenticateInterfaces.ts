import { ObjectId } from "mongoose";
import { IUser, IUserAuthenticateReturn } from "./UserInterfaces";

interface IAuthenticateServices {
	AuthSession(user: IUser, disableSessions?: boolean): Promise<IUserAuthenticateReturn>;
	getLastLogin(userId: ObjectId): Promise<Date>;
}

export { IAuthenticateServices };
