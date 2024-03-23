import md5 from "md5";
import { BadRequestError } from "../helpers/ApiErrors";
import { IUser, IUserCreate, IUserCreateRepository, IUserRepository, IUserServices, IUserValidator } from "../interfaces/UserInterfaces";

class UserServices implements IUserServices {
	constructor(
		private readonly uservalidator: IUserValidator,
		private readonly userRepository: IUserRepository,
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
}

export { UserServices };
