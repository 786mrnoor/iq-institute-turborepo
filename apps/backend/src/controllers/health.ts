import type { Request, Response } from "express";

export async function getHealthController(_req: Request, res: Response) {
	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now(),
	};

	try {
		res.status(200).send(healthCheck);
	} catch {
		res.status(503).send();
	}
}
