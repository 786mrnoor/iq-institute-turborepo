import z from "zod";

import { BATCH_STATUS, batchBaseSchema } from "@repo/schemas/batch/base.batch";

export const batchFormSchema = z
	.object({
		courseId: batchBaseSchema.shape.courseId,
		name: batchBaseSchema.shape.name,
		code: batchBaseSchema.shape.code,
		startDate: batchBaseSchema.shape.startDate,
		endDate: batchBaseSchema.shape.endDate,
		capacity: z.coerce
			.number("Capacity is required")
			.int()
			.min(1, "Capacity must be greater than 0"),
		schedule: batchBaseSchema.shape.schedule,
		status: z.enum(BATCH_STATUS),
	})
	.refine(({ startDate, endDate }) => endDate >= startDate, {
		message: "End date must be on or after start date",
		path: ["endDate"],
	});

export type BatchFormData = z.infer<typeof batchFormSchema>;
export type BatchFormInput = z.input<typeof batchFormSchema>;
