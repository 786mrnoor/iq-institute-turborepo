import type { GetBatchSchema } from "@repo/schemas/batch/get.batch";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { batchDto } from "@/utils/dtos/batchDto";

async function getBatchService({
	input,
}: AuthControllerContext<GetBatchSchema>) {
	const batch = await Batch.findOne({ _id: input.params.id, deletedAt: null })
		.lean()
		.exec();

	if (!batch) throw new AppError(404, "Batch could not be found");

	return response(201, batchDto(batch));
}

export { getBatchService };
