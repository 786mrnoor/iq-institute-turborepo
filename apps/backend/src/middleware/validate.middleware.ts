import type {
	InferRequestShape,
	RequestShape,
	RequestZodShape,
} from "@repo/schemas/request-types";
import { AppError } from "@repo/utils/app-error.js";

function validate<S extends RequestZodShape>(
	schema: S,
	data: RequestShape,
): InferRequestShape<S> {
	const paramsRes = schema.params?.safeParse(data.params || {});
	if (paramsRes && !paramsRes?.success) {
		throw new AppError(400, paramsRes?.error?.issues[0].message);
	}

	const queryRes = schema.query?.safeParse(data.query || {});
	if (queryRes && !queryRes?.success) {
		throw new AppError(400, queryRes?.error?.issues[0].message);
	}

	const bodyRes = schema.body?.safeParse(data.body || {});
	if (bodyRes && !bodyRes?.success) {
		throw new AppError(
			400,
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
