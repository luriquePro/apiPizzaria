import { ObjectId } from "mongoose";
import { IItemOrder, IItemProduct } from "../@types/Item";

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
	product: IItemProduct;
	order: IItemOrder;
	amount: number;
	total_price: number;
}

interface IItemCreateRepository extends IItemCreate {}

interface IItemCreateReturn extends IItem {}

export { IItem, IItemCreate, IItemCreateRepository, IItemCreateReturn };
