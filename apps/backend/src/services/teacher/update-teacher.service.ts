import mongoose from "mongoose";

import type { UpdateTeacherSchema } from "@repo/schemas/teachers/update.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";
import { handleDuplicateTeacher } from "./handle-duplicate-teacher";

async function updateTeacherService({
	input,
}: AuthControllerContext<UpdateTeacherSchema>) {
	try {
		const updatedTeacher = await Teacher.findOneAndUpdate(
			{ _id: input.params.id, deletedAt: null },
			input.body,
			{
				runValidators: true,
				returnDocument: "after",
			},
		);

		if (!updatedTeacher) throw new AppError(404, "Teacher could not be found");

		return response(200, teacherDto(updatedTeacher.toObject()));
	} catch (error) {
		if (error instanceof mongoose.mongo.MongoServerError) {
			handleDuplicateTeacher(error);
		}

		throw error;
	}
}

export { updateTeacherService };
