import mongoose from "mongoose";

import type { AddTeacherSchema } from "@repo/schemas/teachers/add.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";
import { generateRandomId } from "@/utils/generate-random-id";
import { handleDuplicateTeacher } from "./handle-duplicate-teacher";

async function addTeacherService({
	input,
}: AuthControllerContext<AddTeacherSchema>) {
	for (let attempt = 0; attempt < 5; attempt++) {
		try {
			const teacherId = `TCH-${generateRandomId()}`;

			const teacher = new Teacher({ ...input.body, teacherId });
			await teacher.save();

			return response(201, teacherDto(teacher.toObject()));
		} catch (error) {
			if (error instanceof mongoose.mongo.MongoServerError) {
				if (error?.code === 11000 && error?.keyPattern?.teacherId) {
					continue;
				} else {
					handleDuplicateTeacher(error);
				}
			}

			throw error;
		}
	}

	throw new AppError(500, "Unable to generate a unique teacher ID");
}

export { addTeacherService };
