import type mongoose from "mongoose";

import { AppError } from "@repo/utils/app-error.js";

function handleDuplicateTeacher(error: mongoose.mongo.MongoServerError) {
	if (error.keyValue?.adharNo) {
		throw new AppError(409, "Adhar No. is already mapped to another teacher", {
			path: "adharNo",
			message: "Adhar No. is already mapped to another teacher",
		});
	}
}

export { handleDuplicateTeacher };
