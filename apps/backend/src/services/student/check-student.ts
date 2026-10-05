import type { StudentBaseSchema } from "@repo/schemas/students/base.student";
import { AppError } from "@repo/utils/app-error.js";

import { Student } from "@/models/student.model";

async function checkStudent(studentId: StudentBaseSchema["id"]) {
	const existingStudent = await Student.findOne({
		_id: studentId,
		deletedAt: null,
	}).select("_id");

	if (!existingStudent) {
		throw new AppError(404, "Student does not exist");
	}
}

export { checkStudent };
