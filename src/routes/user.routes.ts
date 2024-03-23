import { ApiRouter } from "../ApiRouter";
import { UserController } from "../controllers/UserController";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { UserServices } from "../services/UserServices";
import { UserValidator } from "../validator/UserValidator";

const UserRoutes = new ApiRouter();

const UserRepository = new MongoUserRepository();
const uservalidator = new UserValidator();
const userServices = new UserServices(uservalidator, UserRepository);
const userController = new UserController(userServices);

UserRoutes.post("/register", userController.create.bind(userController));

export { UserRoutes };
