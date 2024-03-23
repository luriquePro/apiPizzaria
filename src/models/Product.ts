import { v4 as uuid } from "uuid";
import { Schema, Document, model } from "mongoose";
import { IProduct } from "../interfaces/ProductInterfaces";

// Interface de Model
interface IProductModel extends Omit<Document, "id">, Omit<IProduct, "_id"> {}

// Criar a Schema
const ProductSchema = new Schema<IProductModel>(
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
			index: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		banner: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: Number,
			index: true,
			required: true,
			default: 1,
		},
		category: {
			name: {
				type: String,
				required: true,
				index: true,
				trim: true,
			},
			id: {
				type: Schema.Types.ObjectId,
				required: true,
				index: true,
				ref: "categories",
			},
		},
	},
	{
		timestamps: true,
	},
);

const ProductModel = model<IProductModel>("Products", ProductSchema);
export { ProductModel };
