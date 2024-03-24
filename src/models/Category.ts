import { v4 as uuid } from "uuid";
import { Schema, Document, model } from "mongoose";
import { ICategory } from "../interfaces/CategoryInterfaces";
import { STATUS } from "../constants/STATUS";

// Interface de Model
interface ICategoryModel extends Omit<Document, "id">, Omit<ICategory, "_id"> {}

// Criar a Schema
const CategorySchema = new Schema<ICategoryModel>(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
			default: uuid,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: Number,
			index: true,
			required: true,
			default: STATUS.ATIVO,
		},
	},
	{
		timestamps: true,
	},
);

const CategoryModel = model<ICategoryModel>("Categories", CategorySchema);
export { CategoryModel };
