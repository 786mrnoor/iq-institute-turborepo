import z from "zod";

import { authUserSchema } from "@repo/schemas/auth/auth.user";
import type { LoginData } from "@repo/schemas/auth/login";
import { customFetch } from "@repo/utils/custom-fetch/index.ts";

export const loginApi = (data: LoginData["body"]) =>
	customFetch(z.object({ message: z.string() }), {
		path: "/api/auth/login",
		method: "POST",
		body: data,
		redirectOn401: false,
	});

export const meApi = () =>
	customFetch(authUserSchema, {
		path: "/api/auth/me",
		method: "GET",
	});

export const logoutApi = () =>
	customFetch(z.object({ message: z.string() }), {
		path: "/api/auth/logout",
		method: "POST",
	});
