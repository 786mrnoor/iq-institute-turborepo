import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { Teacher } from "@/models/teacher.model";

async function checkTeacher(teacherId: TeacherBaseSchema["id"]) {
	const existingTeacher = await Teacher.findOne({
		_id: teacherId,
		deletedAt: null,
	}).select("_id");

	if (!existingTeacher) {
		throw new AppError(404, "Teacher does not exist");
	}
}

export { checkTeacher };
