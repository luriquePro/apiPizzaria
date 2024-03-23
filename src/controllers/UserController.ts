import { Request, Response } from "express";
import { IUserCreate, IUserServices } from "../interfaces/UserInterfaces";

class UserController {
	constructor(private readonly UserServices: IUserServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, login, password, roles } = req.body;
		const dataUserCreate: IUserCreate = { name, email, login, password, roles };

		const result = await this.UserServices.create(req.user, dataUserCreate);
		return res.json(result);
	}
}

export { UserController };
