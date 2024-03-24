import { ClientSession } from "mongoose";
import { IProduct, IProductCreateRepository, IProductFind, IProductRepository, IProductUpdate } from "../interfaces/ProductInterfaces";
import { ProductModel } from "../models/Product";

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
}

export { MongoProductRepository };
