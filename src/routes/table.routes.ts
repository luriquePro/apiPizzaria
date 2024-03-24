import { ApiRouter } from "../ApiRouter";
import { TableController } from "../controllers/TableController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { MongoTableRepository } from "../repositories/MongoTableRepository";
import { TableServices } from "../services/TableServices";
import { TableValidator } from "../validator/TableValidator";

const TableRoutes = new ApiRouter();

const tableRepository = new MongoTableRepository();
const tableValidator = new TableValidator();
const tableServices = new TableServices(tableValidator, tableRepository);
const tableController = new TableController(tableServices);

TableRoutes.use(authMiddleware);

TableRoutes.post("/create", tableController.create.bind(tableController));
TableRoutes.get("/list", tableController.listAll.bind(tableController));

export { TableRoutes };
