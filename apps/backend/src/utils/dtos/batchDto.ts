import type { BatchBaseSchema } from "@repo/schemas/batch/base.batch";

import type { TBatch } from "@/models/batch.model";

export function batchDto(doc: TBatch) {
	const { _id, __v, courseId, teacherId, ...rest } = doc;

	return {
		id: String(_id) as BatchBaseSchema["id"],
		courseId: String(courseId) as BatchBaseSchema["courseId"],
		teacherId: String(teacherId) as BatchBaseSchema["teacherId"],
		...rest,
	} as BatchBaseSchema;
}
