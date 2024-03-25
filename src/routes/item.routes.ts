import { ApiRouter } from "../ApiRouter";
import { ItemController } from "../controllers/ItemController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoItemRepository } from "../repositories/MongoItemRepository";
import { MongoOrderRepository } from "../repositories/MongoOrderRepository";
import { MongoProductRepository } from "../repositories/MongoProductRepository";
import { ItemServices } from "../services/ItemServices";
import { ItemValidator } from "../validator/ItemValidator";

const ItemRoutes = new ApiRouter();

const productRepository = new MongoProductRepository();
const orderRepository = new MongoOrderRepository();

const itemRepository = new MongoItemRepository();
const itemValidator = new ItemValidator();
const itemServices = new ItemServices(itemValidator, itemRepository, productRepository, orderRepository);
const itemController = new ItemController(itemServices);

ItemRoutes.use(authMiddleware);

ItemRoutes.post("/create", itemController.create.bind(itemController));

export { ItemRoutes };
