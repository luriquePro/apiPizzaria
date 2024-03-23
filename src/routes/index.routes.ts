import { ApiRouter } from "../ApiRouter";
import { IndexController } from "../controllers/IndexController";
import { IndexServices } from "../services/IndexServices";

const indexRoutes = new ApiRouter();

const indexServices = new IndexServices();
const indexController = new IndexController(indexServices);

indexRoutes.get("/", indexController.index.bind(indexController));

export { indexRoutes };
