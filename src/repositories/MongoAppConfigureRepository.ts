import { AppConfigures } from "../models/AppConfigures";

class MongoAppConfigureRepository {
	public static async getConfig(config: string): Promise<boolean | string | number | undefined> {
		const result = await AppConfigures.findOne({ config, status: 1 });
		return result?.value;
	}
}

export { MongoAppConfigureRepository };
