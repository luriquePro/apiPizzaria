import { Request, Response } from "express";
import { ICategoryCreate, ICategoryServices } from "../interfaces/CategoryInterfaces";

class CategoryController {
	constructor(private readonly categoryServices: ICategoryServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name } = req.body;
		const dataCreate: ICategoryCreate = { name };

		const result = await this.categoryServices.create(dataCreate);
		return res.status(201).json(result);
	}
}

export { CategoryController };
