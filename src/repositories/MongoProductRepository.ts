import { ClientSession } from "mongoose";
import {
	IProduct,
	IProductCreateRepository,
	IProductFind,
	IProductListAllReturn,
	IProductRepository,
	IProductUpdate,
} from "../interfaces/ProductInterfaces";
import { ProductModel } from "../models/Product";
import { IQueryOptions } from "../interfaces/QueryFilterInterface";
import { STATUS } from "../constants/STATUS";

class MongoProductRepository implements IProductRepository {
	public async create(dataCreate: IProductCreateRepository, session?: ClientSession): Promise<IProduct> {
		const result = await new ProductModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: IProductFind): Promise<IProduct[] | null> {
		const result = await ProductModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: IProductFind): Promise<IProduct | null> {
		const result = await ProductModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: IProductFind, dataUpdate: IProductUpdate, session?: ClientSession): Promise<IProduct | null> {
		const result = await ProductModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}

	public async listAll(options: IQueryOptions): Promise<IProductListAllReturn> {
		const result = await ProductModel.aggregate([
			{
				$match: {
					status: STATUS.ATIVO,
					...options.query,
				},
			},
			{
				$sort: options.sort,
			},
			{
				$project: {
					_id: 0,
					name: 1,
					price: 1,
					description: 1,
					banner: 1,
					id: 1,
					category: "$category.name",
				},
			},
		]);
		return result;
	}
}

export { MongoProductRepository };
