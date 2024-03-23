import { ApiRouter } from "./ApiRouter";
import { categoryRoutes } from "./routes/category.routes";
import { indexRoutes } from "./routes/index.routes";
import { UserRoutes } from "./routes/user.routes";

const routes = new ApiRouter();

routes.use("/", indexRoutes.router);
routes.use("/user", UserRoutes.router);
routes.use("/category", categoryRoutes.router);

export { routes };
