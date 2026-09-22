import mongoose from "mongoose";

import { AppError } from "@repo/utils/app-error.js";

function handleDuplicateBatch(error: unknown) {
	if (!(error instanceof mongoose.mongo.MongoServerError)) return;

	if (error.keyValue?.courseId && error.keyValue?.code) {
		throw new AppError(
			409,
			"course and code is already mapped to another batch",
			{
				path: "code",
				message: "Enter a different code or choose different course",
			},
		);
	}
}

export { handleDuplicateBatch };
