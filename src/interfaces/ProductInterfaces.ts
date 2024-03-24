import { ClientSession, ObjectId } from "mongoose";

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
	banner?: string;
	category: string;
}

interface IProductCreateRepository extends Omit<IProductCreate, "category"> {
	category: ICategory;
}

interface IProductCreateReturn extends IProduct {}

interface IProductFind {
	id?: string;
	_id?: ObjectId;
	name?: string;
	status?: number;
	category?: Partial<ICategory>;
}

interface IProductUpdate {}

export { IProduct, IProductCreate, IProductCreateRepository, IProductCreateReturn, IProductFind, IProductUpdate };

interface IProductRepository {
	create(dataCreate: IProductCreateRepository, session?: ClientSession): Promise<IProduct>;
	findByObj(dataFind: IProductFind): Promise<IProduct[] | null>;
	findOneByObj(dataFind: IProductFind): Promise<IProduct | null>;
	update(dataFilter: IProductFind, dataUpdate: IProductUpdate, session?: ClientSession): Promise<IProduct | null>;
}

interface IProductServices {
	create(dataCreate: IProductCreate): Promise<string>;
}

interface IProductValidator {
	create(dataCreate: IProductCreate): void;
}

export { IProductRepository, IProductServices, IProductValidator };
