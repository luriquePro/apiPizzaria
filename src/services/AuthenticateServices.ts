import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { GlobalAppVariable } from "../constants/GLOBALS";
import { IAuthenticateServices } from "../interfaces/AuthenticateInterfaces";
import { ISession, ISessionService, ITokenCreate } from "../interfaces/SessionInterfaces";
import { IUser, IUserAuthenticateReturn } from "../interfaces/UserInterfaces";

class AuthenticateServices implements IAuthenticateServices {
	constructor(private readonly sessionService: ISessionService) {}

	public async AuthSession(user: IUser, disableSessions: boolean = false): Promise<IUserAuthenticateReturn> {
		const sessionOpened = await this.sessionService.getAllSessionsOpened(user._id);
		if (sessionOpened) {
			const result = this.generateToken(user, sessionOpened);
			return result;
		}

		// Disabilitar sessões anteriores do Usuario
		if (disableSessions) {
			await this.sessionService.inactivateAll(user._id);
		}

		// Gerir uma sessão
		const session = await this.sessionService.create(user._id);
		const result = this.generateToken(user, session);

		// Retornar dados do usuario Autenticado
		return result;
	}

	public async getLastLogin(userId: ObjectId): Promise<Date> {
		// Pega sessão ativa do Usuario
		const result = await this.sessionService.getLastLogin(userId);
		return result;
	}

	private generateToken(user: IUser, session: ISession): IUserAuthenticateReturn {
		const dataToken: ITokenCreate = {
			session_id: session._id,
			user_id: user.id,
			name: user.name,
		};

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
		return result;
	}
}

export { AuthenticateServices };
