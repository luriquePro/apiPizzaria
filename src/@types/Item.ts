import { ObjectId } from "mongoose";

interface IItemProduct {
	name: string;
	price: number;
	id: ObjectId;
}

interface IItemOrder {
	id: ObjectId;
}

export { IItemProduct, IItemOrder };
