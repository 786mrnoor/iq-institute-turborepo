import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";

import type { TBatch } from "@/models/batch.model";

export function batchDto(doc: TBatch) {
	const { _id, __v, courseId, ...rest } = doc;

	return {
		id: String(_id) as BatchBaseSchema["id"],
		courseId: String(courseId) as BatchBaseSchema["courseId"],
		...rest,
	} as BatchBaseSchema;
}
