import type { InferRequestShape } from "../request.types";
import { courseBaseSchema } from "./base.course.schema";

export const deleteCourseSchema = {
	params: courseBaseSchema.pick({ id: true }),
};

export type DeleteCourseSchema = InferRequestShape<typeof deleteCourseSchema>;
