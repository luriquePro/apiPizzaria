import { IUser } from "../interfaces/UserInterfaces";

declare global {
	namespace Express {
		export interface Request {
			user: Partial<IUser>;
			user_session: Partial<ISession>;
		}
	}
}
