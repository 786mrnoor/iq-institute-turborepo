import type { GetTeachersSchema } from "@repo/schemas/teachers/get.teachers";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";

async function getTeachersService({
	input,
}: AuthControllerContext<GetTeachersSchema>) {
	const { teacherId, adharNo, status, page, limit } = input.query;

	const filter = {
		deletedAt: null,
		...(teacherId && { teacherId }),
		...(adharNo && { adharNo }),
		...(status && { status }),
	};

	const skip = (page - 1) * limit;

	const totalCount = await Teacher.countDocuments(filter);
	const teachers = await Teacher.find(filter)
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit)
		.lean()
		.exec();

	return response(200, {
		teachers: teachers.map((e) => teacherDto(e)),
		meta: { page, limit, totalCount },
	});
}

export { getTeachersService };
