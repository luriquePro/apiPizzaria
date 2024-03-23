import { Document, Schema, model } from "mongoose";
import { IAppConfigures } from "../interfaces/AppConfiguresInterfaces";

interface AppConfigures extends Partial<Omit<Document, "id">>, IAppConfigures {}

const AppConfiguresSchema = new Schema<AppConfigures>(
	{
		config: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		value: {
			type: Schema.Types.Mixed,
			required: true,
			trim: true,
			validate: {
				validator: (value: unknown) => {
					// Verifica se o valor é uma String, Number ou Boolean
					return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
				},
				message: "O campo 'value' deve ser do tipo String, Number ou Boolean.",
			},
		},
		status: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	{
		timestamps: true,
	},
);

export const AppConfigures = model<AppConfigures>("app_configures", AppConfiguresSchema);
