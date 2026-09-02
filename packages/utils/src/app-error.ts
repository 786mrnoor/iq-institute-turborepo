export type ActionResultError = {
	path: string;
	message: string;
};

export class AppError extends Error {
	statusCode: number;
	errors?: ActionResultError[];

	constructor(
		statusCode: number,
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
