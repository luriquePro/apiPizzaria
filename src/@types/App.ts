import { Request, Response, NextFunction } from "express";

type AppRouteHandle = (req: Request, res: Response) => Response | Promise<Response>;
type AppMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type MethodRoutes = "use" | "get" | "post" | "put" | "delete" | "patch";

export { AppRouteHandle, MethodRoutes, AppMiddleware };
