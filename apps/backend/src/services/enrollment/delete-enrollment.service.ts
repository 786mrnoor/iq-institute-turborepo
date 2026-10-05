import type { EnrollmentBaseSchema } from "@repo/schemas/enrollments/base.enrollment";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import { Enrollment } from "@/models/enrollment.model";

async function deleteEnrollmentService(id: EnrollmentBaseSchema["id"]) {
	const result = await Enrollment.updateOne(
		{ _id: id, deletedAt: null, status: { $ne: "completed" } },
		{ deletedAt: new Date() },
	).exec();

	if (result.modifiedCount === 1) {
		return response(204, null);
	}

	throw new AppError(400, "Enrollment could not be found or already completed");
}

export { deleteEnrollmentService };
