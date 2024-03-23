import { ClientSession } from "mongoose";
import { STATUS } from "../constants/STATUS";
import {
	ICategory,
	ICategoryCreateRepository,
	ICategoryFind,
	ICategoryListAllReturn,
	ICategoryRepository,
	ICategoryUpdate,
} from "../interfaces/CategoryInterfaces";
import { CategoryModel } from "../models/Category";

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

	public async listAll(): Promise<ICategoryListAllReturn[]> {
		const result = await CategoryModel.aggregate([
			{ $match: { status: STATUS.ATIVO } },
			{ $sort: { name: 1 } },
			{ $project: { _id: 0, __v: 0, status: 0, createdAt: 0, updatedAt: 0 } },
		]);
		return result;
	}
}

export { MongoCategoryRepository };
