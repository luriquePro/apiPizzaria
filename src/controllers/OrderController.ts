import { Request, Response } from "express";
import { IOrderCreate, IOrderServices } from "../interfaces/OrderInterfaces";
import { IQuery, IQueryFilter } from "../interfaces/QueryFilterInterface";

class OrderController {
	constructor(private readonly orderServices: IOrderServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { table, name } = req.body;
		const dataCreate: IOrderCreate = { table, user: { id: req.user._id!, name: req.user.name!, login: req.user.login! }, name };

		const result = await this.orderServices.create(dataCreate);
		return res.status(201).json(result);
	}

	public async listAll(req: Request, res: Response): Promise<Response> {
		const { sort, ...querySearch } = req.query as IQuery;
		const dataQueryFilter: IQueryFilter = {
			sort: sort ?? { name: 1 },
			querySearch,
		};

		const result = await this.orderServices.listAll(dataQueryFilter);
		return res.json(result);
	}

	public async myOrdersOpeneds(req: Request, res: Response): Promise<Response> {
		const result = await this.orderServices.myOrdersOpeneds(req.user._id!);
		return res.json(result);
	}
}

export { OrderController };
