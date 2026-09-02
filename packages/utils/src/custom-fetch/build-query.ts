import type { CustomFetchConfig } from "./types";

export function buildQuery(query: CustomFetchConfig["query"]) {
	if (!query) return "";

	const params = new URLSearchParams();

	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			params.append(key, String(value));
		}
	});

	const str = params.toString();

	return `?${str}`;
}
