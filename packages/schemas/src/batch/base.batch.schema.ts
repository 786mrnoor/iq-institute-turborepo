import z from "zod";

import { courseBaseSchema } from "../course/base.course.schema";
import { objectIdSchema } from "../shared/object-id.schema";

const scheduleSchema = z
	.object({
		startTime: z.iso.time({
			precision: -1,
			error: "start time must be a valid time (e.g., 10:00 or 15:15",
		}),

		endTime: z.iso.time({
			precision: -1,
			error: "start time must be a valid time (e.g., 12:00 or 18:15",
		}),
	})
	.refine(({ startTime, endTime }) => endTime > startTime, {
		error: "End time must be after start time",
		path: ["endTime"],
	});

export const batchBaseSchema = z
	.object({
		id: objectIdSchema.brand("courseId"),

		courseId: courseBaseSchema.shape.id,
		name: z
			.string("Name of the batch is required")
			.trim()
			.min(2, "Name must be at least 2 characters long")
			.max(30, "Name can not exceed 30 characters"),
		code: z
			.string("Code is required")
			.trim()
			.min(2, "Code must be at least 2 characters long")
			.max(30, "Code can not exceed 30 characters")
			.toUpperCase(),

		startDate: z.coerce.date(),
		endDate: z.coerce.date(),

		capacity: z.number("Capacity is required").int().min(1),
		schedule: scheduleSchema,
		status: z
			.enum(["upcoming", "active", "completed", "cancelled"])
			.default("upcoming"),

		deletedAt: z.coerce.date().nullish(),
	})
	.refine(({ startDate, endDate }) => endDate >= startDate, {
		error: "End date must be on or after start date",
		path: ["endDate"],
	});

export type BatchBaseSchema = z.infer<typeof batchBaseSchema>;
