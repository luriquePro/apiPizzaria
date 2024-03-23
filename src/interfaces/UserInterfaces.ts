import { ObjectId } from "mongoose";
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

export { IUser, IUserCreate, IUserCreateRepository, IUserRegisterReturn, IUserAuthenticate };
