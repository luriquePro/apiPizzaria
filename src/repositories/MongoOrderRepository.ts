import { ClientSession, ObjectId } from "mongoose";
import { STATUS } from "../constants/STATUS";
import {
	IOrder,
	IOrderCreateRepository,
	IOrderFind,
	IOrderListAllReturn,
	IOrderMyOrdersOpenedReturn,
	IOrderRepository,
	IOrderUpdate,
} from "../interfaces/OrderInterfaces";
import { IQueryOptions } from "../interfaces/QueryFilterInterface";
import { OrderModel } from "../models/Order";

class MongoOrderRepository implements IOrderRepository {
	public async create(dataCreate: IOrderCreateRepository, session?: ClientSession): Promise<IOrder> {
		const result = await new OrderModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: IOrderFind): Promise<IOrder[] | null> {
		const result = await OrderModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: IOrderFind): Promise<IOrder | null> {
		const result = await OrderModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: IOrderFind, dataUpdate: IOrderUpdate, session?: ClientSession): Promise<IOrder | null> {
		const result = await OrderModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}

	public async listAll(options: IQueryOptions): Promise<IOrderListAllReturn[]> {
		const result = await OrderModel.aggregate([
			{ $match: { status: STATUS.ATIVO, ...options.query } },
			{ $sort: options.sort },
			{
				$project: {
					_id: 0,
					id: 1,
					table: { $concat: ["Mesa ", { $toString: "$table.number" }] },
					user: "$user.name",
					draft: 1,
					name: 1,
				},
			},
		]);
		return result;
	}

	public async myOrdersOpeneds(userId: ObjectId): Promise<IOrderMyOrdersOpenedReturn[]> {
		const result = await OrderModel.aggregate([
			{ $match: { status: STATUS.ATIVO, "user.id": userId } },
			{
				$project: {
					_id: 0,
					id: 1,
					table: { $concat: ["Mesa ", { $toString: "$table.number" }] },
					user: "$user.name",
					draft: 1,
					name: 1,
				},
			},
		]);
		return result;
	}
}

export { MongoOrderRepository };
