import z from "zod";
import type { InferRequestShape } from "../request.types";
import { courseBaseSchema } from "./base.course.schema";

export const getCourseSchema = {
	params: courseBaseSchema.pick({ id: true }),
	query: z.object({
		include: z.literal("topics").optional(),
	}),
};

export type GetCourseSchema = InferRequestShape<typeof getCourseSchema>;
