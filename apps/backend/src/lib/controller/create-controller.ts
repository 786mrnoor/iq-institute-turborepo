import type { RequestZodShape } from "@repo/schemas/request-types";
import type { Request, Response } from "express";
import { validate } from "@/middleware/validate.middleware";
import { verifySession } from "../session";
import type { ControllerOptions } from "./types/options.types";
import type { ControllerResult } from "./types/result.types";

function createController<TSchema extends RequestZodShape, TResult>(
	options: ControllerOptions<TSchema, TResult>,
) {
	return async (req: Request, res: Response) => {
		const parsed = validate(options.schema, {
			params: req.params,
			body: req.body,
			query: req.query,
		});

		let result: ControllerResult<TResult>;

		if (options.requireAuth) {
			const user = await verifySession(req);
			if (!user) {
				res.sendStatus(401);
				return;
			}

			result = await options.handler({ input: parsed, user, req, res });
		} else {
			result = await options.handler({ input: parsed, user: null, req, res });
		}

		res.status(result.statusCode).json(result.data);
	};
}

export { createController };
