import { IAppConfigureRepository } from "../interfaces/AppConfigureInterface";
import { AppConfigures } from "../models/AppConfigures";

class MongoAppConfigureRepository implements IAppConfigureRepository {
	async getConfig(config: string): Promise<boolean | string | number> {
		const result = await AppConfigures.findOne({ config, status: 1 });
		return result ? result.value : false;
	}
}

export { MongoAppConfigureRepository };
