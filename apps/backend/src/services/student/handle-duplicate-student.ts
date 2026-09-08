import { AppError } from "@repo/utils/app-error.js";
import mongoose from "mongoose";

function handleDuplicateStudent(error: unknown) {
	if (!(error instanceof mongoose.mongo.MongoServerError)) return;

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
