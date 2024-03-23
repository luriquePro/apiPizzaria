import { ApiRouter } from "./ApiRouter";
import { indexRoutes } from "./routes/index.routes";
import { UserRoutes } from "./routes/user.routes";

const routes = new ApiRouter();

routes.use("/", indexRoutes.router);
routes.use("/user", UserRoutes.router);

export { routes };
