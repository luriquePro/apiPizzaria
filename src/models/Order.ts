import { v4 as uuid } from "uuid";
import { Schema, Document, model } from "mongoose";
import { IOrder } from "../interfaces/OrderInterfaces";

// Interface de Model
interface IOrderModel extends Omit<Document, "id">, Omit<IOrder, "_id"> {}

// Criar a Schema
const OrderSchema = new Schema<IOrderModel>(
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
			index: true,
			trim: true,
		},
		draft: {
			type: Boolean,
			required: true,
			index: true,
			default: false,
		},
		table: {
			description: {
				type: String,
				index: true,
				required: true,
				trim: true,
			},
			number: {
				type: Number,
				index: true,
				required: true,
			},
			id: {
				type: Schema.Types.ObjectId,
				required: true,
				index: true,
				ref: "tables",
			},
		},
		status: {
			type: Number,
			index: true,
			required: true,
			default: 1,
		},
	},
	{
		timestamps: true,
	},
);

const OrderModel = model<IOrderModel>("Orders", OrderSchema);
export { OrderModel };
