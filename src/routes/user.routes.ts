import { ApiRouter } from "../ApiRouter";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoSessionRepository } from "../repositories/MongoSessionRepository";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { AuthenticateServices } from "../services/AuthenticateServices";
import { SessionServices } from "../services/SessionServices";
import { UserServices } from "../services/UserServices";
import { UserValidator } from "../validator/UserValidator";

const UserRoutes = new ApiRouter();

const sessionRepository = new MongoSessionRepository();
const sessionService = new SessionServices(sessionRepository);
const authenticateServices = new AuthenticateServices(sessionService);
const UserRepository = new MongoUserRepository();
const uservalidator = new UserValidator();
const userServices = new UserServices(uservalidator, UserRepository, authenticateServices);
const userController = new UserController(userServices);

UserRoutes.post("/authenticate", userController.authenticate.bind(userController));

UserRoutes.use(authMiddleware);

UserRoutes.post("/register", userController.create.bind(userController));

export { UserRoutes };
