import z from "zod";

import type { InferRequestShape } from "../request.types";
import { enrollmentBaseSchema } from "./base.enrollment.schema";

export const deleteEnrollmentSchema = {
	params: z.object({
		id: enrollmentBaseSchema.shape.id,
	}),
};

export type DeleteEnrollmentSchema = InferRequestShape<
	typeof deleteEnrollmentSchema
>;
