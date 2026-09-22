import z from "zod";

import { checkDuplicate } from "@repo/utils/check-duplicate.ts";

import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";
import { topicBaseSchema } from "../topics/base.topic.schema";

export const DURATION_UNITS = ["day", "month", "year"] as const;

export const courseBaseSchema = z
	.object({
		id: objectIdSchema.brand("courseId"),

		title: z
			.string("Title is required.")
			.trim()
			.min(3, "Title must be at least 3 characters long"),
		duration: z.object({
			value: z
				.number("Duration is required.")
				.min(1, "Duration must be a positive number"),
			unit: z.enum(DURATION_UNITS),
		}),
		eligibility: z
			.string("Elegibility is required.")
			.trim()
			.min(3, "Elegibility must be at least 3 characters long"),
		description: z
			.string("Description is required")
			.trim()
			.min(3, "Description must be at least 3 characters long"),
		topics: z
			.array(topicBaseSchema.shape.id)
			.min(1, "At least 1 topic is required")
			.refine((val) => {
				let res: boolean = true;
				checkDuplicate(val, () => (res = false));
				return res;
			}),
		deletedAt: z.date().nullish(),
	})
	.extend(timestampSchema);

export type CourseBaseSchema = z.infer<typeof courseBaseSchema>;
