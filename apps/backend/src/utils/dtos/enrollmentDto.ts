import type { EnrollmentBaseSchema } from "@repo/schemas/enrollments/base.enrollment";

import type { TEnrollment } from "@/models/enrollment.model";

export function enrollmentDto(doc: TEnrollment) {
	const { _id, courseId, studentId, __v, ...rest } = doc;

	return {
		...rest,
		id: String(_id),
		courseId: String(courseId),
		studentId: String(studentId),
	} as EnrollmentBaseSchema;
}
