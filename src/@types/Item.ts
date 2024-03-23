import { ObjectId } from "mongoose";

interface IItemProduct {
	name: string;
	price: number;
	id: ObjectId;
}
export { IItemProduct };
