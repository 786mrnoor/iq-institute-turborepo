import type z from "zod";

import { AppError } from "../app-error";
import { buildQuery } from "./build-query";
import { parseResult } from "./parse-resutl";
import type { CustomFetchConfig } from "./types";

async function customFetch<T extends z.ZodType>(
	dataSchema: T,
	config: CustomFetchConfig,
): Promise<z.output<T>> {
	const path = Array.isArray(config.path) ? config.path.join("/") : config.path;
	const url = path + buildQuery(config.query);

	const res = await fetch(url, {
		...config,
		method: config.method || "GET",
		body: config.body ? JSON.stringify(config.body) : undefined,
		headers: {
			...(config.body ? { "Content-Type": "application/json" } : {}),
			...config.headers,
		},
	});

	if (res.status === 401) {
		if (globalThis.window) {
			window.location.href = "/login";
		}
		throw new AppError(401, "Please login");
	}
	return parseResult(dataSchema, res);
}

export { customFetch };
