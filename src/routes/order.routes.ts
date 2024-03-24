import { ApiRouter } from "../ApiRouter";
import { OrderController } from "../controllers/OrderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoOrderRepository } from "../repositories/MongoOrderRepository";
import { MongoTableRepository } from "../repositories/MongoTableRepository";
import { MongoUserRepository } from "../repositories/MongoUserRepository";
import { OrderServices } from "../services/OrderServices";
import { OrderValidator } from "../validator/OrderValidator";

const OrderRoutes = new ApiRouter();

const tableRepository = new MongoTableRepository();
const userRepository = new MongoUserRepository();

const orderRepository = new MongoOrderRepository();
const orderValidator = new OrderValidator();
const orderServices = new OrderServices(orderValidator, orderRepository, tableRepository, userRepository);
const orderController = new OrderController(orderServices);

OrderRoutes.use(authMiddleware);

OrderRoutes.post("/create", orderController.create.bind(orderController));
OrderRoutes.get("/list", orderController.listAll.bind(orderController));
OrderRoutes.get("/my-orders", orderController.myOrdersOpeneds.bind(orderController));

export { OrderRoutes };
