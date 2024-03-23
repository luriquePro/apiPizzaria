import { IUserAuthenticate, IUserCreate, IUserValidator } from "../interfaces/UserInterfaces";
import Utils from "../utils/Utils";
import z, { ZodRawShape } from "zod";

class UserValidator implements IUserValidator {
	public create(dataUserCreate: IUserCreate): void {
		const userSchema: ZodRawShape = {
			name: z.string().min(3, "The name field must have more then 3 letters"),
			login: z
				.string()
				.min(3, "The login field must have more then 3 letters")
				.max(11, "login must have at most 11 characters")
				.refine((login: string) => !login.includes(" "), "Login cannot be contain empty characters ''"),
			email: z.string().email("The email's field isn't valid"),
			password: z
				.string()
				.min(8, "Password must have at least 8 characters")
				.max(16, "Password must have at most 16 characters")
				.refine((password: string) => !password.includes(" "), "Password cannot be contain empty characters ''")
				.refine(
					(password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(password),
					"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
				),
		};

		Utils.validationData(userSchema, dataUserCreate);
	}

	public authenticate(dataUserAuthenticate: IUserAuthenticate): void {
		const userSchema: ZodRawShape = {
			login: z.string(),
			password: z
				.string()
				.min(8, "Password must have at least 8 characters")
				.max(16, "Password must have at most 16 characters")
				.refine((password: string) => !password.includes(" "), "Password cannot be contain empty characters ''")
				.refine(
					(password: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(password),
					"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
				),
		};

		Utils.validationData(userSchema, dataUserAuthenticate);
	}
}

export { UserValidator };
