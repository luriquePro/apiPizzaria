import { ClientSession, ObjectId } from "mongoose";
import { IItemOrder, IItemProduct } from "../@types/Item";
import { IQueryOptions } from "./QueryFilterInterface";

interface IItem {
	_id: ObjectId;
	id: string;
	product: IItemProduct;
	order: IItemOrder;
	amount: number;
	total_price: number;
	status: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface IItemCreate {
	product: string;
	order: string;
	amount: number;
	total_price: number;
}

interface IItemCreateRepository {
	product: IItemProduct;
	order: IItemOrder;
	amount: number;
	total_price: number;
}

interface IItemCreateReturn extends IItem {}

interface IItemFind {
	id?: string;
}
interface IItemListAllReturn {
	id: string;
	table: string;
	user: string;
	product: IItemProduct;
	amount: number;
	total_price: number;
}

interface IItemUpdate {}

export { IItem, IItemCreate, IItemCreateRepository, IItemCreateReturn, IItemFind, IItemListAllReturn, IItemUpdate };

interface IItemRepository {
	create(dataCreate: IItemCreateRepository, session?: ClientSession): Promise<IItem>;
	findByObj(dataFind: IItemFind): Promise<IItem[] | null>;
	findOneByObj(dataFind: IItemFind): Promise<IItem | null>;
	update(dataFilter: IItemFind, dataUpdate: IItemUpdate, session?: ClientSession): Promise<IItem | null>;
	listAll(orderId: ObjectId, options: IQueryOptions): Promise<IItemListAllReturn[]>;
}

interface IItemServices {
	create(dataCreate: IItemCreate): Promise<string>;
}

interface IItemValidator {
	create(dataCreate: IItemCreate): void;
}

export { IItemRepository, IItemServices, IItemValidator };
