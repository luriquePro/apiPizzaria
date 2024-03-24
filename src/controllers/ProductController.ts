import { Request, Response } from "express";
import { IProductCreate, IProductServices } from "../interfaces/ProductInterfaces";

class ProductController {
	constructor(private readonly ProductServices: IProductServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, category, description, price, banner } = req.body;
		const dataCreate: IProductCreate = { name, category, description, price, banner };

		const result = await this.ProductServices.create(dataCreate);
		return res.status(201).json(result);
	}
}

export { ProductController };
