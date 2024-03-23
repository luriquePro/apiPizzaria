import { Request, Response } from "express";
import { IIndexServices } from "../interfaces/IndexIntefaces";

class IndexController {
	constructor(private readonly indexServices: IIndexServices) {}

	public async index(req: Request, res: Response): Promise<Response> {
		const message = req.query.message as string;
		const result = await this.indexServices.index(message);
		return res.json({ message: result });
	}
}

export { IndexController };
