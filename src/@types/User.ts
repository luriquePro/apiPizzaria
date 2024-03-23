import { ObjectId } from "mongoose";

interface IUserResponsible {
	name: string;
	login: string;
	id: ObjectId;
}

type Role = "adm" | "manager" | "editor" | "regular" | "common";
type Roles = Role[];

export { IUserResponsible, Roles };
