import { Request, Response } from "express";

type AppRouteHandle = (req: Request, res: Response) => Response | Promise<Response>;
type MethodRoutes = "use" | "get" | "post" | "put" | "delete" | "patch";

export { AppRouteHandle, MethodRoutes };
