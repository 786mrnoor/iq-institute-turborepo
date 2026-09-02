import type z from "zod";
import { buildQuery } from "./build-query";
import { parseResult } from "./parse-resutl";
import type { CustomFetchConfig } from "./types";

async function customFetch<T extends z.ZodType>(
	dataSchema: T,
	config: CustomFetchConfig,
): Promise<z.output<T>> {
	const url = config.path + buildQuery(config.query);

	const res = await fetch(url, {
		...config,
		method: config.method || "GET",
		body: config.body ? JSON.stringify(config.body) : undefined,
		headers: {
			...(config.body ? { "Content-Type": "application/json" } : {}),
			...config.headers,
		},
	});

	return parseResult(dataSchema, res);
}

export { customFetch };
