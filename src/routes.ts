import { ApiRouter } from "./ApiRouter";
import { CategoryRoutes } from "./routes/category.routes";
import { IndexRoutes } from "./routes/index.routes";
import { ItemRoutes } from "./routes/item.routes";
import { OrderRoutes } from "./routes/order.routes";
import { ProductRoutes } from "./routes/product.routes";
import { TableRoutes } from "./routes/table.routes";
import { UserRoutes } from "./routes/user.routes";

const routes = new ApiRouter();

routes.use("/", IndexRoutes.router);
routes.use("/user", UserRoutes.router);
routes.use("/category", CategoryRoutes.router);
routes.use("/product", ProductRoutes.router);
routes.use("/table", TableRoutes.router);
routes.use("/order", OrderRoutes.router);
routes.use("/item", ItemRoutes.router);

export { routes };
