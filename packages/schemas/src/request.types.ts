import type z from "zod";

export type RequestShape<T = unknown> = {
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
