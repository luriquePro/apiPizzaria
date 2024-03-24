import { ObjectId } from "mongoose";
import { STATUS } from "../constants/STATUS";
import { BadRequestError, NotFoundError } from "../helpers/ApiErrors";
import {
	IOrderCreate,
	IOrderCreateRepository,
	IOrderListAllReturn,
	IOrderMyOrdersOpenedReturn,
	IOrderRepository,
	IOrderServices,
	IOrderValidator,
} from "../interfaces/OrderInterfaces";
import { IQueryFilter, IQueryOptions } from "../interfaces/QueryFilterInterface";
import { ITableRepository } from "../interfaces/TableInterfaces";
import { IUserRepository } from "../interfaces/UserInterfaces";
import Utils from "../utils/Utils";

class OrderServices implements IOrderServices {
	constructor(
		private readonly orderValidator: IOrderValidator,
		private readonly orderRepository: IOrderRepository,
		private readonly tableRepository: ITableRepository,
		private readonly userRepository: IUserRepository,
	) {}
	public async create(dataCreate: IOrderCreate): Promise<string> {
		this.orderValidator.create(dataCreate);

		const tableExists = await this.tableRepository.findOneByObj({ id: dataCreate.table, status: STATUS.ATIVO });
		if (!tableExists) {
			throw new NotFoundError("Table not found.");
		}

		const orderExists = await this.orderRepository.findOneByObj({ "table.number": tableExists.number, status: STATUS.ATIVO });
		if (orderExists) {
			throw new BadRequestError("This table already has an open order");
		}

		const dataOrderCreate: IOrderCreateRepository = {
			name: dataCreate.name,
			table: {
				id: tableExists._id,
				number: tableExists.number,
				description: tableExists.description,
			},
			user: dataCreate.user,
		};

		await this.orderRepository.create(dataOrderCreate);
		return "Order successfully registered.";
	}

	public async listAll(dataQueryFilter: IQueryFilter): Promise<IOrderListAllReturn[]> {
		const options: IQueryOptions = {
			sort: dataQueryFilter.sort,
			query: Utils.formatedDataWithRegularExpression(dataQueryFilter.querySearch),
		};

		const result = await this.orderRepository.listAll(options);
		return result;
	}

	public async myOrdersOpeneds(userId: ObjectId): Promise<IOrderMyOrdersOpenedReturn[]> {
		const userExists = await this.userRepository.findOneByObj({ _id: userId, status: STATUS.ATIVO });
		if (!userExists) {
			throw new NotFoundError("User not found.");
		}

		const result = await this.orderRepository.myOrdersOpeneds(userId);
		return result;
	}
}

export { OrderServices };
