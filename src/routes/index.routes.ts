import { ApiRouter } from "../ApiRouter";
import { IndexController } from "../controllers/IndexController";
import { IndexServices } from "../services/IndexServices";

const IndexRoutes = new ApiRouter();

const indexServices = new IndexServices();
const indexController = new IndexController(indexServices);

IndexRoutes.get("/", indexController.index.bind(indexController));

export { IndexRoutes };
