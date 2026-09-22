import type { NextFunction, Request, Response } from "express";

import { AppError } from "@repo/utils/app-error.ts";

export function globalErrorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	// Known (AppError)
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
			errors: err.errors,
		});
	}

	// Unknown error
	console.error("Unexpected Error:", err);

	return res.status(500).json({
		statusCode: 500,
		message: "Internal Server Error",
	});
}
