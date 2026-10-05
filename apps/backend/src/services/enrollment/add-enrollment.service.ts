import mongoose from "mongoose";

import type { CreateEnrollmentSchema } from "@repo/schemas/enrollments/create.enrollment";
import { AppError } from "@repo/utils/app-error.js";

import { response } from "@/lib/controller";
import { Enrollment } from "@/models/enrollment.model";
import { enrollmentDto } from "@/utils/dtos/enrollmentDto";
import { generateRandomId } from "@/utils/generate-random-id";
import { checkCourse } from "../course/check-course";
import { checkStudent } from "../student/check-student";
import { handleDuplicateEnrollment } from "./handle-duplicate-enrollment";

async function addEnrollmentService(data: CreateEnrollmentSchema["body"]) {
	for (let attempt = 0; attempt < 5; attempt++) {
		try {
			await checkCourse(data.courseId);
			await checkStudent(data.studentId);

			const enrollmentId = `ENR-${new Date().getFullYear()}-${generateRandomId()}`;
			const enrollment = new Enrollment({
				...data,
				enrollmentId,
				fee: { ...data.fee, finalAmount: data.fee.amount - data.fee.discount },
				status: "active",
			});
			await enrollment.save();

			return response(201, enrollmentDto(enrollment.toObject()));
		} catch (error) {
			if (error instanceof mongoose.mongo.MongoServerError) {
				if (error?.code === 11000 && error?.keyPattern?.enrollmentId) {
					continue;
				} else {
					handleDuplicateEnrollment(error);
				}
			}

			throw error;
		}
	}

	throw new AppError(500, "Unable to generate a unique enrollment ID");
}

export { addEnrollmentService };
