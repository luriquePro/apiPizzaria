import { BadRequestError, NotFoundError } from "../helpers/ApiErrors";
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

		const dataProductCreate: IProductCreateRepository = {
			name,
			description,
			price,
			banner,
			category: {
				id: categoryExists._id,
				name: categoryExists.name,
			},
		};

		await this.ProductRepository.create(dataProductCreate);
		return "Product successfully registered.";
	}

	public async listAll(dataQueryFilter: IQueryFilter): Promise<IProductListAllReturn> {
		const options: IQueryOptions = {
			sort: dataQueryFilter.sort,
			query: Utils.formatedDataWithRegularExpression(dataQueryFilter.querySearch),
		};

		const products = await this.ProductRepository.listAll(options);
		return products;
	}
}

export { ProductServices };
