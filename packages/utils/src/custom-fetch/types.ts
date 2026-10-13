export type CustomFetchConfig = Omit<RequestInit, "method" | "body"> & {
	path: string | string[];
	method?: "GET" | "POST" | "PATCH" | "DELETE";
	body?: Record<string, unknown>;
	query?: Record<string, unknown>;
	redirectOn401?: boolean;
};
