import { ICategoryCreate, ICategoryValidator } from "../interfaces/CategoryInterfaces";
import Utils from "../utils/Utils";
import z, { ZodRawShape } from "zod";

class CategoryValidator implements ICategoryValidator {
	public create(dataCategoryCreate: ICategoryCreate): void {
		const CategorySchema: ZodRawShape = {
			name: z.string().min(3, "The name field must have more then 3 letters"),
		};

		Utils.validationData(CategorySchema, dataCategoryCreate);
	}
}

export { CategoryValidator };
