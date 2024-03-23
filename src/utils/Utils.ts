import { z } from "zod";

import { IUtils } from "../interfaces/UtilsInterfaces";
import { ValidationError } from "../helpers/ApiErrors";

class Utils implements IUtils {
	public validationData(dataShape: z.ZodRawShape, dataValidation: object): object | never {
		const schema = z.object(dataShape);
		const result = schema.safeParse(dataValidation);
		if (result.success) {
			return result.data;
		} else {
			const errorMessage: string[] = [];

			for (const error of result.error.errors) {
				if (error.message === "Required") {
					errorMessage.push(`${error.path[0]}'s field is required`);
				} else {
					errorMessage.push(error.message);
				}
			}

			throw new ValidationError(errorMessage.join("\n"));
		}
	}

	public isValidPassword(password: string): boolean {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
		return password.length >= 8 && password.length <= 16 && !password.includes(" ") && passwordRegex.test(password);
	}

	public formatedDataWithRegularExpression = (querySearch: any) => {
		let resultQuery: any = {};

		for (const column in querySearch) {
			if (querySearch.hasOwnProperty(column)) {
				try {
					let queryObject = JSON.parse(querySearch[column]);

					//CASO o OBJETO QUE SE TRATA DE CONSULTA DE DATE , INSTANCIA O DATE
					if (queryObject.typeValue == "date") {
						const dateObject: any = {};
						if (queryObject.value.$gte) dateObject["$gte"] = new Date(queryObject.value.$gte);
						if (queryObject.value.$lte) dateObject["$lte"] = new Date(queryObject.value.$lte);

						resultQuery[column] = dateObject;
					} else {
						//DEVIDO O BANCO TA COM CAMPO CPF EM STRING, É NECESSÁRIO CHECAR SE O CAMPO É CPF PARA NÃO CONVERTER PARA INTEIRO
						// ISSO É NECESSÁRIO PARA RETORNAR DADOS QUE CONTÉM OS NÚMEROS DO CPF PASSADO E NÃO RETORNAR O CPF QUE TIVER O NÚMERO COMPLETO,
						// O FRONT PASSA ESSE VALOR EM NUMBER
						if (column == "cpf") {
							resultQuery[column] = new RegExp(querySearch[column], "i");
						} else {
							resultQuery[column] = isNaN(querySearch[column])
								? queryObject.value
								: parseInt(querySearch[column]);
						}
					}
				} catch (e) {
					resultQuery[column] = new RegExp(querySearch[column], "i");
				}
			}
		}

		return resultQuery;
	};
	public capitalize(value: string): string {
		const words = value.split(" ");
		const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
		return capitalizedWords.join(" ");
	}

}

export default new Utils();
