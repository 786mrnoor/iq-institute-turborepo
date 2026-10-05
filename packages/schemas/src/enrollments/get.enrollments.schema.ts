import z from "zod";

import type { InferRequestShape } from "../request.types";
import { enrollmentBaseSchema } from "./base.enrollment.schema";

export const getEnrollmentsSchema = {
	query: z.object({
		enrollmentId: enrollmentBaseSchema.shape.enrollmentId.optional(),
		courseId: enrollmentBaseSchema.shape.courseId.optional(),
		status: z.enum(["active", "completed", "cancelled"]).optional(),
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(10),
	}),
};

export type GetEnrollmentsSchema = InferRequestShape<
	typeof getEnrollmentsSchema
>;
