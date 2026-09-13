import { AppError } from "@repo/utils/app-error.js";
import type mongoose from "mongoose";

function handleDuplicateStudent(error: mongoose.mongo.MongoServerError) {
	if (error.keyValue?.adharNo) {
		throw new AppError(409, "Adhar No. is already mapped to another student", {
			path: "adharNo",
			message: "Adhar No. is already mapped to another student",
		});
	}

	if (error.keyValue?.apaarId) {
		throw new AppError(409, "Apaar ID is already mapped to another student", {
			path: "apaarId",
			message: "Apaar ID is already mapped to another student",
		});
	}
}

export { handleDuplicateStudent };
