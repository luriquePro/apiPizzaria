import { ClientSession, ObjectId } from "mongoose";
import { IOrderTable, IOrderUser } from "../@types/Order";
import { IQueryFilter, IQueryOptions } from "./QueryFilterInterface";

interface IOrder {
	_id: ObjectId;
	id: string;
	table: IOrderTable;
	user: IOrderUser;
	status: number;
	draft: boolean;
	name?: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	finishedAt?: Date;
}

interface IOrderCreate {
	name?: string;
	table: string;
	user: IOrderUser;
}

interface IOrderCreateRepository {
	table: IOrderTable;
	user: IOrderUser;
	name?: string;
}

interface IOrderCreateReturn extends IOrder {}

interface IOrderFind {
	id?: string;
	_id?: ObjectId;
	status?: number;
	"table.number"?: number;
	user?: Partial<IOrderUser>;
}

interface IOrderListAllReturn {
	id: string;
	table: string;
	user: string;
	draft: boolean;
	name?: string;
}

interface IOrderUpdate {
	name?: string;
	status?: number;
	draft?: boolean;
}

interface IOrderMyOrdersOpenedReturn extends IOrderListAllReturn {}

export {
	IOrder,
	IOrderCreate,
	IOrderCreateRepository,
	IOrderCreateReturn,
	IOrderFind,
	IOrderListAllReturn,
	IOrderMyOrdersOpenedReturn,
	IOrderUpdate,
};

interface IOrderRepository {
	create(dataCreate: IOrderCreateRepository, session?: ClientSession): Promise<IOrder>;
	findByObj(dataFind: IOrderFind): Promise<IOrder[] | null>;
	findOneByObj(dataFind: IOrderFind): Promise<IOrder | null>;
	update(dataFilter: IOrderFind, dataUpdate: IOrderUpdate, session?: ClientSession): Promise<IOrder | null>;
	listAll(options: IQueryOptions): Promise<IOrderListAllReturn[]>;
	myOrdersOpeneds(userId: ObjectId): Promise<IOrderMyOrdersOpenedReturn[]>;
}

interface IOrderValidator {
	create(dataCreate: IOrderCreate): void;
}

interface IOrderServices {
	create(dataCreate: IOrderCreate): Promise<string>;
	listAll(dataQueryFilter: IQueryFilter): Promise<IOrderListAllReturn[]>;
	myOrdersOpeneds(userId: ObjectId): Promise<IOrderMyOrdersOpenedReturn[]>;
}

export { IOrderRepository, IOrderServices, IOrderValidator };
