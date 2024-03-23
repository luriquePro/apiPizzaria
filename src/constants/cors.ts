import cors from "cors";
import { CorsOriginCallback, CustomOrigin, StaticOrigin } from "../@types/Cors";

const ipWhitelist = ["https://localhost:3000", "http://localhost:3000"];

const CORS_OPTIONS: cors.CorsOptions = {
	origin: (origin?: StaticOrigin | CustomOrigin, callback?: CorsOriginCallback) => {
		if (origin && typeof origin === "string" && ipWhitelist.indexOf(origin) !== -1) {
			callback!(null, true);
		} else {
			callback!(null, false);
		}
	},
};

export { CORS_OPTIONS };
