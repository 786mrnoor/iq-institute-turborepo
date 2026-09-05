export type ActionResultError = {
	path: string;
	message: string;
};

type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 500;

/**
 * ## Error HTTP status codes.
 *
 * **400 - Bad Request**: Client error (invalid input).
 *
 * **401 - Unauthorized**: Authentication failure.
 *
 * **403 - Forbidden**: Access denied.
 *
 * **404 - Not Found**: Resource not found.
 *
 * **409 - Conflict**: Request conflicts with the current state of the server.
 *
 * **500 - Internal Server Error**: Server-side issue.
 */
export class AppError extends Error {
	statusCode: ErrorStatusCode;
	errors?: ActionResultError[];

	constructor(
		statusCode: ErrorStatusCode,
		message: string,
		errors?: ActionResultError | ActionResultError[],
	) {
		super(message);

		this.statusCode = statusCode;
		if (Array.isArray(errors)) {
			this.errors = errors;
		} else if (errors) {
			this.errors = [errors];
		}

		if ("captureStackTrace" in Error) {
			(Error as any).captureStackTrace(this, this.constructor);
		}
	}
}
