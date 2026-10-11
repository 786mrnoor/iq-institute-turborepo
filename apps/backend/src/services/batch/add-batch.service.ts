import type { CreateBatchSchema } from "@repo/schemas/batch/create.batch";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { batchDto } from "@/utils/dtos/batchDto";
import { checkCourse } from "../course/check-course";
import { checkTeacher } from "../teacher/check-teacher";
import { handleDuplicateBatch } from "./handle-duplicate-batch";

async function addBatchService({
	input,
}: AuthControllerContext<CreateBatchSchema>) {
	try {
		await checkCourse(input.body.courseId);
		const teacher = await checkTeacher(input.body.teacherId);
		if (teacher.leftAt)
			throw new AppError(400, "Teacher is not active.", {
				path: "teacherId",
				message: "Choose another teacher",
			});

		const batch = new Batch(input.body);
		await batch.save();

		return response(201, batchDto(batch.toObject()));
	} catch (error) {
		handleDuplicateBatch(error);
		throw error;
	}
}

export { addBatchService };
