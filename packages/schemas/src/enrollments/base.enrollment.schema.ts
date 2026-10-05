import z from "zod";

import { courseBaseSchema } from "../course/base.course.schema";
import { objectIdSchema } from "../shared/object-id.schema";
import { timestampSchema } from "../shared/timestamp-schema.schema";
import { studentBaseSchema } from "../students/base.student.schema";

export const ENROLLMENT_STATUS = ["active", "completed", "cancelled"] as const;

const feeSchema = z.object({
	amount: z.number().min(0),
	discount: z.number().min(0).default(0),
	finalAmount: z.number().min(0),
});

export const enrollmentBaseSchema = z
	.object({
		id: objectIdSchema.brand("enrollmentId"),
		enrollmentId: z
			.string("Teacher Id is required")
			.regex(/^ENR-\d{4}-[0-9A-Z]{6}$/, "Invalid enrollment ID format"),
		studentId: studentBaseSchema.shape.id,
		courseId: courseBaseSchema.shape.id,

		enrolledAt: z.coerce.date("Enrollment date is required"),
		fee: feeSchema,

		status: z.enum(ENROLLMENT_STATUS).default("active"),
		leftAt: z.coerce.date().nullish(),

		deletedAt: z.coerce.date().nullish(),
	})
	.extend(timestampSchema);

export type EnrollmentBaseSchema = z.infer<typeof enrollmentBaseSchema>;

// lifecycle
// active
//   enrolledAt = Aug 21
//   leftAt = null

// completed
//   enrolledAt = Aug 1
//   leftAt = course completion date

// cancelled
//   enrolledAt = Aug 1
//   leftAt = course cancelation date
