import { Request, Response } from "express";
import { IQuery, IQueryFilter } from "../interfaces/QueryFilterInterface";
import { ITableCreate, ITableServices } from "../interfaces/TableInterfaces";

class TableController {
	constructor(private readonly tableServices: ITableServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, number, description, capacity, near_windows, near_power_outlets, position } = req.body;
		const dataCreate: ITableCreate = { name, number, description, capacity, near_windows, near_power_outlets, position };

		const result = await this.tableServices.create(dataCreate);
		return res.status(201).json(result);
	}

	public async listAll(req: Request, res: Response): Promise<Response> {
		const { sort, ...querySearch } = req.query as IQuery;
		const dataQueryFilter: IQueryFilter = {
			sort: sort ?? { name: 1 },
			querySearch,
		};

		const result = await this.tableServices.listAll(dataQueryFilter);
		return res.json(result);
	}
}

export { TableController };
