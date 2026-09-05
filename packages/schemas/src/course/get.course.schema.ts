import type { InferRequestShape } from "../request.types";
import { courseBaseSchema } from "./base.course.schema";

export const getCourseSchema = {
	params: courseBaseSchema.pick({ id: true }),
};

export type GetCourseSchema = InferRequestShape<typeof getCourseSchema>;
