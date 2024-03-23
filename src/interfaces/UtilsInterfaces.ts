import { z } from "zod";

interface IUtils {
	validationData(dataShape: z.ZodRawShape, dataValidation: object): object | never;
	capitalize(value: string): string;
	isValidPassword(password: string): boolean;
}

export { IUtils };
