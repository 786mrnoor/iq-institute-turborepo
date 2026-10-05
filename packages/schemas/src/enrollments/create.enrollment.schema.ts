import z from "zod";

import type { InferRequestShape } from "../request.types";
import { enrollmentBaseSchema } from "./base.enrollment.schema";

export const createEnrollmentSchema = {
	body: z.object({
		studentId: enrollmentBaseSchema.shape.studentId,
		courseId: enrollmentBaseSchema.shape.courseId,
		enrolledAt: enrollmentBaseSchema.shape.enrolledAt,

		fee: enrollmentBaseSchema.shape.fee
			.pick({ amount: true, discount: true })
			.refine(({ discount, amount }) => discount <= amount, {
				message: "Discount cannot exceed fee amount",
				path: ["discount"],
			}),
	}),
};

export type CreateEnrollmentSchema = InferRequestShape<
	typeof createEnrollmentSchema
>;
