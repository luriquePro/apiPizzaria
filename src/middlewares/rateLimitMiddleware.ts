import { NextFunction, Request, Response } from "express";
import { Redis } from "ioredis";

const rateLimit = (resource: string, limit = 5, extraLimit = 10, time = 3, extraTime = 10) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const redis = new Redis();

		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const agent = req.headers["user-agent"];
		const key = `rate-limit-${resource}-${agent}-${ip}`;

		const requestCount = Number((await redis.get(key)) || 0) + 1;
		console.log({ ip, key, requestCount });

		if (requestCount > extraLimit) {
			await redis.set(key, requestCount, "EX", extraTime);
			throw new Error(`Você fez muitas requisições. Aguarde ${extraTime} segundos e tente novamente`);
		}

		if (requestCount > limit) {
			await redis.set(key, requestCount, "EX", time);
			throw new Error(`Você fez muitas requisições. Aguarde ${time} segundos e tente novamente`);
		}

		await redis.set(key, requestCount, "EX", time);

		return next();
	};
};

export { rateLimit };
