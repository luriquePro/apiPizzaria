import { NotFoundError } from "../helpers/ApiErrors";
import { IItemCreate, IItemCreateRepository, IItemRepository, IItemServices, IItemValidator } from "../interfaces/ItemInterfaces";
import { IOrderRepository } from "../interfaces/OrderInterfaces";
import { IProductRepository } from "../interfaces/ProductInterfaces";

class ItemServices implements IItemServices {
	constructor(
		private readonly itemValidator: IItemValidator,
		private readonly itemRepository: IItemRepository,
		private readonly productRepository: IProductRepository,
		private readonly orderRepository: IOrderRepository,
	) {}
	public async create(dataCreate: IItemCreate): Promise<string> {
		this.itemValidator.create(dataCreate);

		const productExists = await this.productRepository.findOneByObj({ id: dataCreate.product });
		if (!productExists) {
			throw new NotFoundError("Product not found.");
		}

		const orderExists = await this.orderRepository.findOneByObj({ id: dataCreate.order });
		if (!orderExists) {
			throw new NotFoundError("Order not found.");
		}

		const dataItemCreate: IItemCreateRepository = {
			product: {
				id: productExists._id,
				name: productExists.name,
				price: productExists.price,
			},
			order: {
				id: orderExists._id,
			},
			amount: dataCreate.amount,
			total_price: dataCreate.amount * productExists.price,
		};

		await this.itemRepository.create(dataItemCreate);
		return "Item successfully registered.";
	}
}

export { ItemServices };
