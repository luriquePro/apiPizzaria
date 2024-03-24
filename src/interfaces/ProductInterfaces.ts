import { File } from "formidable";
import { ClientSession, ObjectId } from "mongoose";
import { IQueryFilter, IQueryOptions } from "./QueryFilterInterface";

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
	banner: File;
	category: string;
}

interface IProductCreateRepository {
	name: string;
	price: number;
	description: string;
	category: ICategory;
	banner: string;
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

interface IProductListAllReturn {
	name: string;
	price: number;
	description: string;
	banner_url: string;
	id: string;
	category: string;
}

export { IProduct, IProductCreate, IProductCreateRepository, IProductCreateReturn, IProductFind, IProductListAllReturn, IProductUpdate };

interface IProductRepository {
	create(dataCreate: IProductCreateRepository, session?: ClientSession): Promise<IProduct>;
	findByObj(dataFind: IProductFind): Promise<IProduct[] | null>;
	findOneByObj(dataFind: IProductFind): Promise<IProduct | null>;
	update(dataFilter: IProductFind, dataUpdate: IProductUpdate, session?: ClientSession): Promise<IProduct | null>;
	listAll(options: IQueryOptions): Promise<IProductListAllReturn[]>;
}

interface IProductServices {
	create(dataCreate: IProductCreate): Promise<string>;
	listAll(dataQueryFilter: IQueryFilter): Promise<IProductListAllReturn[]>;
}

interface IProductValidator {
	create(dataCreate: IProductCreate): void;
}

export { IProductRepository, IProductServices, IProductValidator };
