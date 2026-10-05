import type { QueryFilter } from "mongoose";

import type { GetTeachersSchema } from "@repo/schemas/teachers/get.teachers";

import { response } from "@/lib/controller";
import type { AuthControllerContext } from "@/lib/controller/types";
import { Teacher, type TTeacher } from "@/models/teacher.model";
import { teacherDto } from "@/utils/dtos/teacherDto";

async function getTeachersService({
	input,
}: AuthControllerContext<GetTeachersSchema>) {
	const { teacherId, adharNo, status, page, limit } = input.query;

	const filter: QueryFilter<TTeacher> = {
		deletedAt: null,
		...(teacherId && { teacherId }),
		...(adharNo && { adharNo }),
		...(status === "active"
			? { leftAt: null }
			: status === "left"
				? { leftAt: { $ne: null } }
				: null),
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
