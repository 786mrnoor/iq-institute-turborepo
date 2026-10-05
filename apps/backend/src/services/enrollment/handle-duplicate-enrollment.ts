import type mongoose from "mongoose";

import { AppError } from "@repo/utils/app-error.js";

function handleDuplicateEnrollment(error: mongoose.mongo.MongoServerError) {
	if (error.keyValue?.studentId && error.keyValue?.courseId) {
		throw new AppError(409, "Student is already enrolled in same course");
	}
}

export { handleDuplicateEnrollment };
