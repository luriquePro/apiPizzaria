import z, { ZodRawShape } from "zod";
import { IOrderCreate, IOrderValidator } from "../interfaces/OrderInterfaces";
import Utils from "../utils/Utils";

class OrderValidator implements IOrderValidator {
	public create(dataOrderCreate: IOrderCreate): void {
		const OrderSchema: ZodRawShape = {
			name: z.string().min(3, "The name field must have more then 3 letters").optional(),
			table: z.string().uuid("The table informed is invalid."),
		};

		Utils.validationData(OrderSchema, dataOrderCreate);
	}
}

export { OrderValidator };
