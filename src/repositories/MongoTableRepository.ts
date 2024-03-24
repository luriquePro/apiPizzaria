import { ClientSession } from "mongoose";
import { STATUS } from "../constants/STATUS";
import { IQueryOptions } from "../interfaces/QueryFilterInterface";
import { ITable, ITableCreateRepository, ITableFind, ITableListAllReturn, ITableRepository, ITableUpdate } from "../interfaces/TableInterfaces";
import { TableModel } from "../models/Table";

class MongoTableRepository implements ITableRepository {
	public async create(dataCreate: ITableCreateRepository, session?: ClientSession): Promise<ITable> {
		const result = await new TableModel(dataCreate).save({ session });
		return result;
	}

	public async findByObj(dataFind: ITableFind): Promise<ITable[] | null> {
		const result = await TableModel.find(dataFind);
		return result;
	}

	public async findOneByObj(dataFind: ITableFind): Promise<ITable | null> {
		const result = await TableModel.findOne(dataFind).lean();
		return result;
	}

	public async update(dataFilter: ITableFind, dataUpdate: ITableUpdate, session?: ClientSession): Promise<ITable | null> {
		const result = await TableModel.findOneAndUpdate(dataFilter, { $set: dataUpdate }, { session }).lean();
		return result;
	}

	public async listAll(options: IQueryOptions): Promise<ITableListAllReturn[]> {
		const result = await TableModel.aggregate([
			{ $match: { status: STATUS.ATIVO, ...options.query } },
			{ $sort: options.sort },
			{
				$project: {
					_id: 0,
					id: 1,
					name: 1,
					number: 1,
					description: 1,
					capacity: 1,
					position: 1,
					near_windows: 1,
					near_power_outlets: 1,
				},
			},
		]);
		return result;
	}
}

export { MongoTableRepository };
