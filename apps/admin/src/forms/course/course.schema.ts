import z from "zod";

import { courseBaseSchema } from "@repo/schemas/course/base.course";
import { emptyStringToUndefined } from "@repo/schemas/shared/empty-string-to-undefined";
import { checkDuplicate } from "@repo/utils/check-duplicate.js";

export const courseFormSchema = z
	.object({
		...courseBaseSchema.pick({
			title: true,
			eligibility: true,
			// fee: true,
		}).shape,
		fee: z.coerce.number<string>().int().min(0),
		description: emptyStringToUndefined(courseBaseSchema.shape.description),
		duration: z.object({
			value: emptyStringToUndefined(
				z.coerce
					.number("Duration must be a number")
					.int("Duration must be a integer")
					.min(1, "Duration must greater than 1"),
			),
			unit: courseBaseSchema.shape.duration.shape.unit,
		}),
		topics: z
			.array(
				z.object({
					topicId: courseBaseSchema.shape.topics.unwrap(),
				}),
			)
			.min(1, "At least 1 topic is required"),
	})
	.transform((data) => ({
		...data,
		topics: data.topics.map((t) => t.topicId),
	}))
	.superRefine(({ topics }, ctx) => {
		checkDuplicate(topics, (i) => {
			ctx.addIssue({
				code: "custom",
				message: "Remove Duplicate Topic",
				path: ["topics", i, "topicId"],
			});
		});
	});

export type CourseFormData = z.infer<typeof courseFormSchema>;
export type CourseFormInput = z.input<typeof courseFormSchema>;
