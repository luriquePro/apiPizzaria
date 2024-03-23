import { v4 as uuid } from "uuid";
import { Schema, Document, model } from "mongoose";
import { ITable } from "../interfaces/TableInterfaces";

// Interface de Model
interface ITableModel extends Omit<Document, "id">, Omit<ITable, "_id"> {}

// Criar a Schema
const TableSchema = new Schema<ITableModel>(
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
		number: {
			type: Number,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		capacity: {
			type: Number,
			required: true,
			index: true,
		},
		position: {
			x: {
				type: Number,
				index: true,
				required: true,
			},
			y: {
				type: Number,
				index: true,
				required: true,
			},
		},
		near_windows: {
			type: Boolean,
			index: true,
			required: true,
			default: false,
		},
		near_power_outlets: {
			type: Boolean,
			index: true,
			required: true,
			default: false,
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

const TableModel = model<ITableModel>("Categories", TableSchema);
export { TableModel };
