import { Request, Response } from "express";
import { IItemCreate, IItemServices } from "../interfaces/ItemInterfaces";

class ItemController {
	constructor(private readonly ItemServices: IItemServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { amount, order, product, total_price } = req.body;
		const dataCreate: IItemCreate = { amount, order, product, total_price };

		const result = await this.ItemServices.create(dataCreate);
		return res.status(201).json(result);
	}
}

export { ItemController };
