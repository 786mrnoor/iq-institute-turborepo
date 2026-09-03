import type { AuthUser } from "@repo/schemas/auth/auth.user";
import { AppError } from "@repo/utils/app-error.js";
import type { Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, SESSION_KEY } from "./shared";

export async function createSession(payload: AuthUser, res: Response) {
	if (!JWT_SECRET_KEY) throw new AppError(500, "something went wrong");

	const token = jwt.sign(payload, JWT_SECRET_KEY, {
		expiresIn: "7d",
	});

	res.cookie(SESSION_KEY, token, {
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
		httpOnly: true,
		secure: true,
		sameSite: "strict",
	});
}
