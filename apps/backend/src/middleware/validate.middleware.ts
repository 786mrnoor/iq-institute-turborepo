import { AppError } from "@repo/utils/app-error.js";
import type { z } from "zod";

type RequestShape<T = unknown> = {
	params?: T;
	body?: T;
	query?: T;
};

export type RequestZodShape = RequestShape<z.ZodObject>;

export type InferRequestShape<S extends RequestZodShape> = {
	params: S["params"] extends z.ZodType ? z.infer<S["params"]> : undefined;
	body: S["body"] extends z.ZodType ? z.infer<S["body"]> : undefined;
	query: S["query"] extends z.ZodType ? z.infer<S["query"]> : undefined;
};

function validate<S extends RequestZodShape>(
	schema: S,
	data: RequestShape,
): InferRequestShape<S> {
	const paramsRes = schema.params?.safeParse(data.params);
	if (paramsRes && !paramsRes?.success) {
		throw new AppError(404, paramsRes?.error?.issues[0].message);
	}

	const queryRes = schema.query?.safeParse(data.query);
	if (queryRes && !queryRes?.success) {
		throw new AppError(404, queryRes?.error?.issues[0].message);
	}

	const bodyRes = schema.body?.safeParse(data.body);
	if (bodyRes && !bodyRes?.success) {
		throw new AppError(
			404,
			"Validation Failed",
			bodyRes?.error?.issues.map((i) => ({
				path: i.path.join("."),
				message: i.message,
			})),
		);
	}

	return {
		params: paramsRes?.data,
		body: bodyRes?.data,
		query: queryRes?.data,
	} as InferRequestShape<S>;
}

export { validate };
