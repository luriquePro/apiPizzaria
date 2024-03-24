import { ApiRouter } from "./ApiRouter";
import { CategoryRoutes } from "./routes/category.routes";
import { IndexRoutes } from "./routes/index.routes";
import { ProductRoutes } from "./routes/product.routes";
import { TableRoutes } from "./routes/table.routes";
import { UserRoutes } from "./routes/user.routes";

const routes = new ApiRouter();

routes.use("/", IndexRoutes.router);
routes.use("/user", UserRoutes.router);
routes.use("/category", CategoryRoutes.router);
routes.use("/product", ProductRoutes.router);
routes.use("/table", TableRoutes.router);

export { routes };
