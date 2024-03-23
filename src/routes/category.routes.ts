import { ApiRouter } from "../ApiRouter";
import { CategoryController } from "../controllers/CategoryController";
import { MongoCategoryRepository } from "../repositories/MongoCategoryRepository";
import { CategoryServices } from "../services/CategoryServices";
import { CategoryValidator } from "../validator/CategoryValidator";

const categoryRoutes = new ApiRouter();

const categoryRepository = new MongoCategoryRepository();
const categoryValidator = new CategoryValidator();
const categoryServices = new CategoryServices(categoryValidator, categoryRepository);
const categoryController = new CategoryController(categoryServices);

categoryRoutes.post("/create", categoryController.create.bind(categoryController));

export { categoryRoutes };
