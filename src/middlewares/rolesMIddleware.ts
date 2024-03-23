import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/ApiErrors";
import { Roles } from "../@types/User";

const isAllowed = (roles: Roles = []) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const userRoles = req.user.roles;

		let hasRolesAllowed = false;
		if (userRoles?.includes("adm")) {
			hasRolesAllowed = true;
		}

		if (!hasRolesAllowed) {
			for (const role of roles) {
				if (userRoles?.includes(role)) {
					hasRolesAllowed = true;
				}
			}
		}

		if (!hasRolesAllowed) {
			throw new UnauthorizedError("Você não tem permissão para acessar essa rota.");
		}

		return next();
	};
};

export { isAllowed };
