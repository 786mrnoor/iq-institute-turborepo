import type { TeacherBaseSchema } from "@repo/schemas/teachers/base.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";

async function activeTeacherService(id: TeacherBaseSchema["id"]) {
	const updatedTeacher = await Teacher.findOneAndUpdate(
		{ _id: id, deletedAt: null },
		{ leftAt: null },
		{
			runValidators: true,
			returnDocument: "after",
		},
	);

	if (!updatedTeacher) throw new AppError(404, "Teacher could not be found");

	return response(200, teacherDto(updatedTeacher.toObject()));
}

export { activeTeacherService };
