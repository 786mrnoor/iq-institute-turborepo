import type { InferRequestShape } from "../request.types";
import { courseBaseSchema } from "./base.course.schema";

export const createCourseSchema = {
	body: courseBaseSchema.pick({
		title: true,
		duration: true,
		eligibility: true,
		fee: true,
		description: true,
		topics: true,
	}),
};

export type CreateCourseSchema = InferRequestShape<typeof createCourseSchema>;
