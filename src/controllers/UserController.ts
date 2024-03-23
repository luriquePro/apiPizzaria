import { Request, Response } from "express";
import { IUserAuthenticate, IUserCreate, IUserServices } from "../interfaces/UserInterfaces";

class UserController {
	constructor(private readonly UserServices: IUserServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, login, password, roles } = req.body;
		const dataUserCreate: IUserCreate = { name, email, login, password, roles };

		const result = await this.UserServices.create(req.user, dataUserCreate);
		return res.json(result);
	}

	public async authenticate(req: Request, res: Response): Promise<Response> {
		const { login, password } = req.body;
		const dataUserAuthenticate: IUserAuthenticate = { login, password };

		const result = await this.UserServices.authenticate(dataUserAuthenticate);
		return res.json(result);
	}
}

export { UserController };
