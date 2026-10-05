import type { EnrollmentBaseSchema } from "@repo/schemas/enrollments/base.enrollment";

import { response } from "@/lib/controller";
import { Enrollment } from "@/models/enrollment.model";
import { enrollmentDto } from "@/utils/dtos/enrollmentDto";

async function getEnrollmentService(enrollmentId: EnrollmentBaseSchema["id"]) {
	const enrollment = await Enrollment.findOne({
		_id: enrollmentId,
		deletedAt: null,
	})
		.lean()
		.exec();

	return response(200, enrollment ? enrollmentDto(enrollment) : null);
}

export { getEnrollmentService };
