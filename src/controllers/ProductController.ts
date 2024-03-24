import { Request, Response } from "express";
import formidable from "formidable";

import { ApiError, BadRequestError } from "../helpers/ApiErrors";
import { IProductCreate, IProductServices } from "../interfaces/ProductInterfaces";
import { IQuery, IQueryFilter } from "../interfaces/QueryFilterInterface";

class ProductController {
	constructor(private readonly productServices: IProductServices) {}

	public async create(req: Request, res: Response): Promise<Response> {
		return new Promise((resolve) => {
			const form = formidable({ multiples: true });
			form.parse(req, async (err, fields, files) => {
				if (err) {
					throw new ApiError(`Erro upload da imagem. ${err}`, 500);
				}

				if (!files || !files.banner) {
					throw new BadRequestError("A imagem é obrigatória.");
				}

				const dataCreate: IProductCreate = {
					name: fields.name![0],
					category: fields.category![0],
					description: fields.description![0],
					price: Number(fields.price![0]),
					banner: files.banner[0],
				};

				resolve(dataCreate);
			});
		}).then(async (dataCreate) => {
			const result = await this.productServices.create(dataCreate as IProductCreate);
			return res.status(201).json(result);
		});
	}

	public async listAll(req: Request, res: Response): Promise<Response> {
		const { sort, ...querySearch } = req.query as IQuery;
		const dataQueryFilter: IQueryFilter = {
			sort: sort ?? { name: 1 },
			querySearch,
		};

		const result = await this.productServices.listAll(dataQueryFilter);
		return res.json(result);
	}
}

export { ProductController };
