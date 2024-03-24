import { v4 as uuid } from "uuid";
import { Schema, Document, model } from "mongoose";
import { IItem } from "../interfaces/ItemInterfaces";
import { STATUS } from "../constants/STATUS";

// Interface de Model
interface IItemModel extends Omit<Document, "id">, Omit<IItem, "_id"> {}

// Criar a Schema
const ItemSchema = new Schema<IItemModel>(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
			default: uuid,
		},
		product: {
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
			id: {
				type: Schema.Types.ObjectId,
				required: true,
				index: true,
				ref: "products",
			},
		},
		order: {
			id: {
				type: Schema.Types.ObjectId,
				required: true,
				index: true,
				ref: "orders",
			},
		},
		amount: {
			type: Number,
			required: true,
			index: true,
		},
		total_price: {
			type: Number,
			required: true,
			index: true,
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

const ItemModel = model<IItemModel>("Items", ItemSchema);
export { ItemModel };
