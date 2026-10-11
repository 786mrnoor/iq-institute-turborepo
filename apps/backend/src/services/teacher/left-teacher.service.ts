import type { LeftTeacherSchema } from "@repo/schemas/teachers/left.teacher";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";

async function leftTeacherService({
	input,
}: AuthControllerContext<LeftTeacherSchema>) {
	const leftAt = input.body.leftAt;

	// the teacher must not have an active batch
	const batch = await Batch.findOne({
		teacherId: input.params.id,
		status: "active",
		deletedAt: null,
	})
		.select("_id")
		.lean()
		.exec();

	if (batch)
		throw new AppError(400, "The teacher is assigned in one of the batches");

	const activeTeacher = await Teacher.findOne({
		_id: input.params.id,
		leftAt: null,
		deletedAt: null,
	})
		.select("joinedAt")
		.lean()
		.exec();

	if (!activeTeacher)
		throw new AppError(400, "Teacher not found or already left");
	if (activeTeacher?.joinedAt && leftAt < activeTeacher?.joinedAt) {
		throw new AppError(400, "leave date must be after joining date");
	}

	const updatedTeacher = await Teacher.findOneAndUpdate(
		{ _id: input.params.id, deletedAt: null },
		{ leftAt },
		{
			runValidators: true,
			returnDocument: "after",
		},
	);

	if (!updatedTeacher) throw new AppError(404, "Teacher could not be found");

	return response(200, teacherDto(updatedTeacher.toObject()));
}

export { leftTeacherService };
