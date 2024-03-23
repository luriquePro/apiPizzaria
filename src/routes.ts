import { ApiRouter } from "./ApiRouter";
import { indexRoutes } from "./routes/index.routes";

const routes = new ApiRouter();

routes.use("/", indexRoutes.router);

export { routes };
