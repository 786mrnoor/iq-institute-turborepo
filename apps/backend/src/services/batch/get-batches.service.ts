import type { GetBatchesSchema } from "@repo/schemas/batch/get.batches";
import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Batch } from "@/models/batch.model";
import { batchDto } from "@/utils/dtos/batchDto";

async function getBatchesService({
	input,
}: AuthControllerContext<GetBatchesSchema>) {
	const { status, page, limit } = input.query;
	const filter = {
		status,
		deletedAt: null,
	};

	const totalCount = await Batch.countDocuments(filter);
	const batches = await Batch.find(filter)
		.skip(limit * (page - 1))
		.limit(limit)
		.lean()
		.exec();

	return response(201, {
		batches: batches.map((batch) => batchDto(batch)),
		meta: { page, limit, totalCount },
	});
}

export { getBatchesService };
