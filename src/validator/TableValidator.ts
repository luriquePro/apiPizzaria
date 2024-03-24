import z, { ZodRawShape } from "zod";
import { ITableCreate, ITableValidator } from "../interfaces/TableInterfaces";
import Utils from "../utils/Utils";

class TableValidator implements ITableValidator {
	public create(dataTableCreate: ITableCreate): void {
		const TableSchema: ZodRawShape = {
			name: z.string().min(3, "The name field must have more then 3 letters"),
			number: z.number().min(0),
			description: z.string().min(3, "The name field must have more then 3 letters"),
			capacity: z.number().min(1),
			near_windows: z.boolean(),
			near_power_outlets: z.boolean(),
		};

		Utils.validationData(TableSchema, dataTableCreate);
	}
}

export { TableValidator };
