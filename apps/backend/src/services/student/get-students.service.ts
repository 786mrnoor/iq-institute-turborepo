import type { GetStudentsSchema } from "@repo/schemas/students/get.students";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Student } from "@/models/student.model";
import { studentDto } from "@/utils/dtos/studentDto";

async function getStudentsService({
	input,
}: AuthControllerContext<GetStudentsSchema>) {
	const { fromDate, toDate, adharNo, apaarId, page, limit } = input.query;

	const filter = {
		deletedAt: null,
		...(adharNo && { adharNo }),
		...(apaarId && { apaarId }),
		registeredAt: {
			$gte: fromDate,
			$lte: toDate,
		},
	};

	const skip = (page - 1) * limit;

	const totalCount = await Student.countDocuments(filter);
	const students = await Student.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec();

	return response(200, {
		students: students.map((e) => studentDto(e)),
		meta: { page, limit, totalCount },
	});
}

export { getStudentsService };
