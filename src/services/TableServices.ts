import { BadRequestError } from "../helpers/ApiErrors";
import { IQueryFilter, IQueryOptions } from "../interfaces/QueryFilterInterface";
import { ITableCreate, ITableListAllReturn, ITableRepository, ITableServices, ITableValidator } from "../interfaces/TableInterfaces";
import Utils from "../utils/Utils";

class TableServices implements ITableServices {
	constructor(
		private readonly tableValidator: ITableValidator,
		private readonly tableRepository: ITableRepository,
	) {}
	public async create(dataCreate: ITableCreate): Promise<string> {
		this.tableValidator.create(dataCreate);

		const [tableWithName, tableWithNumber] = await Promise.all([
			this.tableRepository.findOneByObj({ name: dataCreate.name }),
			this.tableRepository.findOneByObj({ number: dataCreate.number }),
		]);

		if (tableWithName) {
			throw new BadRequestError("Table name is already in use");
		}

		if (tableWithNumber) {
			throw new BadRequestError("Table number is already in use");
		}

		await this.tableRepository.create(dataCreate);
		return "Table successfully registered.";
	}

	public async listAll(dataQueryFilter: IQueryFilter): Promise<ITableListAllReturn[]> {
		const options: IQueryOptions = {
			sort: dataQueryFilter.sort,
			query: Utils.formatedDataWithRegularExpression(dataQueryFilter.querySearch),
		};

		const result = await this.tableRepository.listAll(options);
		return result;
	}
}

export { TableServices };
