import { Document, Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";
import { IUser } from "../interfaces/UserInterfaces";
import { STATUS } from "../constants/STATUS";

// Interface de Model
interface IUserModel extends Omit<Document, "id">, Omit<IUser, "_id"> {}

// Criar a Schema
const UserSchema = new Schema<IUserModel>(
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
		login: {
			type: String,
			required: true,
			index: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		roles: {
			type: [String],
			index: true,
			required: true,
		},
		status: {
			type: Number,
			index: true,
			required: true,
			default: STATUS.ATIVO,
		},
		last_login: {
			index: true,
			type: Date,
		},
		user_responsible: {
			name: {
				type: String,
				required: true,
				trim: true,
			},
			login: {
				type: String,
				required: true,
				trim: true,
			},
			id: {
				type: Schema.Types.ObjectId,
				required: true,
				index: true,
				ref: "users",
			},
		},
	},
	{
		timestamps: true,
	},
);

const UserModel = model<IUserModel>("users", UserSchema);
export { UserModel };
