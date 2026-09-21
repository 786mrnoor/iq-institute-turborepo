import type { UpdateBatchSchema } from "@repo/schemas/batch/update.batch";
import { AppError } from "@repo/utils/app-error.js";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { batchDto } from "@/utils/dtos/batchDto";
import { checkCourse } from "./check-course";
import { handleDuplicateBatch } from "./handle-duplicate-batch";

async function updateBatchService({
	input,
}: AuthControllerContext<UpdateBatchSchema>) {
	try {
		const { params, body } = input;

		await checkCourse(body.courseId);
		const updatedBatch = await Batch.findOneAndUpdate(
			{ _id: params.id, deletedAt: null },
			body,
			{
				returnDocument: "after",
				runValidators: true,
			},
		)
			.lean()
			.exec();

		if (!updatedBatch) {
			throw new AppError(404, "Batch could not be found");
		}
		return response(200, batchDto(updatedBatch));
	} catch (error) {
		handleDuplicateBatch(error);
		throw error;
	}
}

export { updateBatchService };
