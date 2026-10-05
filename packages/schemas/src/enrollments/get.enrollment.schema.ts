import type { InferRequestShape } from "../request.types";
import { enrollmentBaseSchema } from "./base.enrollment.schema";

export const getEnrollmentSchema = {
	params: enrollmentBaseSchema.pick({ id: true }),
};

export type GetEnrollmentSchema = InferRequestShape<typeof getEnrollmentSchema>;
