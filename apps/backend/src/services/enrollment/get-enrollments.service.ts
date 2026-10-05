import type { QueryFilter } from "mongoose";

import type { GetEnrollmentsSchema } from "@repo/schemas/enrollments/get.enrollments";

import { response } from "@/lib/controller";
import { Enrollment, type TEnrollment } from "@/models/enrollment.model";
import { enrollmentDto } from "@/utils/dtos/enrollmentDto";

async function getEnrollmentsService(query: GetEnrollmentsSchema["query"]) {
	const { enrollmentId, courseId, status, page, limit } = query;

	const filter: QueryFilter<TEnrollment> = {
		deletedAt: null,
		...(enrollmentId && { enrollmentId }),
		...(courseId && { courseId }),
		...(status && { status }),
	};

	const skip = (page - 1) * limit;

	const totalCount = await Enrollment.countDocuments(filter);
	const enrollments = await Enrollment.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec();

	return response(200, {
		enrollments: enrollments.map((e) => enrollmentDto(e)),
		meta: { page, limit, totalCount },
	});
}

export { getEnrollmentsService };
