import { Roles } from "../@types/User";

interface IGlobalVariable {
	requestAgent: string;
	remoteAddress: string;
	sessionTime: number;
	statusAtivoDefault: number;
	quantityPerPageDefault: number;
	roles: Roles;
}

export { IGlobalVariable };
