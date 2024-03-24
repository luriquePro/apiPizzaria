import { Request, Response } from "express";
import { IProductCreate, IProductServices } from "../interfaces/ProductInterfaces";
import { IQuery, IQueryFilter } from "../interfaces/QueryFilterInterface";

class ProductController {
	constructor(private readonly ProductServices: IProductServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, category, description, price, banner } = req.body;
		const dataCreate: IProductCreate = { name, category, description, price, banner };

		const result = await this.ProductServices.create(dataCreate);
		return res.status(201).json(result);
	}

	public async listAll(req: Request, res: Response): Promise<Response> {
		const { sort, ...querySearch } = req.query as IQuery;
		const dataQueryFilter: IQueryFilter = {
			sort: sort ?? { name: 1 },
			querySearch,
		};

		const result = await this.ProductServices.listAll(dataQueryFilter);
		return res.json(result);
	}
}

export { ProductController };
