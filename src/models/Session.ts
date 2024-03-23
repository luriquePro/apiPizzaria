import { v4 as uuid } from "uuid";
import { Document, Schema, model } from "mongoose";
import { ISession } from "../interfaces/SessionInterfaces";

interface SessionModel extends Omit<Document, "id">, Omit<ISession, "_id"> {}
const SessionSchema = new Schema<SessionModel>(
	{
		id: {
			type: String,
			unique: true,
			required: true,
			index: true,
			default: uuid,
		},
		status: {
			type: Number,
			required: true,
			default: 1,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			index: true,
		},
		start_session: {
			type: Date,
			required: true,
		},
		end_session: {
			type: Date,
			required: true,
		},
		ip: {
			type: String,
			required: true,
		},
		request_agent: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Session = model<SessionModel>("sessions", SessionSchema);

export { Session };
