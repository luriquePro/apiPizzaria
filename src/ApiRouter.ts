import { RequestHandler, Router } from "express";

import { AppMiddleware, AppRouteHandle, MethodRoutes } from "./@types/App";
import { IRouter } from "./interfaces/RouterInterfaces";

class ApiRouter implements IRouter {
	public router: Router;

	constructor() {
		this.router = Router();
	}

	public default(method: MethodRoutes, path: string, callback: Router | AppRouteHandle) {
		return this.router[method](path, callback);
	}

	public use(path: string | Router | AppMiddleware, router?: Router) {
		if (typeof path === "string" && router) {
			return this.router.use(path, router);
		}
		return this.router.use(path as AppMiddleware);
	}

	public get(path: string, handle: AppRouteHandle, middlewares?: AppRouteHandle | RequestHandler<unknown, unknown, Record<string, unknown>>) {
		if (middlewares) {
			return this.router.get(path, handle, middlewares);
		}
		return this.router.get(path, handle);
	}

	public post(path: string, handle: AppRouteHandle) {
		return this.router.post(path, handle);
	}

	public patch(path: string, handle: AppRouteHandle) {
		return this.router.patch(path, handle);
	}

	public delete(path: string, handle: AppRouteHandle) {
		return this.router.delete(path, handle);
	}
}

export { ApiRouter };
