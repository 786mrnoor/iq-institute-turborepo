import type { InferRequestShape } from "../request.types";
import { courseBaseSchema } from "./base.course.schema";

export const updateCourseSchema = {
	params: courseBaseSchema.pick({ id: true }),
	body: courseBaseSchema.pick({
		title: true,
		duration: true,
		eligibility: true,
		description: true,
		topics: true,
	}),
};

export type UpdateCourseSchema = InferRequestShape<typeof updateCourseSchema>;
