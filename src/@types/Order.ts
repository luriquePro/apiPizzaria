import { ObjectId } from "mongoose";

interface IOrderTable {
	description: string;
	number: number;
	id: ObjectId;
}

export { IOrderTable };
