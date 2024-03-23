import { ClientSession, ObjectId } from "mongoose";
import { IUserResponsible, Roles } from "../@types/User";

interface IUser {
	_id: ObjectId;
	id: string;
	name: string;
	login: string;
	email: string;
	password: string;
	status: number;
	roles: Roles;
	user_responsible: IUserResponsible;
	createdAt: Date;
	last_login?: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface IUserCreate {
	name: string;
	login: string;
	email: string;
	password: string;
	roles: Roles;
}

interface IUserCreateRepository {
	name: string;
	login: string;
	email: string;
	password: string;
	roles: Roles;
	status: number;
	user_responsible: IUserResponsible;
}

interface IUserRegisterReturn extends IUser {}

interface IUserAuthenticate {
	login: string;
	password: string;
}

interface IUserFind {
	_id?: ObjectId;
	id?: string;
	email?: string;
	login?: string;
	status?: number;
}

interface IUserUpdate {
	name?: string;
	login?: string;
	email?: string;
	password?: string;
	status?: number;
	last_login?: Date;
	roles?: Roles;
	user_responsible?: IUserResponsible;
}

interface IUserAuthenticateReturn {
	id: string;
	token: string;
	roles: Roles;
	email: string;
	name: string;
	start_session: Date;
	end_session: Date;
}

interface IUserShowReturn {
	id: string;
	name: string;
	login: string;
	email: string;
	last_login?: Date;
	createdAt: Date;
}

export {
	IUser,
	IUserAuthenticate,
	IUserAuthenticateReturn,
	IUserCreate,
	IUserCreateRepository,
	IUserFind,
	IUserRegisterReturn,
	IUserShowReturn,
	IUserUpdate,
};

interface IUserServices {
	create(dataUser: Partial<IUser>, dataUserCreate: IUserCreate): Promise<string>;
	authenticate(dataUserAuthenticate: IUserAuthenticate): Promise<IUserAuthenticateReturn>;
	show(userId: ObjectId): Promise<IUserShowReturn>;
}

interface IUserValidator {
	create(dataUserCreate: IUserCreate): void;
	authenticate(dataUserAuthenticate: IUserAuthenticate): void;
}

interface IUserRepository {
	findOneByObj(dataFind: IUserFind): Promise<IUser | null>;
	findByObj(dataFind: IUserFind): Promise<IUser[] | null>;
	create(dataCreate: IUserCreateRepository, session?: ClientSession): Promise<IUser>;
	update(dataFilter: IUserFind, dataUpdate: IUserUpdate, session?: ClientSession): Promise<IUser | null>;
}

export { IUserRepository, IUserServices, IUserValidator };
