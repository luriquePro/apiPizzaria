import { IIndexServices } from "../interfaces/IndexIntefaces";

class IndexServices implements IIndexServices {
	public async index(message?: string): Promise<string> {
		return new Promise((resolve) => {
			resolve(message ?? "Hello World");
		});
	}
}

export { IndexServices };
