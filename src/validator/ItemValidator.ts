import z, { ZodRawShape } from "zod";
import { IItemCreate, IItemValidator } from "../interfaces/ItemInterfaces";
import Utils from "../utils/Utils";

class ItemValidator implements IItemValidator {
	public create(dataItemCreate: IItemCreate): void {
		const ItemSchema: ZodRawShape = {
			product: z.string().uuid("The product informed is invalid."),
			order: z.string().uuid("The order informed is invalid."),
			amount: z.number().min(0),
			total_price: z.number().min(0),
		};

		Utils.validationData(ItemSchema, dataItemCreate);
	}
}

export { ItemValidator };
