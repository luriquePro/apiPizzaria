import { Router } from "express";

import { AppRouteHandle, MethodRoutes } from "./@types/app";
import { IRouter } from "./interfaces/RouterInterfaces";

class ApiRouter implements IRouter {
	public router: Router;

	constructor() {
		this.router = Router();
	}

	public default(method: MethodRoutes, path: string, callback: Router | AppRouteHandle) {
		return this.router[method](path, callback);
	}

	public use(path: string, router: Router) {
		return this.router.use(path, router);
	}

	public get(path: string, handle: AppRouteHandle) {
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
