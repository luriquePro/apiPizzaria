import fs from "fs";
import imageThumbnail from "image-thumbnail";
import { v4 as uuid } from "uuid";

import path from "path";
import { promisify } from "util";
import { BannerExtensions } from "../constants/BANNER";
import { ApiError, BadRequestError, NotFoundError } from "../helpers/ApiErrors";
import { ICategoryRepository } from "../interfaces/CategoryInterfaces";
import {
	IProductCreate,
	IProductCreateRepository,
	IProductListAllReturn,
	IProductRepository,
	IProductServices,
	IProductValidator,
} from "../interfaces/ProductInterfaces";
import { IQueryFilter, IQueryOptions } from "../interfaces/QueryFilterInterface";
import Utils from "../utils/Utils";

class ProductServices implements IProductServices {
	constructor(
		private readonly ProductValidator: IProductValidator,
		private readonly ProductRepository: IProductRepository,
		private readonly categoryRepository: ICategoryRepository,
	) {}
	public async create(dataCreate: IProductCreate): Promise<string> {
		this.ProductValidator.create(dataCreate);

		const categoryExists = await this.categoryRepository.findOneByObj({ id: dataCreate.category });
		if (!categoryExists) {
			throw new NotFoundError("Category not found.");
		}

		const productExists = await this.ProductRepository.findOneByObj({ name: dataCreate.name });
		if (productExists) {
			throw new BadRequestError("Product is already exists.");
		}

		const { name, description, price, banner } = dataCreate;

		const imageType = banner.mimetype?.split("/")[1];
		if (!BannerExtensions.includes(imageType!)) {
			throw new ApiError("Tipo de arquivo não suportado", 403);
		}
		const fileName = `${uuid()}.${imageType}`;
		const fileStream = await imageThumbnail(banner.filepath, { responseType: "buffer", percentage: 90 });
		const filePath = path.join(__dirname, "..", "tmp", fileName);

		const writeFileAsync = promisify(fs.writeFile);
		await writeFileAsync(filePath, fileStream);

		const dataProductCreate: IProductCreateRepository = {
			name,
			description,
			price,
			banner: fileName,
			category: {
				id: categoryExists._id,
				name: categoryExists.name,
			},
		};

		await this.ProductRepository.create(dataProductCreate);
		return "Product successfully registered.";
	}

	public async listAll(dataQueryFilter: IQueryFilter): Promise<IProductListAllReturn[]> {
		const options: IQueryOptions = {
			sort: dataQueryFilter.sort,
			query: Utils.formatedDataWithRegularExpression(dataQueryFilter.querySearch),
		};

		const result = await this.ProductRepository.listAll(options);
		return result;
	}
}

export { ProductServices };
