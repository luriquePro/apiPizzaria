import { ApiRouter } from "../ApiRouter";
import { ProductController } from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoCategoryRepository } from "../repositories/MongoCategoryRepository";
import { MongoProductRepository } from "../repositories/MongoProductRepository";
import { ProductServices } from "../services/ProductServices";
import { ProductValidator } from "../validator/ProductValidator";

const ProductRoutes = new ApiRouter();

const categoryRepository = new MongoCategoryRepository();
const productRepository = new MongoProductRepository();
const productValidator = new ProductValidator();
const productServices = new ProductServices(productValidator, productRepository, categoryRepository);
const productController = new ProductController(productServices);

ProductRoutes.use(authMiddleware);

ProductRoutes.post("/create", productController.create.bind(productController));
ProductRoutes.get("/list", productController.listAll.bind(productController));

export { ProductRoutes };
