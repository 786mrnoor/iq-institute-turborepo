import type { Request } from "express";
import jwt from "jsonwebtoken";

import { authUserSchema } from "@repo/schemas/auth/auth.user";
import { AppError } from "@repo/utils/app-error.js";

import { JWT_SECRET_KEY, SESSION_KEY } from "./shared";

export async function verifySession(req: Request) {
	const token = String(req.cookies[SESSION_KEY]);

	if (!token) return null;

	try {
		if (!JWT_SECRET_KEY) {
			throw new AppError(500, "something went wrong");
		}
		const payload = jwt.verify(token, JWT_SECRET_KEY);

		const result = authUserSchema.safeParse(payload);

		if (!result.success) {
			return null;
		}

		return result.data;
	} catch {
		return null;
	}
}
