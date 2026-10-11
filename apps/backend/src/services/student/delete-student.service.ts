import type { DeleteStudentSchema } from "@repo/schemas/students/delete.student";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Enrollment } from "@/models/enrollment.model";
import { Student } from "@/models/student.model";

async function deleteStudentService({
	input,
}: AuthControllerContext<DeleteStudentSchema>) {
	const id = input.params.id;

	const enrollment = await Enrollment.findOne({
		studentId: id,
		deletedAt: null,
	})
		.select("_id")
		.lean()
		.exec();

	if (enrollment)
		throw new AppError(
			400,
			"The student can not be deleted because it has enrolled in a course",
		);

	const result = await Student.updateOne(
		{ _id: id },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}

	throw new AppError(400, "Student could not be deleted successfully");
}

export { deleteStudentService };
