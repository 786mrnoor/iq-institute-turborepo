import mongoose from "mongoose";

import type { AddStudentSchema } from "@repo/schemas/students/add.student";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";
import { studentDto } from "@/utils/dtos/studentDto";
import { generateRandomId } from "@/utils/generate-random-id";
import { handleDuplicateStudent } from "./handle-duplicate-student";

async function addStudentService({
	input,
}: AuthControllerContext<AddStudentSchema>) {
	for (let attempt = 0; attempt < 5; attempt++) {
		try {
			const studentId = `STU-${new Date().getFullYear()}-${generateRandomId()}`;
			const student = new Student({ ...input.body, studentId });
			await student.save();

			return response(201, studentDto(student.toObject()));
		} catch (error) {
			if (error instanceof mongoose.mongo.MongoServerError) {
				if (error?.code === 11000 && error?.keyPattern?.studentId) {
					continue;
				} else {
					handleDuplicateStudent(error);
				}
			}

			throw error;
		}
	}

	throw new AppError(500, "Unable to generate a unique student ID");
}

export { addStudentService };
