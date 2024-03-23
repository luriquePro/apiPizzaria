import { ObjectId } from "mongoose";
import { IOrderTable } from "../@types/Order";

interface IOrder {
	_id: ObjectId;
	id: string;
	table: IOrderTable;
	status: number;
	draft: boolean;
	name?: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface IOrderCreate {
	name?: string;
	table: IOrderTable;
	draft: boolean;
	status: number;
}

interface IOrderCreateRepository extends IOrderCreate {}

interface IOrderCreateReturn extends IOrder {}

export { IOrder, IOrderCreate, IOrderCreateRepository, IOrderCreateReturn };
