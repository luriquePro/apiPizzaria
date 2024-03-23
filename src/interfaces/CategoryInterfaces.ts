import { ObjectId } from "mongoose";

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

interface ICategoryCreateRepository {
	name: string;
}

interface ICategoryCreateReturn extends ICategory {}

export { ICategory, ICategoryCreate, ICategoryCreateRepository, ICategoryCreateReturn };
