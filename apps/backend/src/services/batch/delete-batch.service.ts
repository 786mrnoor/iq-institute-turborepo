import type { DeleteBatchSchema } from "@repo/schemas/batch/delete.batch";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";

async function deleteBatchService({
	input,
}: AuthControllerContext<DeleteBatchSchema>) {
	const result = await Batch.updateOne(
		{ _id: input.params.id, deletedAt: null, status: { $ne: "completed" } },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}
	throw new AppError(400, "Batch could not be found or it is completed");
}

export { deleteBatchService };
