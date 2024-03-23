import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { GlobalAppVariable } from "../constants/GLOBALS";
import { IAuthenticateServices } from "../interfaces/AuthenticateInterfaces";
import { ISessionService, ITokenCreate } from "../interfaces/SessionInterfaces";
import { IUser, IUserAuthenticateReturn } from "../interfaces/UserInterfaces";

class AuthenticateServices implements IAuthenticateServices {
	constructor(private readonly sessionService: ISessionService) {}

	public async AuthSession(user: IUser, disableSessions: boolean = false): Promise<IUserAuthenticateReturn> {
		// Disabilitar sessões anteriores do Usuario
		if (disableSessions) {
			await this.sessionService.inactivateAll(user._id);
		}

		// Gerir uma sessão
		const session = await this.sessionService.create(user._id);
		const dataToken: ITokenCreate = {
			session_id: session._id,
			user_id: user.id,
			name: user.name,
		};

		// Gerar Token
		const token = jwt.sign(dataToken, process.env.SECRET ?? "", { expiresIn: `${GlobalAppVariable.sessionTime}d` });
		const result: IUserAuthenticateReturn = {
			token: token,
			name: user.name,
			email: user.email,
			id: user.id,
			start_session: session.start_session,
			end_session: session.end_session,
			roles: user.roles,
		};

		// Retornar dados do usuario Autenticado
		return result;
	}

	public async getLastLogin(userId: ObjectId): Promise<Date> {
		// Pega sessão ativa do Usuario
		const result = await this.sessionService.getLastLogin(userId);
		return result;
	}
}

export { AuthenticateServices };
