import { ClientSession, ObjectId } from "mongoose";

interface ICategory {
	_id: ObjectId;
	id: string;
	name: string;
	status: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

interface ICategoryCreate {
	name: string;
}

interface ICategoryCreateRepository extends ICategoryCreate {}

interface ICategoryCreateReturn extends ICategory {}

interface ICategoryFind {
	id?: string;
	status?: number;
	name?: string;
	_id?: ObjectId;
}

interface ICategoryUpdate {
	name?: string;
	status?: number;
}

export { ICategory, ICategoryCreate, ICategoryCreateRepository, ICategoryCreateReturn, ICategoryFind, ICategoryUpdate };

interface ICategoryServices {
	create(dataCreate: ICategoryCreateRepository): Promise<string>;
}

interface ICategoryValidator {
	create(dataCreate: ICategoryCreateRepository): void;
}

interface ICategoryRepository {
	create(dataCreate: ICategoryCreateRepository, session?: ClientSession): Promise<ICategory>;
	findByObj(dataFind: ICategoryFind): Promise<ICategory[] | null>;
	findOneByObj(dataFind: ICategoryFind): Promise<ICategory | null>;
	update(dataFilter: ICategoryFind, dataUpdate: ICategoryUpdate, session?: ClientSession): Promise<ICategory | null>;
}

export { ICategoryRepository, ICategoryServices, ICategoryValidator };
