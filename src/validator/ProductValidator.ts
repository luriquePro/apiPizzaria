import z, { ZodRawShape } from "zod";
import { IProductCreate, IProductValidator } from "../interfaces/ProductInterfaces";
import Utils from "../utils/Utils";

class ProductValidator implements IProductValidator {
	public create(dataProductCreate: IProductCreate): void {
		const ProductSchema: ZodRawShape = {
			name: z.string().min(3, "The name field must have more then 3 letters"),
			price: z.number().min(0),
			description: z.string().min(3, "The description field must have more then 3 letters"),
			category: z.string().uuid("The category informed is invalid."),
		};

		Utils.validationData(ProductSchema, dataProductCreate);
	}
}

export { ProductValidator };
