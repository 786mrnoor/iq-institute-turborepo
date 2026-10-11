import type { UpdateBatchSchema } from "@repo/schemas/batch/update.batch";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { batchDto } from "@/utils/dtos/batchDto";
import { checkCourse } from "../course/check-course";
import { checkTeacher } from "../teacher/check-teacher";
import { handleDuplicateBatch } from "./handle-duplicate-batch";

async function updateBatchService({
	input,
}: AuthControllerContext<UpdateBatchSchema>) {
	try {
		const { params, body } = input;

		await checkCourse(body.courseId);
		const teacher = await checkTeacher(body.teacherId);
		if (teacher.leftAt)
			throw new AppError(400, "Teacher is not active.", {
				path: "teacherId",
				message: "Choose another teacher",
			});

		const updatedBatch = await Batch.findOneAndUpdate(
			{ _id: params.id, deletedAt: null, status: { $ne: "completed" } },
			body,
			{
				returnDocument: "after",
				runValidators: true,
			},
		)
			.lean()
			.exec();

		if (!updatedBatch) {
			throw new AppError(400, "Batch could not be found or already completed");
		}
		return response(200, batchDto(updatedBatch));
	} catch (error) {
		handleDuplicateBatch(error);
		throw error;
	}
}

export { updateBatchService };
