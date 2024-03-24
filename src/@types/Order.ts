import { ObjectId } from "mongoose";

interface IOrderTable {
	description: string;
	number: number;
	id: ObjectId;
}

interface IOrderUser {
	name: string;
	login: string;
	id: ObjectId;
}

export { IOrderTable, IOrderUser };
