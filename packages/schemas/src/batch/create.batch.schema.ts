import z from "zod";

import type { InferRequestShape } from "../request.types";
import { batchBaseSchema } from "./base.batch.schema";

export const createBatchSchema = {
	body: z
		.object({
			courseId: batchBaseSchema.shape.courseId,
			name: batchBaseSchema.shape.name,
			code: batchBaseSchema.shape.code,
			startDate: batchBaseSchema.shape.startDate,
			endDate: batchBaseSchema.shape.endDate,
			capacity: batchBaseSchema.shape.capacity,
			schedule: batchBaseSchema.shape.schedule,
			status: batchBaseSchema.shape.status,
		})
		.refine(({ startDate, endDate }) => endDate >= startDate, {
			message: "End date must be on or after start date",
			path: ["endDate"],
		}),
};

export type CreateBatchSchema = InferRequestShape<typeof createBatchSchema>;
