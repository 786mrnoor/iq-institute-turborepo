import type { UpdateStudentSchema } from "@repo/schemas/students/update.student";
import { AppError } from "@repo/utils/app-error.js";
import mongoose from "mongoose";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";
import { studentDto } from "@/utils/dtos/studentDto";
import { handleDuplicateStudent } from "./handle-duplicate-student";

async function updateStudentService({
	input,
}: AuthControllerContext<UpdateStudentSchema>) {
	try {
		const updatedStudent = await Student.findOneAndUpdate(
			{ _id: input.params.id, deletedAt: null },
			input.body,
			{
				runValidators: true,
				returnDocument: "after",
			},
		);

		if (!updatedStudent) throw new AppError(404, "Student could not be found");

		return response(200, studentDto(updatedStudent.toObject()));
	} catch (error) {
		if (error instanceof mongoose.mongo.MongoServerError) {
			handleDuplicateStudent(error);
		}

		throw error;
	}
}

export { updateStudentService };
