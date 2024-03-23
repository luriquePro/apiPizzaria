import md5 from "md5";
import moment from "moment";
import { ObjectId } from "mongoose";
import { STATUS } from "../constants/STATUS";
import { BadRequestError, NotFoundError } from "../helpers/ApiErrors";
import { IAuthenticateServices } from "../interfaces/AuthenticateInterfaces";
import {
	IUser,
	IUserAuthenticate,
	IUserAuthenticateReturn,
	IUserCreate,
	IUserCreateRepository,
	IUserRepository,
	IUserServices,
	IUserShowReturn,
	IUserValidator,
} from "../interfaces/UserInterfaces";

class UserServices implements IUserServices {
	constructor(
		private readonly uservalidator: IUserValidator,
		private readonly userRepository: IUserRepository,
		private readonly authenticateServices: IAuthenticateServices,
	) {}

	public async create(dataUser: Partial<IUser>, dataUserCreate: IUserCreate): Promise<string> {
		this.uservalidator.create(dataUserCreate);

		const [userWithEmail, userWithLogin] = await Promise.all([
			this.userRepository.findOneByObj({ email: dataUserCreate.email }),
			this.userRepository.findOneByObj({ login: dataUserCreate.login }),
		]);

		if (userWithEmail) {
			throw new BadRequestError("Email is already in use");
		}

		if (userWithLogin) {
			throw new BadRequestError("Login is already in use");
		}

		const { password, ...restDataUser } = dataUserCreate;
		const dataUserCreateDTO: IUserCreateRepository = {
			...restDataUser,
			password: md5(password + process.env.SECRET),
			status: 1,
			user_responsible: {
				id: dataUser._id!,
				name: dataUser.name!,
				login: dataUser.login!,
			},
		};

		await this.userRepository.create(dataUserCreateDTO);
		return "Usuário cadastrado com sucesso.";
	}
	public async authenticate(dataUserAuthenticate: IUserAuthenticate): Promise<IUserAuthenticateReturn> {
		this.uservalidator.authenticate(dataUserAuthenticate);

		const getUserByLogin = await Promise.all([
			this.userRepository.findOneByObj({ email: dataUserAuthenticate.login }),
			this.userRepository.findOneByObj({ login: dataUserAuthenticate.login }),
		]);

		const userByLogin = getUserByLogin.filter((user) => user !== null)[0];
		if (!userByLogin) {
			throw new NotFoundError("Usuario não encontrado. Login invalido.");
		}

		if (userByLogin.status !== STATUS.ATIVO) {
			throw new BadRequestError("Usuario não ativo. Entre em contato com o Suporte.");
		}

		// Testa a senha
		const passwordHash = md5(dataUserAuthenticate.password + process.env.SECRET);
		if (passwordHash !== userByLogin.password) {
			throw new NotFoundError("Usuario não encontrado. Senha invalida");
		}

		await this.userRepository.update({ _id: userByLogin._id }, { last_login: moment().utc().toDate() });

		const result = await this.authenticateServices.AuthSession(userByLogin, true);
		return result;
	}
	public async show(userId: ObjectId): Promise<IUserShowReturn> {
		const userExists = await this.userRepository.findOneByObj({ _id: userId });
		if (!userExists) {
			throw new NotFoundError("User not exists");
		}

		const { id, name, login, email, last_login, createdAt } = userExists;
		const dataUserShow: IUserShowReturn = { id, name, login, email, last_login, createdAt };
		return dataUserShow;
	}
}

export { UserServices };
