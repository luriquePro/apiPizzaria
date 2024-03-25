import { ClientSession, ObjectId } from "mongoose";
import { STATUS } from "../constants/STATUS";
import { IItem, IItemCreateRepository, IItemFind, IItemListAllReturn, IItemRepository, IItemUpdate } from "../interfaces/ItemInterfaces";
import { IQueryOptions } from "../interfaces/QueryFilterInterface";
import { ItemModel } from "../models/Item";

class MongoItemRepository implements IItemRepository {
	public async create(dataCreate: IItemCreateRepository, session?: ClientSession): Promise<IItem> {
		const result = await new ItemModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: IItemFind): Promise<IItem[] | null> {
		const result = await ItemModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: IItemFind): Promise<IItem | null> {
		const result = await ItemModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: IItemFind, dataUpdate: IItemUpdate, session?: ClientSession): Promise<IItem | null> {
		const result = await ItemModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}

	public async listAll(orderId: ObjectId, options: IQueryOptions): Promise<IItemListAllReturn[]> {
		const result = await ItemModel.aggregate([
			{ $match: { status: STATUS.ATIVO, "order.id": orderId, ...options.query } },
			{ $sort: options.sort },
			{
				$lookup: {
					from: "orders",
					localField: "order.id",
					foreignField: "_id",
					as: "order",
				},
			},
			{
				$unwind: "$order",
			},
			{
				$project: {
					_id: 0,
					id: 1,
					table: { $concat: ["Mesa ", { $toString: "$order.table.number" }] },
					user: "$order.user.name",
					product: 1,
					amount: 1,
					total_price: 1,
				},
			},
		]);
		return result;
	}
}

export { MongoItemRepository };
