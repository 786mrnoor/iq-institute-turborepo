import type { LoginData } from "@repo/schemas/auth/login";
import { customFetch } from "@repo/utils/custom-fetch/index.ts";
import z from "zod";

export const loginApi = (data: LoginData["body"]) =>
	customFetch(z.object({ message: z.string() }), {
		path: "/api/auth/login",
		method: "POST",
		body: data,
	});
