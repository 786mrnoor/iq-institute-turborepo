import mongoose from "mongoose";

import type { UpdateEnrollmentSchema } from "@repo/schemas/enrollments/update.enrollment";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import { Enrollment } from "@/models/enrollment.model";
import { enrollmentDto } from "@/utils/dtos/enrollmentDto";
import { checkCourse } from "../course/check-course";
import { checkStudent } from "../student/check-student";
import { handleDuplicateEnrollment } from "./handle-duplicate-enrollment";

async function updateEnrollmentService(
	id: UpdateEnrollmentSchema["params"]["id"],
	data: UpdateEnrollmentSchema["body"],
) {
	try {
		await checkCourse(data.courseId);
		await checkStudent(data.studentId);

		const updatedEnrollment = await Enrollment.findOneAndUpdate(
			{ _id: id, deletedAt: null, status: { $ne: "completed" } },
			{
				...data,
				fee: { ...data.fee, finalAmount: data.fee.amount - data.fee.discount },
			},
			{
				runValidators: true,
				returnDocument: "after",
			},
		);

		if (!updatedEnrollment)
			throw new AppError(404, "Enrollment could not be found");

		return response(200, enrollmentDto(updatedEnrollment.toObject()));
	} catch (error) {
		if (error instanceof mongoose.mongo.MongoServerError) {
			handleDuplicateEnrollment(error);
		}

		throw error;
	}
}

export { updateEnrollmentService };
