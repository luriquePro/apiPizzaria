import { ClientSession } from "mongoose";
import { CategoryModel } from "../models/Category";
import { ICategory, ICategoryCreateRepository, ICategoryRepository, ICategoryFind, ICategoryUpdate } from "../interfaces/CategoryInterfaces";

class MongoCategoryRepository implements ICategoryRepository {
	public async create(dataCreate: ICategoryCreateRepository, session?: ClientSession): Promise<ICategory> {
		const result = await new CategoryModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: ICategoryFind): Promise<ICategory[] | null> {
		const result = await CategoryModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: ICategoryFind): Promise<ICategory | null> {
		const result = await CategoryModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: ICategoryFind, dataUpdate: ICategoryUpdate, session?: ClientSession): Promise<ICategory | null> {
		const result = await CategoryModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}
}

export { MongoCategoryRepository };
