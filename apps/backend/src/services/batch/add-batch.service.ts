import type { CreateBatchSchema } from "@repo/schemas/batch/create.batch";

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
		await checkTeacher(input.body.teacherId);

		const batch = new Batch(input.body);
		await batch.save();

		return response(201, batchDto(batch.toObject()));
	} catch (error) {
		handleDuplicateBatch(error);
		throw error;
	}
}

export { addBatchService };
