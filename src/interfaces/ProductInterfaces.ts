import { ObjectId } from "mongoose";

interface ICategory {
	name: string;
	id: ObjectId;
}

interface IProduct {
	_id: ObjectId;
	id: string;
	name: string;
	price: number;
	description: string;
	banner: string;
	category: ICategory;
	status: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface IProductCreate {
	name: string;
	price: number;
	description: string;
	banner: string;
	category: ICategory;
}

interface IProductCreateRepository extends IProductCreate {}

interface IProductCreateReturn extends IProduct {}

export { IProduct, IProductCreate, IProductCreateRepository, IProductCreateReturn };
