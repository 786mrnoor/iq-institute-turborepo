import z from "zod";

import type { InferRequestInput, InferRequestShape } from "../request.types";
import { enrollmentBaseSchema } from "./base.enrollment.schema";
import { createEnrollmentSchema } from "./create.enrollment.schema";

export const updateEnrollmentSchema = {
	params: enrollmentBaseSchema.pick({ id: true }),
	body: z.object({ ...createEnrollmentSchema.body.shape }),
};

export type UpdateEnrollmentSchema = InferRequestShape<
	typeof updateEnrollmentSchema
>;
export type UpdateEnrollmentInput = InferRequestInput<
	typeof updateEnrollmentSchema
>;
