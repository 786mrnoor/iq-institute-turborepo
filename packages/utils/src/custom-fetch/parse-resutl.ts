import type z from "zod";
import { AppError } from "../app-error";
import { errorSchema } from "./error.schema";

async function parseResult<T extends z.ZodType>(
	dataSchema: T,
	res: Response,
): Promise<z.output<T>> {
	const data = await res.json().catch(() => {
		throw new AppError(res.status, `Invalid JSON response (${res.statusText})`);
	});

	if (res.ok) {
		const parsedResult = dataSchema.safeParse(data);

		if (!parsedResult.success) {
			throw new AppError(res.status, "Response validation failed");
		}

		return parsedResult.data;
	}

	const parsedError = errorSchema.safeParse(data);

	if (!parsedError.success) {
		throw new AppError(res.status, "Response shape is not correct");
	}

	const error = parsedError.data;

	throw new AppError(res.status, error.message, error.errors);
}

export { parseResult };
