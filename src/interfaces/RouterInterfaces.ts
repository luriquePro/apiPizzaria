import { Router } from "express";
import { AppRouteHandle, MethodRoutes } from "../@types/App";

interface IRouter extends IRoutesParams, IRouterMethods {}

interface IRoutesParams {
	router: Router;
}

interface IRouterMethods {
	default(method: MethodRoutes, path: string, callback: Router | AppRouteHandle): Router;
	use(path: string, router: Router): Router;
	get(path: string, handle: AppRouteHandle): Router;
	post(path: string, handle: AppRouteHandle): Router;
	patch(path: string, handle: AppRouteHandle): Router;
	delete(path: string, handle: AppRouteHandle): Router;
}

export { IRouter };
